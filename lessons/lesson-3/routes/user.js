var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var flash = require('connect-flash');


router.post('/signup',
    passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        successRedirect: '/user/signin',
        session: false,
        failureFlash: true
    }));


router.get('/signup', function (req, res, next ) {

    var signup_flash_error_messages = req.flash('signup_flash_error');

    res.render('user/signup',{
        signup_flash_error:signup_flash_error_messages,
        hasErrors: signup_flash_error_messages.length > 0});
});

router.post('/signin',
    passport.authenticate('local.signin',{
        failureRedirect:'/user/signin',
        successRedirect:'/user/profile',
        failureFlash: true
    }));

router.get('/signin', function (req, res, next ) {
    var signin_flash_error_messages = req.flash('signin_flash_error');
    var signin_flash_success_message = req.flash('signup_flash_success');
    res.render('user/signin',{
        signin_flash_error:signin_flash_error_messages,
        hasErrors: signin_flash_error_messages.length > 0,
        isSuccess: signin_flash_success_message.length > 0,
        signup_flash_success: signin_flash_success_message});
});

router.get('/profile', isLoggedIn ,function(req,res,next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn ,function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/' , function(req, res, next){
    next();
});


module.exports = router;


function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}