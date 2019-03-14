const mongoose = require('mongoose');
require('../config/mongoose.js')

var DogSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    rating: {type: Number, required: true},
    description : {type: String, required: true, minlength: 5}
}, {timestamps: true});

module.exports = { 
    Dog: mongoose.model('Dog', DogSchema)
}