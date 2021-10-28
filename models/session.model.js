const sql = require("./db.js");

// constructor
const Session = function(session) {
  this.sessionID = session.sessionID,
  this.token = session.token,
  this.email = session.email,
  this.advisorID = session.advisorID,
  this.studentID = session.studentID,
  this.expirationDate = session.expirationDate,
  this.lastUpdDate = session.lastUpdDate;
  this.lastUpdBy = session.lastUpdBy;
};

Session.create = (newSession, result) => {
  sql.query("INSERT INTO sessions SET ?", newSession, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created session: ", { sessionID: res.insertId, ...newSession });
    result(null, { sessionID: res.insertId, ...newSession });
  });
};

Session.findById = (sessionID, result) => {
  sql.query(`SELECT * FROM sessions WHERE sessionID = ${sessionID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found session: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Session with the sessionID
    result({ kind: "not_found" }, null);
  });
};

Session.findByToken = (token, result) => {
  sql.query(`SELECT * FROM sessions WHERE token = '${token}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found session: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Session with the token
    result({ kind: "not_found" }, null);
  });
};

Session.getAll = result => {
  sql.query("SELECT * FROM sessions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sessions: ", res);
    result(null, res);
  });
};

Session.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM sessions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("sessions: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM sessions LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("sessions: ", res);
      result(null, res);
    });
  }
};

Session.updateById = (sessionID, session, result) => {
  sql.query(
    "UPDATE sessions SET sessionID = ?, token = ?, email = ?, advisorID = ?, studentID = ?, expirationDate = ?, lastUpdDate = ?, lastUpdBy = ? WHERE sessionID = ?",
    [session.sessionID, session.token, session.email, session.advisorID, session.studentID, session.expirationDate, session.lastUpdDate, session.lastUpdBy, sessionID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Session with the sessionID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated session: ", { sessionID: sessionID, ...session });
      result(null, { sessionID: sessionID, ...session });
    }
  );
};

Session.remove = (sessionID, result) => {
  sql.query("DELETE FROM sessions WHERE sessionID = ?", sessionID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Session with the sessionID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted session with sessionID: ", sessionID);
    result(null, res);
  });
};

Session.removeByToken = (token, result) => {
  sql.query(`DELETE FROM sessions WHERE token = "${token}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Session with the token
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted session with token: ", token);
    result(null, res);
  });
};

Session.removeAll = result => {
  sql.query("DELETE FROM sessions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sessions`);
    result(null, res);
  });
};

module.exports = Session;