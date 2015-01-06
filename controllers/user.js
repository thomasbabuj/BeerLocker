/* User Controller */

// Load required packages
var user = require('../models/user');

// Create endpoint /api/users for POST
export.postUsers = function(req, res) {
  var user = new User({
      username : req.body.username,
      password : req.body.password
  });

  user.save(function(err){
    if(err)
      res.send(err);

    res.json({ message : 'New beer drinker added to the locker room!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(req, res) {
    if(err)
      res.send(err);

    res.json(users);
  });
};
