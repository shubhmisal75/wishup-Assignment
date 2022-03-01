const userModel = require('../models/userModel')
const validation = require("../validators/validator");

const user = async function(req,res){

     let user = req.params.user_name
    if(!validation.isValid(user)){
        return res.status(400).send({status:false,messege:"please provide user_name"})
    }
    let find = await userModel.findOne({user_name:user})
    if(find){
        return res.status(400).send({status:false,messege:"user_name is all ready exist  !"})
    }

    let data = { user_name:user }
    let createuser = await userModel.create(data)

    res.status(200).send({status:true,data:createuser})
}
module.exports.user = user