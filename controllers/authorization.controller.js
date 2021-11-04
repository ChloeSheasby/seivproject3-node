const Advisor = require("../models/advisor.model.js");
const Student = require("../models/student.model.js");
const Session = require("../models/session.model.js");
var jwt = require('jsonwebtoken');
const authconfig = require("../config/auth.config.js");
const { getID } = require("../utils/utils.js")

exports.login = async (req, res) => {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client('705829709643-vkhieqifai726sk7elkk7ucg8q3a7ebb.apps.googleusercontent.com');
    const ticket = await client.verifyIdToken({
        idToken: req.body.accessToken,
        audience: '705829709643-vkhieqifai726sk7elkk7ucg8q3a7ebb.apps.googleusercontent.com'
    });
    const payload= ticket.getPayload();
    console.log('Google payload is '+JSON.stringify(payload));
    const userid = payload['sub'];
    let email = payload['email'];
    let emailVerified = payload['email_verified'];
    let name = payload["name"];
    let pictureUrl = payload["picture"];

    let user = {};
    let token = null;
    let foundUser = false;
    Advisor.findByEmail(email, (err, data) => {
        if (err) {
            Student.findByEmail(email, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Advisor or Student with email.`
                        });
                    } 
                    else {
                          res.status(500).send({
                            message: "Error retrieving Advisor or Student with email"
                        });
                    }
                }
                else {
                    if (data != null) {
                        let student = data;
                        token = jwt.sign({ id:student.email }, authconfig.secret, {expiresIn: 86400});
                        user.email = student.email;
                        user.advisorID = null;
                        user.studentID = student.studentID;
                        user.userID = student.studentID;
                        user.fName = student.fName;
                        user.role = "student";
                        foundUser = true;
                    }

                    let findExpirationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    findExpirationDate.setDate(findExpirationDate.getDate() + 1);
                    const session = {
                        token : token,
                        email : user.email,
                        advisorID : user.advisorID,
                        studentID : user.studentID,
                        expirationDate : findExpirationDate,
                        lastUpdBy : getID(),
                        lastUpdDate : new Date().toISOString().slice(0, 19).replace('T', ' ')
                    }

                    const userInfo = {
                        token : token,
                        email : user.email,
                        fName : user.fName,
                        role : user.role,
                        userID : user.userID,
                        studentID : user.studentID,
                        advisorID : user.advisorID
                    }
                    // Save Session in the database
                    Session.create(session, (err, data) => {
                        if (err)
                        res.status(500).send({
                            message:
                            err.message || "Some error occurred while creating the Session."
                        });
                        else res.send(userInfo);
                    });
                }
            })
                
        }
        else {
            if (data != null) {
                let advisor = data;
                console.log(advisor.advisorID)
                token = jwt.sign({ id:advisor.email }, authconfig.secret, {expiresIn: 86400});
                user.email = advisor.email;
                user.advisorID = advisor.advisorID;
                user.studentID = null;
                user.userID = advisor.advisorID;
                user.fName = advisor.fName;
                user.role = advisor.role;
                foundUser = true;
            }

            let findExpirationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            findExpirationDate.setDate(findExpirationDate.getDate() + 1);
            const session = {
                token : token,
                email : user.email,
                advisorID : user.advisorID,
                studentID : user.studentID,
                expirationDate : findExpirationDate,
                lastUpdBy : getID(),
                lastUpdDate : new Date().toISOString().slice(0, 19).replace('T', ' ')
            }

            const userInfo = {
                token : token,
                email : user.email,
                fName : user.fName,
                role : user.role,
                userID : user.userID,
                studentID : user.studentID,
                advisorID : user.advisorID
            }
            // Save Session in the database
            Session.create(session, (err, data) => {
                if (err)
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Session."
                });
                else res.send(userInfo);
            });
        }
    })
};

exports.logout = async (req, res) => {
    // invalidate session -- delete token out of session table
    Session.removeByToken(req.params.token, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Session with token "${req.params.token}".`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Session with token " + req.params.token
              });
            }
          } else res.send({ message: `Session was deleted successfully!` });
    })
    return;
};