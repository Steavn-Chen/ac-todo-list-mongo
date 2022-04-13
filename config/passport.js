const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user.js')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User
      .findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: '這個 Email 還未被註冊 !' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Email 或 Password 錯誤.' })
            }
            return done(null, user)
          })
          .catch((err) => done(err, false))
      })
      .catch((err) => done(err, false))
  }
  ))
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['displayName', 'email']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        return User.findOne({ email })
          .then((user) => {
            if (user) {
              return done(null, user)
            }
            const randomPassword = Math.random().toString(36).slice(-8)
            return bcrypt
              .genSalt(10)
              .then((salt) => bcrypt.hash(randomPassword, salt))
              .then((hash) => {
                const newUser = new User({
                  name,
                  email,
                  password: hash
                })
                newUser
                  .save()
                  .then((user) => done(null, user))
                  .catch((err) => done(err, false))
              })
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}