var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;



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

        User.findOne({'email': email}, function (err, user) {
            if (err){
                return done(err);
            }
            if (user){
                req.flash('signup_flash_error','Email is in use please try one more time');
                return done(null, false);
            }

            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.save(function (err, result) {
                if(err){
                    return done(err, false);
                }
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
    session: false
},function (req,email, password, done) {
    User.findOne({email:email}, function (err, user) {
      if (err){
          return done(err, false);
      }
        if(!user){
          req.flash('signin_flash_error','Invalid Username or Password');
          return done(err, false);
        }
        if(!user.validPassword(password)){
            req.flash('signin_flash_error','Invalid Username or Password');
          return done(null, false);
        }
        return done(null, user);
    });

    }));

