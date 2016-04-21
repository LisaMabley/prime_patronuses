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
      console.log('hi from the people router');

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

      var first_name = request.body.first_name;
      var last_name = request.body.last_name;
      var query = client.query('INSERT INTO people (first_name, last_name) VALUES ($1, $2)', [first_name, last_name]);

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

router.put('/:id', function(request, response) {
  var id = request.params.id;
  var patronus = request.body.patronus;
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('UPDATE people SET patronus_id = ' + patronus + 'WHERE id = ' + id + ';');

    query.on('end', function() {
      done();
      response.sendStatus(200);
    });

    query.on('error', function(err) {
      console.error(err);
      done();
      response.sendStatus(500);
    });
  });
});


module.exports = router;
