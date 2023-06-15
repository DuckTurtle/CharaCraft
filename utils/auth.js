const withAuth = (req, res, next) => {
    // cheks if user is logged in if not makes them.
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
