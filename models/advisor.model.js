const sql = require("./db.js");

// constructor
const Advisor = function(advisor) {
  this.fName = advisor.fName;
  this.lName = advisor.lName;
  this.email = advisor.email;
  this.dept = advisor.dept;
  this.role = advisor.role;
  this.lastUpdDate = advisor.lastUpdDate;
  this.lastUpdBy = advisor.lastUpdBy;
};

Advisor.create = (newAdvisor, result) => {
  sql.query("INSERT INTO advisors SET ?", newAdvisor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created advisor: ", { advisorID: res.insertId, ...newAdvisor });
    result(null, { advisorID: res.insertId, ...newAdvisor });
  });
};

Advisor.findById = (advisorID, result) => {
  sql.query(`SELECT * FROM advisors WHERE advisorID = ${advisorID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found advisor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Advisor with the advisorID
    result({ kind: "not_found" }, null);
  });
};

Advisor.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM advisors WHERE email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found advisor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Advisor with the advisorID
    result({ kind: "not_found" }, null);
  });
};

Advisor.getAll = result => {
  sql.query("SELECT * FROM advisors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("advisors: ", res);
    result(null, res);
  });
};

Advisor.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM advisors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("advisors: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM advisors LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("advisors: ", res);
      result(null, res);
    });
  }
};

Advisor.updateById = (advisorID, advisor, result) => {
  sql.query(
    "UPDATE advisors SET fName = ?, lName = ?, email = ?, dept = ?, lastUpdDate = ?, lastUpdBy = ? WHERE advisorID = ?",
    //TODO - Update this!!!
    [advisor.fName, advisor.lName, advisor.email, advisor.dept, advisor.lastUpdDate, advisor.lastUpdBy, advisorID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Advisor with the advisorID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advisor: ", { advisorID: advisorID, ...advisor });
      result(null, { advisorID: advisorID, ...advisor });
    }
  );
};

Advisor.remove = (advisorID, result) => {
  sql.query("DELETE FROM advisors WHERE advisorID = ?", advisorID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Advisor with the advisorID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted advisor with advisorID: ", advisorID);
    result(null, res);
  });
};

Advisor.removeAll = result => {
  sql.query("DELETE FROM advisors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} advisors`);
    result(null, res);
  });
};

module.exports = Advisor;