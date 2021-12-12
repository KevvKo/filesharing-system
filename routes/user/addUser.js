const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection');
const saltRounds = 10;


router.post( '/addUser', function (req,res) {

    const {
        email,
        username,
        password
    } = req.body;

        bcrypt.genSalt(saltRounds, function(err, salt) {
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
                  res.status(204).send();
                }
            });
        });
    });
    res.redirect('/login');
});

module.exports = router;