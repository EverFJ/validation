const {
    validationResult
} = require("express-validator")
const User = require("../models/User")
const users = require("../users.json")


const getSignupPage = (req, res) => {
    res.render("signup")
}
const getSigninPage = (req, res) => {
    res.render("signin")
}
const listUsers = (req, res) => {
    User.find()
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
        User.findOne({
                username: req.params.username
            })
            .then(user => {
                console.log(user)
                res.status(200).render("showUser", user)
            })
            .catch(err => res.status(404).json(err))
    }
    if (req.params.id) {
        User.findOne({
                _id: req.params.id
            })
            .then(user => res.status(200).render("showUser", user))
            .catch(err => res.status(404).json(err))
    }
}
const signUpUser = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log("error", errors)
        res.status(500).render("signup", {
            errors: errors.errors
        })
        return
    }
    User.create({
            username: req.body.username,
            password: req.body.password,
            city: req.body.city
        })
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports = {
    getSignupPage,
    getSigninPage,
    signUpUser,
    listUsers,
    showUser
}