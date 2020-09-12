const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companyDirectorSchema = new Schema({
    fullName:{type:String},
    middleName:{type:String},
    lastName:{type:String},
    firstName:{type:String},
    nrc:{type:String},
    dateOfBirth:{type:String}
});

const companyFinancialsSchema = new Schema({
    yearEnding:{type:String},
    turnOver:{type:String},
    taxPaid:{type:String},
    netProfitBeforeTax:{type:String}
})
const ApplicantSchema = new Schema(
    {
		
		"applicantType": {
            type: String
        }, 
		"title":{
            type: String
        },
		"firstName": {
            type: String
        },
		"lastName": {
            type: String
        },
		"dateOfBirth": {
            type: String
        },
		"gender": {
            type: String
        },
		"nrc": {
            type: String
        },
		"nationality": {
            type: String
        },
        "maritalStatus": {
            type: String
        },
        "noOfDependents": {
            type: String
        },
		"highestQualification": {
            type: String
        },
		"hQua":{
            type: String
        },
		"emergencyContactNumber": {
            type: String
        },
        "emergencyMobileNumber": {
            "type": String
        },
		 "relationShip":{
            type: String
        },
		"residentdetail1":{
			 type: String
		},
		"employmentStatus": {
            type: String
        },
		"currentAddress": {
            "type": Object
        },
        "permAddress": {
            "type": Object
        },
		"employerDetails": {
            "type": Object
        },
		"directorDetails":{
            type: [companyDirectorSchema]
        },
        "financials":{
            type: [companyFinancialsSchema]
        },
		"previousDetails": {
            "type": Object
        },
		"employmentDetails": {
            "type": Object
        },
		"contact": {
            "type": Object
        }, 
		"monthlyIncome":{
			 type: String
		},
		"companyName":{
			 type: String
		},
		"email": {
            type: String
        },
		"industry":{
            type: String
        },
		"occupation": {
            type: String
        },
		"joining_date": {
            type: String
        },
		"mobile": {
            type: String
        },
		"designation": {
            type: String
        },
		"nrc1": {
            type: String
        },
		"nrc2": {
            type: String
        },
		"nrc3": {
            type: String
        },
		"nrc4": {
            type: String
        },
		"nrc5": {
            type: String
        },
		"nrc5": {
            type: String
        },
		"current_address_line1": {
            type: String
        },
		"current_address_line2": {
            type: String
        },
		"current_address_line3": {
            type: String
        },
		"current_landmark": {
            type: String
        },
		"current_city": {
            type: String
        },
		"current_state": {
            type: String
        },
		"current_pincode": {
            type: String
        },
		"current_phone": {
            type: String
        },
		"permanent_address_line1": {
            type: String
        },
		"permanent_address_line2": {
            type: String
        },
		"permanent_address_line3": {
            type: String
        },
		"permanent_landmark": {
            type: String
        },
		"permanent_city": {
            type: String
        },
		"permanent_state": {
            type: String
        },
		"permanent_pincode": {
            type: String
        },
		"contact_mobile": {
            type: String
        },
		"contact_telephone": {
            type: String
        },
		"contact_email": {
            type: String
        },
		"previous_company_name": {
            type: String
        },
		"previous_occupation": {
            type: String
        },
		"previous_address1": {
            type: String
        },
		"previous_address2": {
            type: String
        },
		"previous_address3": {
            type: String
        },
		"previous_township": {
            type: String
        },
		"previous_City": {
            type: String
        },
		"previous_state": {
            type: String
        },
		"previous_pincode": {
            type: String
        },
		"previous_telephone": {
            type: String
        },
		"yearEnding": {
            type: String
        },
		"turnOver": {
            type: String
        },
		"taxPaid": {
            type: String
        },
		"netProfitBeforeTax": {
            type: String
        },
		"employment_yrs_in_emp": {
            type: String
        },
		"employment_months_in_emp": {
            type: String
        },
		"employment_month_income": {
            type: String
        },
		"other_income": {
            type: String
        },
		"employment_address_line1": {
            type: String
        },
		"employment_address_line2": {
            type: String
        },
		"employment_address_line3": {
            type: String
        },
		"employment_city": {
            type: String
        },
		"employment_state": {
            type: String
        },
		"employment_pincode": {
            type: String
        },
		"employment_telephone": {
            type: String
        },
		"companyapplicant": {
            "type": Object
        },
		"yearEnding2": {
            type: String
        },
		"turnOver2": {
            type: String
        },
		"taxPaid2": {
            type: String
        },
		"netProfitBeforeTax2": {
            type: String
        },
		"yearEnding3": {
            type: String
        },
		"turnOver3": {
            type: String
        },
		"taxPaid3": {
            type: String
        },
		"netProfitBeforeTax3": {
            type: String
        },
		"yearEnding4": {
            type: String
        },
		"turnOver4": {
            type: String
        },
		"taxPaid4": {
            type: String
        },
		"netProfitBeforeTax4": {
            type: String
        },
		"last_name":{
            type: String
        },
		"noofdependents":{
            type: String
        },
		"residentaddress":{
            type: String
        },
		"telephone":{
            type: String
        },
		"jointrelationship":{
			type: String
		},
		"salaried":{
			type: String
		},	
		"emergency_maritalStatus":{
			type: String
		},
		"salaried1":{
			type: String
		},
		"current_email":{
			type: String
		},
		
		
		

    },{timestamps:true}
);


const Applicant = mongoose.model('Applicant', ApplicantSchema);
// Export the model
module.exports = Applicant;