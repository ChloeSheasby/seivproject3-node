const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const sql = require('../models/db.js');

const util = require('util');
//const mysql = require('mysql');
function makeDb() {
    //   const connection = mysql.createConnection(config);
    const connection = sql;
    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
    };
}

authenticate = (req, res, next) => {
    let authHeader = req.get('authorization');
    if (authHeader != null) {
        if (authHeader.startsWith('Bearer')) {
            let token = authHeader.slice(7);
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorized!',
                    });
                }
            });
            next();
        }
    } else {
        return res.status(403).send({
            message: 'No token provided!',
        });
    }
};

isAdmin = (req, res, next) => {
    let role = null;
    findRoleByToken(req, res).then(result => {
        role = result
        console.log("in isAdmin and role = " + role)
        if (role === 'admin') {
            next();
            return;
        }
        res.status(403).send({
            message: 'Require Admin role!',
        });
        return;
    })
};

isAdminOrAdvisor = (req, res, next) => {
    let role = null;
    findRoleByToken(req, res).then(result => {
        role = result
        console.log("in isAdminOrAdvisor and role = " + role)
        if (role === 'admin' || role === 'advisor') {
            next();
            return;
        }
        res.status(403).send({
            message: 'Require admin or advisor role!',
        });
        return;
    })
};

isAny = (req, res, next) => {
    let role = null;
    findRoleByToken(req, res).then(result => {
        role = result
        console.log("in isAny and role = " + role)
        if (role === 'admin' || role === 'advisor' || role === 'student') {
            next();
            return;
        }
        res.status(403).send({
            message: 'Require any role!',
        });
        return;
    })
};

async function findRoleByToken(req, res) {
    const db = makeDb();
    let id = null;
    let authHeader = req.get('authorization');
    if (authHeader != null) {
        if (authHeader.startsWith('Bearer')) {
            let token = authHeader.slice(7);
            try {
                const sessionrow = await db.query(
                    `SELECT * FROM sessions WHERE token = '${token}'`,
                );
                console.log(sessionrow[0].advisorID)
                if (sessionrow[0].advisorID != null) {
                    id = 'A' + sessionrow[0].advisorID
                    const advisorrow = await db.query(
                        `SELECT * FROM advisors WHERE advisorID = ${sessionrow[0].advisorID}`,
                    );
                    return advisorrow[0].role;
                } else {
                    id = 'S' + sessionrow[0].studentID
                    const studentrow = await db.query(
                        `SELECT * FROM students WHERE studentID = ${sessionrow[0].studentID}`,
                    );
                    return "student";
                }
            } catch (err) {
                return res.status(401).send({
                    message: 'Unauthorized!',
                });
            }
        } else {
            return res.status(403).send({
                message: 'No token provided!',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No authorization header provided!',
        });
    }
}

async function setUpdBy (req, res) {
    const db = makeDb();
    let authHeader = req.get('authorization');
    if (authHeader != null) {
        if (authHeader.startsWith('Bearer')) {
            let token = authHeader.slice(7);
            try {
                const sessionrow = await db.query(
                    `SELECT * FROM sessions WHERE token = '${token}'`,
                );
                console.log(sessionrow[0].advisorID)
                if (sessionrow[0].advisorID != null) {
                    return 'A' + sessionrow[0].advisorID
                } else {
                    return 'S' + sessionrow[0].studentID
                }
            } catch (err) {
                return res.status(401).send({
                    message: 'Bad data error',
                });
            }
        } else {
            return res.status(403).send({
                message: 'No token provided!',
            });
        }
    }
};

const auth = {
    authenticate: authenticate,
    isAdmin: isAdmin,
    isAny: isAny,
    isAdminOrAdvisor: isAdminOrAdvisor,
    findRoleByToken: findRoleByToken,
    setUpdBy: setUpdBy,
};
module.exports = auth;
