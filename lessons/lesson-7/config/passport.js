var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var mailer = require('../misc/mailer');
var crypto = require('crypto');

// Configure the local strategy for use by Passport.

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
// creating new local strategy for signup

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, function (req, email, password, done) {


    req.checkBody('email','email error')
        .not().isEmpty()
        .isEmail()
        .normalizeEmail();
    req.checkBody('password','password error')
        .notEmpty()
        .isLength({min:8})
        .isLength({max:25});
    req.checkBody('text','input error')
        //.not().isEmpty()
        .trim()
        .escape();

var errors  = req.validationErrors();

if (errors){

    req.app.set('validErrors', errors);

    return done(null, false);
}

        User.findOne({'email': email}, function (err, user) {
            if (err){
                return done(err);
            }
            if (user){
                req.flash('signup_flash_error','Email is in use please try one more time');
                return done(null, false);
            }


            var newUser = new User();
            newUser.email = email.toLowerCase();
            newUser.salt = crypto.randomBytes(128).toString('base64');
            newUser.password = newUser.encryptPassword(password,newUser.salt);
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.save(function (err, result) {
                if(err){
                console.log(err.message);
                    req.flash('signup_flash_error',err.message);
                    return done(null, false);
                }


                // send email
                mailer.sendEmail( process.env.NOREPLYEMAIL, newUser.email , 'Activate Your Account!', mailer.html, function (err) {
                    if(err){
                        return done(err);
                    }
                });

                req.flash('signup_flash_success','Thank you for registration');
                return done(null, newUser );
            });

        });

    }));

// new local strategy for signin

passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passworField: 'password',
    passReqToCallback: true,
   // session: false
},function (req,email, password, done) {
    User.findOne({email:email.toLowerCase()}, function (err, user) {
      if (err){
          console.log(err);
          return done(null, false);
      }
        if(!user){
          req.flash('signin_flash_error','Invalid Username or Password');
          return done(null, false);
        }
        if(!user.validPassword(password)){
            req.flash('signin_flash_error','Invalid Username or Password');
          return done(null, false);
        }
        return done(null, user);
    });

    }));

