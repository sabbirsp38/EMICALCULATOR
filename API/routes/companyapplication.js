const express = require('express');
const router = express.Router();
const comapnyApplicationService = require('../services/companyapplication');
const individualApplicationService = require('../services/individual_application');
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

 router.post('/create',async function(req,res){
    
	try{
		
		   req.body.applicationType = 'Company';
	       let application = await individualApplicationService.createApplication(req);
           let application2 = await individualApplicationService.createApplication2(req);
		   res.status(200).json(application);
	 }
    catch(err){
        _handleError(res,400, err.message);
    }
});	
		
router.put('/updateCompanyApplication',async function(req,res){
    try{
        let application = await individualApplicationService.updateCompanyApplicant(req);
        if(req.query.reassign)
        {
            req.body.applicationType = 'Company';
            let application2 = await individualApplicationService.createApplication2(req);
        }
        else if(req.query.remarkCA!='')
        {
            req.body.applicationType = 'Company';
            let application2 = await individualApplicationService.createApplication2(req);
        }

        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});



module.exports = router;
