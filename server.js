const express = require('express');
const bodyParser = require('body-parser');
const { expressjwt: jwt } = require('express-jwt');
const passport = require('passport');

const app = express();

const db = require('./db/index');
const dbScripts = require('./db/scripts').modules;
const userAuth = require('./auth/index').modules;
require('./auth/passport');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

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

app.get('/api/hello', function(req, res){
  res.json({
    message: 'Hello World!'
  })
});

// authentication middleware
const auth = jwt({
    secret: process.env.SECRET || 'pizza', 
    algorithms: ['HS256'], 
    userProperty: 'payload'
});
// route to register new user
app.post('/api/sign-up', function(req, res, next){
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    let user = {};
    user.email = req.body.email;
    user = userAuth.setPassword(req.body.password, user);
    db.query(dbScripts.createUser, [
        user.email,
        user.hash,
        user.salt,
        user.googleId
    ], function (err, response){
        if(err){
            if(err.code === '23505'){
                return res.status(400).json({message: 'Sorry that email is already taken'});
            }
            return next(err);
        }
        user.user_id = response.rows[0].user_id;
        return res.status(200).json({
            token: userAuth.generateJWT(user)
        });
    });
});
// login route
app.post('/api/login', function(req, res, next){
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(user){
            return res.status(200).json({
                token: userAuth.generateJWT(user)
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

app.post('/api/zivug', auth, function(req, res, next){
    console.log(req.body, req.auth);
    db.query(dbScripts.createZivug, [
        req.body.name,
        req.body.gender,
        req.body.dob,
        req.body.height,
        req.body.address,
        req.body.state,
        req.body.zip,
        req.body.phone,
        req.auth._id
    ], function(err, response){
        if(err){
            return next(err);
        }
        return res.status(200).json(response.rows[0]);
    });
});

app.put('/api/zivug/:zivug_id', auth, function(req, res, next){
    console.log(req.body, req.auth);
    db.query(dbScripts.updateZivug, [
        req.body.zivug_id,
        req.body.name,
        req.body.gender,
        req.body.dob,
        req.body.height,
        req.body.address,
        req.body.state,
        req.body.zip,
        req.body.phone,
        req.auth._id
    ], function(err, response){
        if(err){
            return next(err);
        }
        return res.status(200).json(response.rows[0]);
    });
});

app.get('/api/my', auth, function(req, res, next){
    db.query(dbScripts.getZivugimSubmittedByUser, [req.auth._id], function(err, response){
        if(err){
            return next(err);
        }
        return res.status(200).json(response.rows);
    });
});

app.get('/api/zivug/:zivug_id', auth, function(req, res, next){
    db.query(dbScripts.getZivugById, [req.params.zivug_id], function(err, response){
        if(err){
            return next(err);
        }
        return res.status(200).json(response.rows[0]);
    });
});

function removeTime(date){
    return new Date(new Date(date).setHours(0,0,0,0));
}

const PORT = process.env.PORT || '4000';

const server = app.listen('4000', function(){
  console.log('Server is running!');
});