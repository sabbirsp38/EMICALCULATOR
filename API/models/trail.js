const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrailSchema = new Schema({
   "applicationNumber": {
            type: String
        },
   "applicantType": {
            type: String
        },
    "date": {
            "type": String,
        },
    "remark": {
            "type": String, 
        },
     "userName" : {
            "type": String, 
        },								
	 "userType" : {
            "type": String, 
        },								
	 "userBranch" : {
            "type": String, 
        },								
	
    
},{timestamps:true});

const Trail = mongoose.model('Trail',TrailSchema);

module.exports = Trail;