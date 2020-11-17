const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    }
    
},{timestamps:true});

const Status = mongoose.model('status',StatusSchema);

module.exports = Status;