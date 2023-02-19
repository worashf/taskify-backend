const catchAsyncError = require("../middlewares/catchAsyncError")
const { createUser, login, getUserProfile, changePassword } = require("../services/authServices")
const ErrorHandler = require("../utils/errorHandler")
const { generateToken } = require("../utils/userUtils")

// Register user => /api/v1/users/signup
exports.signup = catchAsyncError(async (req, res, next) => {
   const { firstName, lastName, email, password, avatar } = req.body
   const user = await createUser(firstName, lastName, email, password, avatar)
   if (!user) {
      return next(new ErrorHandler("User not created", 400))
   }
   generateToken(user, 200, res)

})
// Login => /api/v1/users/login
exports.login = catchAsyncError(async (req, res, next) => {
   const { email, password } = req.body
   const isUser = await login(email, password)
   if (!isUser) {
      return next(new ErrorHandler("Invalid  email or password", 400))
   }
   generateToken(user, 200, res)
})

//  Get your informations => /api/v1/users/me

exports.getUserDetails = catchAsyncError(async (req, res) => {
   const user = await getUserProfile(req.user.id)
   res.status(200).json({
      succuss: true,
      user
   })
})

// Change user password  => /api/v1/password/change
exports.editPassword =  catchAsyncError(async(req, res, next)=>{
   const {oldPassword, newPassword}  = req.body
   const isUpdated  =  await  changePassword(req.user.id, oldPassword, newPassword)
   if(!isUpdated){
      return  next(new ErrorHandler("Something is wrong", 400))
   }
   res.status(200).json({
      succuss: true,
      message:  "Updated"
   })
})