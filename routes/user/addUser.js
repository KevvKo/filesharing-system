const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;
const { generateAccessToken } = require('../../scripts/authentication');

router.post( '/addUser', function (req,res) {

    const {
        email,
        username,
        password
    } = req.body;

    bcrypt.genSalt( parseInt(SALT_ROUNDS), function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const userDocument = {
                name: username,
                email: email,
                password: hash
            };
            db.getDb()
            .collection("user")
            .insertOne(userDocument, function (err, result) {
                if (err) {
                  res.status(400).send("Error inserting matches!");
                } else {
                  console.log(`Added a new match with id ${result.insertedId}`);
                  const token = generateAccessToken( username );
                  res.json(token);
                }
            });
        });
    });
});

module.exports = router;