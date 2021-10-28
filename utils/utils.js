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
          });
          //if(token)
          next();
        }
  }
  else {
    return res.status(403).send({
        message: "No token provided!"
      });
  }
};

isAdmin = (req, res, next) => {
    Advisor.findByID(req.advisorID).then(user => {
        if (user.role === "admin") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin role!"
        });
        return;
    });
};

isAdminOrAdvisor = (req, res, next) => {
    Advisor.findByID(req.advisorID).then(user => {
        if (user.role === "admin" || user.role === "advisor") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin or Advisor role!"
        });
        return;
    });
  };

isAny = (req, res, next) => {
    Session.findByToken(req.token).then(user => {

    })
    Advisor.findByID(req.userId).then(user => {
        if (user.role === "admin" || user.role === "advisor") {
            next();
            return;
        }
        else {
            Student.findByID(req.userId).then(user => {
                if (user.role === "admin" || user.role === "advisor") {
                    next();
                    return;
                }
                
                res.status(403).send({
                    message: "Require any role!"
                });
                return;
            })
        }
    });
};

const auth = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAny: isAny,
  isAdminOrAdvisor: isAdminOrAdvisor
};
module.exports = auth