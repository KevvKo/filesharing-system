const express = require("express");
const router = express.Router();
const db = require('../../db/connection');

router.get( '/getUser', function (req,res) {

    try {
        const {
            username,
        } = req.body;
    
        const userDocument = {
            name: username,
        };
    
        db.getDb()
        .collection("user")
        .findOne(userDocument, function (err, result) {
            if (err || !result) {
                res.status(400).json({error: "Deleteng the User was not possible." });
            } else {
                res.json(result);
            }
        });
    } catch(e) {
        res.json({ error: e.message });
    }
});

module.exports = router;