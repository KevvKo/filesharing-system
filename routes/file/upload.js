const express = require("express");
const router = express.Router();

require('dotenv').config();

module.exports = (upload) => {
    router.post( '/uploadFile',upload.single('file'), function (req,res) {
        res.redirect('/');
    });

    return router;
};