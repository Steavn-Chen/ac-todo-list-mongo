module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '你還未登入，請先登入才能使用。')
    return res.redirect('/users/login')
  }
}