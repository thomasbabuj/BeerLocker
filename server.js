// Including our project related packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Including the Beer Controller
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

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

// Use the passport package in our application
app.use(passport.initialize());

// Create our express router
var router = express.Router();

//Create endpoint handlebars for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated,userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
