const {
    validationResult
} = require("express-validator")

const users = [{
        username: "ever",
        password: "12356",
        city: "Paris"
    },
    {
        username: "ever456",
        password: "456899",
        city: "Los Angeles"
    },
]

const listUsers = (req, res) => {
    const usersList = users.map(user => user.username)
    res.json(usersList)
}

const showUser = (req, res) => {
    const user = users.find(user => user.username === req.params.username)
    res.json(user)
}

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
    console.log("signupUser req.body", req.body)
    users.push(req.body)
    res.send("User saved !")
}

module.exports = {
    getSignupPage,
    signUpUser,
    listUsers,
    showUser
}