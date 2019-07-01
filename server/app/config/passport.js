// import external libraries
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var bcrypt = require('bcrypt')


// import internal libraries
var db = require('./database')
var AppVars = require('../config/vars')

/* 
  setup passport local strategy to authenticate users based on their name and password
*/

// LocalStrategy for users 
passport.use('users', new LocalStrategy({
        usernameField: 'username', passwordField: 'password'
    }, async function(username, password, done) {
      
          let query = 'select * from users where username = ?'
          let [ rows ] = await db.query(query, [ username ])
          
          if( rows && rows[0] ){
              let match = await bcrypt.compare(password, rows[0]['passcode'])

              if( match ) {
                let { password, ...uzer } = rows[0]
                return done(null, uzer)
              }
          }
          return done(false)

      }
    )
)



// set jwt options
var jwt_opts = {}
jwt_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwt_opts.secretOrKey = AppVars.jwt.secret

// handle jwt authentication for users 
passport.use('users-jwt', new JwtStrategy(jwt_opts, async function(jwt_payload, done) {
  
        let { id, timestamp } = jwt_payload.data 

        // if this timestamp is older than 60 minutes, reject it
        if( (Date.now() - timestamp) > 3600000 ) { 
          return done(false)
        }

        let query = 'select * from users where id = ?'
        let [ rows ] = await db.query(query, [ id ])

        if( rows && rows[0] ) {
          let { password, ...uzer } = rows[0]
          return done(null, uzer)
        }
        return done(false)
        
    }
));



