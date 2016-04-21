var express = require('express');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

var router = express.Router();

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.error(err);
      res.sendStatus(500);
    }else{
      var query = client.query('SELECT first_name, last_name FROM people');
      var results = [];

      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
        done();
        res.send(results);
      });

      query.on('error', function(error){
        console.log('Error running query', error);
        done();
        res.sendStatus(500);
      });
    }
  })
});

// add Post route here

module.exports = router;
