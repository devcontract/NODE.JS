var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/shema');
var crypto = require('crypto');
var flash = require('connect-flash');


/* GET home page. */
router.get('/', function(req, res) {

  res.render('index' );
});

router.get('/index2', function(req, res) {

    res.render('index2' );
});

router.post('/index2', function (req, res, next) {

// create a new user
    var newUser = User({
        email : req.body.email ,
        salt : 19,
        password : req.body.password,
        firstname :req.body.firstname ,
        lastname :req.body.lastname
    });

// save the user
    newUser.save(function(err) {
        if (err) {
 //console.log(err);


            req.flash('error', err);
           // return console.log(err);

        //  var errorString = Buffer.from(err).toString();
         //   errorString.replace('ValidationError: ','');
          //  console.log(errorString);

return res.render('index2', {error: req.flash('error')});
            }

        console.log('User created!');

        req.flash('success','User Created');

        req.flash('success');
        res.render('index2');
    });
   // res.render('index', {error:req.flash('error')});

});

module.exports = router;
