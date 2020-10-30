const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
    }
    
},{timestamps:true});

const Brand = mongoose.model('brand',BrandSchema);

module.exports = Brand;