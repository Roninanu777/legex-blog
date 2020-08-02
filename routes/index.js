const express=require("express"),
    router=express.Router(),
	user=require("../models/userSchema"),
	{ runValidation } = require('../validators'),
    {userSignupValidator,userSigninValidator,forgotPasswordValidator,resetPasswordValidator}= require('../validators/auth'),
    shortId = require('shortid'),    
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    _=require('lodash'),
    sgMail=require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// blog front page

router.get("/",function(req,res){
	res.send("hello");
})


//auth routes


router.post("/api/pre-register",userSignupValidator,runValidation,(req, res) => {
    const { name, email, password } = req.body;
    user.findOne({ email: email.toLowerCase() }, (err, User) => {
        if (User) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
            <p>Please use the following link to activate your legex blog acccount: </p>
            <p>${process.env.CLIENT_URL}/auth/authenticateEmail/activate/${token}</p>
        `
        };

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
            });
        });
    });
});

router.post("/api/register", (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
            }
            console.log(decoded);
            const { name, email, password } = jwt.decode(token);

            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;

            const User = new user({ name, email, password, profile, username });
            User.save((err, User) => {
                if (err) {
                    return res.status(401).json({
                        error: errorHandler(err)
                    });
                }
                return res.json({
                    message: 'Singup success! Please signin'
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        });
    }
})

router.post("/api/login",userSigninValidator,runValidation,function(req,res){
    const { email, password } = req.body;
    // check if user exist
    user.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
})

router.get("/api/logout",function(res,req){
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
})
    
router.put('/api/forgotPassword',forgotPasswordValidator,runValidation,(req,res)=>{
    const {email}=req.body;
    user.findOne({email}).exec( (err,User)=>{
        if(err || !User){
            return res.status(401).json({
                error:'User with this email doesnot exist'
            })
        }
        const token=jwt.sign({id:User._id},process.env.JWT_RESET_PASSWORD,{expiresIn:'10m'});
         
        const emailData={
            from:process.env.EMAIL_FROM,
            to:email,
            subject:'Reset Password',
            html:`
                <p> Please use the following link to reset password:</p>
                <p> ${process.env.CLIENT_URL}/auth/password/${token}</p>

            `
        };

        return User.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: errorHandler(err) });
            } else {
                sgMail.send(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email} to reset your password. Link will expire in ten minutes.`
                    });
                }).catch(err => console.log(err));
            }
        });


    });
})

router.put('/api/resetPassword',resetPasswordValidator,runValidation,(req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                });
            }
            user.findOne({ resetPasswordLink }, (err, User) => {
                if (err || !User) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                User = _.extend(User, updatedFields);

                User.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Password updated successfully. Please login! `
                    });
                });
            });
        });
    }
});

module.exports=router;