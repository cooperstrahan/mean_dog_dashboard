const mongoose = require('mongoose');
require('../models/dog.js');
const Dog = mongoose.model('Dog');

module.exports = {
    index: function(req, res) {
        Dog.find({}, function(err, dogs) {
            if(err){
                console.log('Something went wrong retrieving the pups');
                res.render(404);
            } else {
                console.log('We have got the doggos');
                res.render('index', {dog_list: dogs});
            }
        });
    },
    new: function(req, res) {
        res.render('new');
    },
    info: function(req, res) {
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
    },
    edit: function(req, res) {
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
    },
    add: function(req, res) {
        var dog = new Dog({name: req.body.name, rating: req.body.rating, description: req.body.desc});
        dog.save(function(err) {
            if(err){
                console.log('There was a problem adding a pooch to your database');
            } else {
                console.log('Your pooch was added to the database!');
                res.redirect('/')
            }
        });
    },
    update: function(req, res) {
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
    },
    delete: function(req, res) {
        Dog.remove({_id: req.params.id}, function(err) {
            if(err){
                console.log("We couldn't delete your dog");
                console.log(err);
            } else {
                console.log('Dog deleted kinda sad though');
                res.redirect('/');
            }
        });
    }
}