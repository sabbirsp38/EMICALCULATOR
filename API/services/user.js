var User = require('../models/user');
var Tracer = require('../models/tracer');
var Apply = require('../models/apply');
var Pfees = require('../models/pfees');
var Irate = require('../models/irate');
var DealerNew = require('../models/dealerNew');
var Branch = require('../models/branch');
var Brand = require('../models/brand');
var Type = require('../models/type');
var Guarantor = require('../models/guarantor');
var Credit = require('../models/credit');
var Mobile = require('../models/mobile');
var Status = require('../models/status');
var Industry = require('../models/industry');
var Township = require('../models/township');
var UserType = require('../models/userType');
var moment = require('moment-timezone');
const {base64decode}  = require('nodejs-base64');
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config();
var asyncLoop = require('node-async-loop');


(function(){
    
    //authenticate
    const _0x5a7a=['assign','authenticate','_doc','userTypeID\x20dealerId\x20dsaId\x20branchId','password','exec'];(function(_0x48279f,_0x5a7a1b){const _0x5bfc85=function(_0x131e10){while(--_0x131e10){_0x48279f['push'](_0x48279f['shift']());}};_0x5bfc85(++_0x5a7a1b);}(_0x5a7a,0x19c));const _0x5bfc=function(_0x48279f,_0x5a7a1b){_0x48279f=_0x48279f-0x0;let _0x5bfc85=_0x5a7a[_0x48279f];return _0x5bfc85;};const _0x4d7ceb=_0x5bfc;this[_0x4d7ceb('0x3')]=async function(_0x131e10,_0x36edab){const _0x381ddf=_0x4d7ceb;let _0x2ef8d2=await User['findOne']({'emailId':_0x131e10})['populate'](_0x381ddf('0x5'))[_0x381ddf('0x1')]();if(_0x2ef8d2){let _0x1e4223=Bcrypt['compareSync'](base64decode(_0x36edab),_0x2ef8d2[_0x381ddf('0x0')]);if(_0x1e4223){let _0x45c066=Object[_0x381ddf('0x2')]({},_0x2ef8d2[_0x381ddf('0x4')]);return delete _0x45c066[_0x381ddf('0x0')],_0x45c066;}}return![];};
    
    //authenticate2
    const _0x5ff2=['exec','assign','password','populate','findOne','_doc','userTypeID\x20dealerId\x20dsaId\x20branchId'];(function(_0x41bee7,_0x5ff215){const _0x161735=function(_0xac6abf){while(--_0xac6abf){_0x41bee7['push'](_0x41bee7['shift']());}};_0x161735(++_0x5ff215);}(_0x5ff2,0x10f));const _0x1617=function(_0x41bee7,_0x5ff215){_0x41bee7=_0x41bee7-0x0;let _0x161735=_0x5ff2[_0x41bee7];return _0x161735;};this['authenticate2']=async function(_0xac6abf){const _0x399fdf=_0x1617;let _0xc391b1=await User[_0x399fdf('0x6')]({'emailId':_0xac6abf})[_0x399fdf('0x5')](_0x399fdf('0x1'))[_0x399fdf('0x2')]();if(_0xc391b1){let _0x573fea=Object[_0x399fdf('0x3')]({},_0xc391b1[_0x399fdf('0x0')]);return delete _0x573fea[_0x399fdf('0x4')],_0x573fea;}return![];};

    this.createUser = async function (req) {

        let newUser = await new User({
            name: req.body.name,
            userTypeID: req.body.userTypeID,
            emailId: req.body.emailId,
            phone: req.body.phone,
            address: req.body.address,
            branchName: req.body.branchName,
            branchCode: req.body.branchCode,
            companyName: req.body.companyName,
            companyAddress: req.body.companyAddress,
            password: base64decode(req.body.password),
            dealerId: req.body.dealerId,
            dsaId: req.body.dsaId,
            branchId: req.body.branchId,
            status: req.body.status,
            application:0

        }).save();
        delete newUser._doc['password'];
        let result = await Branch.findOneAndUpdate({ name: req.body.branchName }, { $inc: { user: 1} }, { new: true, lean: true, useFindAndModify: false });
   
        return newUser;
    };

   
    
    this.apply = async function (req) {

        let newUser = await new Apply({
            number: req.body.number,
            contactaddress: req.body.addressDetails.contactaddress,
            hadd1: req.body.addressDetails.hadd1,
            hadd2: req.body.addressDetails.hadd2,
            hcity: req.body.addressDetails.hcity,
            hpcode: req.body.addressDetails.hpcode,
            hpnumber: req.body.addressDetails.hpnumber,
            hstate: req.body.addressDetails.hstate,
            oadd1: req.body.addressDetails.oadd1,
            oadd2: req.body.addressDetails.oadd2,
            ocity: req.body.addressDetails.ocity,
            opcode: req.body.addressDetails.opcode,
            opnumber: req.body.addressDetails.opnumber,
            ostate: req.body.addressDetails.ostate,
            loanamount: req.body.eligibilityResult.loanamount,
            yearreturn: req.body.eligibilityResult.yearreturn,
            currentloan: req.body.expenditureDetails.currentloan,
            dilaration: req.body.expenditureDetails.dilaration,
            emiamount: req.body.expenditureDetails.emiamount,
            lonarunning: req.body.expenditureDetails.lonarunning,
            mexpense: req.body.expenditureDetails.mexpense,
            mrent: req.body.expenditureDetails.mrent,
            numberofemi: req.body.expenditureDetails.numberofemi,
            employmentnamees1: req.body.personalDetails.employmentnamees1,
            applicationtypees3: req.body.personalDetails.applicationtypees3,
            applicationtypees4: req.body.personalDetails.applicationtypees4,
            city: req.body.personalDetails.city,
            depreciationes3: req.body.personalDetails.depreciationes3,
            depreciationes4: req.body.personalDetails.depreciationes4,
            emlomentnamees3: req.body.personalDetails.emlomentnamees3,
            emlomentnamees4: req.body.personalDetails.emlomentnamees4,
            employmenttype: req.body.personalDetails.employmenttype,
            irtes3: req.body.personalDetails.irtes3,
            irtes4: req.body.personalDetails.irtes4,
            personneame: req.body.personalDetails.personneame,
            residencetype: req.body.personalDetails.residencetype,
            takehomeselary: req.body.personalDetails.takehomeselary,
            takehomeselarybuseness: req.body.personalDetails.takehomeselarybuseness,
            takehomeselaryprofesonal: req.body.personalDetails.takehomeselaryprofesonal,
            workexperincees3: req.body.personalDetails.workexperincees3,
            workexperincees4: req.body.personalDetails.workexperincees4,
            cardelarprice: req.body.vehicleDetails.cardelarprice,
            carmodel: req.body.vehicleDetails.carmodel,
            carprice: req.body.carprice,
            insucost: req.body.vehicleDetails.insucost,
            rtocost: req.body.vehicleDetails.rtocost,
            montyspendamount: req.body.montyspendamount,
            applicationid: req.body.applicationid,
            mothyemi: req.body.mothyemi,
            fullamountreplay: req.body.fullamountreplay,
            totalinterest: req.body.totalinterest,
            preapproveamount: req.body.preapproveamount,
            totalcarprice: req.body.totalcarprice,
            

        }).save();
         
        return newUser;
    };

    this.createDealer = async function (req) {
        let siteurl = process.env.siteurl;
        let refApplicationNumber = Math.floor(Math.random() * Math.floor(999999));
        let date = new Date(); 
        let day = (date.getDate() < 10 ? '0' : '') + date.getDate()
        let year = date.getFullYear().toString();
        let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        let seconds = ((date.getSeconds() + 1) < 10 ? '0' : '') + date.getSeconds();
        let timenumber = hours.toString() + minutes.toString() + seconds.toString();
        var timedata = moment.tz("Asia/Yangon").format('LLLL');
        let applicationNumber = "DI"+day.toString() + month.toString() + year + timenumber + refApplicationNumber
    
        let newDealer = await new DealerNew({
                  user:req.body.userid,
                  applicationNumber: applicationNumber,
                  d_name:req.body.d_name,
                  d_contact_no:req.body.d_contact_no,
                  d_dob:req.body.d_dob,
                  d_doa:req.body.d_doa,
                  d_head_address:req.body.d_head_address,
                  d_contact_person_name:req.body.d_contact_person_name,
                  d_contact_person_no:req.body.d_contact_person_no,
                  d_showroom_address:req.body.d_showroom_address,
                  d_country:req.body.d_country,
                  d_showroom_age:req.body.d_showroom_age,
                  d_monthy_sales:req.body.d_monthy_sales,
                  d_monthly_profit:req.body.d_monthly_profit,
                  d_car_inventory_count:req.body.d_car_inventory_count,
                  d_loan_approval_amount:req.body.d_loan_approval_amount,
                  d_showroom_status:req.body.d_showroom_status,
                  d_showroom_total:req.body.d_showroom_total,
                  d_warehouse:req.body.d_warehouse,
                  d_car_molels:req.body.d_car_molels,
                  d_warrenty:req.body.d_warrenty,
                  d_usd_bank:req.body.d_usd_bank,
                  d_employee_amout:req.body.d_employee_amout,
                  d_employee_salary:req.body.d_employee_salary,
                  d_other_business:req.body.d_other_business,
                  rmName:req.body.rmName,
                  status:req.body.status,

        }).save();
       let result = await User.findOneAndUpdate({ _id: req.body.userid }, { $inc: { application: 1} }, { new: true, lean: true, useFindAndModify: false });
       var userData = await DealerNew.findOne({applicationNumber:applicationNumber}).populate('user').exec();
       let transporter = nodemailer.createTransport({
          //   service: 'gmail',
          //   host: "smtp.gmail.com",
          //   port: 25,
          //   secure: false, // true for 465, false for other ports

          //   auth: {
          //     user: 'msaddekhosain@gmail.com',
          //     pass: 'M028243m'
          //   }
          // });
          host: "smtp.mail.eu-west-1.awsapps.com",
            port: 465,
           secure: true,
    
            auth: {
           user: 'applications@gotoaya.com',
           pass: 'm9nKXFAZ7DQ9N5kK'
            }
           });
          let mailOptions = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: userData.user.emailId, // list of receivers
            //to: 'muthaiahp@gmail.com',
            subject: "Dealer Creation", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
           <tr>
            <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
           </tr>
           <tr>
            <td align="center"><h3>Hi ${req.body.rmName}</h3>
              <p>Your request for creation of Dealer Id: ${applicationNumber} has been sent for approval on ${day}/${month}/${year}. Once approved , you will be notified via email :</p>
              <p>Dealer Name: ${req.body.d_name}</p>
              <p>Dealer Address: ${req.body.d_showroom_address}</p>
            </td>
           </tr>
           <tr>
            <td align="center">
            <p>Sincerely,</p>
            <p>Loan Dept.</p>
              
            </td>
           </tr>
          </table>`
            
          };
          let mailOptions2 = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: process.env.adminemail, // list of receivers
      //to: 'muthaiahp@gmail.com',
            subject: "Dealer Verification", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
           <tr>
            <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
           </tr>
           <tr>
            <td align="center"><h3>Dear Admin,</h3>
              <p>Dealer Onboarding request(${applicationNumber}) has been submitted by ${req.body.rmName} of ${userData.user.branchName} Branch on ${day}/${month}/${year}. Please verfiy and approve the request. </p>
              <p> Please click the below button to verfiy and approve the request:</p>
              <p><a href="${siteurl}/#/dealer-admin?key=${userData._id}" style='color: #fff; background-color: #1e8cea; text-decoration:none; border-radius: 5px; padding:10px; margin:20px; font-size: 15px;'>Verfiy</a></p>
              <p>*Subject to upload of document and necessary clearance </p>
             
            </td>
           </tr>
           <tr>
            <td align="center">
            <p>Sincerely,</p>
            <p>Loan Dept.</p>
              
            </td>
           </tr>
          </table>`
            
          };

          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions);
          let info2 = await transporter.sendMail(mailOptions2);
         
          // return info2;

        return newDealer;
    };

    this.updateDealer = async (req) => {
  
    let applicationObj={ ...req.body};
    let result = await DealerNew.findOneAndUpdate({ _id: req.body.id }, applicationObj, { new: true, lean: true, useFindAndModify: false });
    var userData = await DealerNew.findOne({applicationNumber:result.applicationNumber}).populate('user').exec();
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.mail.eu-west-1.awsapps.com",
    //     port: 465,
    //    secure: true,
    //     auth: {
    //     user: 'applications@gotoaya.com',
    //     pass: 'm9nKXFAZ7DQ9N5kK'
    //     }
    //       });
      

    //       let mailOptions = {
    //         from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
    //         to: userData.user.emailId, // list of receivers
    //   //to: 'muthaiahp@gmail.com',
    //         subject: "Dealer Creation", // Subject line
    //         html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
    //        <tr>
    //         <td align="center"><img src="https://gotoaya.com/assets/images/logo.pngg" /></td>
    //        </tr>
    //        <tr>
    //         <td align="center"><h3>Hi ${result.rmName}</h3>
    //           <p>Your request for creation of Dealer Id: ${result.applicationNumber} has been approved on ${day}/${month}/${year}. </p>
    //           <p>Dealer Name: ${result.d_name}</p>
    //           <p>Dealer Address: ${result.d_showroom_address}</p>
    //         </td>
    //        </tr>
    //        <tr>
    //         <td align="center">
    //         <p>Sincerely</p>
    //         <p>Loan Department</p>
              
    //         </td>
    //        </tr>
    //       </table>`
            
    //       };
    //       let info = await transporter.sendMail(mailOptions);
       return result;

    }
    // update branch and user type
   const _0x3bcd=['updateBranch','findOneAndUpdate','body'];(function(_0x5789f5,_0x3bcd51){const _0x56bd5c=function(_0x48f179){while(--_0x48f179){_0x5789f5['push'](_0x5789f5['shift']());}};_0x56bd5c(++_0x3bcd51);}(_0x3bcd,0x1eb));const _0x56bd=function(_0x5789f5,_0x3bcd51){_0x5789f5=_0x5789f5-0x0;let _0x56bd5c=_0x3bcd[_0x5789f5];return _0x56bd5c;};const _0x1748d8=_0x56bd;this[_0x1748d8('0x1')]=async _0x48f179=>{const _0x16ce6a=_0x1748d8;let _0x8b7b25={..._0x48f179[_0x16ce6a('0x0')]},_0x140911=await Branch[_0x16ce6a('0x2')]({'_id':_0x48f179[_0x16ce6a('0x0')]['id']},_0x8b7b25,{'new':!![],'lean':!![],'useFindAndModify':![]});return console['log'](_0x140911),_0x140911;},this['updateUserType']=async _0x441526=>{const _0x57c4a8=_0x1748d8;let _0x133935={..._0x441526['body']},_0x4a1c96=await UserType[_0x57c4a8('0x2')]({'_id':_0x441526[_0x57c4a8('0x0')]['id']},_0x133935,{'new':!![],'lean':!![],'useFindAndModify':![]});return _0x4a1c96;};


    this.createBranch = async function (req) {
       // console.log(req.body);
        let email2 = req.body.email2;
        let email3 = req.body.email3;
       let siteurl = process.env.siteurl;
        let newBranch = await new Branch({
            name: req.body.name,
            code: req.body.code,
            icName: req.body.icName,
            township: req.body.township,
            email: req.body.email,
            email2: req.body.email2,
            email3: req.body.email3,
            branchPhone: req.body.branchPhone,
            user:0
        }).save();
      
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
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: req.body.email, // list of receivers
            //to: 'muthaiahp@gmail.com',
            subject: "Branch Creation", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
           <tr>
            <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
           </tr>
           <tr>
            <td align="center"><h3>Hi Branch</h3>
              <p>Your request for creation of Branch Successfull </p>
              <p>Branch Code: ${req.body.code}</p>
              <p>Branch Name: ${req.body.name}</p>
              <p>Branch Township: ${req.body.township}</p>
            </td>
           </tr>
           <tr>
            <td align="center">
            <p>Sincerely,</p>
            <p>Loan Dept.</p>
              
            </td>
           </tr>
          </table>`
            
          };
           let info = await transporter.sendMail(mailOptions);
          if(email2){
           
          let mailOptions2 = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: req.body.email2, // list of receivers
            //to: 'muthaiahp@gmail.com',
            subject: "Branch Creation", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
           <tr>
            <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
           </tr>
           <tr>
            <td align="center"><h3>Hi Branch</h3>
              <p>Your request for creation of Branch Successfull </p>
              <p>Branch Code: ${req.body.code}</p>
              <p>Branch Name: ${req.body.name}</p>
              <p>Branch Township: ${req.body.township}</p>
            </td>
           </tr>
           <tr>
            <td align="center">
            <p>Sincerely,</p>
            <p>Loan Dept.</p>
              
            </td>
           </tr>
          </table>`
            
          };
          let info2 = await transporter.sendMail(mailOptions2);
         }
         if(email3){
       
          let mailOptions3 = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: req.body.email3, // list of receivers
            //to: 'muthaiahp@gmail.com',
            subject: "Branch Creation", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
           <tr>
            <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
           </tr>
           <tr>
            <td align="center"><h3>Hi Branch</h3>
              <p>Your request for creation of Branch Successfull </p>
              <p>Branch Code: ${req.body.code}</p>
              <p>Branch Name: ${req.body.name}</p>
              <p>Branch Township: ${req.body.township}</p>
            </td>
           </tr>
           <tr>
            <td align="center">
            <p>Sincerely,</p>
            <p>Loan Dept.</p>
              
            </td>
           </tr>
          </table>`
            
          };
          let info3 = await transporter.sendMail(mailOptions3);
         }
         
          

        return newBranch;
    };
    this.createBrand = async function (req) {
       // console.log(req.body);
        let newBranch = await new Brand({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createTracer = async function (req) {
       // console.log(req.body);
        let newBranch = await new Tracer({
            activityType: req.body.activityType,
            userType: req.body.userType,
            user: req.body.user,
            time: req.body.time,
        }).save();
        return newBranch;
    };
    this.createType = async function (req) {
       // console.log(req.body);
        let newBranch = await new Type({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createGuarantor = async function (req) {
       // console.log(req.body);
        let newBranch = await new Guarantor({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createCredit = async function (req) {
       // console.log(req.body);
        let newBranch = await new Credit({
            name: req.body.name,
            key: req.body.key,
            secret: req.body.secret,
        }).save();
        return newBranch;
    };
 
    this.createMobile = async (req) => {
  
    let applicationObj={ ...req.body};
    let result = await Mobile.findOneAndUpdate({ _id: req.body.id }, applicationObj, { new: true, lean: true, useFindAndModify: false });
       return result;

    }
    this.createStatus = async function (req) {
       // console.log(req.body);
        let newBranch = await new Status({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createIndustry = async function (req) {
       // console.log(req.body);
        let newBranch = await new Industry({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createTownship = async function (req) {
       // console.log(req.body);
        let newBranch = await new Township({
            name: req.body.name,
        }).save();
        return newBranch;
    };
    this.createUserType = async function (req) {
      
        let newBranch = await new UserType({
            name: req.body.name,
            branch: req.body.branch,
            dealer: req.body.dealer,
            contactNumber: req.body.contactNumber,
            checkStatus: req.body.checkStatus,
            reports: req.body.reports,
            myApplication: req.body.myApplication,
            pendingApplication: req.body.pendingApplication,
            dealerOnboarding: req.body.dealerOnboarding,
            individualApplication: req.body.individualApplication,
            companyApplication: req.body.companyApplication,
            autoLoan: req.body.autoLoan,
            personalLoan: req.body.personalLoan,
            domain: req.body.domain,
            domainName: req.body.domainName,
        }).save();
        return newBranch;
    };

    this.resetPassword = async function(userId,oldPassword,newPassword){
        let userData = await User.findById(userId);
        if(userData){            
            let match = Bcrypt.compareSync(oldPassword, userData.password);            
            if(match){
                //let encryptedPassword = Bcrypt.hashSync(newPassword, 10);
                userData.password = newPassword;
                userData.isFirstLogin = false;
                let result = await userData.save();
                return result;
            }
        }
        return false;
    };
	
	this.statusupdate = async function(userId,userStatus){

       
        //console.log("userId",userId);
        //console.log("userStatus",userStatus);

        var userData = await User.findById(userId);

        if(userData){  
            let activestatus = 0;
		    if(userStatus=='approve'){
				 activestatus = 1;
			}
			if(userStatus=='reject'){
				 activestatus = 2;
			}
			userData.activeStatus = activestatus;
			let result = await userData.save();
			//console.log("userData",userData);
			return result;
        }
        return false;
    };

    this.userstatusemail = async function(userDetails){
          
		
		 let siteurl = process.env.siteurl;
		 
         if(userDetails.activeStatus==1){
            var statustxt='Approved';
			var htmltxt = `<p> Please Click on the link below to login: </p><p><a style='color: #fff; background-color: #a11c20; text-decoration:none; border-radius: 5px; padding:10px; margin:20px; font-size: 18px;'  href='${siteurl}'>Click Here</a></p>`;
         }else{
            var statustxt='Rejected';
			var htmltxt = ''
         }
          let transporter = nodemailer.createTransport({
    host: "smtp.mail.eu-west-1.awsapps.com",
        port: 465,
       secure: true,
    
        auth: {
       user: 'applications@gotoaya.com',
       pass: 'm9nKXFAZ7DQ9N5kK'
    }          });
		  

          let mailOptions = {
            from: '"Retail Loans Dept."<applications@gotoaya.com>', // sender address
            to: userDetails.emailId, // list of receivers
			//to: 'muthaiahp@gmail.com',
            subject: "User Status ", // Subject line
            html: `<table width="90%" border="0" cellspacing="5" cellpadding="5" align="center"  bgcolor="#e5e5e5">
					 <tr>
					  <td align="center"><img src="${siteurl}/assets/images/logo.png" alt="Company Logo" style="height: 100px; width: 300px;"/></td>
					 </tr>
					 <tr>
					  <td align="center"><h3>Hi ${userDetails.name}</h3>
						  <p>Your account has been ${statustxt} </p>
						  ${htmltxt}
              <p>Sincerely ,<br>Loan Dept.</p>
					  </td>
					 </tr>
					</table>`
            
          };

          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions);
         
           return info;
         

    };    
	
	this.getUserDetailsById = async function(userId){
		
		 var userData = await User.findById(userId);
		 return userData;
	}
  this.getUser = async function(){
    
         var userData = await User.find({}).populate('userTypeID').exec();
         return userData;
    }



























  this.getcarapplication = async function(){
         var userData = await Apply.find({}).populate('userTypeID').exec();
         return userData;
    }
 this.getcarbrand = async function(){
         var userData = await Brand.find({});
         return userData;

    }
 this.getprocesfees = async function(){
     var userData = await Pfees.find({});
     return userData;

}
 this.getinterestrate = async function(){
     var userData = await Irate.find({});
     return userData;

}
this.Applicationfullview = async function(id){
       if(id==='key')
       var userData = await Apply.find({}).populate('user').exec();
       else
       var userData = await Apply.findOne({'_id':id}).exec();
       return userData;
  }


this.pushcarmodel = async function (req) {

        let newUser = await new Brand({
            
            name: req.body.carmodel.name,
            price: req.body.carmodel.price,
        }).save();
         
        return newUser;
    };

this.cpfess = async function (req) {

        let newUser = await new Pfees({
            
            fees: req.body.apfes.fees,
            applicabletime: req.body.apfes.applicabletime,
            entrytime: req.body.gettime,
        }).save();
         
        return newUser;
    };


this.girate = async function (req) {

    let newUser = await new Irate({
        
        rate: req.body.airate.rate,
        applicabletime: req.body.airate.applicabletime,
        entrytime: req.body.gettime,
    }).save();
     
    return newUser;
};




this.deletecarband = async function(id){
         var userData = await Brand.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }


this.deleteprosesingfee = async function(id){
         var userData = await Pfees.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }


this.deleteinterestrate = async function(id){
         var userData = await Irate.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }















































  this.searchUser = async function(req){
            let emailId = req.query.emailId;
            let userTypeID = req.query.userTypeID;
            let companyName = req.query.companyName;
            let status = req.query.status;
            let {startDate, endDate} = req.query;
            if(emailId)
            {
              var criteria = {
              emailId:emailId
              };
              var userData = await User.find(criteria).populate('userTypeID').exec();
             
              return userData;
            }else if(startDate || endDate){
              let currentDate = new Date();
              var criteria = {
             createdAt:{ $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))},
             };
             var userData = await User.find(criteria).populate('userTypeID').exec();
              return userData;
            }else if(userTypeID && status){
              var criteria = {
              userTypeID:userTypeID, activeStatus:status
              };
              var userData = await User.find(criteria).populate('userTypeID').exec();
              return userData;
            }else if(userTypeID){
              var criteria = {
              userTypeID:userTypeID
              };
              var userData = await User.find(criteria).populate('userTypeID').exec();
              return userData;
            }else if(companyName){
              var criteria = {
              userTypeID:userTypeID,companyName:companyName
              };
              var userData = await User.find(criteria).populate('userTypeID').exec();
              return userData;
            }else if(status){
              var criteria = {
              activeStatus:status
              };
              var userData = await User.find(criteria).populate('userTypeID').exec();
              return userData;
            }
            
    }
  this.searchDealer = async function(req){

            let dealerId = req.query.dealerId;
            let branchName = req.query.branchName;
            let companyName = req.query.companyName;
            let status = req.query.status;
            let {startDate, endDate} = req.query;
            let name = req.query.name;
            var criteria = {};
            if(dealerId)
            {
              criteria.applicationNumber = dealerId;
            }
            if(startDate || endDate){
              let currentDate = new Date();
              criteria.createdAt =
             { $gte: new Date(new Date(startDate).setHours(0,0,0)), $lte:  new Date(new Date(endDate||currentDate).setHours(23,59,59))}
             ;
             
            }
            if(branchName){
              criteria.branchName =branchName;
            }
            if(status){
              criteria.status =status;
              
            }
            if(name){
              criteria.d_name =name;
             
            }
             console.log(criteria);
             var userData = await DealerNew.find(criteria).populate('user').exec();
            return userData;
            
    }
  this.getDealer = async function(id){
         if(id==='key')
         var userData = await DealerNew.find({}).populate('user').exec();
         else
         var userData = await DealerNew.findOne({'_id':id}).exec();
         return userData;
    }
    this.getBranch = async function(id){
         if(id==='key')
         var userData = await Branch.find({});
         else
         var userData = await Branch.findOne({'name':id}).exec();
         return userData;
    }
    this.getBranch2 = async function(id){
         var userData = await Branch.find({'township':id}).exec();
         return userData;
    }
    this.getBrand = async function(){
         var userData = await Brand.find({});
         return userData;
    }
    this.getTracer = async function(){
         var userData = await Tracer.find({}).populate('user').exec();
         return userData;
    }
    this.getCarBrand = async function(name){
         var q = '.*'+name+'.*';
         var re = new RegExp(q,'i');
         var userData = await Brand.find({"name": re});
         console.log(userData);
         return userData;
    }
    this.getType = async function(){
         var userData = await Type.find({});
         return userData;
    }
    this.getGuarantor = async function(){
         var userData = await Guarantor.find({});
         return userData;
    }
    this.getCredit = async function(){
         var userData = await Credit.find({});
         return userData;
    }
    this.getMobile = async function(){
         var userData = await Mobile.find({});
         return userData;
    }
    this.getStatus = async function(){
         var userData = await Status.find({});
         return userData;
    }
    this.getIndustry = async function(){
         var userData = await Industry.find({});
         return userData;
    }
    this.getTownship = async function(){
         var userData = await Township.find({});
         return userData;
    }

    this.getUserType = async function(id){
         if(id==='key')
         var userData = await UserType.find({});
         else
         var userData = await UserType.findOne({'_id':id}).exec();
         return userData;
    }

    this.deleteDealer = async function(id){
         var userData = await DealerNew.findOne({'_id':id}).exec();
         if(userData)
         {
          let result = await User.findOneAndUpdate({ _id: userData.user }, { $inc: { application: -1} }, { new: true, lean: true, useFindAndModify: false });
            userData.remove();
         }
         return userData;
    }
    this.deleteUser = async function(id){
         var userData = await User.findOne({'_id':id}).exec();
         if(userData)
            {
              let result = await Branch.findOneAndUpdate({ name: userData.branchName }, { $inc: { user: -1} }, { new: true, lean: true, useFindAndModify: false });
              userData.remove();

            }
         return userData;
    }
    this.deleteBranch = async function(id){
         var userData = await Branch.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteBrand = async function(id){
         var userData = await Brand.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteType = async function(id){
         var userData = await Type.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteGuarantor = async function(id){
         var userData = await Guarantor.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteCredit = async function(id){
         var userData = await Credit.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteStatus = async function(id){
         var userData = await Status.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteIndustry = async function(id){
         var userData = await Industry.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteTownship = async function(id){
         var userData = await Township.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }
    this.deleteUserType = async function(id){
         var userData = await UserType.findOne({'_id':id}).exec();
         if(userData)
            userData.remove();
         return userData;
    }

	
	this.changePassword = async function(userId,newPassword){
		
		
		 
        let userData = await User.findById(userId);
        if(userData){            
;
		
                userData.password = base64decode(newPassword);
                userData.isFirstLogin = true;
                let result = await userData.save();
		
				
                return result;
           
        }
        return false;
    };
	
	
	this.checkEmailid = async function(useremail){
		

		let userData = await User.findOne({'emailId':useremail}).exec();

		if(userData)
		{

			if(userData.emailId){
				return userData.emailId;
			}else{
				return 'NOEMAIL';
			}
		}else{
	
		    return 'NOEMAIL';
		}
		
	}
	

   
}).apply(module.exports);

