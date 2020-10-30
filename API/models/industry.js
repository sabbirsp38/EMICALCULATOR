const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndustrySchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    }
    
},{timestamps:true});

const Industry = mongoose.model('industry',IndustrySchema);

module.exports = Industry;