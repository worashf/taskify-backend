 const {saveProject, updateProject,  deleteProject, searchProjects, searchProjectCount} = require("../dao/projectDao")


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