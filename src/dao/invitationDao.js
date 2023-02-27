
const { ObjectId}  = require("mongodb")
const {dbConnect} = require("../utils/dbConnect")
 const catchAsyncError = require("../middlewares/catchAsyncError")

 exports.saveNewInvitation = catchAsyncError(async(message, senderId, inviteeId,invitationStatus, projectId)=>{
    const {client, db} = await dbConnect()
    const invitation = {
        message,
        invitor: new ObjectId(senderId),
        invitee: new ObjectId(inviteeId),
        project: new ObjectId(projectId),
        status : invitationStatus
    }
    try{
      const invitations = db.collection("invitations")
      const result  = await  invitations.insertOne(invitation)
      return result

    }
    finally{
        await  client.close()
    }
 })

 exports.cancelInvitation = catchAsyncError(async(invitationId)=>{
    const{client, db}= await dbConnect()
    try{
        const invitations = db.collection("invitations")
        const result  = await invitations.deleteOne({_id: new ObjectId(invitationId)})

        return result

    }
    finally{
        await client.close()
    }
 })
 exports.updateInvitationStatus = catchAsyncError(async(invitationId, invitationStatus)=>{
    const {client, db} = await dbConnect()
    try{
   const invitations = db.collection("invitations")
   const result  = await invitations.findOne({_id: new ObjectId(invitationId)},{$set:{status: invitationStatus}})
    }
    finally{
        await client.close()
    }
 })
 