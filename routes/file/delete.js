const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

require('dotenv').config();

router.post( '/deleteFile', function (req,res) {
    const bucket = db.getBucket();

});

module.exports = router;