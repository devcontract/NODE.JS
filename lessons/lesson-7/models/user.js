var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


require('dotenv');

mongoose.set('useCreateIndex', true);

var userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'not a valid email'],
        lowercase: true,
        match: [/[a-z].+@.+\..+/]    // only email@company.domain validator

    },
    salt : {
       type : String,
        required: true,
    },
    password : {
        type: String,
        required: [true, 'not a valid password']

    },
    firstname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v);    // no digits in name validator
            },
            message: props => `${props.value} not a valid firstname`
        },
        required:  [true, 'not a valid first name']

    },
    lastname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v); // no digits in last name validator
            },
            message: props => `${props.value} not a valid last name`
        },
        required:  [true, 'not a valid last name'],

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