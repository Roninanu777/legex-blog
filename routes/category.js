const express=require("express"),
    router=express.Router(),
    slugify = require('slugify'),
    errorHandler=require('../helper/dbErrorHandler'),
    Category=require('../models/category'),
    Blog=require('../models/blogSchema'),
    middlewareObj=require('../middleware/index.js'),
    { runValidation } = require('../validators'),
    {categoryCreateValidator}= require('../validators/category');   

router.get('/api/category',(req,res)=>{
    Category.find({}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);
    })
});

router.post('/api/category',categoryCreateValidator, runValidation, middlewareObj.requireSignin, middlewareObj.adminMiddleware,(req,res)=>{
    const {name}= req.body;
    let slug = slugify(name).toLowerCase();

    let category = new Category({ name, slug });

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(data);
        res.json(data);
    });
});

router.get('/api/category/:slug',(req,res)=>{
    const slug = req.params.slug.toLowerCase();

    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        // res.json(category);
        Blog.find({ categories: category })
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .select('_id title slug excerpt categories postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({ category: category, blogs: data });
            });
    });
});

router.delete('/api/category/:slug',middlewareObj.requireSignin,middlewareObj.adminMiddleware,(req,res)=>{
    const slug = req.params.slug.toLowerCase();

    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Category deleted successfully'
        });
    });
});

module.exports=router;