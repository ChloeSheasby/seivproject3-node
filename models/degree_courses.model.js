const sql = require("./db.js");

// constructor
const Degree_courses = function(degree_courses) {
  this.degreeID = degree_courses.degreeID;
  this.courseID = degree_courses.courseID;
};

Degree_courses.create = (newDegree_courses, result) => {
  sql.query("INSERT INTO degree_courses SET ?", newDegree_courses, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created degree_courses: ", { degreeCourseID: res.insertId, ...newDegree_courses });
    result(null, { degreeCourseID: res.insertId, ...newDegree_courses });
  });
};

Degree_courses.findById = (degreeCourseID, result) => {
  sql.query(`SELECT * FROM degree_courses WHERE degreeCourseID = ${degreeCourseID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found degree_courses: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Degree_courses with the degreeCourseID
    result({ kind: "not_found" }, null);
  });
};

Degree_courses.getAll = result => {
  sql.query("SELECT * FROM degree_courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("degree_courses: ", res);
    result(null, res);
  });
};

Degree_courses.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM degree_courses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("degree_courses: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM degree_courses LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("degree_courses: ", res);
      result(null, res);
    });
  }
};

Degree_courses.updateById = (degreeCourseID, degree_courses, result) => {
  sql.query(
    "UPDATE degree_courses SET degreeID = ?, courseID = ? WHERE degreeCourseID = ?",
    //TODO - Update this!!!
    [degree_courses.degreeID, degree_courses.courseID, degreeCourseID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Degree_courses with the degreeCourseID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated degree_courses: ", { degreeCourseID: degreeCourseID, ...degree_courses });
      result(null, { degreeCourseID: degreeCourseID, ...degree_courses });
    }
  );
};

Degree_courses.remove = (degreeCourseID, result) => {
  sql.query("DELETE FROM degree_courses WHERE degreeCourseID = ?", degreeCourseID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Degree_courses with the degreeCourseID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted degree_courses with degreeCourseID: ", degreeCourseID);
    result(null, res);
  });
};

module.exports = Degree_courses;