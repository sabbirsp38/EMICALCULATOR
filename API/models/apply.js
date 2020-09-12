const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplyShema = new Schema({
    number: {
    	type: String,
      required: true
   }
},{timestamps:true})


const Apply = mongoose.model('apply',ApplyShema);

module.exports = Apply;