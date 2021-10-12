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

const getSignupPage = (req, res) => {
    res.render("signup")
}
const listUsers = (req, res) => {
    // const usersList = users.map(user => user.username)
    // res.json(usersList)
    userModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
}
const showUser = (req, res) => {
    if (req.params.username) {
        // const user = users.find(user => user.username === req.params.username)
        // res.json(user)
        userModel.findOne({
                username: req.params.username
            })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    }
    if (req.params.id) {
        // const user = users.find(user => user._id === req.params.id)
        // res.json(user)
        userModel.findOne({
                _id: req.params.id
            })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    }
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
    // users.push(req.body)
    userModel.create({
            username: req.body.username,
            password: req.body.password,
            city: req.body.city
        })
        .then(users => res.send("User saved !"))
        .catch(err => res.json(err))
    res.send("User saved !")
}

module.exports = {
    getSignupPage,
    signUpUser,
    listUsers,
    showUser
}