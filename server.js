//..............Include Express..................................//
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.use(require('./controllers/auth'));
app.use(require('./controllers/setReminder'));
app.use(require('./controllers/index'));
app.use(require('./controllers/archive'));

let reminders = JSON.parse(fs.readFileSync('./data/reminders.json'));


//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
