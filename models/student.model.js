const sql = require("./db.js");
const { setUpdBy } = require("../utils/utils.js")

// constructor
const Student = function(student) {
  this.degreeID = student.degreeID;
  this.advisorID = student.advisorID;
  this.fName = student.fName;
  this.lName = student.lName;
  this.email = student.email;
  this.lastUpdDate = new Date();
  this.lastUpdBy = setUpdBy;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { studentID: res.insertId, ...newStudent });
    result(null, { studentID: res.insertId, ...newStudent });
  });
};

Student.findById = (studentID, result) => {
  sql.query(`SELECT * FROM students WHERE studentID = ${studentID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Degree with the degreeID
    result({ kind: "not_found" }, null);
  });
};

Student.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM students WHERE email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the studentID
    result({ kind: "not_found" }, null);  
  });
};

Student.getForAdvisor = (advisorID, result) => {
  sql.query(`SELECT * FROM students WHERE advisorID = ${advisorID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.getAll = result => {
  sql.query("SELECT * FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.getSome = (start, length, result) => {
  if(start == null) {
    sql.query("SELECT * FROM students", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("students: ", res);
      result(null, res);
    });
  }
  else {
    sql.query(`SELECT * FROM students LIMIT ${length} OFFSET ${(start-1)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("students: ", res);
      result(null, res);
    });
  }
};

Student.updateById = (studentID, student, result) => {
  let date = new Date();
  sql.query(
    `UPDATE students SET degreeID = ?, advisorID = ?, fName = ?, lName = ?, email = ?, lastUpdDate = ${date}, lastUpdBy = ${setUpdBy} WHERE studentID = ?`,
    [student.degreeID, student.advisorID, student.fName, student.lName, student.email, studentID],
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

      console.log("updated student: ", { studentID: studentID, ...student });
      result(null, { studentID: studentID, ...student });
    }
  );
};

Student.remove = (studentID, result) => {
  sql.query("DELETE FROM students WHERE studentID = ?", studentID, (err, res) => {
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

    console.log("deleted student with studentID: ", studentID);
    result(null, res);
  });
};

module.exports = Student;
