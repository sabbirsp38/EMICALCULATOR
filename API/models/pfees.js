const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PfeesSchema = new Schema({
    entrytime:{
        type:String,
        required: true,
       
    },
    fees:{
        type:String,
        required: true,
        
    },
    applicabletime:{
        type:String,
        required: true,
       
    }
    
},{timestamps:true});

const Pfees = mongoose.model('pfees',PfeesSchema);

module.exports = Pfees;