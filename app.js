var express = require('express')
var app = express();
var todoController = require('./controllers/todoController');

app.set('view engine', 'ejs');

app.use(express.static('./public')) //to be used in every request, everywhere

todoController(app); //passing evrything to .... function at todoController


//Listening to port
app.listen(3000);
console.log("listening to port : 3000")
