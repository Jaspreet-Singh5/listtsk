if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey)

const mongoose = require('mongoose');

var express = require("express"),
    router = express.Router(),
    body   = require("body-parser"),
    mysql = require("mysql");

const cors = require('cors');

const flash = require('express-flash-messages');

// APP CONFIG
express().use(body.urlencoded({extended: true}));
express().use(express.json());
express().use(flash());

mongoose.connect('mongodb+srv://JaspreetUser:jaspreet1999@jaspreetsingh-koxle.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully at Port 3000");
})

// // Create connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'courses'
// });

// EXPRESS CONFIG
express().use(require("express-session")({
    secret: "my dog is a cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

// // Connect to database
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }

//     console.log("MySql Connected...");
// });

router.post('/purchase', function(req, res) {
    // fs.readFile('items.json', function(error, data) {
      
    // })

    let total = 1;
    
    console.log(total + " " + req.body.stripeTokenId);
   
    stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'usd',
        description: 'Bought a course',
        receipt_email: 'j.jaspreetmahu@gmail.com',
        shipping: {
            name: 'Jenny Rosen', 
            address: {
                postal_code: 98140,
                line1: "510 Townsend St",
                city: "San Francisco",
                state: 'CA',
                country: 'US'
            }
        }
    }).then(function() {
        console.log('Charge Successful')
        
        req.flash('Success','Payment successful')
        req.session.save(function () {
            res.redirect('/');
          });
        // res.json({ message: 'Successfully purchased items' })
    }).catch(function() {
        console.log('Charge Fail')
        req.flash('Failure','Payment failed')
        req.session.save(function () {
            res.redirect('/');
        });
        res.status(500).end()
    })
})

const Course = require('../models/course');

// LANDING PAGE
router.get("/", function (req, res) {

    // var title = 'Course One';
    // var price = 1;
    // var image = 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80';
    // var desc = 'This is our first course.';
    
    // var newCourse = {title : title, price:price, image : image, description: desc};
    
    // Course.create(newCourse, function(err, newCourse){
    //     if(err)
    //     {
    //         console.log(err);
    //         req.flash("error",err.message);
    //     }
    //     else
    //     {
    //         console.log(newCourse);
    //     }    
    // });

    Course.find({},
        (err, allCourses) =>
        {
            if(err)
            {
                console.log(err);
                req.flash("error",err.message);
            }
            else
            {
                res.render("landing.ejs", { Courses: allCourses, stripePublicKey: stripePublicKey });
            }
        }
    );

    // let sql1 = `
    //     SELECT DISTINCT *
    //     FROM courses;
    // `;
    
    // let query1 = db.query(sql1, (err, Courses) => {
    //      if (err) throw err;
    //      console.log(Courses);
        
        
        //  res.render("landing.ejs", { Courses: Courses, stripePublicKey: stripePublicKey });  
    //  });
});

module.exports = router;