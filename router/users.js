const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const userController = require("../controllers/userController")

router.get("/signup", userController.getSignupPage)
router.post("/signup",
    expressValidator.body("email").isEmail(),
    expressValidator.body("password").custom(value => {
        const schema = new passwordValidator();
        schema.is().min(10)
            .is().max(100)
            .has().uppercase()
            .has().digits(2)
        return schema.validate(value)
    }),
    userController.signUpUser)

module.exports = router;