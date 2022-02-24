const userModel = require('../models/userModel')
const validation = require("../validators/validator");
const ObjectId = require('mongoose').Types.ObjectId;


const createUser = async function (req,res){
    try{
        let reqbody = req.body
        let {First_Name,Last_Name,company_name,city,state,zip,email,web,age} = reqbody
if(!validation.isValidRequestBody(reqbody)){
    return res.status(400).send({status:false,messege:" please provide user Detaills !"})
}
if(!validation.isValid(First_Name)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide first Name !"})
}
if(!validation.isValid(Last_Name)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide Last Name !"})
}
if(!validation.isValid(company_name)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide Company Name !"})
}
if(!validation.isValid(city)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide city !"})
}
if(!validation.isValid(state)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide state !"})
}
if(!validation.isValid(zip)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide zip !"})
}
if(!validation.isValid(email)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide email !"})
}
if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
    return res.status(400).send({ status: false, message: `Email should be a valid email address` });
}

let isEmailAlredyPresentInDB = await userModel.findOne({ email: email })
if (isEmailAlredyPresentInDB) {
    return res.status(400).send({ status: false, message: `Email Already Exist with Other user ` });
}

if(!validation.isValid(web)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide web !"})
}
if(!validation.validateUrl(web)){
    return res.status(400).send({status:false,messege: " please Provide Valid Web url "})
}
let isWebexist = await userModel.findOne({web:web})
if(isWebexist){
    return res.status(400).send({status:false,messege: " this web url is already exist with other user !"})
}

if(!validation.isValid(age)){
    return res.status(400).send({status:false,message:"Invalid request parameter, please provide age !"})
}

let Collectdata = {First_Name,Last_Name,company_name,city,state,zip,email,web,age }

let Data = await userModel.create(Collectdata)
return res.status(200).send({status:true,data:Data})

    }
    catch (error) {
               return res.status(500).send({ status: false, msg: error.message })
            }
}

const getusers = async function (req,res){
    try{
        let myquery =req.query
       
        let { page ,limit,name,age} = myquery
        if(myquery){
let page1 = page >=1 ? page : 1;
let limit1 = limit >=5 ? limit: 5;
console.log(age)
let getuser = await userModel.find({$or:[{"First_Name": name}, {"Last_Name": name}]}).sort({age:age1}).limit(limit1).skip(limit1 * page1)

if(!getuser.length > 0 ){
    return res.status(400).send({status:false,message:"users not found !!"})
}
return res.status(200).send({status:true,data:getuser})
  }
 else{
            let allusers = await userModel.find()
            return res.status(200).send({status:true,messege:"all users", data:allusers})
        }
    }catch(err){
        return res.status(500).send({status:false,messege:err.message})
    }
}

