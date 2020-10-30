const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 100
    },    
    manufacturerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'manufacturer',
        required:true
    },
    address:{
        type:Object
    }
    
},{timestamps:true});

const Model = new mongoose.model('model',ModelSchema);
/* let maruti = new Model({
    name: 'Maruti Suzuki',
    manufacturerId: '5e51036e2c0d3c4478d4bee0'
})
maruti.save(); */
module.exports = Model;