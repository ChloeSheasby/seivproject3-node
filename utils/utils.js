const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Advisor = require("../models/advisor.model.js");
const Student = require("../models/student.model.js");
const Session = require("../models/session.model.js");

authenticate = (req, res, next) => {
  let authHeader = req.get("authorization")
  if(authHeader != null) {
      if(authHeader.startsWith("Bearer")) {
          let token = authHeader.slice(7)
          jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "Unauthorized!"
              });
            }
            req.userId = decoded.id;
            next();
          });
        }
  }
  else {
    return res.status(403).send({
        message: "No token provided!"
      });
  }
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin role!"
      });
      return;
    });
  });
};

isAny = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles === "student" || roles === "advisor" || roles === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require any role!"
      });
    });
  });
};

isAdminOrAdvisor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles === "advisor" || roles === "admin") {
            next();
            return;
        }
      }

      res.status(403).send({
        message: "Require Advisor or Admin role!"
      });
    });
  });
};

const auth = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAny: isAny,
  isAdminOrAdvisor: isAdminOrAdvisor
};
module.exports = auth