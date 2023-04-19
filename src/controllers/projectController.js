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
