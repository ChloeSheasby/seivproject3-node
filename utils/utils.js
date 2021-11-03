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
    let role = findRoleByToken(req);
    console.log(role);
    if (role === 'admin') {
        next();
        return;
    }
    res.status(403).send({
        message: 'Require Admin role!',
    });
    return;
};

isAdminOrAdvisor = (req, res, next) => {
    let role = findRoleByToken(req);
    console.log(role);
    if (role === 'admin' || role === 'advisor') {
        next();
        return;
    }
    res.status(403).send({
        message: 'Require admin or advisor role!',
    });
    return;
};

isAny = (req, res, next) => {
    let role = findRoleByToken(req);
    console.log(role);
    if (role === 'admin' || role === 'advisor' || role === 'student') {
        next();
        return;
    }
    res.status(403).send({
        message: 'Require any role!',
    });
    return;
};

async function findRoleByToken(req, res) {
    const db = makeDb();
    var role = null;
    let authHeader = req.get('authorization');
    if (authHeader != null) {
        if (authHeader.startsWith('Bearer')) {
            let token = authHeader.slice(7);
            try {
                const sessionrow = await db.query(
                    `SELECT * FROM sessions WHERE token = '${token}'`,
                );
                if (sessionrow.advisorID != null) {
                    const advisorrow = await db.query(
                        `SELECT * FROM advisors WHERE advisorID = ${sessionrow.advisorID}`,
                    );
                    return advisorrow.role;
                } else {
                    const studentrow = await db.query(
                        `SELECT * FROM students WHERE studentID = ${sessonrow.studentID}`,
                    );
                    return studentrow.role;
                }
            } catch (err) {
                return res.status(401).send({
                    message: 'Unauthorized!',
                });
            } finally {
                db.close();
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

setUpdBy = (req, res) => {
    let id = null;
    let authHeader = req.get('authorization');
    if (authHeader != null) {
        if (authHeader.startsWith('Bearer')) {
            let token = authHeader.slice(7);
            Session.findByToken(token, (err, data) => {
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorized!',
                    });
                }
                if (data != null) {
                    if (data.advisorID !== null) {
                        id = 'A' + data.advisorID;
                        return id;
                    } else if (data.studentID !== null) {
                        id = 'S' + data.studentID;
                        return id;
                    } else {
                        return res.status(401).send({
                            message: 'Bad data error -- data = ' + data,
                        });
                    }
                }
            });
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
