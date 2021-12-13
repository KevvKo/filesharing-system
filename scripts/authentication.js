const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

function generateAccessToken( username ) {
    return jwt.sign(username, JWT_SECRET, { expireIn: '1800s' });
}

module.exports = {
    generateAccessToken
};