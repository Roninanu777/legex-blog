const express=require("express"),
    router=express.Router(),
    middlewareObj=require('../middleware/index.js');
    
router.get('/profile',middlewareObj.requireSignin,middlewareObj.authMiddleware,(req,res)=>{
    req.profile.hashed_password=undefined;
    return res.json(req.profile);
})

module.exports=router;