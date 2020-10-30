const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealerSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique:true
    },
    contactPerson:{
        type: String,
        max:100
    },
    manufacturerId:{        
        type:mongoose.Schema.Types.ObjectId,
        ref:'manufacturer',
        required:true
        
    },
    contactPersonPhone:{
        type:String,
        default: ""
    },
    address:{
        type:Object,
        default:{}
    },
    dealerType:{
        type:String,
        default:""
    }
    
},{timestamps:true});

const Dealer = mongoose.model('dealer',DealerSchema);

module.exports = Dealer;