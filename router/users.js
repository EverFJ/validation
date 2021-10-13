const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const {
    check,
    oneOf
} = require("express-validator")
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
    expressValidator.body("city").custom(value => {
        const whitelist = ["paris", "tokyo", "los angeles"];
        if (whitelist.includes(value.toLowerCase())) {
            return Promise.resolve()
        } else return Promise.reject("Invalid city")
    }),

    userController.signUpUser)

module.exports = router;