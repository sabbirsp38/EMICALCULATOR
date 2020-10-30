const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuarantorSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
        
    }
    
},{timestamps:true});

const Guarantor = mongoose.model('guarantor',GuarantorSchema);

module.exports = Guarantor;