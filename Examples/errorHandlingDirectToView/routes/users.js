var express = require('express');
var router = express.Router();
var User = require("../models/schema");


/* GET users listing. */
router.get('/', function(req, res, next) {



  res.render('errorPage',{error: res.locals.err});

});



router.post('/', function(req, res, next) {


let user = new User(req.body);


User.create(user)
    .then(function (dbUser) {
        // If saved successfully, send the the new User document to the client

         res.redirect('/');
    })
    .catch(function (err) {
        // If an error occurs, send the error to the client
        //return res.render('errorPage', {error: err.message});
        res.render('errorPage',{error:err});
      //  res.send('Hello World!');

     });

});


module.exports = router;
