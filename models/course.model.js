const sql = require("./db.js");
const { getID } = require("../utils/utils.js")

// constructor
const Course = function(course) {
  this.courseName = course.courseName;
  this.courseNum = course.courseNum;
  this.dept = course.dept;
  this.level = course.level;
  this.hours = course.hours;
  this.description = course.description;
  this.semesterTypes = course.semesterTypes;
  this.lastUpdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  this.lastUpdBy = getID();
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
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(
    `UPDATE courses SET courseName = ?, courseNum = ?, dept = ?, level = ?, hours = ?, description = ?, semesterTypes = ?, lastUpdDate = '${date}', lastUpdBy = ${getID()} WHERE courseID = ?`,
    //TODO - Update this!!!
    [course.courseName, course.courseNum, course.dept, course.level, course.hours, course.description, course.semesterTypes, courseID],
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