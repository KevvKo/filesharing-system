const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
require('dotenv').config();

const { generateAccessToken } = require('../../scripts/authentication');

router.post( '/signin', function (req,res) {

    try{
        const {
            username,
            plainPassword
        } = req.body;
    
        const userDocument = {
            name: username,
        };
        db.getDb()
        .collection("user")
        .findOne(userDocument, function (err, result) {
            if (err || !result) {
              res.status(401).json({ error: "Wrong username or password" });
            } else {
                const {
                    username,
                    password
                } = result;
    
                bcrypt.compare(plainPassword, password, function(err, result) {
                    if(!result) { res.status(401).json({ error: "Wrong username or password" }); }
                    if(result){
                        const token = generateAccessToken( username );+
                        res.json(token);
                    }
                });
            }
        });
    } catch {
       res.status(401).json({ error: "Wrong username or password" });
    }
});

module.exports=router;