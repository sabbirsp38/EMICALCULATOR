const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTypeSchema = new Schema({
    type:{
        type:String,
    },
    name:{
        type:String,
        max: 500,
        unique: true
    },branch:{
        type:String,
    },dealer:{
        type:String,
    },contactNumber:{
        type:String,
    },checkStatus:{
        type:String,
    },reports:{
        type:String,
    },myApplication:{
        type:String,
    },pendingApplication:{
        type:String,
    },dealerOnboarding:{
        type:String,
    },individualApplication:{
        type:String,
    },companyApplication:{
        type:String,
    },autoLoan:{
        type:String,
    },personalLoan:{
        type:String,
    },domain:{
        type:String,
    },domainName:{
        type:String,
    }
},{timestamps:true});

const UserType = mongoose.model('userType',UserTypeSchema,'userTypes');

module.exports = UserType;