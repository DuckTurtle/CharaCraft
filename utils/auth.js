const checkAuth = (req, res, next) => {
    // cheks if user is logged in if not makes them.
    if (req.session.logged_in === false) {
    res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = checkAuth;