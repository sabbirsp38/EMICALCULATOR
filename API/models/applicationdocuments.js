const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ApplicationDocumentsSchema = new Schema(
	{
	
        "applicationid": {
		    "type": String,
            "ref": "IndividualApplication"
        },
		"user": {
			"type": String,
			"ref": "User"
		},
		"applicationNumber":{
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
const Applicationdocuments = mongoose.model('applicationdocuments', ApplicationDocumentsSchema);
// Export the model
module.exports =Applicationdocuments ;