/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const bp = require('body-parser');

router
 .get('/new', (req, res) => {
  console.log(`/gallery/new GET new recieved`);
  res.end();
});

router
 .get('/:id', (req, res) => {
  console.log(`/gallery/${req.params.id} GET ID recieved`);
  res.end();
});

router
 .get('/', (req, res) => {
  console.log('/gallery GET recieved');
  res.end();
});

module.exports = router;