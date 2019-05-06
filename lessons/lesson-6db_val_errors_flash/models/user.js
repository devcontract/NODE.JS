var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


require('dotenv');

mongoose.set('useCreateIndex', true);

var userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'is not valid email'],
        lowercase: true,
        match: [/[a-z].+@.+\..+/]

    },
    salt : {
       type : String,
        required: [true, 'is not valid salt']
    },
    password : {
        type: String,

        required: [true, 'is not valid password']

    },
    firstname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v);
            },
            message: props => `${props.value} is not valid firstname`
        },
        required:  [true, 'is not valid first name']

    },
    lastname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v);
            },
            message: props => `${props.value} is not valid lastname`
        },
        required:  [true, 'is not valid last name'],

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