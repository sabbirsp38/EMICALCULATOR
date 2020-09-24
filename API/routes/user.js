const express = require('express');
const router = express.Router();
const userService = require('../services/user');
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


router.post('/number',async function(req,res){
    try{
        let number = req.body.number;
        let msg = req.body.msg;
       if(number){
            let result = await userService.insertNumber(number);
            if(result){
               console.log(result);
                return res.send(result);
            }else{
				return res.status(401).send({err:'Unauthorized email Id'});
			    }            
        }
        return res.status(400).send({err:'Parametter Miss'});
    }
    catch(err){
        _handleError(res,500,err);
    };
});

router.post('/sms',async function(req,res){
   var msg = req.body.msg;
   var number = req.body.number;
 var accountSid = 'ACc2457caf1e3757f22384c337fa3b0d53'; // Your Account SID from www.twilio.com/console

 var authToken = 'ad174bcfa65a399200677a21f6b1a1f7';   // Your Auth Token from www.twilio.com/console
//test start here
// var accountSid = 'ACedec8d6fee66c93735b2fd80d9279b50'; // Your Account SID from www.twilio.com/console
// var authToken = '36f912675aa4a000f10dd17cc0c80888';   // Your Auth Token from www.twilio.com/console
//from:'+18472428244' // From a valid Twilio number                                 
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
console.log(msg + number);
client.messages.create({
    body:msg,
    to:number,  // Text this number
    from:'+16084806725' // From a valid Twilio number
})
.then((message) => {

    console.log(message.sid)
});
});




module.exports = router;
