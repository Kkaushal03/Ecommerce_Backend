/**
 * create a middleware and check if the request body is proper 
 * and correct
 */
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config= require("../configs/auth.config")
const verifySignUpBody= async(req,res,next)=>{
    try{
        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed! Name was not provided in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed! email was not provided in request body"
            })
        }


        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed! userId was not provided in request body"
            })
        }

        //check if the same user with the registered
        
        const user = await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message: "Failed! user with same userId is already present"
            })
        }
        next()
    }catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message:"Error while validating the request body"
        })

    }
}

const verifySignInBody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed! userId was not provided in request body"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message: "Password was not provided in request body"
        })
    }
    next()

}
const verifyToken =async(req,res,next)=>{
    //check if the token is present in the header
    const token = req.header('x-access-token')
   if(!token){
    return res.status(403).send({
        message:"No token found and you are unauthorized"
    })
   }
    //if it is the valid token
    jwt.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized !"
            })
        }
        const user = await user_model.findOne({userId: decoded.id})
    if(!user){
        return res.status(401).send({
                message: "Unauthorized ! this user for this token dosen't exist"
    })
    }
    //set the user info in the req body
    req.user = user
    next()
    
})
 //then move to the next step

}
const isAdmin=(req,res,next)=>{
    const user = req.user
    if(user && user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message: "Only ADMIN user are allowed to access this endpoint"
        })
    }
}
const validateProductData = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: "Failed! Product name and description are required."
        });
    }
    next(); 
};

module.exports ={
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    validateProductData: validateProductData
}