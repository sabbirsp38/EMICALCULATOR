var IndividualApplication = require('../models/individual_application');
var Applicant = require('../models/applicants');
var User = require('../models/user');
var DealerNew = require('../models/dealerNew');
const nodemailer = require("nodemailer");
require('dotenv').config();
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var asyncLoop = require('node-async-loop');


let createApplication = async (req, res) => {
    // return new Promise(async (resolve, reject) => {
    
	
    //let refApplicationNumber = await getlastApplicationId();  
	//refApplicationNumber = ('000000' + ( parseInt(refApplicationNumber) + 1)).slice(-6); 
	 let refApplicationNumber = await getRandomInt(999999);
	// console.log("refApplicationNumber:=",refApplicationNumber);   
	
    let date = new Date(); 
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate()
    let year = date.getFullYear().toString();
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
	let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
	let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	let seconds = ((date.getSeconds() + 1) < 10 ? '0' : '') + date.getSeconds();
	let timenumber = hours.toString() + minutes.toString() + seconds.toString();
	var timedata = moment.tz("Asia/Yangon").format('LLLL');
	
    let appPrefix = '001';
    let applicationNumber = day.toString() + month.toString() + year + timenumber + refApplicationNumber
    let obj = {
		user:req.body.userid,
        applicationNumber: applicationNumber,
        refApplicationNumber: parseInt(refApplicationNumber),        
        accountWithAYABank:req.body.accountWithAYABank,
        typeOfAccount:req.body.typeOfAccount,       
        brand:req.body.brand,
        model:req.body.model,
        color:req.body.color,
		condition:req.body.condition,
		guarantor:req.body.guarantor, 	
		manDate:req.body.manDate,
		regNum:req.body.regNum,
		chaNum:req.body.chaNum,
		engNum:req.body.engNum,		
		typeOfguarantor:req.body.guarantor, 		
		purprice:req.body.purprice,
        downpayment:req.body.downpayment,
        downamount: req.body.downamount,
        loanamount:req.body.loanamount,
        tenor: req.body.tenor,	
		previousStatus: req.body.previousStatus,
		previousStatusDate:new Date(),
		currentStatus: req.body.currentStatus,
		currentStatusDate: new Date(),
		mainstatus:req.body.applicantDetail_status,
		garantorstatus:req.body.garantor_status,
		jointstatus:req.body.jointApplicant_status,
		applicationStatus:'Pending',
		submissionDate:timedata,
		applicationType:req.body.applicationType,
		companystatus:req.body.companyapplicant_status,
		applicantThreestatus:req.body.applicant3status,
		applicantFourstatus:req.body.applicant4status,
		branchName: req.body.branchName,	
		branchCode: req.body.branchCode,	
        
    };
	
	if(req.body.applicationType=='Company'){
		
		console.log("req.body.companyapplicant:=",req.body.companyapplicant);
		let companyapplicant = req.body.companyapplicant;
		obj["companyApplicant"] = await saveCompanyApplicants({ applicantType: "company", ...companyapplicant });
		var applicantname = req.body.companyapplicant.app1_firstName;
	    var applicantemail = req.body.companyapplicant.email;
	}else{
		let mainApplicant = req.body.applicantDetail;
        obj["mainApplicant"] = await saveApplicants({ applicantType: "main", ...mainApplicant });
 
		let garantor = req.body.garantor;
		obj["garantor"] = await saveApplicants({ applicantType: "garantor", ...garantor });
	
		let jointApplicant = req.body.jointApplicant;
		obj["jointApplicant"] = await saveApplicants({ applicantType: "joint", ...jointApplicant });
		var applicantname = req.body.applicantDetail.firstName;
	    var applicantemail = req.body.applicantDetail.current_email;
	}    
    let newApplication = await new IndividualApplication(obj).save();
	let emailstatus = await applicationemail(newApplication,applicantname,applicantemail);
    return newApplication;
    //});
}

