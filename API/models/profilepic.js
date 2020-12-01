const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfilePicSchema = new Schema(
	{ 
		"user": {
			"type": String	
		},
		"applicantType":{
			"type": String
		},
		"s3Filename":{
			"type": String
		},
		"s3Url":{
			"type": String
		},
		"documentType":{
			"type": String
		},
		"deleteStatus":{
		    "type": String
		},	
		"applicationType":{
		    "type": String
		},	
	
	},{timestamps:true}
);
const ProfilePic = mongoose.model('profilepic', ProfilePicSchema);
// Export the model
module.exports =ProfilePic ;