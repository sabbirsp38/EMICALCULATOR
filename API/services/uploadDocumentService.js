var ApplicationDocuments = require('../models/applicationdocuments');
var ProfilePic = require('../models/profilepic');
var IndividualApplication = require('../models/individual_application');
var Applicants= require('../models/applicants');
var User = require('../models/user');
var Apply = require('../models/apply');
var DealerNew = require('../models/dealerNew');
const nodemailer = require("nodemailer");
require('dotenv').config();
var mongoose = require('mongoose');
var moment = require('moment-timezone');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

let s3bucket = new AWS.S3({
    accessKeyId: process.env.s3accesskey,
    secretAccessKey: process.env.s3secretkey,
    Bucket:'los-documents',
	region: 'ap-southeast-1'
});
   
//upload profile picture
// const _0x1ed1=['file','findById','documentId','userid','originalname','Location','s3Url','save','_id','buffer','applicantType','s3Filename','documentType','body'];(function(_0x429fc9,_0x1ed193){const _0x2753f5=function(_0x1b2a8d){while(--_0x1b2a8d){_0x429fc9['push'](_0x429fc9['shift']());}};_0x2753f5(++_0x1ed193);}(_0x1ed1,0xd4));const _0x2753=function(_0x429fc9,_0x1ed193){_0x429fc9=_0x429fc9-0x0;let _0x2753f5=_0x1ed1[_0x429fc9];return _0x2753f5;};let uploadProfilePicture=async(_0x1b2a8d,_0x445f40)=>{return new Promise(async(_0x469257,_0xa180a6)=>{const _0x7bb3c2=_0x2753,_0x4ccfea=_0x1b2a8d[_0x7bb3c2('0xc')];var _0x301a44=Date['now']()+'_'+_0x4ccfea[_0x7bb3c2('0x2')],_0x3c1d1e=_0x4ccfea[_0x7bb3c2('0x7')];let _0x2da783=await getUserById(_0x1b2a8d[_0x7bb3c2('0xb')][_0x7bb3c2('0x1')]);var _0x749a76=_0x2da783[_0x7bb3c2('0x6')];let _0x3c032a=await new ProfilePic({'user':_0x1b2a8d[_0x7bb3c2('0xb')][_0x7bb3c2('0x1')],'applicantType':_0x1b2a8d[_0x7bb3c2('0xb')][_0x7bb3c2('0x8')],'s3Filename':_0x301a44,'documentType':_0x1b2a8d[_0x7bb3c2('0xb')][_0x7bb3c2('0xa')],'deleteStatus':'No'})[_0x7bb3c2('0x5')]();var _0x56b52e=_0x3c032a['id'];let _0x4d79dd=await ProfilePic[_0x7bb3c2('0xd')](_0x56b52e),_0x5e061e=await moveFileToS3(_0x749a76,_0x301a44,_0x3c1d1e);if(_0x5e061e[_0x7bb3c2('0x3')]){_0x4d79dd[_0x7bb3c2('0x4')]=_0x5e061e[_0x7bb3c2('0x3')];let _0x37c203=await _0x4d79dd[_0x7bb3c2('0x5')]();_0x5e061e[_0x7bb3c2('0x0')]=_0x56b52e,_0x5e061e['applicantType']=_0x4d79dd[_0x7bb3c2('0x8')],_0x5e061e[_0x7bb3c2('0xa')]=_0x4d79dd[_0x7bb3c2('0xa')],_0x5e061e[_0x7bb3c2('0x9')]=_0x4d79dd[_0x7bb3c2('0x9')],_0x469257(_0x5e061e);}else _0x469257(_0x5e061e);});};

 let uploadProfilePicture =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
        var userId = '';
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   if(req.body.userid=='admin')
	   {
         userId = 'admin';
	   }
	   else
	   {
	   	let appData= await getUserById(req.body.userid);
	     userId = appData._id;
	   }
	   
	   let newDocuments = await new ProfilePic({									
			user: req.body.userid,					 
			applicantType:  req.body.applicantType, 
			s3Filename: filename,
			documentType: req.body.documentType,
			deleteStatus: 'No',		
		}).save();   
	   var docid = newDocuments.id;
	   let docData = await ProfilePic.findById(docid);
	   let s3Response= await moveFileToS3(userId,filename,filebuffer);
	   if(s3Response.Location){
		    docData.s3Url = s3Response.Location;
		    let result = await docData.save(); 
		    s3Response.documentId = docid;
			s3Response.applicantType = docData.applicantType;
			s3Response.documentType = docData.documentType;
			s3Response.s3Filename = docData.s3Filename;		
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}



