var Companyapplication = require('../models/companyapplication');
var User = require('../models/user');
const {base64decode}  = require('nodejs-base64');
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config();
var mongoose = require('mongoose');
var moment = require('moment-timezone');

(function(){

this.createCompanyApplication = async function(req){
		 
		console.log("req.body:=",req.body);	
		let refApplicationNumber = await getRandomInt(999999);
	    console.log("refApplicationNumber:=",refApplicationNumber);
		let date = new Date(); 
		let day = (date.getDate() < 10 ? '0' : '') + date.getDate()
		let year = date.getFullYear().toString();
		let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
		let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
	    let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	    let seconds = ((date.getSeconds() + 1) < 10 ? '0' : '') + date.getSeconds();
	    let timenumber = hours.toString() + minutes.toString() + seconds.toString();
	
		let appPrefix = '001';
		let applicationNumber = day.toString() + month.toString() + year + timenumber + refApplicationNumber;
		var timedata = moment.tz("Asia/Yangon").format('LLLL');
		
		let newApplication = await new Companyapplication({
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
			purprice:req.body.purprice,
			downpayment:req.body.downpayment,
			downamount: req.body.downamount,
			loanamount:req.body.loanamount,
			tenor: req.body.tenor,	
			previousStatus: req.body.previousStatus,
			previousStatusDate:new Date(),
			currentStatus: req.body.currentStatus,
			currentStatusDate: new Date(),
			applicationStatus:'Pending',
			submissionDate:timedata,
			companyapplicant:req.body.companyapplicant
			
		}).save();
		let emailstatus = await companyapplicatiomemail(newApplication); 
		//console.log("emailstatus:=",emailstatus);	
		return newApplication;
		 
}

let getRandomInt = async (maxnum) => {

 return Math.floor(Math.random() * Math.floor(maxnum));
    
}	

let companyapplicatiomemail = async (applicationDetails) => {
	
		 let userdata = await getuserDataById(applicationDetails.user);
		   console.log("userdata=====",userdata);
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
		 
		  let mailOptions = {
				from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
				to: userdata.emailId,
				//to: 'muthumuthaiah@yahoo.co.in',
				subject: "Application Request", // Subject line
				html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
				 <tr>
				  <td align="center"><img src="${siteurl}/assets/images/logo.png" /></td>
				 </tr>
				 <tr>
				  <td align="center"><h3>Hi ${userdata.name}</h3>
					<p> Your application has been submitted successfully and application document is pending. </p>
					<p> Application Number: ${applicationDetails.applicationNumber}</p>
					<p> Please click the below button to upload the documents:</p>
					<p><a href="${siteurl}" style='color: #fff; background-color: #a11c20; text-decoration:none; border-radius: 5px; padding:10px; margin:20px; font-size: 18px;'>Upload Documents</a></p>
				    <p>Sincerely ,<br>Loan Department</p>
				  </td>
				 </tr>
				</table>`
				
		  };
		  // send mail with defined transport object
		  let info = await transporter.sendMail(mailOptions);
		  return info;
	
}

let getuserDataById = async (userId) =>{
		//let userData = await User.findOne({'_id':userId}).populate('userTypeID').exec();
		 var userData = await User.findById(userId);
		 return userData;
}


}).apply(module.exports);