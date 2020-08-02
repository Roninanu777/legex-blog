 
const express = require('express'),
     router = express.Router(),
     slugify = require('slugify'),
     Tag=require('../models/tag'),
     Blog=require('../models/blogSchema'),
     errorHandler=require('../helper/dbErrorHandler'),
    middlewareObj = require('../middleware'),
     { runValidation } = require('../validators'),
     { tagCreateValidator } = require('../validators/tag');

// only difference is methods not name 'get' | 'post' | 'delete'
router.post('/api/tag', tagCreateValidator, runValidation, middlewareObj.requireSignin, middlewareObj.adminMiddleware,(req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new Tag({ name, slug });

    tag.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
});
router.get('/api/tags', (req, res) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
});
router.get('/api/tag/:slug', (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOne({ slug }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'Tag not found'
            });
        }
        // res.json(tag);
        Blog.find({ tags: tag })
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
                res.json({ tag: tag, blogs: data });
            });
    });
});
router.delete('/api/tag/:slug', middlewareObj.requireSignin, middlewareObj.adminMiddleware, (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Tag deleted successfully'
        });
    });
});


module.exports = router;