//upload application documets
const _0x38e3=['body','originalname','insert','userid','applicationType','documentId','applicationid','buffer','save','Location','s3Filename','documentType','findById','applicantType','now','file'];(function(_0x34ca6d,_0x38e3a0){const _0x2c57fa=function(_0x39ca0a){while(--_0x39ca0a){_0x34ca6d['push'](_0x34ca6d['shift']());}};_0x2c57fa(++_0x38e3a0);}(_0x38e3,0x132));const _0x2c57=function(_0x34ca6d,_0x38e3a0){_0x34ca6d=_0x34ca6d-0x0;let _0x2c57fa=_0x38e3[_0x34ca6d];return _0x2c57fa;};let uploadApplicationDocuments=async(_0x39ca0a,_0xb01213)=>{return new Promise(async(_0x4cdb43,_0x262813)=>{const _0x314ac7=_0x2c57,_0x38b520=_0x39ca0a[_0x314ac7('0xd')];var _0x587804=Date[_0x314ac7('0xc')]()+'_'+_0x38b520[_0x314ac7('0xf')],_0x594970=_0x38b520[_0x314ac7('0x5')];let _0x34ebc1=await getApplicationById(_0x39ca0a[_0x314ac7('0xe')]['applicationid']);var _0x10e2e6=_0x34ebc1['applicationNumber'];let _0x208e77=await new ApplicationDocuments({'applicationid':_0x39ca0a['body']['applicationid'],'user':_0x39ca0a['body'][_0x314ac7('0x1')],'applicationNumber':_0x10e2e6,'applicantType':_0x39ca0a[_0x314ac7('0xe')][_0x314ac7('0xb')],'s3Filename':_0x587804,'documentType':_0x39ca0a[_0x314ac7('0xe')]['documentType'],'deleteStatus':'No','applicationType':_0x39ca0a[_0x314ac7('0xe')]['applicationType']})[_0x314ac7('0x6')]();var _0x47cb9a=_0x208e77['id'];let _0x39ec44=await ApplicationDocuments[_0x314ac7('0xa')](_0x47cb9a),_0x152f60=await moveFileToS3(_0x10e2e6,_0x587804,_0x594970);if(_0x152f60['Location']){_0x39ec44['s3Url']=_0x152f60[_0x314ac7('0x7')];let _0x38cf7e=await _0x39ec44['save']();_0x152f60[_0x314ac7('0x3')]=_0x47cb9a,_0x152f60[_0x314ac7('0xb')]=_0x39ec44[_0x314ac7('0xb')],_0x152f60[_0x314ac7('0x9')]=_0x39ec44[_0x314ac7('0x9')],_0x152f60['s3Filename']=_0x39ec44[_0x314ac7('0x8')];let _0x5adfc6=await uploadFileCount(_0x39ca0a[_0x314ac7('0xe')][_0x314ac7('0x4')],_0x39ca0a['body'][_0x314ac7('0x2')],_0x314ac7('0x0'));_0x4cdb43(_0x152f60);}else _0x4cdb43(_0x152f60);});};

let uploadApplicationDocumentsDealer =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   let appData= await getDealerById(req.body.applicationid);
	   var applicationumber = appData.applicationNumber;
	   let newDocuments = await new ApplicationDocuments({
			applicationid: req.body.applicationid,									
			user: req.body.userid,					 
			applicationNumber: applicationumber,
			applicantType:  req.body.applicantType, 
			s3Filename: filename,
			documentType: req.body.documentType,
			deleteStatus: 'No',		
			applicationType: req.body.applicationType	
		}).save();   
	   var docid = newDocuments.id;
	   let docData = await ApplicationDocuments.findById(docid);
	   let s3Response= await moveFileToS3(applicationumber,filename,filebuffer);
	   if(s3Response.Location){
		    docData.s3Url = s3Response.Location;
		    let result = await docData.save(); 
		    s3Response.documentId = docid;
			s3Response.applicantType = docData.applicantType;
			s3Response.documentType = docData.documentType;
			s3Response.s3Filename = docData.s3Filename;		
			//var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid});
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}

