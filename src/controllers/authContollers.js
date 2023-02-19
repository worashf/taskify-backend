 const catchAsyncError = require("../middlewares/catchAsyncError")
const {createUser, login, getUserProfile,changePassword}  = require("../services/authServices")
const ErrorHandler  = require("../utils/errorHandler")
const { generateToken } = require("../utils/userUtils")

 // Register user => /api/v1/signup
 exports.signup = catchAsyncError(async(req,res, next)=>{
    const {firstName, lastName, email, password, avatar} = req.body
    const user  = await createUser(firstName, lastName, email, password, avatar)
    if(!user){
      return  next(new ErrorHandler("User not created", 400))
    }
   generateToken(user, 200, res)
    
 })