let saveCompanyApplicants = async (applicantInfo) => {
	
	//console.log("applicantInfo:=",applicantInfo);
	var applicantdata = {
										
		"applicantType": applicantInfo.applicantType,
		"companyapplicant":applicantInfo,
	 }							
	console.log("applicantdata:=",applicantdata);
    let applicant = await new Applicant(applicantdata).save();
    console.log(applicant["_id"])
    return applicant["_id"] || 1;	

}
let saveApplicants = async (applicantInfo) => {
    //return new Promise(async (resolve, reject) => {
								
	if(applicantInfo.applicantType=='garantor'){
		applicantInfo.current_address_line1 = applicantInfo.address_line1;
		applicantInfo.current_address_line2 = applicantInfo.address_line2;
		applicantInfo.current_address_line3 = applicantInfo.address_line3;
		applicantInfo.current_landmark = applicantInfo.landmark;
		applicantInfo.current_city = applicantInfo.city;
		applicantInfo.current_state = applicantInfo.state;
		applicantInfo.current_pincode = applicantInfo.pincode;
		applicantInfo.current_phone = applicantInfo.telephone;
		applicantInfo.Occupation = applicantInfo.occupation
	}
								
	var applicantdata = {
		
		"applicantType": applicantInfo.applicantType,								
		"title": applicantInfo.title,        
        "firstName": applicantInfo.firstName,
        "lastName": applicantInfo.last_name,       
        "dateOfBirth": applicantInfo.dateOfBirth,
        "gender": applicantInfo.gender,		
        "nationality": applicantInfo.nationality,
        "maritalStatus": applicantInfo.maritalStatus,
        "noofdependents": applicantInfo.noofdependents,
		"hQua": applicantInfo.hQua,
		"highestQualification": applicantInfo.highest_qualification,
        "emergencyContactNumber": applicantInfo.emergency_ctc_nm,
        "emergencyMobileNumber": applicantInfo.emergency_mob,
        "relationShip": applicantInfo.relationShip,
        "residentdetail1": applicantInfo.residentdetail,
		"companyName":applicantInfo.company_name,
		"monthlyIncome":applicantInfo.occupation,
		//"email":applicantInfo.contect_email,
		//"contact":applicantInfo.contactDetails,
		"residentaddress": applicantInfo.residentaddress,
		"telephone":applicantInfo.telephone,
		"jointrelationship":applicantInfo.relationship,
		"salaried":applicantInfo.salaried,
		"salaried1":applicantInfo.salaried1,
		"emergency_maritalStatus":applicantInfo.emergency_maritalStatus,
		"current_email":applicantInfo.current_email,
        /*"currentAddress": applicantInfo.currentAddress,
		"permAddress": applicantInfo.permAddress,
        "employerDetails": applicantInfo.employerDetails,
		"financials": applicantInfo.financialDetails,
		"previousDetails": applicantInfo.previousDetails ,
		"employmentDetails": applicantInfo.employmentDetails,*/
		"employmentStatus": applicantInfo.employment_status,
		"industry": applicantInfo.industry,
		"occupation": applicantInfo.Occupation,
		"joining_date": applicantInfo.joining_date,
		"mobile": applicantInfo.mobile,
		"designation": applicantInfo.designation,
		"nrc1": applicantInfo.nrc1,
		"nrc2": applicantInfo.nrc2,
		"nrc3": applicantInfo.nrc3,
		"nrc4": applicantInfo.nrc4,
		"nrc5": applicantInfo.nrc5,
		"nrc": applicantInfo.nrc,
		"current_address_line1": applicantInfo.current_address_line1,
		"current_address_line2": applicantInfo.current_address_line2,
		"current_address_line3": applicantInfo.current_address_line3,
		"current_landmark": applicantInfo.current_landmark,
		"current_city": applicantInfo.current_city,
		"current_state": applicantInfo.current_state,
		"current_pincode": applicantInfo.current_pincode,
		"current_phone": applicantInfo.current_phone,
		"permanent_address_line1": applicantInfo.permanent_address_line1,
		"permanent_address_line2": applicantInfo.permanent_address_line2,
		"permanent_address_line3": applicantInfo.permanent_address_line3,
		"permanent_landmark": applicantInfo.permanent_landmark,
		"permanent_city": applicantInfo.permanent_city,
		"permanent_state": applicantInfo.permanent_state,
		"permanent_pincode": applicantInfo.permanent_pincode,
		"contact_mobile": applicantInfo.contact_mobile,
		"contact_telephone": applicantInfo.contact_telephone,
		"contact_email": applicantInfo.contact_email,
		"previous_company_name": applicantInfo.previous_company_name,
		"previous_occupation": applicantInfo.previous_occupation,
		"previous_address1": applicantInfo.previous_address1,
		"previous_address2": applicantInfo.previous_address2,
		"previous_address3": applicantInfo.previous_address3,
		"previous_township": applicantInfo.previous_township,
		"previous_City": applicantInfo.previous_City,
		"previous_state": applicantInfo.previous_state,
		"previous_pincode": applicantInfo.previous_pincode,
		"previous_telephone": applicantInfo.previous_telephone,		
		"employment_yrs_in_emp": applicantInfo.employment_yrs_in_emp,
		"employment_months_in_emp": applicantInfo.employment_months_in_emp,
		"employment_month_income": applicantInfo.employment_month_income,
		"other_income": applicantInfo.other_income,
		"employment_address_line1": applicantInfo.employment_address_line1,
		"employment_address_line2": applicantInfo.employment_address_line2,
		"employment_address_line3": applicantInfo.employment_address_line3,
		"employment_city": applicantInfo.employment_city,
		"employment_state": applicantInfo.employment_state,
		"employment_pincode": applicantInfo.employment_pincode,
		"employment_telephone": applicantInfo.employment_telephone,
		"yearEnding": applicantInfo.yearEnding,
		"turnOver": applicantInfo.turnOver,
		"taxPaid": applicantInfo.taxPaid,
		"netProfitBeforeTax": applicantInfo.netProfitBeforeTax,
		"yearEnding2": applicantInfo.yearEnding2,
		"turnOver2": applicantInfo.turnOver2,
		"taxPaid2": applicantInfo.taxPaid2,
		"netProfitBeforeTax2": applicantInfo.netProfitBeforeTax2,
		"yearEnding3": applicantInfo.yearEnding3,
		"turnOver3": applicantInfo.turnOver3,
		"taxPaid3": applicantInfo.taxPaid3,
		"netProfitBeforeTax3": applicantInfo.netProfitBeforeTax3,
		"yearEnding4": applicantInfo.yearEnding4,
		"turnOver4": applicantInfo.turnOver4,
		"taxPaid4": applicantInfo.taxPaid4,
		"netProfitBeforeTax4": applicantInfo.netProfitBeforeTax4,
		
		
    }							
	//console.log("applicantdata:=",applicantdata);
   
    let applicant = await new Applicant(applicantdata).save();
    console.log(applicant["_id"])
    //resolve(applicant["_id"] || 1);
    return applicant["_id"] || 1;
    // });
}
let updateApplicant = async (req) => {
	
	console.log("req.body:=",req.body);  
	
	
    let applicationObj={ ...req.body};	
	let garantorDetails = { ...req.body.garantor };
	let jointDetails = { ...req.body.jointApplicant };
	console.log("Update Application:=",applicationObj);	
	applicationObj.typeOfguarantor = applicationObj.guarantor;
	
    delete applicationObj.applicationNumber;
	delete applicationObj.garantor;
	delete applicationObj.jointApplicant;
	//console.log("applicationObj:=",applicationObj);	
    applicationObj["previousStatusDate"]=new Date();
    applicationObj["currentStatusDate"]=new Date();
    let result = await IndividualApplication.findOneAndUpdate({ _id: req.body.applicationNumber }, applicationObj, { new: true, lean: true, useFindAndModify: false });
    try {
        /*let result = await Applicant.findOneAndUpdate({ _id: req.body.applicantDetail.applicantId }, applicantObj, { new: true, lean: true, useFindAndModify: false });
		let result1 = await Applicant.findOneAndUpdate({ _id: req.body.garantor.garantorId }, garantorObj, { new: true, lean: true, useFindAndModify: false });
		let result2 = await Applicant.findOneAndUpdate({ _id: req.body.jointApplicant.jointId }, jointObj, { new: true, lean: true, useFindAndModify: false });*/
		
		console.log("applicantId:=",result.mainApplicant);
		console.log("garantor:=",result.garantor);
		console.log("jointApplicant:=",result.jointApplicant);
		if(result.mainApplicant){
			 let applicantObj = { ...req.body.applicantDetail };	
			 delete applicantObj['applicantId'];
			 var mainresult = await updateApplicants({ applicantType: "main", applicantId:result.mainApplicant,  applicantdata:applicantObj });
	    }
		 let garantorObj = { ...garantorDetails  };
		 delete garantorObj['garantorId'];		 
		 var garantorresult = await updateApplicants({ applicantType: "garantor", applicantId:result.garantor,  applicantdata:garantorObj });
		 
		 console.log("jointDetails.firstName:=",jointDetails.firstName);
		 if ("undefined" !== typeof jointDetails.firstName && jointDetails.firstName != '' && jointDetails.firstName != null){
			 let jointObj = { ...jointDetails  };
			 delete jointObj['jointId'];
			 var jointresult = await updateApplicants({ applicantType: "joint", applicantId:result.jointApplicant, applicantdata:jointObj });
		 }
			
        let response;
        response = {
            success: true,
            result: { ...mainresult },
			garantor: { ...garantorresult },
			jointApplicant: { ...jointresult }
        }
        return response
    } catch (e) {
        return ({
            success: false,
            error: e
        })
    }


   
}

