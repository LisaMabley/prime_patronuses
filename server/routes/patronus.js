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
      var query = client.query('SELECT name FROM patronuses');
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

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {

      var name = request.body.name;
      var query = client.query('INSERT INTO patronuses (name) VALUES ($1)', [name]);

      query.on('end', function(){
        done();
        response.sendStatus(200);
      });

      query.on('error', function(error){
        console.error('Error running query', error);
        done();
        response.sendStatus(500);

      });
    }
  });
});

module.exports = router;
