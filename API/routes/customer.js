const express = require('express');
const router = express.Router();
const customerService = require('../services/customer');
const nodemailer = require("nodemailer");
const path = require('path');
require('dotenv').config();
var moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId;

let _handleError = (res,statusCode,err) => {
    let objResp = {
        message: err || 'Oops! Something went wrong at our end. Please try again later.',
        statusCode: statusCode || 500,
        errorCode: 0
    };
    console.log(err);
    res.status(objResp.statusCode).send(objResp);
}

 router.post('/customerrequest',async function(req,res){
    
	try{
		
		let siteurl = process.env.siteurl;
		let customerHPaccount = req.body.customerHPaccount;
		let nric = req.body.nric;
		let result = await customerService.checkCustomer(customerHPaccount,nric);
		if(result==700){
		   let customer = await customerService.createCustomer(req);
           return res.status(200).send({"msg":'Your request has been submitted to admin succesfully',customer:customer});  	
		}else{
			return res.status(700).send({err:'Customer details already exists'});
		}
	 }
    catch(err){
        _handleError(res,400, err.message);
    }
});	
		




module.exports = router;
