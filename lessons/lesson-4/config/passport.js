var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var mailer = require('../misc/mailer');

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


  /*  req.checkBody('email','email error')
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
        .escape();*/

var errors  = req.validationErrors();
if (errors){
    var messages = [];
    errors.forEach((error) =>{
        messages.push(error.msg);
    });

    return done(null, false, req.flash('signup_flash_error', messages));
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
            newUser.email = email;
            newUser.salt = Math.round((Date.now() * Math.random())) + '';
            newUser.password = newUser.encryptPassword(password,newUser.salt);
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.save(function (err, result) {
                if(err){
                    return done(err, false);
                }

                var html = '<body style="background-color:orange"><div style="width: 50%; margin: 0 auto;background-color:orange;margin-top:15%"><hr> ' +
                    '<p style="text-align: center"> <div style="text-align: center; font-size: 18px ; padding: 5px; margin: 0 0 0 0; width: auto; height: auto; border-radius:3px;">Please verify your email to signin </div> </p>' +
                    '<p style="text-align:center;"> <a href="'+ process.env.SERVERPATH +' '+ newUser.secretToken +'" style="text-decoration:none;color: whitesmoke;font-size: 18px ; padding: 5px; margin: 10% 0 10% 0; width: auto; height: auto;background-color:dodgerblue;border-radius:3px;">Verify Email</a><hr> ' +
                    '</body>';

                // send email
                mailer.sendEmail( 'noreply@gmail.com', newUser.email , 'Activate Your Account!', html);


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

