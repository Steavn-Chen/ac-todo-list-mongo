const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] }))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/github', passport.authenticate('github', {
  scope: ['email', 'profile']
}))

router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router