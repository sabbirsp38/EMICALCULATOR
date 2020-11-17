const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 100,
        unique:true
    },    
    location:{
        type: String,
        max:100
    },
    address:{
        type:Object
    }
    
},{timestamps:true});

const Manufacturer = new mongoose.model('manufacturer',ManufacturerSchema);
/* var hyundai = new Manufacturer({
    name: 'Modi Hyundai',
    location: 'Mumbai'
})
hyundai.save((err)=>{   
    if(err){
        console.log('error occured')
        console.log(err)
        return
    }
    console.log('saved successfully')
}) */
module.exports = Manufacturer;