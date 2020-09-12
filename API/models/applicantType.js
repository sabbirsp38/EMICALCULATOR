const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantTypeSchema = new Schema({
    type:{
        type:String,
        required:true
    }
},{timestamps:true})


const ApplicantType = mongoose.model('entity',ApplicantTypeSchema);

module.exports = ApplicantType;
