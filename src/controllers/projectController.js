const  {createProject,editProject,editProjectStatus, removeProject, getUserProjects} = require("../services/projectService")

exports.newProject = async(req, res)=>{
    try{
        let project  = await createProject(req.body)
        res.status(201).json({
            success:true, project
        })
    }
    catch(err){
        throw  new Error(err)
    }
    }
  
    exports.updateProject = async(req, res)=>{
        try {
            const {projectId, name, description}  = req.body
            let project  = await editProject( projectId, name, description)
            res.status(200).json({
                success: true,
                project
            })
        }
        catch(err){
            throw  new Error(err)
        }
}


exports.updateProjectStatus = async (req, res) => {
    try {
        let {projectId, status}  = req.body
        let project = await editProjectStatus(projectId, status) 
        res.status(200).json({
            success: true,
            project
       })   
    } 
    catch (err) {
        throw new Error(err)
    }
}

exports.deleteProject = async (req,res) => {
    try {
        let { projectId } = req.params
        let result = await removeProject(projectId)
        res.status(200).json({
            success: true,
            result
       })  
    }
    catch (err) {
        throw new Error(err)
    }
}
exports.findUserProjects = async (req, res) => {
    try {
        let { userId }  = req.params
        let projects = await getUserProjects(userId) 
        res.status(200).json({
            success: true,
            projects
       })  
    }
    catch (err) {
         throw new Error(err)
    }
}
        

    