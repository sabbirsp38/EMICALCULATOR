const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationStateSchema = new Schema({
    name:{
        type:String
        
    }phoneNumber: {
      type: String,
      required: true
   }
},{timestamps:true});

const ApplicationState = new mongoose.model('applicationState',ApplicationStateSchema);

