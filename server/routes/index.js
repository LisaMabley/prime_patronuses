var express = require('express');
var path = require('path');

var peopleRouter = require('./people');
var patronusRouter = require('./patronus');


var router = express.Router();

router.get('/', function(req, res) {
  var index = path.join(__dirname, '../public/views/index.html');
  res.sendFile(index);
});

// Other routes
router.use('/people', peopleRouter);
router.use('/patronus', patronusRouter);

module.exports = router;
