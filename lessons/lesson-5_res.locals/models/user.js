var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Joi = require('joi');

require('dotenv');

mongoose.set('useCreateIndex', true);

var userSchema = new Schema({
    email: {type: String ,match: /\S+@\S+\.\S+/}, // 4. Match validation via regex
    salt: {type: String, required: true},
    password: {type: String, required: true, minlength:128,maxlength:128},
    firstname:{type: String, required: true, minlength:3,  maxlength:22},
    lastname: {type: String, required: true, minlength:3,  maxlength:22},
    created: {
        type: Date,
        default: Date.now
    }
});


//console.log(crypto.getHashes());
//console.log(crypto.getCiphers());




function crypt(password, salt){

    password =  crypto.createHash('sha512')
        .update(salt + password, 'utf-8')
        .digest('hex');
    return password;

}



userSchema.methods.encryptPassword = function(password,salt){
     password = crypt(password, salt);
    return password;
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
} ;


userSchema.methods.validPassword = function(password){


    if (crypt(password, this.salt) === this.password){
        return true;
    } else {
        return false;
    }
    //return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);