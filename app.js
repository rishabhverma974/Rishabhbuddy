const express = require("express")
const path= require("path"); 
const fs= require("fs"); 
const app = express();
const bodyparser= require("body-parser")
const port=80;


//for saving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())




//PUG RELATED
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory



//Mongoose
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rishabhbuddy', {useNewUrlParser: true, useUnifiedTopology: true});

var RegisterSchema = new mongoose.Schema({
    First_Name: String,
    last_name: String,
    DOB: String,
    statelist: String,
    City_name: String,
    Country: String,
    Email: String,
    uname: String,
    psw: String


  });

  var Register = mongoose.model('Register', RegisterSchema);





const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Hence connected")
});




//our pug demo end point 
app.get("/demo", (req,res)=>{
    res.status(200).render('demo', {title: 'Hey Rishabh', message: 'Hello there using pug for this'})
});
app.get("/", (req,res)=>{
    res.status(200).render('demo', {title: 'Hey Rishabh', message: 'Hello there using pug for this'})
});
app.get("/trimport", (req,res)=>{
    res.status(200).render('trimport.pug')
});
app.get("/registerpage", (req,res)=>{
    res.status(200).render('registerpage.pug')
});
app.post('/registerpage', (req, res)=>{
    var myData = new Register(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")

    }).catch(()=>{
        res.status(400).send("Item was not saved")
    })
    //res.status(200).render('registerpage.pug', )
})




app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})