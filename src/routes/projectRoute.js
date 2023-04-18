const express  = require("express")
const {newProject} = require("../controllers/projectController")
const router = express.Router()


router.route("/projects").post(newProject)

module.exports  = router