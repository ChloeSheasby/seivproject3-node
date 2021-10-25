const Advisor = require("../models/advisor.model.js");
const Student = require("../models/student.model.js");
const Session = require("../models/session.model.js");
var jwt = require('jsonwebtoken');

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
    await Advisor.findByEmail({
        where : {email:email}
    })
    .then(data => {
        if (data != null) {
            let advisor = data.dataValues;
            token = jwt.sign({ id:advisor.email }, authconfig.secret, {expiresIn: 86400});
            user.email = advisor.email;
            user.advisorID = advisor.advisorID;
            user.studentID = null;
            user.userID = advisor.advisorID;
            user.fName = advisor.fName;
            user.roles = advisor.roles;
            foundUser = true;
        }
    })
    .catch( {

    })

    await Student.findByEmail({
        where : {email:email}
    })
    .then(data => {
        if (data != null) {
            let student = data.dataValues;
            token = jwt.sign({ id:student.email }, authconfig.secret, {expiresIn: 86400});
            user.email = student.email;
            user.advisorID = null;
            user.studentID = student.studentID;
            user.userID = student.studentID;
            user.fName = student.fName;
            user.roles = "student";
            foundUser = true;
        }
    })
    .catch( {

    })

    let findExpirationDate = new Date() + 1;
    const session = {
        token : token,
        email : user.email,
        advisorID : user.advisorID,
        studentID : user.studentID,
        userID : user.userID,
        expirationDate : findExpirationDate
    }

    const userInfo = {
        token : token,
        email : user.email,
        roles : user.roles,
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
};

exports.logout = async (req, res) => {
    // invalidate session -- delete token out of session table
    return;
};