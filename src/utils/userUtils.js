const bcrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.encryprtPassword = async (user) => {
    user.password = await bcrpt.hash(user.password, 10)
    return user;
}

exports.comparePassword = async (user, enteredPassword) => {
    return await bcrpt.compare(user.password, enteredPassword)
}

exports.generateToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user
    })

}