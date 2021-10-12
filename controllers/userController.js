const {
    validationResult
} = require("express-validator")
const userModel = require("../models/userModel")
const users = require("../users.json")


const getSignupPage = (req, res) => {
    res.render("signup")
}
const listUsers = (req, res) => {
    userModel.find()
        .then(users => {
            const userList = users.map(user => user.username)
            res.render("listUsers", {
                userList: userList
            })
        })
        .catch(err => res.json(err))
}
const showUser = (req, res) => {
    if (req.params.username) {
        userModel.findOne({
                username: req.params.username
            })
            .then(user => {
                console.log(user)
                res.render("showUser", user)
            })
            .catch(err => res.json(err))
    }
    if (req.params.id) {
        userModel.findOne({
                _id: req.params.id
            })
            .then(user => res.render("showUser", user))
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
    // res.send("User saved !")
    userModel.create({
            username: req.body.username,
            password: req.body.password,
            city: req.body.city
        })
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports = {
    getSignupPage,
    signUpUser,
    listUsers,
    showUser
}