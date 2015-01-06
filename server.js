// Including our project related packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Including the Beer Controller
var beerController = require('./controllers/beer');

// Create our express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended : true
}));

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our express router
var router = express.Router();

//Create endpoint handlebars for /beers
router.route('/beers')
    .post(beerController.postBeers)
    .get(beerController.getBeers);

router.route('/beers/:beer_id')
    .get(beerController.getBeer)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
