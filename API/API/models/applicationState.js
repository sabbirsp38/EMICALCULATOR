const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationStateSchema = new Schema({
    state:{
        type:String,
        required: true
    }
},{timestamps:true});

const ApplicationState = new mongoose.model('applicationState',ApplicationStateSchema);

module.exports = ApplicationState;