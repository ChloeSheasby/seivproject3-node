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
          });
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
    let role = findRoleByToken(req);
    console.log(role);
    if(role === 'admin') {
        next();
        return;
    }
    res.status(403).send({
        message: "Require Admin role!"
    });
    return;
};

isAdminOrAdvisor = (req, res, next) => {
    let role = findRoleByToken(req);
    console.log(role);
    if(role === 'admin' || role === 'advisor') {
        next();
        return;
    }
    res.status(403).send({
        message: "Require admin or advisor role!"
    });
    return;
  };

isAny = (req, res, next) => {
    let role = findRoleByToken(req);
    console.log(role);
    if(role === 'admin' || role === 'advisor' || role === 'student') {
        next();
        return;
    }
    res.status(403).send({
        message: "Require any role!"
    });
    return;
};

findRoleByToken = (req, res) => {
    var role = null
    let authHeader = req.get("authorization")
    if(authHeader != null) {
        if(authHeader.startsWith("Bearer")) {
            let token = authHeader.slice(7)
            Session.findByToken(token, async (err, data) => {
                if (err) {
                    return res.status(401).send({
                      message: "Unauthorized!"
                    });
                }
                if (data != null) {
                    let user = data
                    if (user.advisorID !== null) {
                        Advisor.findById(user.advisorID, (err, data) => {
                            if (err) {
                                if (err.kind === "not_found") {
                                    res.status(404).send({
                                        message: `Not found Advisor with ID.`
                                    });
                                } 
                                else {
                                      res.status(500).send({
                                        message: "Error retrieving Advisor with ID"
                                    });
                                }
                            }
                            else {
                                if (data != null) {
                                    role = data.role
                                }
                            }
                        })
                    }
                    else if (user.studentID !== null) {
                        Student.findById(user.studentID, (err, data) => {
                            if (err) {
                                if (err.kind === "not_found") {
                                    res.status(404).send({
                                        message: `Not found Student with ID.`
                                    });
                                } 
                                else {
                                      res.status(500).send({
                                        message: "Error retrieving Student with ID"
                                    });
                                }
                            }
                            else {
                                if (data != null) {
                                    role = data.role
                                }
                            }
                        })
                    }
                    else {
                        return res.status(401).send({
                            message: "Bad data error -- data = " + data
                          });
                    }
                }
            }).then(result => {
                console.log(result)
            })
        }
        else {
            return res.status(403).send({
                message: "No token provided!"
          });
        }
    }
}

setUpdBy = (req, res) => {
    let id = null
    let authHeader = req.get("authorization")
    if(authHeader != null) {
        if(authHeader.startsWith("Bearer")) {
            let token = authHeader.slice(7)
            Session.findByToken(token, (err, data) => {
                if (err) {
                    return res.status(401).send({
                      message: "Unauthorized!"
                    });
                }
                if (data != null) {
                    if (data.advisorID !== null) {
                        id = 'A' + data.advisorID
                        return id
                    }
                    else if (data.studentID !== null) {
                        id = 'S' + data.studentID
                        return id
                    }
                    else {
                        return res.status(401).send({
                            message: "Bad data error -- data = " + data
                          });
                    }
                }
            })
        }
        else {
            return res.status(403).send({
                message: "No token provided!"
          });
        }
    }
}

const auth = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAny: isAny,
  isAdminOrAdvisor: isAdminOrAdvisor,
  findRoleByToken: findRoleByToken,
  setUpdBy: setUpdBy
};
module.exports = auth