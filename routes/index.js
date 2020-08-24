var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Connote' });
});

router.get('/work', function(req, res) {
  res.render('work', { title: 'Work' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
