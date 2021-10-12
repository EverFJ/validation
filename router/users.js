const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const userController = require("../controllers/userController")

router.get("/", userController.listUsers)
router.get("/username/:username", userController.showUser)
router.get("/signup", userController.getSignupPage)
router.get("/:id", userController.showUser)
router.post("/signup",
    expressValidator.body("username").isLength({
        min: 4
    }),
    expressValidator.body("password").isLength({
        min: 8
    }),
    userController.signUpUser)

module.exports = router;