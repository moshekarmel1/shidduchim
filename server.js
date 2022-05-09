const express = require('express');

const app = express();

const db = require('./db/index');
const dbScripts = require('./db/scripts').modules;

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", req.headers.origin); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//serve files from the public dir
app.use(express.static(__dirname + '/public'));

// global error handler
app.use(function(err, req, res, next) {
  // Only handle `next(err)` calls
  if(err){
    res.status(500).json(err.message);
  }
});
// Populate the `Users` & `Flows` tables
db.query(dbScripts.initTables, [], (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/sign-up', function(req, res){
    res.sendFile(__dirname + '/public/views/sign-up.html');
});

function removeTime(date){
    return new Date(new Date(date).setHours(0,0,0,0));
}

const PORT = process.env.PORT || '3000';

const server = app.listen(PORT, function(){
  console.log('Server is running!');
});