const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      jwt.verify(token, "123456", (err, user) => {
        if (err) return res.status(403).json("Token is invalid");
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not have token!");
    }
  },
};

module.exports = middlewareController;
