const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitySchema = new Schema({
    type:{
        type:String,
        required:true
    }
},{timestamps:true})


const Entity = mongoose.model('entity',EntitySchema);

module.exports = Entity;
