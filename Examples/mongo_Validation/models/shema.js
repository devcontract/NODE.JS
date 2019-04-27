// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'is not valid email'],
        lowercase: true,
        match: [/[a-z].+@.+\..+/]

    },
    salt : {
        type: Number,
        max: 202,
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

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(error);
    }
});

// Compile model from schema
var User = mongoose.model('User', userSchema );

module.exports = User;