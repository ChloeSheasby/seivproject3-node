const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.dept = course.dept;
  this.courseNum = course.courseNum;
  this.level = course.level;
  this.hours = course.hours;
  this.courseName = course.courseName;
  this.description = course.description;
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { courseID: res.insertId, ...newCourse });
    result(null, { courseID: res.insertId, ...newCourse });
  });
};

Course.findById = (courseID, result) => {
  sql.query(`SELECT * FROM courses WHERE courseID = ${courseID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the courseID
    result({ kind: "not_found" }, null);
  });
};

Course.getAll = result => {
  sql.query("SELECT * FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("courses: ", res);
    result(null, res);
  });
};

Course.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM courses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("courses: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM courses LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("courses: ", res);
      result(null, res);
    });
  }
};

Course.updateById = (courseID, course, result) => {
  sql.query(
    "UPDATE courses SET dept = ?, courseNum = ?, level = ?, hours = ?, courseName = ?, description = ? WHERE courseID = ?",
    //TODO - Update this!!!
    [course.dept, course.courseNum, course.level, course.hours, course.courseName, course.description, courseID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the courseID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { courseID: courseID, ...course });
      result(null, { courseID: courseID, ...course });
    }
  );
};

Course.remove = (courseID, result) => {
  sql.query("DELETE FROM courses WHERE courseID = ?", courseID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the courseID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with courseID: ", courseID);
    result(null, res);
  });
};

Course.removeAll = result => {
  sql.query("DELETE FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} courses`);
    result(null, res);
  });
};

module.exports = Course;