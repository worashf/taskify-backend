const { ObjectId}  = require("mongodb")
const {dbConnect} = require("../utils/dbConnect")
 const catchAsyncError = require("../middlewares/catchAsyncError")


 exports.saveTask = catchAsyncError(async(taskObj, projectId)=>{
    const {client, db}  = await dbConnect()
    try{
      const tasks = db.collection("tasks")
      taskObj.project= new ObjectId(projectId)

      const result = await tasks.insertOne(taskObj)
      return result;
    }
    finally{
        await client.close()
    }
 })
 exports.updateTask = catchAsyncError(async(taskId,title, description)=>{
    const {db, client}  = await dbConnect()
    try{
     const tasks  = db.collection("tasks")
     const result  = tasks.updateOne({_id: new ObjectId(taskId)},{$set:{title, description}})
     return result
    }
    finally{
  await client.close()
    }
 })
 exports.updatePriority = catchAsyncError(async(taskId, priority)=>{
    const {db, client} = await dbConnect()
    try{
        const tasks  = db.collection("tasks")
        const result  = await tasks.updateOne({_id : new ObjectId(taskId)},{$set:{priority}})
        return  result
    }
    finally{
        await client.close()
    }
 })

 exports.updateTaskStatus = catchAsyncError(async(taskId, status)=>{
    const {db, client} = await dbConnect()
    try{
        const tasks  = db.collection("tasks")
        const result  = await tasks.updateOne({_id : new ObjectId(taskId)},{$set:{status}})
        return  result
    }
    finally{
        await client.close()
    }
 })