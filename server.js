var path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dev',
  password : 'dev12345678'
});

// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS my_db', function (err) {
    if (err) throw err;
    connection.query('USE my_db', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS user('
            + 'id varchar(45) NOT NULL,'
            + 'PRIMARY KEY(id),'
            + 'age int(11) NOT NULL,'
            + 'name varchar(45) NOT NULL,'
            + 'gender varchar(45) NOT NULL,'
            + 'company varchar(45) NOT NULL,'
            + 'email varchar(45) NOT NULL,'
            + 'phone varchar(70) NOT NULL,'
            + 'address varchar(145) NOT NULL'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});


var PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});

app.post('/api/users', function (req, res) {
    //connection.connect();
    var jsondata  = req.body;
    var users = [];

    if (jsondata.length == 0) res.send("bad data"); 

    for(var i=0; i< jsondata.length; i++)
        users.push([jsondata[i].id, jsondata[i].age, jsondata[i].name,
        jsondata[i].gender, jsondata[i].company, jsondata[i].email,
        jsondata[i].phone, jsondata[i].address]);

    //clean table record
    connection.query('truncate user;');

    var query = connection.query('INSERT INTO user VALUES ?', [users], function (error, results) {
      if (error) throw error;
      res.send(results)
    });
    //connection.end();
});
