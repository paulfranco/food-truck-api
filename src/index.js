import http from 'http';
import express from 'express';
import bp from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bp.json({
    limit: config.bodyLimit
}))
// passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'  
},
Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// api route v1
app.use('/api/v1', routes);

app.server.listen(config.port);
console.log('Started on port ${app.server.address().port}');

export default app;
