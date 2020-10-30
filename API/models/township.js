const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TownshipSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true,
        collation: { locale: 'en_US', strength: 2 }
    }
    
},{timestamps:true});

const Township = mongoose.model('township',TownshipSchema);

module.exports = Township;