const {
  createProject,
  editProject,
  editProjectStatus,
  removeProject,
  getUserProjects,
} = require("../services/projectService");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler  = require("../utils/errorHandler")
exports.newProject = catchAsyncError(async (req, res) => {
  let project = await createProject(req.body);
  res.status(201).json({
    success: true,
    project,
  });
});

exports.updateProject = catchAsyncError(async (req, res, next) => {
  const { projectId, name, description } = req.body;
    let project = await editProject(projectId, name, description);
    if (!project) {
        return next(new ErrorHandler("Some thing went wrong project is not created.", 400))
    }
  res.status(200).json({
    success: true,
    project,
  });
});

exports.updateProjectStatus = catchAsyncError(async (req, res, next) => {
  let { projectId, status } = req.body;
    let project = await editProjectStatus(projectId, status);
    if (!project) {
        return next(new ErrorHandler("Some thing went wrong project is  notupdated",400))
    }
  res.status(200).json({
    success: true,
    project,
  });
});

exports.deleteProject = catchAsyncError(async (req, res, next) => {
  let { projectId } = req.params;
    let result = await removeProject(projectId);
    if (!result) {
        return next(new ErrorHandler("Some thing went wrong project is  not deleted.", 400))
    }
  res.status(200).json({
    success: true,
    result,
  });
});
exports.findUserProjects = catchAsyncError(async (req, res, next) => {
  let { userId } = req.params;
    let projects = await getUserProjects(userId);
    if (!projects) {
        return next(new ErrorHandler(`Some thing went wrong, could  not found  projectswith user  id:  ${userId}`,400))
    }
  res.status(200).json({
    success: true,
    projects,
  });
});
