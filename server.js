/*jshint esversion: 6 */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');
const {Gallery, User} = db;
const galleryRoutes = require('./routes/galleryRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const bp = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const CONFIG = require('./config/config.json');
const bcrypt = require('bcrypt');
const saltRound = 10;

app.use(session({

  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  cookie: {
    maxAge: 1000000
  },
  saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
 function(username, password, done) {
  console.log('checking username', username);
  console.log('checking password', password);
  User.findOne({
   where : {
   username : username
   }})
  .then((user) => {
   // password === comes from the client POST request
   // user.password === hashed password
    console.log('password', password);
    console.log('user.password', user.password);
    bcrypt.compare(password, user.password)
  .then( result => {
    console.log('result', result);
    if(result){
     console.log('Username and password correct!');
     return done(null, user);
    }else{
     console.log('password does not match');
     return done(null, false, { message: 'Incorrect Password' });
    }})
    .catch( err => {
     console.log(err);
    });
  })
  .catch((err) => {
   console.log(err);
   return done(null, false, { message: 'Incorrect Username' });
  });
 }));

passport.serializeUser(function(user, done) {
  console.log('serializing the user into session');
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  console.log('adding user information into the req object');
  User.findOne({
    where :{
      id: userId
    }
  }).then((user) => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  }).catch((err) => {
    done(err, user);
  });
});


//exposing the public folder
app.use(express.static('public'));

//app level middleware to read the post data
app.use(bp.urlencoded()); //this is to read the object being sent through from the post request

//using method overirde to send put and delete requests
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//handlebars
require('handlebars');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



//this is mounting the routes to the server
app.use('/gallery', galleryRoutes);
app.use('/login', loginRoutes);

//server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server Running on Port ${PORT}`);
});