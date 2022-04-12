const express = require('express')
const passport = require('passport')

const router = express.Router()
const User = require('../../models/user.js')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的。'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符 !'})
  }
  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }
  User.findOne({ email })
  .then(user => {
    if (user) {
      // console.log('User already exists.')
      errors.push({ message: '這個 Email 己經被註冊 !' })
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })
        newUser.save()
        // return User.create({
        //   name,
        //   email,
        //   password,
        // })
        .then(() => { 
          req.flash('success_msg', '註冊成功。')
          res.redirect('login')
          })
        .catch((err) => console.log(err))
    }
  })
  .catch(err => console.log(err))
})
router.get('/logout', (req, res) => {
  req.flash('success_msg', '成功登出。')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router