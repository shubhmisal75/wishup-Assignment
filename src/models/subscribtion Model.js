const mongoose = require('mongoose')
ObjectId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
user_name :{
    type:String,
  required:true
},
plan_id: {
type:String,
required:true
},
start_date:{
type:String
}

},{timestamps:true});

module.exports = mongoose.model('subscribtions', userSchema)