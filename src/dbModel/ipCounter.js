// docker + mongoDB: run mongoDB without further installations
// 1. start docker with mongo instance
// docker run --name some-mongo -p 27017:27017 -v mongo:/data/db -d mongo

// defining the mongoDB schema

// using mongoose to simplify the db usage
const mongoose = require('mongoose');
 
// connect to the database
mongoose.connect('mongodb://localhost/PWP_Mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define the model with the schema
const Schema = mongoose.Schema;

// database schema description
const IPCounterSchema = new Schema({
    ip: {
        type: String,
        unique: true
    },
    counter: Number
  });

  module.exports = mongoose.model('ipCounter', IPCounterSchema)