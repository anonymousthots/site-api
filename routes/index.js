const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");

// randomstring.generate(15);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('index', { title: 'LOGIN' });
})

module.exports = router; 