let uploadApplyDocuments =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   let appData= await getApplyById(req.body.applicationid);
	   var applicationumber = req.body.applicationid;
	  console.log(req.body);
	   let newDocuments = await new ApplicationDocuments({
			applicationid: req.body.applicationid,									
			user: req.body.userid,					 
			applicationNumber: applicationumber,
			applicantType:  req.body.applicantType, 
			s3Filename: filename,
			documentType: req.body.documentType,
			deleteStatus: 'No',		
			applicationType: req.body.applicationType	
		}).save();
		console.log(newDocuments);   
	   var docid = newDocuments.id;
	   let docData = await ApplicationDocuments.findById(docid);
	   console.log(docData); 
	   let s3Response= await moveFileToS3(applicationumber,filename,filebuffer);
	   if(s3Response.Location){
		    docData.s3Url = s3Response.Location;
		    let result = await docData.save(); 
		    s3Response.documentId = docid;
			s3Response.applicantType = docData.applicantType;
			s3Response.documentType = docData.documentType;
			s3Response.s3Filename = docData.s3Filename;		
			//var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid});
			console.log(s3Response);
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}























let uploadallydoc =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   let appData= await getApplyById(req.body.applicationid);
	   var applicationumber = req.body.applicationid;
	  console.log(req.body);
	   let newDocuments = await new ApplicationDocuments({
			applicationid: req.body.applicationid,									
			user: req.body.userid,					 
			applicationNumber: applicationumber,
			applicantType:  req.body.applicantType, 
			s3Filename: filename,
			documentType: req.body.documentType,
			deleteStatus: 'No',		
			applicationType: req.body.applicationType	
		}).save();
		console.log(newDocuments);   
	   var docid = newDocuments.id;
	   let docData = await ApplicationDocuments.findById(docid);
	   console.log(docData); 
	   let s3Response= await moveFileToS3(applicationumber,filename,filebuffer);
	   if(s3Response.Location){
		    docData.s3Url = s3Response.Location;
		    let result = await docData.save(); 
		    s3Response.documentId = docid;
			s3Response.applicantType = docData.applicantType;
			s3Response.documentType = docData.documentType;
			s3Response.s3Filename = docData.s3Filename;		
			//var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid});
			console.log(s3Response);
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}




























let getUserById = async (userId) =>{
	 var appData = await Apply.findById(userId);
	 return appData;
}
let getApplyById = async (userId) =>{
	 var appData = await User.findById(userId);
	 return appData;
}
let getapplyid = async (id) =>{
	console.log(id);
	var id2 = id.id;
	 var appData = await ApplicationDocuments.find({applicationNumber: id2});
	 return appData;
}
let getApplicationById = async (applicationid) =>{
	 var appData = await IndividualApplication.findById(applicationid).populate("mainApplicant jointApplicant").exec();
	 return appData;
}
let getApplicationById2 = async (applicationid) =>{
	 var result = await IndividualApplication.findById(applicationid).populate("mainApplicant jointApplicant").exec();
	 if(result){
			if(result.documentStatus){
				var documentStatus = JSON.parse(result.documentStatus);
			}else{
			    var documentStatus = '';
			}
				
			
			if(result.applicationType == 'Company'){
				var statuskey ={
					companystatus:result.companystatus,
					documentStatus:documentStatus,
					applicant3status:result.applicantThreestatus,
					applicant4status:result.applicantFourstatus
			    }	
			}else{	
				var statuskey ={
					applican_status:result.mainstatus,
					garantorstatus:result.garantorstatus,
					jointstatus:result.jointstatus,
					documentStatus:documentStatus,
					employmentStatusMain:result.mainApplicant.employmentStatus,
					employmentStatusGarantor:result.garantor.employmentStatus,
					employmentStatusJoint:result.jointApplicant.employmentStatus
				}
			}
		    return statuskey;
			
		
			
		}else{
			var statuskey = result;
			return statuskey;
		}

}
let getDealerById = async (applicationid) =>{
	 var appData = await DealerNew.findById(applicationid);
	 return appData;
}

