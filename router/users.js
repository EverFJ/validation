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
    expressValidator.body("password").custom(value => {
        const schema = new passwordValidator();
        schema
            .is().min(8)
        // .is().not().oneOf(username)
    }),

    userController.signUpUser)

module.exports = router;