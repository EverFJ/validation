const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const userController = require("../controllers/userController")

router.get("/", userController.listUsers)
router.get("/username/:username", userController.showUser)
router.get("/:id", userController.showUser)
router.get("/signup", userController.getSignupPage)
router.post("/signup",
    expressValidator.body("username").isLength({
        min: 4
    }),
    expressValidator.body("password").isLength({
        min: 8
    }),
    expressValidator.body("city").isIn(["Paris", "Tokyo", "Los Angeles"]),
    userController.signUpUser)

module.exports = router;