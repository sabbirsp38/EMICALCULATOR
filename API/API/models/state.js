const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: 1,
        max:100
    }
},{timestamps:true});

const State = new mongoose.model('state',StateSchema);

module.exports = State;