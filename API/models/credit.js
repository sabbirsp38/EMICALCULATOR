const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true, 
    },
    key:{
        type:String,
        
    },
    secret:{
        type:String,
    }
    
},{timestamps:true});

const Credit = mongoose.model('credit',CreditSchema);

module.exports = Credit;