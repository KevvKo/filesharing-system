const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

router.post( '/deleteUser', function (req,res) {

    const {
        username,
    } = req.body

    const userDocument = {
        name: username,
    };

    db.getDb()
    .collection("user")
    .deleteOne(userDocument, function (err, result) {
        if (err) {
            res.status(400).send("Error deleting the user!");
        } else {
            console.log("delete user was sucessful")
        }
    })
});

module.exports = router;