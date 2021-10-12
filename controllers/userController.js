const {
    validationResult
} = require("express-validator")

const getSignupPage = (req, res) => {
    res.render("signup")
}

const signUpUser = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(500).json({
            errors: errors.array()
        })
        return
    }
    console.log(req.body)
    res.send("ok")
}

module.exports = {
    getSignupPage,
    signUpUser
}