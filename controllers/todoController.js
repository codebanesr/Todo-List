var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds135594.mlab.com:35594/todo')


var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo', todoSchema);



module.exports = function(app){
        app.get('/todo', function(req, res){
            // get data from mongodb and pass it to the view
            Todo.find({}, function(err, data){//here is where the data arrives
                if (err) throw err;
                res.render('todo', {data: data});
            });
        });

        app.post('/todo', urlencodedParser, function(req, res){
            //get data from the view and add it to mongodb
            var newTodo = Todo(req.body).save(function(err, data){
                if (err) throw err;
                res.json(data);
            })
        });

        app.delete('/todo/:item', function(req, res){
            // delete the requested item from mongodb
            Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
                    if (err) throw err;
                    res.json(data);
            });
        });
}
