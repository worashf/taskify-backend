 const {saveUser, findUserByEmail, findUserById, deleteUserByEmail}  = require("../dao/userDao") 
 const catchAsyncError  = require("../middlewares/catchAsyncError")
 const cloudinaryUpload =  require("../utils/cloudinaryUploader")
 // create new user service

 exports.createUser = catchAsyncError(async(newUser)=>{
     const result  = await  cloudinaryUpload(newUser.avatar)
     if(!result){
        console.info("Something is wrong, Avatar image is not upload ")
        return ;
     }
     newUser.avatar={
        public_id: result.public_id,
        url: result.url
     }
     const user  = await  saveUser(newUser)
     return user
 })


