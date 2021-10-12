const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const userController = require("../controllers/userController")



router.get("/", userController.listUsers)
router.get("/username/:username", userController.showUser)
router.get("/signup", userController.getSignupPage)
router.post("/signup",
    expressValidator.body("username").custom(value => {
        const schema = new passwordValidator();
        schema.is().min(4)
        return schema.validate(value)
    }),
    expressValidator.body("password").custom(value => {
        const schema = new passwordValidator();
        schema.is().min(8)
        return schema.validate(value)
    }),
    userController.signUpUser)

module.exports = router;