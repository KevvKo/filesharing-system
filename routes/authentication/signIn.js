const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
require('dotenv').config();

const { generateAccessToken } = require('../../scripts/authentication');

router.post( '/signin', function (req,res) {

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
        if (err) {
          res.status(400).send("Error finding user!");
        } else {
            const {
                username,
                password
            } = result;

            bcrypt.compare(plainPassword, password, function(err, result) {
                if(result){
                    const token = generateAccessToken( username );
                    res.json(token);
                }
            });
        }
    });
});

module.exports=router;