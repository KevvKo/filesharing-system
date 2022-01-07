const express = require("express");
const router = express.Router();

require('dotenv').config();

module.exports = (upload) => {
    router.post( '/uploadFile',upload.single('file'), function (req,res) {
        
        try {
            if(res.status >= 400){
                res.send('Upload the file was not possible');
            }else {
                res.redirect('/');
            }
        } catch (e){
            res.json({ error: e.message });
        }
    });

    return router;
};