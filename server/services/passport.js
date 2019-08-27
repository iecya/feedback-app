const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Given a mongoose userModel, it returns the userModel id
passport.serializeUser((userModel, done) => {
    done(null, userModel.id);
});

// Given an id, it returns the userModel with the given id
passport.deserializeUser((userId, done) => {
    User.findById(userId).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    //  we don't have a user record with this ID, make a new one
                    new User({ googleId: profile.id }).save().then(newUser => {
                        done(null, newUser);
                    });
                }
            });
        }
    )
);
