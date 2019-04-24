var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/shema');
var crypto = require('crypto');
var flash = require('connect-flash');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { error: 'HERE GOES DB ERROR MESSAGE' });
});

router.post('/', function (req, res, next) {



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

        return console.log(err);
        };

        console.log('User created!');
    });

 res.redirect('/', req.flash('error'));
});

module.exports = router;
