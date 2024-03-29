const express  = require("express")
const router  = express.Router();

const {signup, login, getUserDetails, editPassword} = require("../controllers/authContollers")

router.route("/users/signup").post(signup)
router.route("/users/login").post(login)
router.route("/users/:id").get(getUserDetails)
router.route("/users").put(editPassword)

module.exports = router