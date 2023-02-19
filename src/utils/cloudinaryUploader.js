const cloudinary = require("cloudinary")
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.uploadFile = catchAsyncError(async(file)=>{
    return await cloudinary.v2.uploader.upload(file)
})