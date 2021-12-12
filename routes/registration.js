const express = require('express');
const router = express.Router();
const path = require('path');

/* GET registration page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'registration.html'));
});

module.exports = router;
