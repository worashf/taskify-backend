const express = require("express");
const {
  newProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
  findUserProjects,
} = require("../controllers/projectController");
const router = express.Router();

router
  .route("/users/:userId/projects")
  .post(newProject)
  .put(updateProject)
  .delete(deleteProject)
  .get(findUserProjects);
router.route("/users/:userId/projects/status").put(updateProjectStatus);

module.exports = router;
