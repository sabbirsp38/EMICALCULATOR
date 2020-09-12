var ApplicationDocuments = require('../models/applicationdocuments');
var ProfilePic = require('../models/profilepic');
var IndividualApplication = require('../models/individual_application');
var Applicants= require('../models/applicants');
var User = require('../models/user');
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
   
 let uploadProfilePicture =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   let appData= await getUserById(req.body.userid);
	   var userId = appData._id;
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
let uploadApplicationDocuments =  async (req, res) => {
   return new Promise(async (resolve, reject) => {
							 
       const file = req.file;
       var filename = Date.now()+'_'+file.originalname;
	   var filebuffer= file.buffer;
	   let appData= await getApplicationById(req.body.applicationid);
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
			let documentcnt = await uploadFileCount(req.body.applicationid,req.body.applicationType,'insert');
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}

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
			let documentcnt = await uploadFileCount(req.body.applicationid,req.body.applicationType,'insert');
			resolve(s3Response);
	   }else{
		    resolve(s3Response);
	   }
	  
	}); 
}



let getUserById = async (userId) =>{
	 var appData = await User.findById(userId);
	 return appData;
}
let getApplicationById = async (applicationid) =>{
	 var appData = await IndividualApplication.findById(applicationid);
	 return appData;
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
			 console.log("err====",err);
			 resolve(err);
			}else{
				if(data){
				  console.log("Data====",data);
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
			 // console.log("err====",err);
			  err.code = 400;
			  resolve(err);	
			}else{
			  console.log("data====",data);	
			  data.code = 200;
			  data.message = 'Document has been removed successfully';
			  resolve(data);
			}
		})
	
	}); 
}

let removeApplicationDocuments =  async (req, res) => {
  return new Promise(async (resolve, reject) => {
	    let docmentid = req.params.docmentid;
		let docData = await ApplicationDocuments.findById(docmentid);
		let appData= await getApplicationById(docData.applicationid);
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

let removeApplicationDocumentsDealer =  async (req, res) => {
  return new Promise(async (resolve, reject) => {
	    let docmentid = req.params.docmentid;
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
        console.log(req.body);
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
		var timedata = moment.tz("Asia/Yangon").format('LLLL');
		
		console.log("appid====",appid);	
		console.log("apptype====",apptype);
		console.log("processtype====",processtype);
		
		if(apptype=='Individual'){
		   var uploadcount =  await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		   if(uploadcount >= individualcnt){
			   appData.applicationStatus = 'Submitted';
			   appData.documentsUploaddate = timedata;
		       let result = await appData.save();
		   }else{
			    appData.applicationStatus = 'Pending';
				appData.documentsUploaddate = timedata;
		       let result = await appData.save(); 
		   }
		}
		if(apptype=='Company'){
		   var uploadcount = await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		   if(uploadcount >= companycnt){
			   console.log("uploadcount====",uploadcount);
		       appData.applicationStatus = 'Submitted';
			   appData.documentsUploaddate = timedata;
		       let result = await appData.save();
		   }else{
			   appData.applicationStatus = 'Pending';
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
		var individualcnt = process.env.individualuploadcount;
		var companycnt = process.env.companyuploadcount;
		let appData= await getApplicationById(appid);
		var apptype = appData.applicationType;	
		
		console.log("appid====",appid);	
		console.log("apptype====",apptype);			
		
		if(apptype=='Individual'){
		   var uploadcount =  await ApplicationDocuments.countDocuments({"applicationid" : appid, "applicationType":apptype});
		   //var uploadcount = 17;
		   console.log("uploadcount====",uploadcount);	
		   if(uploadcount >= individualcnt){
			   appData.applicationStatus = 'Ops Verified';
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
		   if(uploadcount >= companycnt){
			   console.log("uploadcount====",uploadcount);
		       appData.applicationStatus = 'Ops Verified';
		       let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
		   }else{
			  // appData.applicationStatus = 'Pending';
		       //let result = await appData.save(); 
			   resolve({code:400, msg:'Document not completed'});
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
		   if(uploadcount >= 15){
			   console.log("uploadcount====",uploadcount);
		       appData.status = 'Submitted';
		       let result = await appData.save();
			   resolve({code:200, msg:'Application status has been changed successfully'});
		   }else{
			   appData.status = 'pending for document';
		       let result = await appData.save(); 
			   resolve({code:400, msg:'Document not completed'});
		   }
		
		resolve(uploadcount);	   
	
	});
	
}

let getProfilePic = async (req) => {
	console.log(req);
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
   updateApplicationStatus,
   uploadApplicationDocumentsDealer,
   getDealerById,
   removeApplicationDocumentsDealer,
   updateApplicationStatusDealer,
   updateDocumentStatusApplication,
   getProfilePic,
}
