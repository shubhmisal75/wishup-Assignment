const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
First_Name :{
    type:String,
    required:true

},
Last_Name:{
    type:String,
    required:true
},
company_name:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
zip:{
    type:Number,
    required:true
},
email:{
    type:String,
    required:true
},
web:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
}
});

module.exports = mongoose.model('newUser', userSchema)

