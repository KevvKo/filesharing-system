const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticateToken } = require('../scripts/authentication');
/* GET home page. */
router.get('/', authenticateToken, function(req, res) { 
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