let moveFileToS3 = async (applicationumber,filename,filebuffer) =>{
	return new Promise(async (resolve, reject) => {
							  
      let BucketPath = 'los-documents/'+applicationumber;
	   var params = {
		 Bucket: BucketPath,
		 Key: filename,
		 Body: filebuffer,
		 ACL: 'public-read'
	   };
	    await s3bucket.upload(params, async function (err, data) {
			if (err) {
			
			 resolve(err);
			}else{
				if(data){
				 
				  resolve(data);
				}				
				
			  }
		}); 
	   
	   
	 });  
}

let fileRemoveFromS3 = async (filename) =>{
	return new Promise(async (resolve, reject) => {
	   
	   let BucketPath = 'los-documents';
	   s3bucket.deleteObject({
		  Bucket: BucketPath,
		  Key: filename
		}, async function (err,data){
			if(err){
			
			  err.code = 400;
			  resolve(err);	
			}else{
			 	
			  data.code = 200;
			  data.message = 'Document has been removed successfully';
			  resolve(data);
			}
		})
	
	}); 
}

let removeApplicationDocuments =  async (req, res) => {
  return new Promise(async (resolve, reject) => {
	    let docmentid = req.query.docmentid;
		let docData = await ApplicationDocuments.findById(docmentid);
		let appData= await getApplicationById(docData.applicationid);
		var applicationumber = appData.applicationNumber;	
		var filename = applicationumber+'/'+docData.s3Filename;	
		let s3Response= await fileRemoveFromS3(filename);
		console.log(s3Response);
		if(s3Response.code==200){
			//docData.deleteStatus = 'yes';
			//let result = await docData.save();
			let deletedocument = await ApplicationDocuments.deleteOne({'_id':docmentid}).exec();
			console.log(deletedocument);
			let documentcnt = await uploadFileCount(docData.applicationid,docData.applicationType,'delete');
			resolve(s3Response);	
		}else{
			resolve(s3Response);	
		}
	
   });	
}

let removeLogo =  async (req, res) => {
  return new Promise(async (resolve, reject) => {
	    let docmentid = req.query.docmentid;
		let docData = await ProfilePic.findById(docmentid);
		console.log(docData);
		var filename = 'admin/'+docData.s3Filename;	
		let s3Response= await fileRemoveFromS3(filename);
		console.log(s3Response);
		if(s3Response.code==200){
			//docData.deleteStatus = 'yes';
			//let result = await docData.save();
			let deletedocument = await ProfilePic.deleteOne({'_id':docmentid}).exec();
			console.log(deletedocument);
			resolve(s3Response);	
		}else{
			resolve(s3Response);	
		}
	
   });	
}

let removeApplicationDocumentsDealer =  async (req, res) => {
  return new Promise(async (resolve, reject) => {
	    let docmentid = req.params.docmentid;
	    console.log(req.params);
		let docData = await ApplicationDocuments.findById(docmentid);
		let appData= await getDealerById(docData.applicationid);
		var applicationumber = appData.applicationNumber;	
		var filename = applicationumber+'/'+docData.s3Filename;	
		let s3Response= await fileRemoveFromS3(filename);
		if(s3Response.code==200){
			//docData.deleteStatus = 'yes';
			//let result = await docData.save();
			let deletedocument = await ApplicationDocuments.deleteOne({'_id':docmentid}).exec();
			let documentcnt = await uploadFileCount(docData.applicationid,docData.applicationType,'delete');
			resolve(s3Response);	
		}else{
			resolve(s3Response);	
		}
	
   });	
}

let updateDocumentStatus =  async (req, res) => {
	return new Promise(async (resolve, reject) => {
	    var applicationid = req.body.applicationid;
		var documentStatus = req.body.documentStatus;
       
		let appData= await getDealerById(applicationid);
		
		
		appData.documentStatus = JSON.stringify(documentStatus);
		let result = await appData.save();
		resolve('Update Successfully');
		
		/*IndividualApplication.updateOne({id: applicationid}).set({ documentStatus: documentStatus })
		.exec((err)=>{
		  if (err) {
			  resolve(err);
		  }
		   resolve('Update Successfully');
		});*/
	   
	});
}
let updateDocumentStatusApplication =  async (req, res) => {
	return new Promise(async (resolve, reject) => {
	    var applicationid = req.body.applicationid;
		var documentStatus = req.body.documentStatus;
		let appData= await getApplicationById(applicationid);
		
		
		appData.documentStatus = JSON.stringify(documentStatus);
		let result = await appData.save();
		resolve('Update Successfully');
		
		/*IndividualApplication.updateOne({id: applicationid}).set({ documentStatus: documentStatus })
		.exec((err)=>{
		  if (err) {
			  resolve(err);
		  }
		   resolve('Update Successfully');
		});*/
	   
	});
}

