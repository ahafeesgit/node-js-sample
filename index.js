// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 

//load default page
app.get('/', (req, res) => {
  db.collection('datalist').find().toArray((err, result) => {
    if (err) return console.log(err);
 
    res.render('index.ejs', {datalist: result});
  });
});
//save data to mongo db
app.post('/datalist', (req, res) => {
  db.collection('datalist').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});







//connect to mongo db
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://ahafees:user123@ds013738.mlab.com:13738/image_db', (err, database) => {
  if (err) return console.log(err)
  db = database;
  app.listen(port);// listen only if database is open
console.log('Magic happens on port ' + port);
  
});


















//API
app.post('/dataaddApi', (req, res) => {
  db.collection('datalist').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
  });
});
app.get('/getdataApi', (req, res) => {
  db.collection('datalist').find().toArray((err, result) => {
    if (err) return console.log(err);
  
    var resultData = {};
    
    var key = 'animallist';
    resultData[key]=[]
for (var name in result) {
  if (result.hasOwnProperty(name)) {
      console.log(result.hasOwnProperty(name))
      console.log( result[name]['name'])
    resultData[key].push(result[name]);
  }
}

res.contentType('application/json');
res.send(JSON.stringify(resultData));

  });
});
