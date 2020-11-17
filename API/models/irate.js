const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IrateSchema = new Schema({
    entrytime:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    },
    rate:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    },
    applicabletime:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    }
    
},{timestamps:true});

const Irate = mongoose.model('irate',IrateSchema);

module.exports = Irate;