let updateApplicants = async (applicantres) => {

   return new Promise(async (resolve, reject) => {
	
	 var applicantInfo = applicantres.applicantdata;
	 var applicantId = applicantres.applicantId;
	 
     if(applicantres.applicantType=='garantor'){
		   var applicantObj = {	 
			"applicantType": applicantres.applicantType,								
			"title": applicantInfo.title,        
			"firstName": applicantInfo.firstName,
			"lastName": applicantInfo.last_name,       
			"dateOfBirth": applicantInfo.dateOfBirth,
			"gender": applicantInfo.gender,
			"nrc1": applicantInfo.nrc1,
			"nrc2": applicantInfo.nrc2,
			"nrc3": applicantInfo.nrc3,
			"nrc4": applicantInfo.nrc4,
			"nrc5": applicantInfo.nrc5,
			"nrc": applicantInfo.nrc,
			"current_address_line1": applicantInfo.address_line1,
			"current_address_line2": applicantInfo.address_line2,
			"current_address_line3": applicantInfo.address_line3,
			"current_landmark": applicantInfo.landmark,
			"current_city": applicantInfo.city,
			"current_state": applicantInfo.state,
			"current_pincode": applicantInfo.pincode,
			"occupation": applicantInfo.occupation,
			"residentaddress": applicantInfo.residentaddress,
			"telephone":applicantInfo.telephone,
			"companyName":applicantInfo.company_name,
			"contact_mobile": applicantInfo.contact_mobile,
			"contact_telephone": applicantInfo.contact_telephone,
			"contact_email": applicantInfo.contact_email,
		   }
	   
	}else{
								
		   var applicantObj = {
											
			"applicantType": applicantres.applicantType,								
			"title": applicantInfo.title,        
			"firstName": applicantInfo.firstName,
			"lastName": applicantInfo.last_name,       
			"dateOfBirth": applicantInfo.dateOfBirth,
			"gender": applicantInfo.gender,		
			"nationality": applicantInfo.nationality,
			"maritalStatus": applicantInfo.maritalStatus,
			"noofdependents": applicantInfo.noofdependents,
			"hQua": applicantInfo.hQua,
			"highestQualification": applicantInfo.highest_qualification,
			"emergencyContactNumber": applicantInfo.emergency_ctc_nm,
			"emergencyMobileNumber": applicantInfo.emergency_mob,
			"relationShip": applicantInfo.relationShip,
			"residentdetail1": applicantInfo.residentdetail,
			"companyName":applicantInfo.company_name,
			"monthlyIncome":applicantInfo.occupation,
			//"email":applicantInfo.contect_email,
			//"contact":applicantInfo.contactDetails,
			"residentaddress": applicantInfo.residentaddress,
			"telephone":applicantInfo.telephone,
			"jointrelationship":applicantInfo.relationship,
			"salaried":applicantInfo.salaried,
			"salaried1":applicantInfo.salaried1,
			"emergency_maritalStatus":applicantInfo.emergency_maritalStatus,
			"current_email":applicantInfo.current_email,			
			"employmentStatus": applicantInfo.employment_status,
			"industry": applicantInfo.industry,
			"occupation": applicantInfo.Occupation,
			"joining_date": applicantInfo.joining_date,
			"mobile": applicantInfo.mobile,
			"designation": applicantInfo.designation,
			"nrc1": applicantInfo.nrc1,
			"nrc2": applicantInfo.nrc2,
			"nrc3": applicantInfo.nrc3,
			"nrc4": applicantInfo.nrc4,
			"nrc5": applicantInfo.nrc5,
			"nrc": applicantInfo.nrc,
			"current_address_line1": applicantInfo.current_address_line1,
			"current_address_line2": applicantInfo.current_address_line2,
			"current_address_line3": applicantInfo.current_address_line3,
			"current_landmark": applicantInfo.current_landmark,
			"current_city": applicantInfo.current_city,
			"current_state": applicantInfo.current_state,
			"current_pincode": applicantInfo.current_pincode,
			"current_phone": applicantInfo.current_phone,
			"permanent_address_line1": applicantInfo.permanent_address_line1,
			"permanent_address_line2": applicantInfo.permanent_address_line2,
			"permanent_address_line3": applicantInfo.permanent_address_line3,
			"permanent_landmark": applicantInfo.permanent_landmark,
			"permanent_city": applicantInfo.permanent_city,
			"permanent_state": applicantInfo.permanent_state,
			"permanent_pincode": applicantInfo.permanent_pincode,
			"contact_mobile": applicantInfo.contact_mobile,
			"contact_telephone": applicantInfo.contact_telephone,
			"contact_email": applicantInfo.contact_email,
			"previous_company_name": applicantInfo.previous_company_name,
			"previous_occupation": applicantInfo.previous_occupation,
			"previous_address1": applicantInfo.previous_address1,
			"previous_address2": applicantInfo.previous_address2,
			"previous_address3": applicantInfo.previous_address3,
			"previous_township": applicantInfo.previous_township,
			"previous_City": applicantInfo.previous_City,
			"previous_state": applicantInfo.previous_state,
			"previous_pincode": applicantInfo.previous_pincode,
			"previous_telephone": applicantInfo.previous_telephone,		
			"employment_yrs_in_emp": applicantInfo.employment_yrs_in_emp,
			"employment_months_in_emp": applicantInfo.employment_months_in_emp,
			"employment_month_income": applicantInfo.employment_month_income,
			"other_income": applicantInfo.other_income,
			"employment_address_line1": applicantInfo.employment_address_line1,
			"employment_address_line2": applicantInfo.employment_address_line2,
			"employment_address_line3": applicantInfo.employment_address_line3,
			"employment_city": applicantInfo.employment_city,
			"employment_state": applicantInfo.employment_state,
			"employment_pincode": applicantInfo.employment_pincode,
			"employment_telephone": applicantInfo.employment_telephone,
			"yearEnding": applicantInfo.yearEnding,
			"turnOver": applicantInfo.turnOver,
			"taxPaid": applicantInfo.taxPaid,
			"netProfitBeforeTax": applicantInfo.netProfitBeforeTax,
			"yearEnding2": applicantInfo.yearEnding2,
			"turnOver2": applicantInfo.turnOver2,
			"taxPaid2": applicantInfo.taxPaid2,
			"netProfitBeforeTax2": applicantInfo.netProfitBeforeTax2,
			"yearEnding3": applicantInfo.yearEnding3,
			"turnOver3": applicantInfo.turnOver3,
			"taxPaid3": applicantInfo.taxPaid3,
			"netProfitBeforeTax3": applicantInfo.netProfitBeforeTax3,
			"yearEnding4": applicantInfo.yearEnding4,
			"turnOver4": applicantInfo.turnOver4,
			"taxPaid4": applicantInfo.taxPaid4,
			"netProfitBeforeTax4": applicantInfo.netProfitBeforeTax4,
			
		  }
    }							
	console.log("applicantdata:=",applicantObj);
	
	let result = await Applicant.findOneAndUpdate({ _id: applicantId }, applicantObj, { new: true, lean: true, useFindAndModify: false });
	resolve(result);
  })
}
let getApplicationsByRoleId = async (req, res) => {
    new Promise(async (resolve, reject) => {
        const applications = await IndividualApplication.find({ createdByRole: "" + req.params.roleId }, (err, docs) => {
            console.log(docs);
            resolve(docs);
            res.status(201).json(docs);
        });
    })
}
let getlastApplicationId = async () => {
    const a = await IndividualApplication.aggregate([
        {
            "$group": {
                "_id": null,
                "MaximumValue": { "$max": "$refApplicationNumber" }
            }
        }
    ]);
    return (a.length > 0 && a[0].MaximumValue) ? a[0].MaximumValue : 0;
}

