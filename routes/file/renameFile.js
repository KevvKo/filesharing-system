const express = require("express");
const router = express.Router();
const db = require('../../db/connection');
const { ObjectId } = require("mongodb");

require('dotenv').config();

router.post( '/renameFile', function (req,res) {
    try{
        const bucket = db.getBucket();
        const { id , newName } = req.body;
        
        if( res.status >= 400){
            res.json({ error: "Ups, renaming was not possible." });
        }

        if( id && newName ) {
            bucket.rename(ObjectId(id), newName);
            res.redirect('/');
        }
        
    } catch(e){
        res.json({ error: e.message });
    }

});


module.exports = router;