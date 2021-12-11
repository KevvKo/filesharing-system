var express = require('express');
var router = express.Router();
var path = require('path');

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'registration.html'));
});

module.exports = router;
