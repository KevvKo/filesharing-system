require('dotenv').config();

const { DB_URI } = process.env

const { MongoClient } = require('mongodb');
const uri = DB_URI;
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let connection;

module.exports = {
  connect: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      connection = db.db("filesharing");
      console.log("database connected");

      return callback();
    });
  },

  getDb: function () {
    return connection;
  },
};