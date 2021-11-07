const sql = require("./db.js");
const { getID } = require("../utils/utils.js")

// constructor
const Degree = function(degree) {
  this.dept = degree.dept;
  this.degreeName = degree.degreeName;
  this.totalHours = degree.totalHours;
  this.lastUpdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  this.lastUpdBy = getID();
};

Degree.create = (newDegree, result) => {
  sql.query("INSERT INTO degrees SET ?", newDegree, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created degree: ", { degreeID: res.insertId, ...newDegree });
    result(null, { degreeID: res.insertId, ...newDegree });
  });
};

Degree.findById = (degreeID, result) => {
  sql.query(`SELECT * FROM degrees WHERE degreeID = ${degreeID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found degree: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Degree with the degreeID
    result({ kind: "not_found" }, null);
  });
};

Degree.getAll = result => {
  sql.query("SELECT * FROM degrees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("degrees: ", res);
    result(null, res);
  });
};

Degree.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM degrees", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("degrees: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM degrees LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("degrees: ", res);
      result(null, res);
    });
  }
};

Degree.updateById = (degreeID, degree, result) => {
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(
    `UPDATE degrees SET dept = ?, degreeName = ?, totalHours = ?, lastUpdDate = '${date}', lastUpdBy = ${getID()} WHERE degreeID = ?`,
    [degree.dept, degree.degreeName, degree.totalHours, degreeID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Degree with the degreeID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated degree: ", { degreeID: degreeID, ...degree });
      result(null, { degreeID: degreeID, ...degree });
    }
  );
};

Degree.remove = (degreeID, result) => {
  sql.query("DELETE FROM degrees WHERE degreeID = ?", degreeID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Degree with the degreeID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted degree with degreeID: ", degreeID);
    result(null, res);
  });
};

module.exports = Degree;