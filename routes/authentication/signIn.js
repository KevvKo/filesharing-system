const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;
const { generateAccessToken } = require('../../scripts/authentication');

router.post( '/signin', function (req,res) {

    const {
        username,
        password
    } = req.body;

    bcrypt.genSalt( parseInt(SALT_ROUNDS), function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const userDocument = {
                name: username,
                password: hash
            };
            db.getDb()
            .collection("user")
            .findOne(userDocument, function (err, result) {
                if (err) {
                  res.status(400).send("Error finding user!");
                } else {
                    console.log(result)
                  const token = generateAccessToken( username );
                  res.json(token);
                }
            });
        });
    });
});

module.exports=router;