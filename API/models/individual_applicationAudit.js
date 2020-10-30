const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Applicant = require('./applicants');
const ApplicantAudit = require('./applicantsAudit');

const ApplicationAuditSchema = new Schema(
    {
		
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
        "accountWithAYABank": {
            type: String
        },
        "typeOfAccount": {
            type: String
        },        
        "brand": {
            type: String
        },
        "model": {
            type: String
        },
        "color": {
            type: String
        },
		"condition":{
            "type":String
        },
		"typeOfguarantor":{
			"type":String
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
        "mainApplicant": {
            "type": String,
            "ref": "ApplicantAudit"
        },
        "jointApplicant": {
            "type": String,
            "ref": "ApplicantAudit"
        },
        "garantor": {
            "type": String,
            "ref": "ApplicantAudit"
        },	
		"manDate":{
			"type": String
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
		"mainstatus":{
			"type": String
		},
		"garantorstatus":{
			"type": String
		},
		"jointstatus":{
			"type": String
		},
		"applicationStatus":{
			"type": String
		},
        "remarkBranch":{
            "type": String
        },
        "remarkCA":{
            "type": String
        },
		"documentStatus":{
		    "type": String
		},
		"submissionDate": {
            "type": String
        },
		"applicationType": {
            "type": String
        },
		"companyApplicant": {
            "type": String,
            "ref": "ApplicantAudit"
        },
		"companystatus": {
            "type": String
        },
		"applicantThreestatus": {
            "type": String
        },
		"applicantFourstatus": {
            "type": String
        },
		"oldBranch": {
            "type": String
        },
        "newBranch": {
            "type": String
        },
        "branchName": {
            "type": String
        },
		"branchCode": {
            "type": String
        },
        "township": {
            "type": String
        },
        "newCode": {
            "type": String
        },
		"documentsUploaddate": {
            "type": String
        },
		
		
		
		
		
    },{timestamps:true}
);

// UserSchema.pre("save", function (next) {
//     // if (!this.isModified("password")) {
//     //     return next();
//     // }
//     // this.password = Bcrypt.hashSync(this.password, 10);
//     next();
// });

const ApplicationAudit = mongoose.model('applicationAudit', ApplicationAuditSchema);
// Export the model
module.exports =ApplicationAudit ;