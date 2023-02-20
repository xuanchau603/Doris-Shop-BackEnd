const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/gallery");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + uniqueSuffix);
  },
});

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
  upload: multer({ storage: storage }),
};

module.exports = middlewareController;
