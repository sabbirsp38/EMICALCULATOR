const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name:{
        required: true,
        type: String
    },
    modelId:{
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    price:{
        required: true,
        type:Number
    },
    condition:{
        type:String,
        max:100
    },
    manufactureDate:{
        type:String
    },
    registrationNumber:{
        type: String
    },
    chasisNumber:{
        type:String
    },
    engineNumber:{
        type:String
    }
},{timestamps:true});

const Color = new mongoose.model('modelColor',ColorSchema);
/* var white = new Color({
    name: 'White',
    modelId: '5e6c68173de7311874b985fc',
    price: 450000,
    condition: 'new',
    manufactureDate: new Date(),
    registrationNumber: 'reg123',
    chasisNumber: 'chasis123',
    engineNumber: 'eng123'
});
white.save(); */
module.exports = Color;