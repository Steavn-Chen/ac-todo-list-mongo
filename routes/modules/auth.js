const express = require('express')
const passport = require('passport')
const router = express.Router()

// router.get('/facebook',
//   passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }))
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email' ] }))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router