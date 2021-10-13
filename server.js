const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const db = require("./config/db.config");

var corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.options('*', cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Test." });
});

require("./routes/course.routes.js")(app);
require("./routes/degree_courses.routes.js")(app);
require("./routes/degree.routes.js")(app);
require("./routes/student.routes.js")(app);
require("./routes/student_courses.routes.js")(app);
require("./routes/semester.routes.js")(app);
require("./routes/advisor.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});