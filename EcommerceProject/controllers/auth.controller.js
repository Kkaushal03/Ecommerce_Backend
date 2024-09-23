/**
 * I need to write the controller logic to register a user
 */
const bcrypt = require("bcrypt")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")
exports.signup=async(req,res)=>{
    /**
     * logic to create the user //registeration
     */
    //1. read the request body this will in the form javascript object
    const request_body = req.body
    //2. then insert the data in the user collection in Mongodb
    const userObj={
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)

    }
    try{
        const user_created = await user_model.create(userObj)
        //return this user
        const res_obj ={
            name:user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user",err);
      res.status(500).send({
        message: "Some error occurred while registering the user"
      })
    }
    //3. Return the response back to the user
}

exports.signin=async(req,res)=>{

     //1. check if the user id is present in the system
     // otherwise absent
 const user=  await user_model.findOne({userId:req.body.userId})
 if(user==null){
    return res.status(400).send({
        message: "User id passes is not a valid user"
    })
 }
  //  2. if password is correct
  const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
 if(!isPasswordValid){
   return  res.status(401).send({
        message:"Wrong password passed"
    })
 }
  // 3. using jwt token we will create access Token with a given TTL
     // and return
const token = jwt.sign({id: user.userId},secret.secret,{
    expiresIn: 980000
})
res.status(200).send({
    name:user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accessToken: token

})


}