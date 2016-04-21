var pg = require('pg');

var connectionString = '';

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/patroni';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log('Error connecting to DB', err);
    } else {
      var peopleTable = 'CREATE TABLE IF NOT EXISTS people (id SERIAL PRIMARY KEY, first_name VARCHAR(21), last_name VARCHAR(31), patronus_id INT REFERENCES patronuses(id));';
      var patronusTable = 'CREATE TABLE IF NOT EXISTS patronuses (id SERIAL PRIMARY KEY, name VARCHAR(81));';
      var query = client.query(patronusTable + peopleTable);

      query.on('end', function(){
        console.log('Sucessfully ensured schema exists');
        done();
      });

      query.on('error', function(){
        console.log('Error creating schema');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
