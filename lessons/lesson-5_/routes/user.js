var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
//var flash = require('connect-flash');


router.post('/signup',
    passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        successRedirect: '/user/signin',
        session: false,
        //failureFlash: true
    }));


router.get('/signup', function (req, res, next ) {

   // var signup_errors = req.flash('signup_flash_error');
   var signup_errors = req.app.locals.signup_error;
        res.render('user/signup',{
        signup_error:signup_errors,
        hasErrors: signup_errors !=0 && signup_errors != undefined
        });
        next();
},clearAppLoc);

router.post('/signin',
        passport.authenticate('local.signin',{
        failureRedirect:'/user/signin',
        successRedirect:'/user/profile',
        failureFlash: true
    }));

router.get('/signin' ,function (req, res, next ) {

    var signin_success = req.app.locals.signup_success;
    var signin_errors = req.app.locals.signin_error;

    res.render('user/signin' ,{
        signin_flash_error:signin_errors,
        hasErrors: signin_errors != 0 && signin_errors != undefined,
        isSuccess: signin_success !=0 && signin_success != undefined,
        signup_flash_success: signin_success});
    next();
},clearAppLoc);

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

function clearAppLoc(req, res, next) {
    req.app.locals.signin_error = '';
    req.app.locals.signup_error = '';
    req.app.locals.signup_success = '';
    res.end();
}