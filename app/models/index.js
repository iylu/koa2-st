const mongoose = require('mongoose');
const config = require('../../config/default');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect(
  config.mongodb.url,
  { useNewUrlParser: true }
);

db.on('connected', function() {
  console.info('Mongoose connection open to ' + config.mongodb.url);
});
db.on('error', function(err) {
  console.error('Mongoose connection error: ' + err);
  process.exit(1);
});
db.on('disconnected', function() {
  console.info('Mongoose connection disconnected');
});
