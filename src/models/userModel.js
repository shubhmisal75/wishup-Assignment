const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
user_name :{
    type:String,
    trim:true
}

});

module.exports = mongoose.model('newUser', userSchema)





  