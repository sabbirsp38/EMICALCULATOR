const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    name:{
        type:String,
        required: true,
        max: 500,
        unique: true, 
        collation: { locale: 'en_US', strength: 2 }
    },
    manager:{
        type: String,
        max:100
    },
    phoneNo:{
        type:String
    },
    address:{
        type:Object
    },
    code:{
        type: String,
        required: true,
        max: 500,
        unique: true
    },
    icName:{
        type: String
    },
    township:{
        type: String
    },
    email:{
        type: String
    },
    email2:{
        type: String
    },
    email3:{
        type: String
    },
    branchPhone:{
        type: String
    },
    user:{
        type: Number
    }
    
},{timestamps:true});

const Branch = mongoose.model('branch',BranchSchema);

module.exports = Branch;