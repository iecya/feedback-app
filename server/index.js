const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
    // We are telling Express that we want to use a browser cookie
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        keys: [keys.cookieKey] // this is for encryption for security reasons; we can pass multiple keys and it randomly pick one for encryption
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
