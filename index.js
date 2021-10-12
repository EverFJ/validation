const mongoose = require("mongoose")
const http = require("http")
const exphbs = require("express-handlebars")
const express = require("express")
const path = require("path")
const app = express()
const server = http.createServer(app)
const port = 8000
const db = "mongodb://localhost:27017/validation"
const usersRoutes = require("./router/users")

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/layouts")
}))
app.set("view engine", "hbs")
app.set("views", "views")

app.use("/users", usersRoutes)

mongoose.connect(db, () => {
    console.log(`Mongoose connected to ${db}`)
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})