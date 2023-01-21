const  {createProject} = require("../services/projectService")

exports.newProject = async(req, res)=>{
    try{
        let project  = await createProject(req.body)
        res.status(200).json({
            success:true, project
        })
    }
    catch(err){
        throw  new Error(err)
    }
    }
  