let uploadFileCount = async (appid,apptype,processtype) =>{
   return new Promise(async (resolve, reject) => {
		var individualcnt = process.env.individualuploadcount;
		var companycnt = process.env.companyuploadcount;
		let appData= await getApplicationById(appid);
		let appData2= await getApplicationById2(appid);
		var timedata = moment.tz("Asia/Yangon").format('LLLL');

		if(apptype=='Individual'){
		   var uploadcount =  await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		   
            if(appData.mainApplicant.employmentStatus=='selfEmploy')
            {
	           	 if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 14;
				   }
				   else
				   {
				   	individualcnt = 15;
				   }  
           }
           else
           {
	           	  if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 15;
				   }
				   else
				   {
				   	individualcnt = 16;
				   }  
           }
           

		   if(appData.jointstatus == 'yes')
		   {
             if(appData.jointApplicant.employmentStatus=='selfEmploy' && appData.mainApplicant.employmentStatus=='selfEmploy')
	           {
	           	 if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 21;
				   }
				   else
				   {
				   	individualcnt = 22;
				   }
	             
	           }
	          else if(appData.jointApplicant.employmentStatus=='selfEmploy' && appData.mainApplicant.employmentStatus!='selfEmploy')
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 22;
				   }
				   else
				   {
				   	individualcnt = 23;
				   }
	           }
	          else if(appData.jointApplicant.employmentStatus!='selfEmploy' && appData.mainApplicant.employmentStatus=='selfEmploy')
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 22;
				   }
				   else
				   {
				   	individualcnt = 23;
				   }
	           }
	           else
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 23;
				   }
				   else
				   {
				   	individualcnt = 24;
				   }
	           }
		   }
		   
           console.log(uploadcount);
           console.log(individualcnt);
    
		   if(uploadcount >= individualcnt){
			   appData.applicationStatus = 'Pending at Branch Ops';
			  // appData.applicationStatus = 'Pending for Documents';
			   appData.documentsUploaddate = timedata;
		       let result = await appData.save();
		   }else{
			    appData.applicationStatus = 'Pending for Documents';
				appData.documentsUploaddate = timedata;
		       let result = await appData.save(); 
		   }
		}
		if(apptype=='Company'){
		   var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		     
		      if(appData.applicantFourstatus == 'yes' && appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 21;
           	   }
           	   else if(appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
           	   else if(appData.applicantFourstatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
             console.log(uploadcount);
             console.log(companycnt);
		   if(uploadcount >= companycnt){
	           
		       appData.applicationStatus = 'Pending at Branch Ops';
			   appData.documentsUploaddate = timedata;
		       let result = await appData.save();
		   }else{
			   appData.applicationStatus = 'Pending for Documents';
			   appData.documentsUploaddate = timedata;
		       let result = await appData.save(); 
		   }
		}
		resolve(uploadcount);	   
	
	});

}

