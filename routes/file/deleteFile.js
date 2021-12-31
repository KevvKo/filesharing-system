const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const db = require('../../db/connection');

require('dotenv').config();

router.post( '/deleteFile', function (req,res) {
    const bucket = db.getBucket();
    const { id } = req.body;

    if(id){
       const cursor = bucket.delete(ObjectId(id));
       res.redirect('/');

    }
});

module.exports = router;