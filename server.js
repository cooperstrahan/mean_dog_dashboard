const express = require('express');
var app = express();
const bp = require('body-parser');
const port = 8000;
const path = require('path');
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, './static')));
app.use(bp.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/dog_data', {useNewUrlParser: true});

var DogSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    rating: {type: Number, required: true},
    description : {type: String, required: true, minlength: 5}
}, {timestamps: true});
mongoose.model('Dog', DogSchema);
var Dog = mongoose.model('Dog');
mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
    Dog.find({}, function(err, dogs) {
        if(err){
            console.log('Something went wrong retrieving the pups');
            res.render(404);
        } else {
            console.log('We have got the doggos');
            res.render('index', {dog_list: dogs});
        }
    });
});

app.get('/dogs/new', function(req, res) {
    res.render('new');
});

app.get('/dogs/:id', function(req, res) {
    Dog.findOne({_id: req.params.id}, function(err, doggo) {
        console.log(req.param.id);
        console.log(req.params.id);
        if(err){
            console.log('Something went wrong retrieving that pup!');
        } else {
            console.log('Here is ya doggo');
            res.render('info', {that_dog: doggo});
        }
    });
});

app.get('/dogs/edit/:id', function(req, res) {
    Dog.findOne({_id: req.params.id}, function(err, doggo) {
        console.log(req.param.id);
        console.log(req.params.id);
        if(err){
            console.log('Something went wrong retrieving that pup!');
        } else {
            console.log('Here is ya doggo');
            res.render('edit', {that_dog: doggo});
        }
    })
})

app.post('/add', function(req, res) {
    var dog = new Dog({name: req.body.name, rating: req.body.rating, description: req.body.desc});
    dog.save(function(err) {
        if(err){
            console.log('There was a problem adding a pooch to your database');
        } else {
            console.log('Your pooch was added to the database!');
            res.redirect('/')
        }
    });
});

app.post('/update/:id', function(req, res) {
    console.log(req.params.id);
    Dog.update({_id: req.params.id}, {$set: {name: req.body.name, 
        rating: req.body.rating, description: req.body.desc}}, function(err) {
            if(err){
                console.log('Something went wrong updating your pup');
                console.log(err);
            } else {
                console.log('Your pup was updated!');
                res.redirect('/dogs/'+req.params.id);
            }
        });
    });

app.get('/dogs/delete/:id', function(req, res) {
    Dog.remove({_id: req.params.id}, function(err) {
        if(err){
            console.log("We couldn't delete your dog");
            console.log(err);
        } else {
            console.log('Dog deleted kinda sad though');
            res.redirect('/');
        }
    })
});

app.listen(port, function() {});