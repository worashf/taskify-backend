 const {saveProject, updateProject,changeProjectStatus, findUserProjects, deleteProject, searchProjects, searchProjectCount} = require("../dao/projectDao")


 exports.createProject = async(newproject) =>{
     try{
       let project = await  saveProject(newproject)
       return  project
     }
     catch(err) {
        console.log(err)
        throw  new Error(err)
     }
 }


exports.editProject = async (projectId, name, description) => {
  try {
    return  await updateProject(projectId, name, description)

  }
  catch (err) {
    throw new Error(err)
  }
}

exports.editProjectStatus = async (projectId, status) => {
  try {
 return  await changeProjectStatus(projectId,status)

  }
  catch (err) {
    throw new Error(err)
  }
}

exports.getUserProjects = async (userId) => {
  try {
   return await findUserProjects(userId)
   
  }
  catch (err) {
    throw new Error(err)
  }
}

exports.removeProject = async (projectId) => {
  try {
   return await deleteProject(projectId)
   
  }
  catch (err) {
    throw new Error(err)
  }
}