let searchApplications = async (req) => {
	
	return new Promise(async (resolve, reject) => {
	var resultarray = [];					
    let number = req.query.number;
    let branchCode = req.query.branchCode;
    let applicationStatus = req.query.applicationStatus;
    let limit = req.query.limit;
	let userid = req.query.userid;	
    let {startDate, endDate} = req.query;
	let userdata = await getuserTypeDataById(userid);
	let admin = req.query.admin;
	let applicationtype = req.query.applicationtype;
	let dashboard = req.query.dashboard;
	let status = req.query.status;
	let guarantor = req.query.guarantor;
	let industry = req.query.industry;
	let startPrice = req.query.startPrice;
	let endPrice = req.query.endPrice;
	let region = req.query.region;
	let customerType = req.query.customerType;
	
    if(dashboard){
		 console.log(req.query);
                 var criteria = {
					previousStatus:'new'
				   };
				  if(startDate || endDate)
				  	criteria.createdAt={ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))};
				  if(branchCode)
				  	criteria.branchCode=branchCode;
				  if(applicationtype)
				  	criteria.applicationType=applicationtype;
				  if(status)
				  	criteria.applicationStatus=status;
				  if(guarantor)
				  	criteria.typeOfguarantor=guarantor;
				  if(startPrice || endPrice)
				  	criteria.purprice={$gte : startPrice, $lte: endPrice};
				  if(customerType)
				  	criteria.accountWithAYABank=customerType;
				  

				//   if(startDate || endDate){
				//  	  if(status && applicationtype && branchCode)
				//  	    {
				//  	    	var criteria = {
				// 		createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},applicationStatus:status,branchCode:branchCode,applicationType:applicationtype
				// 	      };
				//  	    }else if(applicationtype && branchCode)
				//  	    {
	   //                   var criteria = {
				// 		createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationType:applicationtype
				// 	      };
				//  	    }else if(status && branchCode)
				//  	    {
	   //                   var criteria = {
				// 		createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationStatus:status
				// 	      };
				//  	    }else if(branchCode){
				//      	var criteria = {
				// 		createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode
				// 	     };
				// 	    }else{
		  //             var criteria = {
			 //           createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
				// 	     };
				// 	   }
				//  }	
			 //   else if(branchCode){
			 // 	    if(status && applicationtype)
			 // 	    {
			 // 	    	var criteria = {
				// 	applicationStatus:status,branchCode:branchCode,applicationType:applicationtype
				//       };
			 // 	    }else if(applicationtype)
			 // 	    {
    //                  var criteria = {
				// 	branchCode:branchCode,applicationType:applicationtype
				//       };
			 // 	    }else if(status)
			 // 	    {
    //                  var criteria = {
				// 	branchCode:branchCode,applicationStatus:status
				//       };
			 // 	    }else{
			 //     	var criteria = {
				// 	branchCode:branchCode
				//      };
				//     }
	
			 // }
			 // else if(status){

			 // 	   if(applicationtype)
			 // 	    {
    //                  var criteria = {
				// 	applicationStatus:status,applicationType:applicationtype
				//       };
			 // 	    }else{
			 //     	var criteria = {
				// 	applicationStatus:status,
				//       };
				//     }
			 //   }
			 // else if(applicationtype){
			 //     	var criteria = {
				// 	applicationType:applicationtype
				//    };
			 //     }
			 // else{
    //              var criteria = {
				// 	previousStatus:'new'
				//    };
			 // }
			 var results = await IndividualApplication.find(criteria).populate("mainApplicant jointApplicant garantor companyApplicant").exec(); 
			 
					  resolve(results);

    }
    else if(number){
		 //console.log("number=====",number);
		  if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		  { 	 
		     var userdatastring = JSON.stringify(userdata);	 
			 userdatastring = JSON.parse(userdatastring);	
			 if(admin){
			     	var criteria = {
					applicationNumber:number
				   };
	
			 }
			 // else if(userdatastring.userTypeID.myApplication=='no' || userdatastring.userTypeID.pendingApplication=='no'){
			 //     	var criteria = {
				// 	applicationNumber:number
				//    };
	
			 // }
			 else if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
			     if(branchCode && applicationStatus){
			     	var criteria = {
					applicationNumber:number,branchCode:branchCode,applicationStatus:'Ops Verified',
				   };
			     }else if(branchCode){
			     	var criteria = {
					applicationNumber:number,branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},
				   };
			     }else{
			     	var criteria = {
					applicationNumber:number,branchCode:userdatastring.branchCode,
				   };
			     }
			     
			 }
			 else{
			 	if(branchCode && applicationStatus){
			     	var criteria = {
					applicationNumber:number,user:userid,branchCode:branchCode,applicationStatus:'Ops Verified',
				   };
			     }else if(branchCode){
			     	var criteria = {
					applicationNumber:number,user:userid,branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},
				   };
			     }else{
			     	var criteria = {
					applicationNumber:number,user:userid
				   };
			     }
				 
			 }
			 var results = await IndividualApplication.find(criteria).populate("mainApplicant jointApplicant garantor companyApplicant").exec(); 
			 if ("undefined" !== typeof results && results != '' && results != null) 
			 { 
				 var myJsonString = JSON.stringify(results[0]);	
				  myJsonString = JSON.parse(myJsonString);
				  if(myJsonString.companyApplicant){
					   myJsonString.mainApplicant = myJsonString.companyApplicant.companyapplicant;
					   myJsonString.mainApplicant.applicantId = myJsonString.companyApplicant._id;
					   myJsonString.mainApplicant.firstName = myJsonString.mainApplicant.app1_firstName;
					   myJsonString.mainApplicant.lastName = myJsonString.mainApplicant.app1_last_name;
					  delete myJsonString.companyApplicant;
					  resultarray[0] = myJsonString;
					  resolve(resultarray);
				  }else{
					  
					  if ("undefined" !== typeof myJsonString.mainApplicant && myJsonString.mainApplicant != '' && myJsonString.mainApplicant != null) 
					  { 	
					     resultarray[0] = myJsonString;
					     resolve(resultarray);
					  }else{
						 resolve(results); 
					  }
				  }	 
				  
			 }else{
					  resolve(results);
				  }	
				  
		 }
		 else
		 {
			 resolve({code:400, err:'No Record Found'});
		 }		  
		
    }
   else if(startDate || endDate){
        let currentDate = new Date();
		
        
		 if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		 {
				 var userdatastring = JSON.stringify(userdata);	 
				 userdatastring = JSON.parse(userdatastring);		
				 //console.log("userdatastring.userTypeID.name=====",userdatastring.userTypeID.name);
				  if(admin){
			     	var criteria = {
					createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
				   };
	
			 }
			 // else if(userdatastring.userTypeID.myApplication=='no' || userdatastring.userTypeID.pendingApplication=='no'){
			 //     	var criteria = {
				// 	createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
				//    };
	
			 // }
			 else if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
					 if(branchCode && applicationStatus){
			     	var criteria = {
					createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationStatus:'Ops Verified',
				   };
			      }else if(branchCode){
			     	var criteria = {
					createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},
				   };
			       }else{
			     	var criteria = {
						createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:userdatastring.branchCode,
					 };
			       }

				}else{
				 	if(branchCode && applicationStatus){
			     	var criteria = {
					user:userid,createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationStatus:'Ops Verified',
				   };
			       }else if(branchCode){
			     	var criteria = {
					user:userid,createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},
				   }
			       }else{

			     	var criteria = {
						user:userid,createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
					 };
			      }
				 }
				 IndividualApplication
				  .find(criteria)
				  .populate("mainApplicant jointApplicant garantor companyApplicant")
				  .then(function(userData) {
					  
					 if ("undefined" !== typeof userData && userData != '' && userData != null) {
						 
							  var myJsonString;
							  asyncLoop(userData, async function (shopinfo, next){
								 var myJsonString = JSON.stringify(shopinfo);	 
								 myJsonString = JSON.parse(myJsonString);
								 if ("undefined" !== typeof myJsonString.companyApplicant && myJsonString.companyApplicant != '' && myJsonString.companyApplicant != null) {
									   myJsonString.mainApplicant = myJsonString.companyApplicant.companyapplicant;
									   myJsonString.mainApplicant.firstName = myJsonString.mainApplicant.app1_firstName;
									   myJsonString.mainApplicant.lastName = myJsonString.mainApplicant.app1_last_name;
									  delete myJsonString.companyApplicant;
									  resultarray.push(myJsonString);
								  }else{
									  resultarray.push(shopinfo);
								  }
								 next();								
							  }, async function (err){
								   resolve(resultarray);
							  });	
					   
					}else{
						 
						 resolve({code:400, err:'No Record Found'});
					 }		
				
				});		   
		  
	     }
		 else
		 {
			 resolve({code:400, err:'No Record Found'});
		 }
											 
    }
    
    else if(branchCode && applicationStatus){
        let currentDate = new Date();
		 if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		 {
				 var userdatastring = JSON.stringify(userdata);	 
				 userdatastring = JSON.parse(userdatastring);		
				 //console.log("userdatastring.userTypeID.name=====",userdatastring.userTypeID.name);
				 if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
			     var criteria = {
					branchCode:branchCode,applicationStatus:'Ops Verified',
				 };
			 }else{
				 var criteria = {
					branchCode:branchCode,applicationStatus:'Ops Verified',user:userid,
				 };
			 }
				 IndividualApplication
				  .find(criteria)
				  .populate("mainApplicant jointApplicant garantor companyApplicant")
				  .then(function(userData) {
					  
					 if ("undefined" !== typeof userData && userData != '' && userData != null) {
							  var myJsonString;
							  asyncLoop(userData, async function (shopinfo, next){
								 var myJsonString = JSON.stringify(shopinfo);	 
								 myJsonString = JSON.parse(myJsonString);
								 if ("undefined" !== typeof myJsonString.companyApplicant && myJsonString.companyApplicant != '' && myJsonString.companyApplicant != null) {
									   myJsonString.mainApplicant = myJsonString.companyApplicant.companyapplicant;
									   myJsonString.mainApplicant.firstName = myJsonString.mainApplicant.app1_firstName;
									   myJsonString.mainApplicant.lastName = myJsonString.mainApplicant.app1_last_name;
									  delete myJsonString.companyApplicant;
									  resultarray.push(myJsonString);
								  }else{
									  resultarray.push(shopinfo);
								  }
								 next();								
							  }, async function (err){
								   resolve(resultarray);
							  });	
					   
					}else{
						 
						 resolve({code:400, err:'No Record Found'});
					 }		
				
				});		   
		  
	     }
		 else
		 {
			 resolve({code:400, err:'No Record Found'});
		 }
											 
    }
    else if(branchCode){
        let currentDate = new Date();

		 if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		 {
				 var userdatastring = JSON.stringify(userdata);	 
				 userdatastring = JSON.parse(userdatastring);		
				 //console.log("userdatastring.userTypeID.name=====",userdatastring.userTypeID.name);
				 if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
			     var criteria = {
					branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},
				 };
			 }else{
				 var criteria = {
					branchCode:branchCode,applicationStatus:{$ne: 'Ops Verified'},user:userid,
				 };
			 }
				 IndividualApplication
				  .find(criteria)
				  .populate("mainApplicant jointApplicant garantor companyApplicant")
				  .then(function(userData) {
					  
					 if ("undefined" !== typeof userData && userData != '' && userData != null) {
						 
							  var myJsonString;
							  asyncLoop(userData, async function (shopinfo, next){
								 var myJsonString = JSON.stringify(shopinfo);	 
								 myJsonString = JSON.parse(myJsonString);
								 if ("undefined" !== typeof myJsonString.companyApplicant && myJsonString.companyApplicant != '' && myJsonString.companyApplicant != null) {
									   myJsonString.mainApplicant = myJsonString.companyApplicant.companyapplicant;
									   myJsonString.mainApplicant.firstName = myJsonString.mainApplicant.app1_firstName;
									   myJsonString.mainApplicant.lastName = myJsonString.mainApplicant.app1_last_name;
									  delete myJsonString.companyApplicant;
									  resultarray.push(myJsonString);
								  }else{
									  resultarray.push(shopinfo);
								  }
								 next();								
							  }, async function (err){
								   resolve(resultarray);
							  });	
					   
					}else{
						 
						 resolve({code:400, err:'No Record Found'});
					 }		
				
				});		   
		  
	     }
		 else
		 {
			 resolve({code:400, err:'No Record Found'});
		 }
											 
    }

	
  })
    
}

