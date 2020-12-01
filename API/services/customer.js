var Customer = require('../models/customer');
var User = require('../models/user');
const {base64decode}  = require('nodejs-base64');
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config();
//var moment = require('moment');
var mongoose = require('mongoose');
var moment = require('moment-timezone');

(function(){

     this.createCustomer = async function(req){
		
		//let refApplicationNumber = await getlastRequestId(); 
		//refApplicationNumber = ('000000' + ( parseInt(refApplicationNumber) + 1)).slice(-6);  
		let refApplicationNumber = await getRandomInt(999999);
	  
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
		//var usertype= req.body.userType;
		
		
		if(req.body.selectOffer=='Home Loan'){
		  var selectOffer = "I Don't Want 3 Months Principal Deferment";
		}else{
		   var selectOffer = req.body.selectOffer;
		}
		let newCustomer = await new Customer({
			user: req.body.userid,					 
		    applicationNumber: applicationNumber,
            refApplicationNumber: parseInt(refApplicationNumber), 
			customerName: req.body.customerName,
			customerPhone: req.body.customerPhone,
			customerHPaccount: req.body.customerHPaccount,
			productType: req.body.productType,
			nric: req.body.nric,
			submissionDate: timedata,
			selectOffer:req.body.selectOffer,
			processingLocation:req.body.selectLocation,
			remark:req.body.remarks,
		}).save();
		let emailstatus = await customeremail(newCustomer); 
			
		return newCustomer;
		
	}
	
	let customeremail = async (customerDetails) => {	
	     
		// let userdata = await getuserDataById(customerDetails.user);
		 
		// console.log("userTypeID:=",userdata.userTypeID);
		//console.log("userTypeName:=",usertype);
		
		 //var formrequestdate = moment(customerDetails.submissionDate).format('LLLL');
		 var formrequestdate = customerDetails.submissionDate;
		
		 
		
		 
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
		  
		  
		 // console.log("userTypeName222222:=",usertype);
		  
		  let mailOptions = {
            from: '"Retail Loans Dept."<loanprojectaya@gmail.com>', // sender address
			to: process.env.adminemail,
            subject: "Customer Request", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.pn" alt="Company Logo" /></td>
			 </tr>
			 <tr>
			  <td align="center"><h3>Hi Admin</h3>
				<table width="55%" border="0" cellspacing="2" cellpadding="2" align="center">
				 <tr>
				  <td colspan="2"><b>Customer Details</b></td>
				 </tr>		
				  <tr>
				  <td style="width:35%;">Application Number: </td><td> ${customerDetails.applicationNumber}</td>
				 </tr>
				  <tr>
				  <td>Customer Name: </td><td>${customerDetails.customerName}</td>
				 </tr>
				  <tr>
				  <td>Customer Phone:</td><td> ${customerDetails.customerPhone}</td>
				 </tr>
				  <tr>
				  <td>HP Account:</td><td>${customerDetails.customerHPaccount}</td>
				 </tr>
				  <tr>
				  <td>Product Type:</td><td>${customerDetails.productType}</td>
				 </tr>
				  <tr>
				  <td>NRIC:</td><td>${customerDetails.nric}</td>
				 </tr>				 
				  <tr>
				  <td>Date of Submission:</td><td>${formrequestdate}</td>
				 </tr>	
				  <tr>
				  <td>Offer:</td><td>${customerDetails.selectOffer}</td>
				 </tr>
				  <tr>
				  <td>Processing Location:</td><td>${customerDetails.processingLocation}</td>
				 </tr>
			 </table>
			 <p>Sincerely ,<br>Loan Dept.</p>
			  </td>
			 </tr>
			</table>`
            
          };
          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions);
          return info;
		   
	}
	
	
	let getlastRequestId = async () => {
		const a = await Customer.aggregate([
			{
				"$group": {
					"_id": null,
					"MaximumValue": { "$max": "$refApplicationNumber" }
				}
			}
		]);
		return (a.length > 0 && a[0].MaximumValue) ? a[0].MaximumValue : 0;
   }
   
   this.checkCustomer = async function(customerHPaccount,nric){	   
	    
		let customerData = await Customer.findOne({'customerHPaccount':customerHPaccount,'nric':nric}).exec();
		
		if(customerData)
		{
			
			return 200;
		}else{
			
		    return 700;
		}
   }
   
   let getuserDataById = async (userId) =>{
		
		//console.log("userId:=",userId);
		//var id = mongoose.Types.ObjectId(userId);
		let userData = await User.findOne({'_id':userId}).populate('userTypeID').exec();
		 //var userData = await User.findById(userId);
		 
		 //console.log("userData:=",userData);
		 return userData;
	}
	
	let getRandomInt = async (maxnum) => {

	 return Math.floor(Math.random() * Math.floor(maxnum));
		
	}


}).apply(module.exports);