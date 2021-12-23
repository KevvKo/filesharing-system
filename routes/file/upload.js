const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

require('dotenv').config();

router.post( '/uploadFile', function (req,res) {
    const bucket = db.getBucket();

});

module.exports = router;