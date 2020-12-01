const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const CustomerSchema = new Schema({
	"user": {
		"type": String,
		"ref": "User"
	},
	"applicationNumber": {
		type: String
	},
	"refApplicationNumber": {
		type: Number
	},       
	"customerName": {
		type: String
	},
	"customerPhone": {
		type: String
	},        
	"customerHPaccount": {
		type: String
	},
	"productType": {
		type: String
	},
	"nric": {
		type: String
	},
	"submissionDate": {
		"type": String
	},
	"remark": {
		"type": String
	},
	"selectOffer": {
		"type": String
	},
	"processingLocation": {
		"type": String
	},

},{timestamps:true});

const Customer = mongoose.model('Customer',CustomerSchema);

// Export the model
module.exports = Customer;