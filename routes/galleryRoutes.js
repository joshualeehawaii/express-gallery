/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;
const passport = require('passport');
const loginRoute = require('../routes/loginRoutes.js');
const User = db.User;
const bcrypt = require('bcrypt');
const saltRound = 10;

function userAuthenticated(req, res, next){
  if (req.isAuthenticated()) {

    console.log('user is good :)');
    next(); // middleware succeeded move on to next
  } else {
    console.log('user not good :(');
    res.redirect('/login');
  }
}

router
 .delete('/:id', (req, res) => {
  console.log(`/gallery/${req.params.id} delete ID recieved`);
  Gallery.destroy({
   where: {
     id: req.params.id
    }
  })
  .then((data) => {
    console.log(data);
    console.log('data that was deleted', data);
    res.redirect('/gallery'); //send the user back to the main page after the delete
  })
  .catch((err) => {
    console.log(err);
  });
});

router
 .get('/:id/edit', userAuthenticated, (req, res) => {
   console.log(`/gallery/${req.params.id} GET ID recieved`);
   Gallery.findById(parseInt(req.params.id))
 .then((photo) => {
   console.log('gallery id = ', photo);
   var data = {
     id: photo.id,
     title: photo.tile,
     author: photo.author,
     link: photo.link,
     description: photo.description
   };
   res.render('edit', data);
  })
  .catch ((err) => {
   console.log(err);
  });
});

router
 .put('/:id/edit', (req, res) => {
  console.log(`/gallery/${req.params.id}/edit POST ID and edit recieved`);
  return Gallery.update({
   author: req.body.author,
   link: req.body.link,
   description: req.body.description
  }, {
   where: {
    id: req.params.id
   }
  })
  .then((data) => {
    console.log(data);
    console.log('data that was edited', data);
    res.redirect('/gallery'); //send the user back to the main page after the edit
  })
  .catch((err) => {
    console.log(err);
  });
});

router
 .post('/',(req, res) => {
   console.log('/gallery POST recieved');
   console.log('this is the request title =', req.body);
   return Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then((data) => {
    console.log(data);
    console.log('new image post =', data);
    res.redirect('/gallery');
  })
  .catch((err) => {
   console.log(err);
  });
});

router
 .get('/user', (req, res) => {
  console.log('/gallery/newUser GET recieved');
  res.render('user');
});

router
 .post('/user',(req, res) => {
   console.log('/gallery/user POST recieved');
   console.log('this is the request title =', req.body);
   bcrypt.genSalt(saltRound)
   .then( salt => {
    return bcrypt.hash(req.body.password, salt);
   })
   .then( hash => {
    User.create({
     username: req.body.username,
     password: hash
    });
   })
   .then((data) => {
    console.log(data);
    console.log('new user post =', data);
    res.redirect('/gallery');
  })
  .catch((err) => {
   console.log(err);
  });
});

router
 .get('/new', (req, res) => {
  console.log('/gallery/new GET new recieved');
  res.render('new');
});

router
 .get('/:id', (req, res) => {
   console.log(`/gallery/${req.params.id} GET ID recieved`);
   Gallery.findById(parseInt(req.params.id))
  .then((photo) => {
    console.log('gallery id = ', photo);
    var data = {
     id: photo.id,
     title: photo.tile,
     author: photo.author,
     link: photo.link,
     description: photo.description
   };
   res.render('detail', data);
  })
  .catch ((err) => {
   console.log(err);
  });
});

router
 .get('/', (req, res) => {
   console.log('/gallery GET recieved');
   Gallery.findAll()
  .then((gallery) => {
   //console.log('gallery = ', gallery);
   res.render('index', {gallery: gallery});
  })
  .catch((err) => {
   console.log(err);
  });
});

module.exports = router;