const mongoose = require('mongoose');
require('../models/city');
require('../models/dealer');
require('../models/manufacturer');
require('../models/model');
require('../models/modelColor');
require('../models/branch');

const Schema = mongoose.Schema;

const GenericSchema = new Schema({
    id:{
        type:String,
    },
    name:{
        type: String,
    }
});



let fetchMaster=async (masterName)=>{
    const genericMaster = mongoose.model(masterName);
    let result = await genericMaster.find({});//.select('name');
    return result;
}
module.exports = {
    fetchMaster
};