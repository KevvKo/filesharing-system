const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;
const { generateAccessToken } = require('../../scripts/authentication');

router.post( '/addUser', function (req,res) {

    try{
        const {
            email,
            username,
            password
        } = req.body;
    

        const userDocument= {
            name: username
        };

        db.getDb()
        .collection("user")
        .findOne(userDocument, function (err, result) {

            if (result) {
                res.status(409).json({ error: "This username already exists" });
                return;     
            } 

            bcrypt.hash(password, parseInt(SALT_ROUNDS), function(err, hash) {
                if(!hash) { res.status(401).json({ error: "Uups, something went wrong. Please try again" }); }
                
                const userDocument = {
                    name: username,
                    email: email,
                    password: hash
                };
                
                db.getDb()
                .collection("user")
                .insertOne(userDocument, function (error, result) {
                    if (error || !result) {
                        res.status(400).json({ error: "Uups, something went wrong. Please try again" });
                    } else {
                        console.log(`Added a new match with id ${result.insertedId}`);
                        const token = generateAccessToken( username );
                        res.json(token);
                    }
                });
            });   
        });
        
    } catch {
        res.status(400).json({ error: "Uups, something went wrong. Please try again" });
    }
});

module.exports = router;