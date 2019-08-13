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
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ googleId: profile.id }).save().then(newUser => {
                        done(null, newUser);
                    });
                }
            });
        }
    )
);
