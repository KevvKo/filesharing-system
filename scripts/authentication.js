const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

/**
 * @function
 * @param {String} username 
 * @returns 
 */
function generateAccessToken( username ) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 });
}


/**
 * @function 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function authenticateToken(req, res, next){
    
    const { token } = req.cookies;

    if(token === null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        console.log(err)
        if(err) return res.redirect('http://localhost:3000/login');

        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
};