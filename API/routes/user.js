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
   
    res.status(objResp.statusCode).send(objResp);
}
router.post('/authenticate',async function(req,res){
 
    try{
        let email = req.body.email;
        let password = req.body.password;
        if(email && password){
            let result = await userService.authenticate(email,password);
            if(result){
			//result && result.activeStatus == 1
                return res.send(result);
            }
            return res.status(401).send({err:'Unauthorized'});
        }
        return res.status(400).send({err:'Username or password missing in request parameter'});
    }
    catch(err){
        _handleError(res,500,err);
    };
});

router.post('/getemail',async function(req,res){
    try{
        let email = req.body.email;
       if(email){
            let result = await userService.authenticate2(email);
            if(result){
                return res.send(result);
            }else{
				return res.status(401).send({err:'Unauthorized email Id'});
			}            
        }
        return res.status(400).send({err:'Email missing in request parameter'});
    }
    catch(err){
        _handleError(res,500,err);
    };
});

router.post('/',async function(req,res){
    try{
        let email = req.body.emailId;
		let result = await userService.checkEmailid(email);
  
		if(result=='NOEMAIL'){
		  let user = await userService.createUser(req);
          res.status(200).json(user);	
		}else{
			return res.status(700).send({statusText:'Email ID already exists'});
		}
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.post('/dealer',async function(req,res){
    try{
       
      let dealer = await userService.createDealer(req);
          res.status(200).json(dealer); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.put('/updateDealer',async function(req,res){
    try{
        let application = await userService.updateDealer(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});

router.put('/updateBranch',async function(req,res){
    try{
        let application = await userService.updateBranch(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.put('/updateUserType',async function(req,res){
    try{
        let application = await userService.updateUserType(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});

router.post('/branch',async function(req,res){
    try{
       
      let branch = await userService.createBranch(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.post('/createTracer',async function(req,res){
    try{
       
      let branch = await userService.createTracer(req);
          res.status(200).json(branch); 
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.post('/apply',async function(req,res){
    try{
       
      let branch = await userService.apply(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.post('/createBrand',async function(req,res){
    try{
       
      let branch = await userService.createBrand(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});
router.post('/createType',async function(req,res){
    try{
       
      let branch = await userService.createType(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});
router.post('/createGuarantor',async function(req,res){
    try{
       
      let branch = await userService.createGuarantor(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});
router.post('/createCredit',async function(req,res){
    try{
       
      let branch = await userService.createCredit(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.put('/createMobile',async function(req,res){
    try{
        let application = await userService.createMobile(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.put('/createFont',async function(req,res){
    try{
        let application = await userService.createFont(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.post('/createStatus',async function(req,res){
    try{
       
      let branch = await userService.createStatus(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});
router.post('/createIndustry',async function(req,res){
    try{
       
      let branch = await userService.createIndustry(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});
router.post('/createTownship',async function(req,res){
  console.log(req.body);
    try{
       
      let branch = await userService.createTownship(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});


router.post('/userType',async function(req,res){
    try{
       
      let branch = await userService.createUserType(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});




router.post('/resetPassword', async function(req,res){
    try{
        let userId = req.body.userId;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        if(ObjectId.isValid(userId) && oldPassword && newPassword){
            let result = await userService.resetPassword(userId,oldPassword,newPassword);
            if(result)
                res.status(200).send({'msg':'Password updated'});
            else
                res.status(400).send({'msg':'Update Failed'});
        }else{
            res.status(400).send({'err': 'One of the parameters missing userId,oldPassword,newPassword'})
        }
    }catch(err){
        _handleError(res,500, err.message);
    }
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





router.post("/sendmail", (req, res) => {
 
  let user = req.body;

  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

router.post("/sendMailToAdmin", (req, res) => {
 
  let user = req.body;
  sendMailToAdmin(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info}`);
    res.send(info);
  });
});

router.post("/sendMailToBranch", (req, res) => {
 
  let user = req.body;
  sendMailToBranch(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport

   let baseurl = process.env.baseurl;
   let siteurl = process.env.siteurl;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.eu-west-1.awsapps.com",
        port: 465,
       secure: true,
    
        auth: {
       user: 'applications@gotoaya.com',
       pass: 'm9nKXFAZ7DQ9N5kK'
    }
  });

  let mailOptions = {
    from: '"Reset Password"<demo@bigbyteintl.com>', // sender address
    to: user.emailId, // list of receivers
    //to: "mosaddekhosain2@gmail.com", // list of receivers
    subject: "Password Reset ", // Subject line
    html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
			 </tr>
			 <tr>
			  <td align="center"><h3>Hi ${user.name}</h3>
                    <p>Please Click on the link below to reset your password: </p>
                    <p>
					  <a style='color: #fff; background-color: #1e8cea; text-decoration:none; border-radius: 5px; padding:10px; margin:20px; font-size: 15px;' href='${siteurl}/#/reset-password?key=${user._id}'>Click Here</a>
				    </p>
            <p>Sincerely ,<br>Loan Dept.</p>
				</td>
			 </tr>
			</table>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
   callback(info);
 }

 async function sendMailToAdmin(user, callback) {
  // create reusable transporter object using the default SMTP transport

   var timedate = moment().format();
   let baseurl = process.env.baseurl;
   let siteurl = process.env.siteurl;
   let transporter = nodemailer.createTransport({
    host: "smtp.mail.eu-west-1.awsapps.com",
        port: 465,
       secure: true,
    
        auth: {
       user: 'applications@gotoaya.com',
       pass: 'm9nKXFAZ7DQ9N5kK'
    }
      });
   let result = await userService.getUserType(user.userTypeID);
   var type = result.name;
  
  let mailOptions = {
    from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
   // to: process.env.adminemail, adminemail=harish@ayabank.com
    to: process.env.adminemail,
    //to: "mosaddekhosain2@gmail.com",

    subject: "New User Request", // Subject line
    html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
			 <tr>
			  <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;" style="width:30%;" /></td>
			 </tr>
			 <tr>
			  <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear Admin</h3>
			<p>A new user has sent registration request with the following information : </p>
			<p >Name : ${user.name} , <br>
			User Type : ${type} , <br>
			Branch Name : ${user.branchName} , <br>
			Branch Code : ${user.branchCode} , <br>
			Comapany Name : ${user.companyName} , <br>
			Company Address : ${user.companyAddress} , <br>
			Mobile number : ${user.phone} , <br>
			Email Address : ${user.emailId} </p>
			  <p> Please click the below button to update the user status:</p>
		      <p><a href="${baseurl}/user/userstatus/${user._id}" style='color: #fff; background-color: #1e8cea; text-decoration:none; border-radius: 5px; padding:10px; margin:20px; font-size: 15px;'>Update Status</a></p>
       <p>Sincerely ,<br>Loan Dept.</p>
			  </td>
			 </tr>
			</table>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
   callback(info);
 }

 async function sendMailToBranch(user, callback) {
  // create reusable transporter object using the default SMTP transport

   var timedate = moment().tz('Yangon').format('DD-MM-YYYY HH:mm');
   let baseurl = process.env.baseurl;
   let siteurl = process.env.siteurl;
   let transporter = nodemailer.createTransport({
      host: "smtp.mail.eu-west-1.awsapps.com",
        port: 465,
       secure: true,
    
        auth: {
       user: 'applications@gotoaya.com',
       pass: 'm9nKXFAZ7DQ9N5kK'
    }
      });
    console.log(user);
  let mailOptions = {
    from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
    to: user.email,
   // to: "mosaddekhosain2@gmail.com",

    subject: "Application Re-Assigned", // Subject line
    html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
       <tr>
        <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;" style="width:30%;" /></td>
       </tr>
       <tr>
        <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear Branch Manager</h3>
      <p>Application number ${user.applicationNumber} has been re-assigned to your Branch on ${timedate} by Mr. ${user.adminName} </p><p> Request your action on the same.</p>
       <p>Sincerely,</p>
       <p>Loan Dept.</p>
       
        </td>
       </tr>
      </table>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
   if(user.email2){
           
          let mailOptions2 = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: user.email2, // list of receivers
            //to: 'muthaiahp@gmail.com',
             subject: "Application Re-Assigned", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
               <tr>
                <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;" style="width:30%;" /></td>
               </tr>
               <tr>
                <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear Branch Manager</h3>
              <p>Application number ${user.applicationNumber} has been re-assigned to your Branch on ${timedate} by Mr. ${user.adminName} </p><p> Request your action on the same.</p>
               <p>Sincerely,</p>
               <p>Loan Dept.</p>
               
                </td>
               </tr>
              </table>`
            
          };
          let info2 = await transporter.sendMail(mailOptions2);
         }
         if(user.email3){
          
          let mailOptions3 = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: user.email3, // list of receivers
            //to: 'muthaiahp@gmail.com',
             subject: "Application Re-Assigned", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="left" >
               <tr>
                <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;" style="width:30%;" /></td>
               </tr>
               <tr>
                <td align="left" style="font-size:12px; font-color:#000;"><h3>Dear Branch Manager</h3>
              <p>Application number ${user.applicationNumber} has been re-assigned to your Branch on ${timedate} by Mr. ${user.adminName} </p><p> Request your action on the same.</p>
               <p>Sincerely,</p>
               <p>Loan Dept.</p>
               
                </td>
               </tr>
              </table>`
            
          };
          let info3 = await transporter.sendMail(mailOptions3);
         }
         
   callback(info);
 }

 router.get('/userInfo/',async function(req,res){
   
    try{
        let result = await userService.getUser();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

























  router.get('/getcarapplication/',async function(req,res){
   
    try{
        let result = await userService.getcarapplication();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/getcarbrand/',async function(req,res){
   
    try{
        let result = await userService.getcarbrand();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getprocesfees/',async function(req,res){
   
    try{
        let result = await userService.getprocesfees();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

  router.get('/getinterestrate/',async function(req,res){
   
    try{
        let result = await userService.getinterestrate();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});




router.post('/pushcarmodel',async function(req,res){
    try{
       
      let branch = await userService.pushcarmodel(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});


router.post('/cpfess',async function(req,res){
    try{
       
      let branch = await userService.cpfess(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

router.post('/girate',async function(req,res){
    try{
       
      let branch = await userService.girate(req);
          res.status(200).json(branch); 
    
    }
    catch(err){
        _handleError(res,400, err.message);
    }
});


router.get('/deletecarband/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.deletecarband(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

router.get('/deleteprosesingfee/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.deleteprosesingfee(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

router.get('/deleteinterestrate/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.deleteinterestrate(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});















 

 router.get('/searchUser',async function(req,res){
   
    try{
        let result = await userService.searchUser(req);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 
router.get('/searchDealer',async function(req,res){
   
    try{
        let result = await userService.searchDealer(req);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});



 router.get('/Applicationfullview/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.Applicationfullview(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/dealerInfo/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.getDealer(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/branchInfo/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.getBranch(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/branchInfo2/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.getBranch2(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getBrand',async function(req,res){
   
    try{
        let result = await userService.getBrand();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getTracer',async function(req,res){
   
    try{
        let result = await userService.getTracer();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getCarBrand/:name',async function(req,res){
   
    try{
      let name = req.params.name;
      console.log(name);
        let result = await userService.getCarBrand(name);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/getCarPrice/:name',async function(req,res){
   
    try{
      let name = req.params.name;
      console.log(name);
        let result = await userService.getCarPrice(name);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

 router.get('/getType',async function(req,res){
   
    try{
        let result = await userService.getType();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getGuarantor',async function(req,res){
   
    try{
        let result = await userService.getGuarantor();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getCredit',async function(req,res){
   
    try{
        let result = await userService.getCredit();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getMobile',async function(req,res){
   
    try{
        let result = await userService.getMobile();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/getFont',async function(req,res){
   
    try{
        let result = await userService.getFont();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getStatus',async function(req,res){
   
    try{
        let result = await userService.getStatus();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getIndustry',async function(req,res){
   
    try{
        let result = await userService.getIndustry();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/getTownship',async function(req,res){
   
    try{
        let result = await userService.getTownship();
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

 router.get('/userType/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.getUserType(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

  router.get('/deleteDealer/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.deleteDealer(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

 router.get('/deleteUser/:id',async function(req,res){
   
    try{
        let id = req.params.id;
        let result = await userService.deleteUser(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/deleteBranch/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteBranch(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/deleteBrand/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteBrand(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/deleteType/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteType(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
 router.get('/deleteGuarantor/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteGuarantor(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/deleteCredit/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteCredit(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/deleteStatus/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteStatus(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
  router.get('/deleteIndustry/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteIndustry(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
    router.get('/deleteTownship/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteTownship(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});
router.get('/deleteUserType/:id',async function(req,res){
   
    try{
       let id = req.params.id;
        let result = await userService.deleteUserType(id);
        res.send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});


 router.get('/statusupdate/:userId/:userStatus',async function(req,res){
	let baseurl = process.env.baseurl;
	let userId = req.params.userId;
	let userStatus = req.params.userStatus;


    try{

        let user = await userService.statusupdate(userId,userStatus);

		

        if(user){
		
            let emailstatus = await userService.userstatusemail(user);
		    //res.status(201).json(user);
			res.redirect(baseurl + '/user/thankyou');
        }


    }
    catch(err){
        _handleError(res,400, err.message);
    }
});

 router.get('/thankyou',async function(req,res){

		let siteurl = process.env.siteurl;
		res.sendFile(path.join(__dirname+'/thankyou.html'));
 });

 router.get('/userstatus/:userId',async function(req,res){
   
		let userId = req.params.userId; 
		let siteurl = process.env.siteurl;
		let baseurl = process.env.baseurl;
	try{
		let user = await userService.getUserDetailsById(userId);

		var datas = {
          userid:userId,
		  baseurl:baseurl,
		  siteurl:siteurl,
		  userdata:user
        };

       

		//res.sendFile(path.join(__dirname+'/userstatus.html'),options);
		res.render('userstatus', { data: datas });

      }
    catch(err){
        _handleError(res,400, err.message);
    }
 });

 router.post('/changepassword', async function(req,res){
    try{
        let userId = req.body.userId;
        let newPassword = req.body.newPassword;
        if(ObjectId.isValid(userId) && newPassword){
            let result = await userService.changePassword(userId,newPassword);
            if(result)
                res.status(200).send({'msg':'Password updated', statusmsg:'Success'});
            else
                res.status(400).send({'msg':'Update Failed',statusmsg:'Failed'});
        }else{
            res.status(400).send({'err': 'One of the parameters missing userId,newPassword',statusmsg:'Missing'})
        }
    }catch(err){
        _handleError(res,500, err.message);
    }
});
 
 router.get('/fileupload', async function(req,res){
		let siteurl = process.env.siteurl;
		res.render('fileupload');
 });

module.exports = router;
