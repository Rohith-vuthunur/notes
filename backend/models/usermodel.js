const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        unique  : true,
        required : true
    },
    age : {
        type : Number,

    },
})
const User= mongoose.model('User',userschema)
module.exports = User