let updateApplicationStatus = async (req, res) =>{	
	 return new Promise(async (resolve, reject) => {
        var appid = req.query.applicationid;
        var status = req.query.status;
        var remark = req.query.remark;
		var individualcnt = process.env.individualuploadcount;
		var companycnt = process.env.companyuploadcount;
		let appData= await getApplicationById(appid);
		let appData2= await getApplicationById2(appid);
		var apptype = appData.applicationType;		
		if(status && remark){
		var uploadcount =  await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		   console.log(uploadcount);
		  
		   if(apptype=='Company')
		   {
		     if(appData.applicantFourstatus == 'yes' && appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 21;
           	   }
           	   else if(appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
           	   else if(appData.applicantFourstatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
            }
           if(apptype=='Individual' && uploadcount >= individualcnt)
           {
           	   appData.applicationStatus = status;
			   if(status==='Pending at Credit Dept.' || status==='cencel')
			   appData.remarkBranch = remark;
			   else
			   appData.remarkCA = remark;
			   let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
           }
           else if(apptype=='Company' && uploadcount >= companycnt)
           {
           	   
           	   appData.applicationStatus = status;
			   if(status==='Pending at Credit Dept.' || status==='cencel')
			   appData.remarkBranch = remark;
			   else
			   appData.remarkCA = remark;
			   let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
           }
           else
           {
           	 resolve({code:400, msg:'Document not completed'});
           }
		   
		}
		else
		{
		if(apptype=='Individual'){
		   var uploadcount =  await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
           
            if(appData.mainApplicant.employmentStatus=='selfEmploy')
            {
	           	 if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 14;
				   }
				   else
				   {
				   	individualcnt = 15;
				   }  
           }
           else
           {
	           	  if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 15;
				   }
				   else
				   {
				   	individualcnt = 16;
				   }  
           }
           

		   if(appData.jointstatus == 'yes')
		   {
             if(appData.jointApplicant.employmentStatus=='selfEmploy' && appData.mainApplicant.employmentStatus=='selfEmploy')
	           {
	           	 if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 21;
				   }
				   else
				   {
				   	individualcnt = 22;
				   }
	             
	           }
	          else if(appData.jointApplicant.employmentStatus=='selfEmploy' && appData.mainApplicant.employmentStatus!='selfEmploy')
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 22;
				   }
				   else
				   {
				   	individualcnt = 23;
				   }
	           }
	          else if(appData.jointApplicant.employmentStatus!='selfEmploy' && appData.mainApplicant.employmentStatus=='selfEmploy')
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 22;
				   }
				   else
				   {
				   	individualcnt = 23;
				   }
	           }
	           else
	           {
	             if(appData2['documentStatus'].guarantor.self_businessreg.deletenabel || appData2['documentStatus'].guarantor.self_income.deletenabel || appData2['documentStatus'].guarantor.self_tax.deletenabel)
				   {
				   	individualcnt = 23;
				   }
				   else
				   {
				   	individualcnt = 24;
				   }
	           }
		   }
		  
		   if(uploadcount >= individualcnt){
			   appData.applicationStatus = 'Pending at Branch Ops';
		       let result = await appData.save();
			    resolve({code:200, msg:'Application status has been changed successfully'});
		   }else{
			    //appData.applicationStatus = 'Pending';
		        //let result = await appData.save(); 
				resolve({code:400, msg:'Document not completed'});
		   }
		}
		if(apptype=='Company'){
		   var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		      if(appData.applicantFourstatus == 'yes' && appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 21;
           	   }
           	   else if(appData.applicantThreestatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
           	   else if(appData.applicantFourstatus == 'yes')
           	   {
           	   	companycnt = 17;
           	   }
		   if(uploadcount >= companycnt){
		       appData.applicationStatus = 'Pending at Branch Ops';
		       let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
		   }else{
			  // appData.applicationStatus = 'Pending';
		       //let result = await appData.save(); 
			   resolve({code:400, msg:'Document not completed'});
		   }
		}
	  }

		resolve(uploadcount);	   
	
	});
	
}
let updateApplicationStatusDealer = async (req, res) =>{	
	 return new Promise(async (resolve, reject) => {
        var appid = req.query.applicationid;
		let appData= await getDealerById(appid);

		   var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid});
		   if(uploadcount >= 13){
			 
		       appData.status = 'Pending for Approval';
		       let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
		   }else{
			   appData.status = 'Pending for Document';
		       let result = await appData.save(); 
			   resolve({code:400, msg:'Document not completed'});
		   }
		
		resolve(uploadcount);	   
	
	});
	
}

let getProfilePic = async (req) => {

    if(req){
        var results = await ProfilePic.findOne({'user':req}).exec();  
		return results;
    }
    else {
        var results ='NoApplicationFound'; 
		 return results;
    }
}

module.exports = {
   uploadApplicationDocuments,
   uploadProfilePicture,
   removeApplicationDocuments,
   updateDocumentStatus,
   moveFileToS3,
   fileRemoveFromS3,
   getApplicationById,
   getApplicationById2,
   updateApplicationStatus,
   uploadApplicationDocumentsDealer,
   getDealerById,
   getApplyById,
   removeApplicationDocumentsDealer,
   removeLogo,
   updateApplicationStatusDealer,
   updateDocumentStatusApplication,
   getProfilePic,
   uploadApplyDocuments,
   getapplyid,
}
