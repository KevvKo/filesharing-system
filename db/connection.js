require('dotenv').config();

const { DB_URI } = process.env;

const { MongoClient, GridFSBucket } = require('mongodb');
const uri = DB_URI;
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let connection;
let bucket;

module.exports = {
  connect: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      
      connection = db.db("filesharing");
      console.log("database connected");

      bucket = new GridFSBucket( connection );
      console.log("bucket initiated");

      return callback();
    });
  },

  getDb: function() {
    return connection;
  },

  getBucket: function(){
    return bucket;
  }
}