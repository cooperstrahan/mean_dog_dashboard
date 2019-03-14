const dogs = require('../controller/dogs.js');

module.exports = function(app) {
    app.get('/', function(req, res) {dogs.index(req, res)});
    app.get('/dogs/new', function(req, res) {dogs.new(req, res)});
    app.get('/dogs/:id', function(req, res) {dogs.info(req, res)});
    app.get('/dogs/edit/:id', function(req, res) {dogs.edit(req, res)});
    app.post('/add', function(req, res) {dogs.add(req, res)});
    app.post('/update/:id', function(req, res) {dogs.update(req, res)});
    app.get('/dogs/delete/:id', function(req, res) {dogs.delete(req, res)});
}