var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   firstname: {
       type: String,
       required: 'Username Is Required',
   },
    lastname: {
        type: String,
        required: 'last name  Is Required',
    },

});

let User = mongoose.model('User', userSchema);

module.exports = User;