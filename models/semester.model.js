const sql = require("./db.js");

// constructor
const Semester = function(semester) {
  this.semesterName = semester.semesterName;
  this.semesterType = semester.semesterType;
  this.startDate = semester.startDate;
  this.endDate = semester.endDate;
  this.lastUpdDate = new Date();
  this.lastUpdBy = semester.lastUpdBy;
};

Semester.create = (newSemester, result) => {
  sql.query("INSERT INTO semesters SET ?", newSemester, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created semester: ", { semesterID: res.insertId, ...newSemester });
    result(null, { semesterID: res.insertId, ...newSemester });
  });
};

Semester.findById = (semesterID, result) => {
  sql.query(`SELECT * FROM semesters WHERE semesterID = ${semesterID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found semester: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Semester with the semesterID
    result({ kind: "not_found" }, null);
  });
};

Semester.getAll = result => {
  sql.query("SELECT * FROM semesters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("semesters: ", res);
    result(null, res);
  });
};

Semester.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM semesters", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("semesters: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM semesters LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("semesters: ", res);
      result(null, res);
    });
  }
};

Semester.updateById = (semesterID, semester, result) => {
  let date = new Date();
  sql.query(
    `UPDATE semesters SET semesterName = ?, semesterType = ?, startDate = ?, endDate = ?, lastUpdDate = ${date}, lastUpdBy = ? WHERE semesterID = ?`,
    [semester.semesterName, semester.semesterType, semester.startDate, semester.endDate, semester.lastUpdBy, semesterID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Semester with the semesterID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated semester: ", { semesterID: semesterID, ...semester });
      result(null, { semesterID: semesterID, ...semester });
    }
  );
};

Semester.remove = (semesterID, result) => {
  sql.query("DELETE FROM semesters WHERE semesterID = ?", semesterID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Semester with the semesterID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted semester with semesterID: ", semesterID);
    result(null, res);
  });
};

Semester.removeAll = result => {
  sql.query("DELETE FROM semesters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} semesters`);
    result(null, res);
  });
};

module.exports = Semester;