const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
        
    }
    
},{timestamps:true});

const Type = mongoose.model('type',TypeSchema);

module.exports = Type;