const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

router.get( '/getUser', function (req,res) {

    const {
        username,
    } = req.body;

    const userDocument = {
        name: username,
    };

    db.getDb()
    .collection("user")
    .findOne(userDocument, function (err, result) {
        if (err) {
            res.status(400).send("Error inserting matches!");
        } else {
            res.json(result);
        }
    });
});

module.exports = router;