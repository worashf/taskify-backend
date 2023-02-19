const catchAsyncError = require("../middlewares/catchAsyncError")
const { dbConnect } = require("../utils/dbConnect")
const { encryprtPassword } = require("../utils/userUtils")

// Insert new user data access method
exports.saveUser = catchAsyncError(async (newUser) => {
    const { client, db } = await dbConnect()
    try {
        const users = db.collection("users")
        const user = await encryprtPassword(newUser)
        const savedUser = await users.insertOne(user)
        return savedUser

    }
    finally {
        await client.close()

    }


})

// 
