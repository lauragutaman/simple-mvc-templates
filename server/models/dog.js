const mongoose = require('mongoose');

let dogModel; 

const DogDescription = new mongoose.Schema({
    name: {
        type:String,
        required: true, 
        trim: true, 
        unique: true, 

    },

    breed: {
        type:String, 
        required: true, 
        trim: true, 

    },

    age: {
        type: Number, 
        min: 0,
        required: true,
    },

    createDate: {
        type: Date,
        default: Date.now,
    },


});

dogModel = mongoose.model('Dog', DogDescription);

module.exports = dogModel; 
