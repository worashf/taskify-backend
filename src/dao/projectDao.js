
const { ObjectId}  = require("mongodb")
const {dbConnect} = require("../utils/dbConnect")



exports.saveProject =  async(newProject)=>{
  const {client, db}  = await  dbConnect()
    try{
 

      const projects  =  db.collection("projects")
      const result  =  await  projects.insertOne(newProject)
      console.log("Project created");
      return result
    }
 
    finally{

   await client.close()

    }
}


exports.updateProject  =async(projectId, name, description)=>{
  const{client, db}  = await  dbConnect()
  try{

  
      const projects = db.collection("projects")
       const filter  = {_id: new ObjectId(projectId)}
       const updateDoc  = {$set: {name, description}}
       const  result  = await  projects.updateOne(filter, updateDoc)
       return  result

  }

  finally{
   await client.close()
  }
}

exports.deleteProject  = async(projectId) =>{
  const{client, db}  = await  dbConnect()
  try{
  let projects  = db.collection("projects")
  let result  = await  projects.deleteOne({_id: new ObjectId(projectId)})
  return  result

  }
  finally{
    await  client.close()
  }
}

exports.searchProjects = async(userId,  query, page) =>{
  const  {client, db}   = await  dbConnect()
  try {
     let projects = db.collection("projects")
     let result  = await projects.find({ownerId: userId,
      $text: {$search: query}
     }).skip(page > 0 ? (page -1 )* 10 : 0).limit(10)

     return result


  }
 finally {
  await  client.close()
 }
}
exports.searchProjectCount  = async(userId, query) =>{
   let {client,db}  = await  dbConnect()
   try{
     let projects   = db.collection("projects")
     let  result =  await projects.countDocuments({
      ownerId : userId, $text:{$search:  query}
     })
     return result

   }
   finally{
    await client.close()
   }
}


