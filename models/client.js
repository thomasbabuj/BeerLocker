/*
 This is to manage application clients
 */

// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var clientSchema = new mongoose.Schema ({
  name : { type : String, unique : true, required : true },
  id : { type : String, required: true },
  secret : { type : String , required : true },
  userId : { type : String, required : true }
});

// Export the Mongoose model
module.exports = mongoose.model('Client', clientSchema);
