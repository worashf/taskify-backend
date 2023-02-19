const { saveUser, findUserByEmail, findUserById, deleteUserByEmail, updatePassword } = require("../dao/userDao")
const catchAsyncError = require("../middlewares/catchAsyncError")
const cloudinaryUpload = require("../utils/cloudinaryUploader")
const { comparePassword } = require("../utils/userUtils")
const ErrorHandler = require("../utils/errorHandler")

// create new user service

exports.createUser = catchAsyncError(async (firstName, lastName, email, password, avatar) => {
    const result = await cloudinaryUpload(avatar)
    if (!result) {
        console.info("Something is wrong, Avatar image is not upload ")
        return next(new ErrorHandler("File not uploaded correctly, something is wrong", 401))
    }
    const newUser = {
        firstName,
        lastName,
        email,
        password,
    }
    newUser.avatar = {
        public_id: result.public_id,
        url: result.url
    }
    const user = await saveUser(newUser)
    return user
})

exports.login = catchAsyncError(async (email, password) => {
    // find user  by email
    const user = await findUserByEmail(email);
    if (!user) {
        console.info(`Invalid  email, try with corect email`)
        return next(new ErrorHandler(`No user found with email: ${email}`, 401))
    }
    // check if the password provided with the  user password
    const isPasswordMatch = comparePassword(user, password);
    if (!isPasswordMatch) {
        console.info(`Password you entered  ${password} not correct, Enter again`)
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    return isPasswordMatch
})

exports.getUserProfile = catchAsyncError(async (userId) => {
    const user = await findUserById(userId);
    return user
})
exports.changePassword = catchAsyncError(async (userId, oldPassword, newPassword) => {
    const user = await findUserById(userId);

    const isPasswordMatch = comparePassword(user, oldPassword)
    if (isPasswordMatch) {
        const result = await updatePassword(userId, newPassword)
        return result
    }
    return false

})