const sql = require("./db.js");
const { getID } = require("../utils/utils.js")

// constructor
const Student_courses = function(student_courses) {
  this.studentID = student_courses.studentID;
  this.courseID = student_courses.courseID;
  this.semesterID = student_courses.semesterID;
  this.grade = student_courses.grade;
  this.status = student_courses.status;
  this.lastUpdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  this.lastUpdBy = getID;
};

Student_courses.create = (newStudent_courses, result) => {
  sql.query("INSERT INTO student_courses SET ?", newStudent_courses, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student_courses: ", { studentCourseID: res.insertId, ...newStudent_courses });
    result(null, { studentCourseID: res.insertId, ...newStudent_courses });
  });
};

Student_courses.findById = (studentCourseID, result) => {
  sql.query(`SELECT * FROM student_courses WHERE studentCourseID = ${studentCourseID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student_courses: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student_courses with the studentCourseID
    result({ kind: "not_found" }, null);
  });
};

Student_courses.getAll = result => {
  sql.query("SELECT * from student_courses, courses, semesters WHERE " 
          + "(student_courses.courseID = courses.courseID) AND (student_courses.semesterID = semesters.semesterID)", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("student_courses: ", res);
    result(null, res);
  });
};

Student_courses.getAllForStudent = (studentID, result) => {
  sql.query(`SELECT * from student_courses, courses, semesters WHERE ` 
            + `(student_courses.courseID = courses.courseID) AND (student_courses.semesterID = semesters.semesterID) `
            + `AND (student_courses.studentID = ${studentID})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("student_courses: ", res);
    result(null, res);
  });
};

Student_courses.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * from student_courses, courses, semesters, students WHERE " 
    + "(student_courses.courseID = courses.courseID) AND (student_courses.semesterID = semesters.semesterID) "
    + "AND (student_courses.studentID = students.studentID)", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("student_courses: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM student_courses LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("student_courses: ", res);
      result(null, res);
    });
  }
};

Student_courses.updateById = (studentCourseID, student_courses, result) => {
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(
    `UPDATE student_courses SET studentID = ?, courseID = ?, semesterID = ?, grade = ?, status = ?, lastUpdDate = '${date}', lastUpdBy = '${getID()}' WHERE studentCourseID = ?`,
    [student_courses.studentID, student_courses.courseID, student_courses.semesterID, student_courses.grade, student_courses.status, studentCourseID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student_courses with the studentCourseID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student_courses: ", { studentCourseID: studentCourseID, ...student_courses });
      result(null, { studentCourseID: studentCourseID, ...student_courses });
    }
  );
};

Student_courses.remove = (studentCourseID, result) => {
  sql.query("DELETE FROM student_courses WHERE studentCourseID = ?", studentCourseID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student_courses with the studentCourseID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student_courses with studentCourseID: ", studentCourseID);
    result(null, res);
  });
};

module.exports = Student_courses;