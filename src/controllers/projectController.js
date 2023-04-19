const {
  createProject,
  editProject,
  editProjectStatus,
  removeProject,
  getUserProjects,
} = require("../services/projectService");
const catchAsyncError = require("../middlewares/catchAsyncError");
exports.newProject = catchAsyncError(async (req, res) => {
  let project = await createProject(req.body);
  res.status(201).json({
    success: true,
    project,
  });
});

exports.updateProject = catchAsyncError(async (req, res) => {
  const { projectId, name, description } = req.body;
  let project = await editProject(projectId, name, description);
  res.status(200).json({
    success: true,
    project,
  });
});

exports.updateProjectStatus = catchAsyncError(async (req, res) => {
  let { projectId, status } = req.body;
  let project = await editProjectStatus(projectId, status);
  res.status(200).json({
    success: true,
    project,
  });
});

exports.deleteProject = catchAsyncError(async (req, res) => {
  let { projectId } = req.params;
  let result = await removeProject(projectId);
  res.status(200).json({
    success: true,
    result,
  });
});
exports.findUserProjects = catchAsyncError(async (req, res) => {
  let { userId } = req.params;
  let projects = await getUserProjects(userId);
  res.status(200).json({
    success: true,
    projects,
  });
});
