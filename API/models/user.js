require("./userType");
require("./branch");
require("./dsa");
require("./dealer");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        max: 100
    },
    isFirstLogin:{
        type: Boolean,
        default: true
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    userTypeID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'userType',
        default: null,
       // required:true
    },
    dealerId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref:'dealer'
    },
    dsaId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'dsa'
    },
    branchId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'branch'
    },
    emailId:{
        type:String,
        required:true,
        unique: 1,
        trim:true
    },
    phone:{type:String},
    address:{type:String},
    branchName:{type:String},
    branchCode:{type:String},
    companyName:{type:String},
    companyAddress:{type:String},
    status:{type:String},
    activeStatus:{type:Number,default:0},
    application:{type:Number,default:0}
    
},{timestamps:true});



UserSchema.pre("save",function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('User',UserSchema);

// Export the model
module.exports = User;