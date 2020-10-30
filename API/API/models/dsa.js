const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DsaSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 100
    },
    contactPerson:{
        type: String,
        max:100
    },
    contactPersonPhone:{
        type:String
    },
    address:{
        type:Object
    },
    isActive:{
        type:Boolean,
        default:true
    }
    
},{timestamps:true});

const Dsa = mongoose.model('dsa',DsaSchema);

module.exports = Dsa;