const getuserbyid = async function (req,res){

    try{
        const param = req.params.id
        let checkid = ObjectId.isValid(param);
        if (!checkid) {
            return res.status(400).send({ status: false, message: "Please Provide a valid bookId in path params" });;
        }
        let getuser = await userModel.find({_id:param})
        if(!getuser.length > 0 ){
            return res.status(400).send({status:false,messege:"user not found !"})
        }
        return res.status(200).send({status:true,data:getuser})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const updateuser = async function(req,res){
    try{
        const body = req.body
        const { First_Name,Last_Name,age} = body
        const paramid = req.params.id
        let checkid = ObjectId.isValid(paramid);
        if (!checkid) {
            return res.status(400).send({ status: false, message: "Please Provide a valid bookId in path params" });;
        }
        if(!validation.isValidRequestBody(body)){
            return res.status(400).send({status:false,messege:"please provide user Detaills to update"})
        }if(!validation.isValid(First_Name)){
            return res.status(400).send({status:false,messege:"please provide First_name"})
        }
        if(!validation.isValid(Last_Name)){
            return res.status(400).send({status:false,messege:"please provide last name "})
        }
        if(!validation.isValid(age)){
            return res.status(400).send({status:false,messege:"please provide age "})
        }

        let updatedata = await userModel.findOneAndUpdate({_id:paramid},{First_Name:First_Name,Last_Name:Last_Name,age:age},{new:true})
          if(!updatedata){
              return res.status(400).send({status:false,messege:"user not found "})
          }
         res.status(200).send({status:true,data:updatedata})
    }catch(err){
        return res.status(500).send({status:false,messege:err.message})
    }
}

const deleteuser = async function(req,res){
    try{
        const paramsid = req.params.id
        let checkid = ObjectId.isValid(paramsid);
        if (!checkid) {
            return res.status(400).send({ status: false, message: "Please Provide a valid bookId in path params" });;
        }
        let deleteuser = await userModel.deleteOne({_id:paramsid})
        if(!deleteuser){
            return res.status(400).send({status:false,messege:"user not found"})
        }

        return res.status(200).send({status:true,messege :"user is deleted "})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports.createUser = createUser
module.exports.getusers = getusers
module.exports.getuserbyid =getuserbyid
module.exports.updateuser = updateuser
module.exports.deleteuser =deleteuser
// const createUrl = async function (req, res) {
//     try {


    // const resultsPerPage = 5;
    // let page = req.params.page >= 1 ? req.params.page : 1;
    // const query = req.query.search;

    // page = page - 1

    // Product.find({ name: query })
    //     .select("name")
    //     .sort({ name: "asc" })
    //     .limit(resultsPerPage)
    //     .skip(resultsPerPage * page)













    // ({$or:[{"groupA": data}, {"groupB": data}]}
//         const requestBody = req.body
//         const LongURL = requestBody.longUrl;
//         const baseUrl = 'http://localhost:3000'
// let sortedBooks = bookFound.sort(function (a, b) { return a.title - b.title });
//         if (!validation.isValidRequestBody(requestBody)) {
//             res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide url details' })
//             return
//         }
// .find()
//     .select('name')
//     .limit(perPage)
//     .skip(perPage * page)
//     .sort({
//         name: 'asc'
//     })


// let limit = Math.abs(req.query.limit) || 10; let page = (Math.abs(req.query.page) || 1) - 1; Schema.find().limit(limit).skip(limit * page) 


//         if (!validation.isValid(LongURL)) {

//             res.status(400).send({ status: false, msg: 'longUrl is required' })
//             return
//         }
//         if (typeof (LongURL) != 'string') {
//             return res.status(400).send({ status: false, message: "Numbers are not allowed" })
//         }
//         //if valid then trim it
//         const trimUrl = LongURL.trim()

//         if (validation.validhttpsLower(trimUrl)) {
//             const regex = /^https?:\/\//
//            const  newTrim = trimUrl.replace(regex, "https://")
//         }
//         if (validation.validhttpsUpper(trimUrl)) {
//             const regex = /^HTTPS?:\/\//
//            const newTrim = trimUrl.replace(regex, "https://")
//         }
//         if (!validation.validateUrl(trimUrl)) {
//             return res.status(400).send({ status: false, message: "Please provide valid URL" })
//         }

        
//         const URLCode = shortid.generate()
//         if (validUrl.isUri(trimUrl)) {

//             const urlData = await GET_ASYNC(`${trimUrl}`)

//             if (urlData) {
//                 return res.status(200).send({ status: true, message: `Data for ${trimUrl} from the cache`, data: JSON.parse(urlData) })

//             }
//             else {
//                 const url = await UrlModel.findOne({ longUrl: trimUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
//                 if (url) {
//                     await SET_ASYNC(`${trimUrl}`, JSON.stringify(url))

//                     res.status(200).send({ status: true, msg: "fetch from db", data: url })
//                     return
//                 } else {

//                     const ShortUrl = baseUrl + '/' + URLCode

//                     const urlDetails = { longUrl: trimUrl, shortUrl: ShortUrl, urlCode: URLCode }

//                     const details = await UrlModel.create(urlDetails);

//                     const createdurl = await UrlModel.find(details).select({_id:0,createdAt:0,updatedAt:0,__v:0})
//                     res.status(201).json({ status: true, msg: "New Url create", data: createdurl })
//                     return
//                 }
//             }
//         } else {
//             return res.status(400).send({ status: false, msg: 'Invalid longUrl' })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ status: false, msg: error.message })
//     }
// }


// // -------------------------getAPI : redirect-----------------------------------------------//


// const getUrl = async function (req, res) {
//     try {

//         const URLCode = req.params.urlcode

//         let urlcache = await GET_ASYNC(`${req.params.urlcode}`)
//         if (urlcache) {

//             return res.status(302).redirect(JSON.parse(urlcache))

//         } else {
//             const getUrl = await UrlModel.findOne({ urlCode: URLCode });

//             if (getUrl) {
//                 await SET_ASYNC(`${URLCode}`, JSON.stringify(getUrl.longUrl))

//                 return res.status(302).redirect(getUrl.longUrl);
//             }

//             else {
//                 return res.status(404).send({ status: false, err: 'Invalid urlcode' })
//             }
//         }
//     } catch (err) {

//         res.status(500).send({ status: false, err: err.message })
//     }


// }


// module.exports.createUrl = createUrl;
// module.exports.getUrl = getUrl;