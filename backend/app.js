const methodOverride = require("method-override"),
    express = require("express"),
    indexRoute = require("./routes/index"),
    app     = express(),
    body    = require("body-parser"), 
    mysql = require("mysql");

const flash = require('express-flash-messages');
const cors = require('cors');

app.use(cors());

// // Create connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'courses'
// });

app.use(express.json());
app.use(flash());

// // Connect to database
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }

//     console.log("MySql Connected...");
// });

// // Create DB
// app.get("/createdb", (req, res) => {
//     let sql = 'CREATE DATABASE courses';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Database created...');
//     });
// });

// // CREATE TABLE
// app.get('/createCoursesTable', (req, res) => {
//     let sql = 'CREATE TABLE courses(id int auto_increment primary key, title varchar(255), image varchar(255), description varchar(200), price int)';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Courses table created...');
//     });
// });

// // INSERT COURSE 
// app.get('/addCourse', (req, res) => {
//     let course = { title: 'Course FOUR', image: 'https://images.unsplash.com/photo-1529734781665-be642ec8fc8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', description: 'This is our fourth course.', price: 10500 };
//     let sql = 'INSERT INTO courses SET ?';
//     let query = db.query(sql, course, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Course added...');
//     });
// });

// // SELECT COURSES
// app.get('/getCourses', (req, res) => {
//     let sql = 'SELECT * FROM courses';
//     let query = db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send('Courses fetched...');
//     });
// });

// // SELECT SINGLE COURSE
// app.get('/getCourse/:id', (req, res) => {
//     let sql = `SELECT * FROM courses WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Course fetched...');
//     });
// });

// // UPDATE COURSE
// app.get('/updateCourse/:id', (req, res) => {
//     let newTitle = 'Updated Title';
//     let sql = `UPDATE courses SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Course updated...');
//     });
// });

// // DELETE COURSE
// app.get('/deleteCourse/:id', (req, res) => {
//     let sql = `DELETE FROM courses WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Course deleted...');
//     });
// });

app.set('trust proxy', 1) // trust first proxy

// EXPRESS CONFIG
app.use(require("express-session")({
    secret: "my dog is a cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

// APP CONFIG
app.use(body.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// ROUTES
app.use(indexRoute);

// INITIALIZATION
app.listen("3000", function() {
   console.log("The ebay server has started."); 
});