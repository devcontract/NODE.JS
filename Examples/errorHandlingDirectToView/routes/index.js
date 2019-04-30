var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {

  try {
    console.log('start of try runs');

    oshibka;

    console.log('end of try runns never reahced');

  } catch (err) {



      // console.log('error has accured : ' + err.stack);
  } finally {
      console.log('This is always run');
  }

  console.log('... then the executi continues ');



   res.redirect('/errorPage');

});

module.exports = router;
