const userModel = require('../models/userModel')
const validation = require("../validators/validator");
const subscributionModel = require("../models/subscribtion Model")

//------------------------------------plans--------------------------------------------------//
const  plans = [
   {plan_id:"free",
     validity: "infinity",
   cost:0
},
 {plan_id:"trial",
    validity: 8,
   cost : 0
},
  {
      plan_id:"Lite_1M",
    validity : "30",
    cost : 100,
},
 {plan_id:"Pro_1M",
    validity:"30",
    cost:200
},
{plan_id:"Lite_6M",
    validity:"180",
    cost :500
},
{plan_id:"Pro_6M",
    validity:"180",
    cost:900
}

]


//----------------------------------subscription------------------------------------------//


const subscribePlan = async function(req,res){
try{
      let reqdata = req.body
   if(!validation.isValidRequestBody(reqdata)){
       res.status(400).send({status:false,messege:"please provide data in req body"})
   }
   const {user_name , plan_id} = reqdata
   if(!validation.isValid(user_name)){
       return res.status(400).send({status:false,mesege:"please provide user_name"})
   }
   if(!validation.isValid(plan_id)){
       return res.status(400).send({status:false,messege:"please provide plan_id"})
   }
 let finduser = await userModel.findOne({user_name:user_name})
 if(!finduser){
     return res.status(400).send({status:false,data:"user not found with this name"})
 }
let findplan =plans.find(plans => plans.plan_id=== plan_id) 
if(!findplan){
    return res.status(400).send({status:false,messege:" this plan_id is not avialable"})
}

let cost = findplan.cost

          let start_date = new Date().toISOString().slice(0,10);
          let Data = { user_name,plan_id,cost,start_date}
          let planDetails = await subscributionModel.create(Data)

  return res.status(200).send({status:"sucessful",amount:-cost,})

}
catch(error){
    return res.status(500).send({status:false,messege:error.messege})
             }
}

//-----------------------------------------get All subscription --------------------------------------//

const getsubscriptions =async function(req,res){
try{
    let paramsname = req.params.user_name
    let paramsdate = req.params.date
    
    //Note : if date if given in params--
    
if(paramsdate){
    let findname = await subscributionModel.findOne({user_name:paramsname})
    if(!findname){
        return res.status(400).send({status:false,messege:"no plan is available for this user !"})
    }
    let startdate = findname.start_date
    let planid = findname.plan_id
    let findplan =plans.find(plans => plans.plan_id === planid) 
    let validity = findplan.validity
    var enddate = new Date(startdate).getTime() + 86400000*validity;
    var valid_till = new Date(enddate ).toISOString().slice(0,10);
    var date1 = new Date(valid_till);
    var date2 = new Date(paramsdate);
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

   return res.status(200).send({status:true,plan_Id:planid,days_left:Difference_In_Days})

}


     // Note : if date is not given in params --

    if(!paramsdate){
    let findname = await subscributionModel.find({user_name:paramsname})
    if(!findname){
        return res.status(400).send({status:false,messege:"no plan is available for this user !"})
    }
    var data = [];
    for(let i = 0 ; i < findname.length; i++)
    {
    let planid = findname[i].plan_id
    let startdate = findname[i].start_date
    let findplan =plans.find(plans => plans.plan_id === planid) 
    let validity = findplan.validity
    var endDate = new Date(startdate).getTime() + 86400000*validity;
    var valid_till = new Date(endDate).toISOString().slice(0,10);;
    let alldata = { planid,startdate,valid_till}
     data.push(alldata)
    }
               return res.status(200).send({status:true,Data:data})
}

}
 catch(error){
    return res.status(500).send({status:false,messege:error.messege})
}
}


module.exports.subscribePlan = subscribePlan
module.exports.getsubscriptions = getsubscriptions