let getRandomInt = async (maxnum) => {

 return Math.floor(Math.random() * Math.floor(maxnum));
    
}

let applicationemail = async (applicationDetails,applicantname,applicantemail) => {
	
	 let userdata = await getuserTypeDataById(applicationDetails.user);
	 var myJsonString = JSON.stringify(userdata.userTypeID);
	 myJsonString = JSON.parse(myJsonString);
	 let siteurl = process.env.siteurl;
	 let transporter = nodemailer.createTransport({
		  service: 'gmail',
    host: "smtp.gmail.com",
    //host: "smtp.mail.eu-west-1.awsapps.com",
    //     port: 465,
    //    secure: true,
    port: 25,
    secure: false, // true for 465, false for other ports
    //     auth: {
    //    user: 'applications@gotoaya.com',
    //    pass: 'm9nKXFAZ7DQ9N5kK'
    // }
    auth: {
      user: 'msaddekhosain@gmail.com',
      pass: 'M028243m'
    }
	  });
	 
	  let adminOptions = {		  
		    from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
			to: process.env.adminemail,
            subject: "Application Request", // Subject line
            html: ` <table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.pn" alt="Company Logo" style="width:30%;"/></td>
			 </tr>
			 <tr>
			  <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear Harish</h3>
				<p>The following user has submitted the application to bank for necessary processing. The application number is ${applicationDetails.applicationNumber}</p>
				<p >Name : ${userdata.name} , <br>
				User Type : ${myJsonString.name} , <br>
				Branch Name : ${userdata.branchName} , <br>
				Branch Code : ${userdata.branchCode} , <br>
				Company Name : ${userdata.companyName} , <br>
				Company Address : ${userdata.companyAddress} , <br>
				Mobile number : ${userdata.phone} , <br>
				Email Address : ${userdata.emailId} </p>				
			  </td>
			 </tr>
			</table>
			<p>Sincerely,<br>Loan Department</p>` 		  
	  }
	  
	  let applicantOption = {
		     from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
			to: applicantemail,
			//to: 'muthaiah@securenext.net',
            subject: "Application Request", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.pn" alt="Company Logo" style="width:30%;"/></td>
			 </tr>
			 <tr>
			  <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear ${applicantname}</h3>
				<p> We are in receipt of your application. The application number is ${applicationDetails.applicationNumber}</p>
				<p> The detail form (as filled) has been submitted to the bank for necessary processing. The bank will be in touch with you with regards to your application and keep you posted through email as well.</p>
				<p> We thank you for your interest in AYA Bank and kind patronage.</p>
				<p>Sincerely,<br>Loan Department</p>
			  </td>
			 </tr>
			</table>`
		  
		  
	  }
	  
	  let submittedOptions = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
			to: userdata.emailId,
			//to: 'muthumuthaiah@yahoo.co.in',
            subject: "Application Request", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.pn" alt="Company Logo" style="width:30%;"/></td>
			 </tr>
			 <tr>
			  <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear ${userdata.name}</h3>
				<p> Thanks for submitting your online registration form. The request has been submitted to the bank for processing. Once the decision has been made by the bank, you will receive an intimation on your email. </p>
				<p> Application Number: ${applicationDetails.applicationNumber}</p>
				<p> Thanks for your interest in AYA Bank.</p>
				<p>Sincerely,<br>Loan Department</p>
			  </td>
			 </tr>
			</table>`
            
          };
          // send mail with defined transport object
		  let info = await transporter.sendMail(adminOptions);
		  let applicant = await transporter.sendMail(applicantOption);
          let submitted = await transporter.sendMail(submittedOptions);
          return info;
	
}

