const { ObjectId } = require("mongodb")
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

//Find user by email
exports.findUserByEmail = catchAsyncError(async (email) => {
    const { db, client } = await dbConnect()
    try {
        const users = db.collection("users")
        const user = await users.findOne({ email })
        if (!user) {
            console.info(`No user found with  email: ${email} `)
            return;
        }
        return user


    }
    finally {
        await client.close()
    }
})

// find user by user id => _id
exports.findUserById = catchAsyncError(async (userId) => {
    const { db, client } = await dbConnect()
    try {
        const users = db.collection("users")
        const user = users.findOne({ _id: new ObjectId(userId) })
        if (!user) {
            console.info(`No user found with id:  ${userId}`)
            return;
        }
        return user

    }
    finally {
        await client.close()
    }
})

// delete user by email =>  email
exports.deleteUserByEmail = catchAsyncError(async (email) => {
    const { db, client } = await dbConnect()
    try {
        const users = db.collection("users")
        const result = users.deleteOne({ email: email })
        if (result.acknowledged === true) {
            console.info(` user with ${email} deleted successfuly`)
            return true
        }
    }
    finally {
        await client.close()
    }
})

