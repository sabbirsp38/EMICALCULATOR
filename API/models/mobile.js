const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobileSchema = new Schema({
    min:{
        type:String, 
    },
    max:{
        type:String, 
    }
    
},{timestamps:true});

const Mobile = mongoose.model('mobile',MobileSchema);

module.exports = Mobile;