let getuserDataById = async (userId) =>{
		//let userData = await User.findOne({'_id':userId}).populate('userTypeID').exec();
		 var userData = await User.findById(userId);
		 return userData;
}
let getuserTypeDataById = async (userId) =>{
		var userData = await User.findOne({'_id':userId}).populate('userTypeID').exec();
		// var userData = await User.findById(userId);
		 return userData;
}
let getApplicationFormStatus = async (req) => {
    let applicationid = req.params.applicationid;
    if(applicationid){
        var results = await IndividualApplication.findById(applicationid).populate("mainApplicant jointApplicant garantor companyApplicant").exec();  
		return results;
    }
    else {
        var results ='NoApplicationFound'; 
		 return results;
    }
}
let getDealer = async (req) => {
    let applicationid = req.params.applicationid;
    if(applicationid){
        var results = await DealerNew.findById(applicationid).exec();  
		return results;
    }
    else {
        var results ='NoApplicationFound'; 
		 return results;
    }
}

let reportApplications = async (req) => {
	
	return new Promise(async (resolve, reject) => {
						
    let number = req.query.number;
    let limit = req.query.limit;
	let userid = req.query.userid;
	let applicationtype = req.query.applicationType;
	let userdata = await getuserTypeDataById(userid);
    let {startDate, endDate} = req.query;
	var resultarray = [];
	
	/*console.log("startDate=====",startDate);
	console.log("endDate=====",endDate);
	console.log("applicationtype=====",applicationtype);
	console.log("userid=====",userid);*/
	
    if(number){
		// console.log("number=====",number);
		 if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		 {
			 var userdatastring = JSON.stringify(userdata);	 
			 userdatastring = JSON.parse(userdatastring);		
			// console.log("userdatastring.userTypeID.name=====",userdatastring.userTypeID.name);
			 // if(userdatastring.userTypeID.myApplication=='no' || userdatastring.userTypeID.pendingApplication=='no'){
			 //     	var criteria = {
				// 	applicationNumber:number,
				// 	applicationType:applicationtype,
				//    };
	
			 // }
			 //else 
			 	if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
				  var criteria = {
					  applicationNumber:number,
					  applicationType:applicationtype,branchCode:userdatastring.branchCode,
				  };
			 }else{
				  var criteria = {
					  applicationNumber:number,
					  user:userid,
					  applicationType:applicationtype,
				  };
			 }
		 
        
			 IndividualApplication
			  .find({})
			  .populate("mainApplicant jointApplicant garantor companyApplicant")
			  .then(function(appData) {
							 
				if ("undefined" !== typeof appData && appData != '' && appData != null) {			 
					var myJsonString = JSON.stringify(appData[0]);	 
					myJsonString = JSON.parse(myJsonString);
				 if ("undefined" !== typeof myJsonString.mainApplicant && myJsonString.mainApplicant != '' && myJsonString.mainApplicant != null) { 	
						
					delete myJsonString.documentStatus;
					//console.log("myJsonString1111111=====",myJsonString);
					resultarray[0] = myJsonString;
					resolve({code:200, resarray:resultarray});
				 }else{
					  myJsonString.companyApplicant = myJsonString.companyApplicant.companyapplicant;
					  delete myJsonString.documentStatus;
					  delete myJsonString.companystatus;
					 resultarray[0] = myJsonString;
					 resolve({code:200, resarray:resultarray});
				 }
					 
				}else{
					 resolve({code:400, err:'No Record Found'});
				 }	 
			});		
		  
	   }
	   else
	   {
		 resolve({code:400, err:'No Record Found'});
	   }	  
		  
		  
    }
    else if(startDate || endDate){
        let currentDate = new Date();
		 
		 if ("undefined" !== typeof userdata && userdata != '' && userdata != null)
		 {
			 var userdatastring = JSON.stringify(userdata);	 
			 userdatastring = JSON.parse(userdatastring);		
			// console.log("userdatastring.userTypeID.name=====",userdatastring.userTypeID.name);
			 // if(userdatastring.userTypeID.myApplication=='no' || userdatastring.userTypeID.pendingApplication=='no'){
			 //     	var criteria = {
				// 	createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
				//    applicationType:applicationtype,
				//    };
	
			 // }else 
			 if(userdatastring.userTypeID.myApplication=='yes' || userdatastring.userTypeID.pendingApplication=='yes'){
				 var criteria = {
					createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
					applicationType:applicationtype,branchCode:userdatastring.branchCode,
				 };
			 }else{
				  var criteria = {
					createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
					user:userid,
					applicationType:applicationtype,
				  };
			 }
 
			 IndividualApplication
			  .find(criteria)
			  .populate("mainApplicant jointApplicant garantor companyApplicant")
			  .then(function(appData) {
					 if ("undefined" !== typeof appData && appData != '' && appData != null) { 
							  var myJsonString;
							  asyncLoop(appData, async function (shopinfo, next){
										 var myJsonString = JSON.stringify(shopinfo);	 
										 myJsonString = JSON.parse(myJsonString);
										 let appuserdata = await getuserTypeDataById(myJsonString.user);
										if ("undefined" !== typeof myJsonString.mainApplicant && myJsonString.mainApplicant != '' && myJsonString.mainApplicant != null) { 
											if(appuserdata){
											myJsonString.username = appuserdata.emailId;
											myJsonString.dealerName = appuserdata.companyName;
											myJsonString.dealerAddress = appuserdata.companyAddress;
											myJsonString.userBranchCode = appuserdata.branchCode;
											}
										    
											myJsonString.mainApplicant.contact_email = myJsonString.mainApplicant.current_email;											
											myJsonString.mainApplicant.emergency_relationship = myJsonString.mainApplicant.emergency_maritalStatus;
											myJsonString.garantor.emergency_relationship = myJsonString.garantor.emergency_maritalStatus;
											myJsonString.jointApplicant.emergency_relationship = myJsonString.jointApplicant.emergency_maritalStatus;											
											myJsonString.mainApplicant.highestqualification = myJsonString.mainApplicant.hQua;
											myJsonString.jointApplicant.highestqualification = myJsonString.jointApplicant.hQua;											
											myJsonString.mainApplicant.highestQualification_other = myJsonString.mainApplicant.highestQualification;
											myJsonString.jointApplicant.highestQualification_other = myJsonString.jointApplicant.highestQualification;											
											myJsonString.jointApplicant.relationship_withmainapplicant = myJsonString.jointApplicant.jointrelationship;
											
											delete myJsonString.documentStatus;
											delete myJsonString.previousStatus;
											delete myJsonString.currentStatus;
											delete myJsonString.createdAt;
											delete myJsonString.updatedAt;											
											delete myJsonString.previousStatusDate;
											delete myJsonString.currentStatusDate;
											delete myJsonString.jointApplicant.monthlyIncome;
											delete myJsonString.garantor.monthlyIncome;
											delete myJsonString.mainApplicant.monthlyIncome;								
											delete myJsonString.mainApplicant.emergency_maritalStatus;
											delete myJsonString.garantor.emergency_maritalStatus;
											delete myJsonString.jointApplicant.emergency_maritalStatus;
											delete myJsonString.mainApplicant.relationShip;
											delete myJsonString.garantor.relationShip;
											delete myJsonString.jointApplicant.relationShip;	
											delete myJsonString.mainApplicant.hQua;
											delete myJsonString.jointApplicant.hQua;											
											delete myJsonString.mainApplicant.highestQualification;
											delete myJsonString.jointApplicant.highestQualification;											
											delete myJsonString.mainApplicant.jointrelationship;
											delete myJsonString.jointApplicant.jointrelationship;											
											delete myJsonString.mainApplicant.createdAt;
											delete myJsonString.mainApplicant.updatedAt;
											delete myJsonString.garantor.createdAt;
											delete myJsonString.garantor.updatedAt;
											delete myJsonString.jointApplicant.createdAt;
											delete myJsonString.jointApplicant.updatedAt;											
											delete myJsonString.mainApplicant.__v;
											delete myJsonString.garantor.__v;
											delete myJsonString.jointApplicant.__v;
											delete myJsonString.garantor.financials;	
											delete myJsonString.garantor.email;
											delete myJsonString.__v;	
											delete myJsonString.mainApplicant.contact;
											delete myJsonString.garantor.contact;
											delete myJsonString.jointApplicant.contact;	
											delete myJsonString.mainApplicant.current_email;
											delete myJsonString.mainApplicant.email;
											delete myJsonString.jointApplicant.current_email;
											
											
											resultarray.push(myJsonString);
										}else{
											 myJsonString.companyApplicant = myJsonString.companyApplicant.companyapplicant;
											 myJsonString.username = userdata.name
											 if(appuserdata){
											myJsonString.username = appuserdata.emailId;
											myJsonString.dealerName = appuserdata.companyName;
											myJsonString.dealerAddress = appuserdata.companyAddress;
											myJsonString.userBranchCode = appuserdata.branchCode;
											}
											 delete myJsonString.documentStatus;
											 delete myJsonString.companystatus;											 
											 resultarray.push(myJsonString);
										}
								 next();								
							  }, async function (err){
								  resolve({code:200, resarray:resultarray});
								  
							  });	  
				
					 }else{
						 
						 resolve({code:400, err:'No Record Found'});
					 }		
				
				});		
		  }
		  else
		  {
			 resolve({code:400, err:'No Record Found'});
		  }
											 
     }
	
  })
    
}
let updateCompanyApplicant = async (req) => {
    let applicationObj={ ...req.body};	
	//console.log("Update Application:=",applicationObj);
    delete applicationObj.applicationNumber;
	delete applicationObj.documentStatus;
    applicationObj["previousStatusDate"]=new Date();
    applicationObj["currentStatusDate"]=new Date();
    let result = await IndividualApplication.findOneAndUpdate({ _id: req.body.applicationNumber }, applicationObj, { new: true, lean: true, useFindAndModify: false });
   
    let applicantObj = { ...req.body.companyapplicant };
	
	//console.log("Update applicantObj:=",applicantObj);
	
    delete applicantObj['applicantId'];
    try {
        let result = await Applicant.findOneAndUpdate({ _id: req.body.companyapplicant.applicantId }, {$set: {companyapplicant: req.body.companyapplicant}}, { new: true, lean: true, useFindAndModify: false });
        let response;
        response = {
            success: true,
            result: { ...result }
        }
        return response
    } catch (e) {
        return ({
            success: false,
            error: e
        })
    }
}


module.exports = {
    getlastApplicationId,
    createApplication,
    getApplicationsByRoleId,
    updateApplicant,
    searchApplications,
	getuserDataById,
	getApplicationFormStatus,
	applicationemail,
	reportApplications,
	updateCompanyApplicant,
	getDealer
}
/*(function(){
    this.authenticate = async function(email,password){
        let userData = await User.findOne({'emailId':email}).populate('userTypeID').exec();
        if(userData){
            let result = Bcrypt.compareSync(password, userData.password);
            if(result){
                let obj = Object.assign({},userData._doc);
                delete obj['password'];
                return obj;
            }
        }
        return false;
    };

    this.createUser = async function (req) {
        let newUser = await new User({
            name: req.body.name,
            userTypeID: req.body.userTypeID,
            emailId: req.body.emailId,
            phone: req.body.phone,
            address: req.body.address,
            password: req.body.password
        }).save();
        delete newUser._doc['password'];
        return newUser;
    };
}).apply(module.exports);

*/