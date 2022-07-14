//1- General Variables
// Setup empty JS object to act as endpoint for all routes
projectData = {};
// port
const PORT = 5544;

//2- All Requriemnts
// Require Express , cors, body-parser
const express = require('express');
// Require cors
const cors = require('cors');
// Require body-parser
const bodyParser = require('body-parser');


//3- first, start my app
// Start up an instance of app
const app = express();


//4- use cors and body-parser in the app
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());



//5- Initialize the main project folder
app.use(express.static('website'));




//6- Setup Server
// listen to port and print Msg.
app.listen(PORT, function() {
  console.log(`Server running and listen to port ${PORT}`);
});


//7- main functions


// pos
app.post('/addNewRecord', postMyData);
// postMyData
function postMyData(req, res) {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    userFeeling: req.body.userFeeling,
  };
  
  console.log("post " + req.body.userFeeling);
}

// get
app.get('/retriveTheLastRecord',getMyData);
// getMyData
function getMyData(req, res) {
  console.log("get " + projectData.userFeeling);
  res.send(projectData);
  projectData = {};
}
