const express = require("express");
const router = express.Router();
const db = require('../../db/connection');
const { ObjectId } = require("mongodb");

require('dotenv').config();

router.post( '/renameFile', function (req,res) {
    const bucket = db.getBucket();
    const { id , newName } = req.body;

    if( id && newName) {
        bucket.rename(ObjectId(id), newName);
        res.redirect('/');
    }
});


module.exports = router;