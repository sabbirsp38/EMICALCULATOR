const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyapplicationSchema = new Schema(
    {
		
		"user": {
			"type": String,
			"ref": "User"
		},
        "applicationNumber": {
            "type":String
        },
        "refApplicationNumber": {
            "type": Number
        },
		"accountWithAYABank": {
            "type":String
        },
        "typeOfAccount": {
            "type":String
        },        
        "brand": {
            "type":String
        },
        "model": {
           "type":String
        },
        "color": {
           "type":String
        },
		"condition":{
            "type":String
        },
		"guarantor":{
			"type":String
		},	
		"manDate":{
			"type":String
		},
		"regNum":{
			"type": String
		},
		"chaNum":{
			"type": String
		},
		"engNum":{
			"type": String
		},	
		"purprice": {
            "type": Number
        },
		"downpayment": {
            "type": Number
        },
		"loanamount": {
            "type": Number
        },
		"downamount": {
            "type": Number
        },
		"tenor": {
            "type": Number
        },		
		"previousStatus": {
            "type": String
        },
        "previousStatusDate":{
            "type":String
        },
        "currentStatus": {
            "type": String
        },
        "currentStatusDate": {
            "type": String
        },
		"companyapplicant": {
            "type": Object
        },	
		"image1": {
            "type": String
        },
		"submissionDate": {
            "type": String
        },
		
		
 },{timestamps:true}
);
const Companyapplication = mongoose.model('Companyapplication', CompanyapplicationSchema);
module.exports =Companyapplication ;		