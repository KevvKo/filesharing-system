const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const db = require('../../db/connection');

require('dotenv').config();

router.post( '/deleteFile', function (req,res) {
    
    try {
        const bucket = db.getBucket();
        const { id } = req.body;
    
        if(id){
           bucket.delete(ObjectId(id));
           res.redirect('/');
    
        } else {
            res.status(400).json({ error: "Delete the file was not possible." })
        }
    } catch(e) {
        res.json({ error: e.message });
    }
});

module.exports = router;