// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'email required'],
        lowercase: true,
        match: [/[a-z].+@.+\..+/]

    },
    salt : {
        type: Number,
        max: 20,
        required: true
    },
    password : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-jl-z]+$/i.test(v)
            },
            message: props => `${props.value} is not valid password`
        },
        required: true,

    },
    firstname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v);
            },
            message: props => `${props.value} is not valid firstname`
        },
        required: true,

    },
    lastname : {
        type: String,
        validate:{
            validator: function (v) {
                return /^[a-z]+$/i.test(v);
            },
            message: props => `${props.value} is not valid lastname`
        },
        required: true,

    }
});

// Compile model from schema
var User = mongoose.model('User', userSchema );

module.exports = User;