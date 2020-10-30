require('./state');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name:{
        type: String,
        max:100,
        required: true,
        unique: 1
    },
    stateId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'state'
    }
},{timestamps:true});

const City = new mongoose.model('city',CitySchema);

module.exports = City;