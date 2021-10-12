const {
    validationResult
} = require("express-validator")
const userModel = require("../models/userModel")

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
    // User.find()
    //     .then(data => res.json(data))
    //     .catch(console.error)
}

const showUser = (req, res) => {
    if (req.params.username) {
        const user = users.find(user => user.username === req.params.username)
        res.json(user)
    }
    if (req.params.id) {
        const user = users.find(user => user.id === req.params.id)
        res.json(user)
    }

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
    userModel.create({
            username: req.body.username,
            password: req.body.password,
            city: req.body.city
        })
        .then(console.log)
        .catch(console.error)
    res.send("User saved !")
}

module.exports = {
    getSignupPage,
    signUpUser,
    listUsers,
    showUser
}