// import external libraries
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

// import internal libraries

// routes


// initializing the application instance
const app = express()

// setup body parser to help access json and other data from clients
// parse application/x-www-form-urlencoded and json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// setup passport authentication
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')


// hook up routes with controllers


// start app on
app.listen(9000, function() {
    console.log('server started at port: 9000')
})