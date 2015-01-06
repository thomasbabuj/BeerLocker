// Including our project related packages
var express = require('express');
var mongoose = require('mongoose');

// Create our express application
var app = express();

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our express router
var router = express.Router();

//Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message : 'You are running dangerously low on beer! '});
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
