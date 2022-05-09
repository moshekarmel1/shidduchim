const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const userAuth = require('./index').modules;
const db = require('./db/index');
const dbScripts = require('./db/scripts').modules;

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.query(dbScripts.findUserByUsername, [username], function (err, userResponse) {
            if (err) { return done(err); }
            if (!userResponse || !userResponse.rows || !userResponse.rows[0]) {
                return done(null, false, { message: 'Incorrect username. If this is your first time here, you need to register.' });
            }
            const user = userResponse.rows[0];
            if (!userAuth.validPassword(password, user)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));