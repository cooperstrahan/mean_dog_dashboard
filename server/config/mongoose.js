const mongoose = require('mongoose');
module.exports = {
    mongoose: mongoose.connect('mongodb://localhost/dog_data', {useNewUrlParser: true})
}
