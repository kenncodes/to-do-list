const path = require("path")
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Task = require("./models/Task")

//Load config
dotenv.config({ path: './config/config.env' })
//Passport config
require('./config/passport')(passport)

connectDB()

//BodyParser - format date and json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))


//paspport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

//Logging
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'))
}


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', require("./routes/index"))
app.use('/auth', require('./routes/auth'))
app.use("/task", require('./routes/task'))

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log("running on port" + process.env.PORT)
});