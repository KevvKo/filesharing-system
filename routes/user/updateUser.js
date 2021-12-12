const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

router.get( '/updateUser', function (req,res) {

    const userDocument = req.body;

    db.getDb()
    .collection("user")
    .updateOne(userDocument, function (err, result) {
        if (err) {
            res.status(400).send("Error updating user!");
        } else {
            res.send('user updated');
        }
    });
});

module.exports = router;