var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
   username: {
       type : String,
       required: [true, 'enter USer name'],

   },
    password: {
       type : String,
        required: [true, 'enter password']
    }
});

var UserData = mongoose.model('UserData', userDataSchema);


router.get('/get-data', function (req, res , next) {
    UserData.find()
        .then(function (doc) {
            res.render('index', {title: doc});
        });
});

router.post('/update', function (req, res , next) {
var record = new UserData({
    username : req.body.username,
    password : req.body.password

});
    record.save(function (err, record) {
    if (err){
        res.locals.title = '';
        res.locals.message = true;
        res.locals.dberror = err.message;

        res.render('index');

        /* res.send(err.message);*/

    }else {
        console.log('Hers should be a username  '+record.username);

        res.render('index', { title: 'user created' });
    }
})
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.title = 'Expressss';
    res.locals.message = true;
    res.locals.dberror = '';
  res.render('index');
});

module.exports = router;
