const getSignupPage = (req, res) => {
    res.render("signup")
}

const signUpUser = (req, res) => {
    console.log(req.body)
    res.send("ok")
}

module.exports = {
    getSignupPage,
    signUpUser
}