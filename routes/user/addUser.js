const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/connection').getDb();
const saltRounds = 10;
const examplePassword="1111";


router.route("/routes/user/addUser").post(function (req,res) {
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(examplePassword, salt, function(err, hash) {

            const userDocument = {
                user: "abc",
                name: "xyz",
                password: hash
            };

            db
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
});