const express = require("express");
const router = express.Router();
const db = require('../../db/connection');
require('dotenv').config();

router.get( '/getFiles', async function (req,res) {
    const bucket = db.getBucket();
    const cursor = await bucket.find({}).toArray();
    res.json(cursor);
});

module.exports = router;