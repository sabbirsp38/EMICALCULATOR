const express = require('express');
const router = express.Router();
const individualApplicationService = require('../services/individual_application');
const uploadDocumentService = require('../services/uploadDocumentService');
const request = require('https');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});
var upload = multer({ storage: storage }).single('file');

let _handleError = (res,statusCode,err) => {
    let objResp = {
        message: err || 'Oops! Something went wrong at our end. Please try again later.',
        statusCode: statusCode || 500,
        errorCode: 0
    };
  
    res.status(objResp.statusCode).send(objResp);
}

router.post('/create',async function(req,res){
    try{
        let application = await individualApplicationService.createApplication(req);
        let application2 = await individualApplicationService.createApplication2(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.put('/updateIndividualApplication',async function(req,res){
    try{
        let application = await individualApplicationService.updateApplicant(req);
        if(req.query.remarkCA!='')
        {let application2 = await individualApplicationService.createApplication2(req);}
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});


router.get('/list/:roleId',async function(req,res){
    try{
        let application = await applicationService.getApplicationsByRoleId(req,res);
        //res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});

router.get('/',async function(req,res){
    try{
        let result = await individualApplicationService.searchApplications(req);
        res.status(200).send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
    let id = req.query.id;
    let startDate = req.query.start;
    let endDate = req.query.end;
    let limit = req.query.limit;
});

router.get('/auditTrail',async function(req,res){
    try{
        let result = await individualApplicationService.searchApplications2(req);
        res.status(200).send(result);
    }catch(err){
        _handleError(res,500, err.message);
    }
  
});


router.get('/getreportdata',async function(req,res){
    try{
        let result = await individualApplicationService.reportApplications(req);
		//console.log("result=====",result);	
		if(result.code==200){
			res.status(200).send(result.resarray);
		}else{
		    res.status(400).send({err:'No Record Found'});
		}
        
    }catch(err){
        _handleError(res,500, err.message);
    }
    let id = req.query.id;
    let startDate = req.query.start;
    let endDate = req.query.end;
    let limit = req.query.limit;
});
router.get('/getreportdata2',async function(req,res){
    try{
        let result = await individualApplicationService.reportApplications2(req);
		//console.log("result=====",result);	
		if(result.code==200){
			res.status(200).send(result.resarray);
		}else{
		    res.status(400).send({err:'No Record Found'});
		}
        
    }catch(err){
        _handleError(res,500, err.message);
    }
    let id = req.query.id;
    let startDate = req.query.start;
    let endDate = req.query.end;
    let limit = req.query.limit;
});
router.get('/getProfilePic/:applicationid',async function(req,res){
    try{
		let id2 = req.params.applicationid;
        let result = await uploadDocumentService.getProfilePic(id2);
		res.send(result);
		
    }catch(err){
        _handleError(res,500, err.message);
    }
});

router.get('/getUploadstatus/:applicationid',async function(req,res){
    try{
		
        let result = await individualApplicationService.getApplicationFormStatus(req);
		//console.log("result=====",result);	
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
		    res.status(200).send(statuskey);
			
		
			
		}else{
			var statuskey = result;
			 res.status(400).send(statuskey);
		}
    }catch(err){
        _handleError(res,500, err.message);
    }
});

 router.get('/dealerStatus/:applicationid',async function(req,res){
   
    try{
        let result = await individualApplicationService.getDealer(req);
        if(result){
			if(result.documentStatus){
				var documentStatus = JSON.parse(result.documentStatus);
			}else{
			    var documentStatus = '';
			}
			var statuskey ={
					documentStatus:documentStatus,
			    }
							
		    res.status(200).send(statuskey);
			
		}else{
			var statuskey = result;
			 res.status(400).send(statuskey);
		}
       
    }catch(err){
        _handleError(res,500, err.message);
    }
   
});

router.post('/uploadProfilePic', upload, async function (req, res) {
	 try{
			 
		 if(req.body.userid)
         {
			var maxsize = 2 * 1024 * 1024; 
			var filesize = req.file.size;	
			if(maxsize > filesize){
				 let result = await uploadDocumentService.uploadProfilePicture(req);
				 
				 if(result){
				   res.status(200).send(result);
				 }else{
				   res.status(400).send(result);
				 }
			}else{
			   res.status(400).send('File must be smaller than 2MB');	
			}
		 }else{
	       res.status(400).send('One or more required parameters are missing or invalid');
         }
		
		 
	}catch(err){
        _handleError(res,500, err.message);
    }	 
}) 
router.post('/uploaddocuments', upload, async function (req, res) {
	 try{

		 if(req.body.applicationid)
         {
			var maxsize = 2 * 1024 * 1024; 
				
			var filesize = req.file.size;
			
			if(maxsize > filesize){
				 let result = await uploadDocumentService.uploadApplicationDocuments(req);
				 if(result){
				   res.status(200).send(result);
				 }else{
				   res.status(400).send(result);
				 }
			}else{
			   res.status(400).send('File must be smaller than 2MB');	
			}
		 }else{
	       res.status(400).send('One or more required parameters are missing or invalid');
         }
		
		 
	}catch(err){
        _handleError(res,500, err.message);
    }	 
}) 

router.post('/uploaddocumentsDealer', upload, async function (req, res) {
	 try{
		  
		 if(req.body.applicationid)
         {
			var maxsize = 2 * 1024 * 1024; 
			
			var filesize = req.file.size;
				
			if(maxsize > filesize){
				 let result = await uploadDocumentService.uploadApplicationDocumentsDealer(req);
					 
				 if(result){
				   res.status(200).send(result);
				 }else{
				   res.status(400).send(result);
				 }
			}else{
			   res.status(400).send('File must be smaller than 2MB');	
			}
		 }else{
	       res.status(400).send('One or more required parameters are missing or invalid');
         }
		
		 
	}catch(err){
        _handleError(res,500, err.message);
    }	 
}) 


router.get('/removedocument/',async function(req,res){
	try{
		console.log(req.query);
		if(req.query.docmentid){
			 let result = await uploadDocumentService.removeApplicationDocuments(req);
			 if(result){
			   res.status(200).send(result);
			 }else{
			   res.status(400).send('Unable to delete document');
			 }
	    }else{
			res.status(400).send('No Document Found');
	    }		 
	}catch(err){
	  _handleError(res,500, err.message);
	}
})

router.get('/removedocumentDealer/:docmentid',async function(req,res){
	try{
		
			
		if(req.params.docmentid){
			 let result = await uploadDocumentService.removeApplicationDocumentsDealer(req);
			 if(result){
			   res.status(200).send(result);
			 }else{
			   res.status(400).send('Unable to delete document');
			 }
	    }else{
			res.status(400).send('No Document Found');
	    }		 
	}catch(err){
	  _handleError(res,500, err.message);
	}
})


router.post('/getDocumentstatus',async function(req,res){
    try{
        let application = await uploadDocumentService.updateDocumentStatus(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.post('/getDocumentstatusApplication',async function(req,res){
    try{
        let application = await uploadDocumentService.updateDocumentStatusApplication(req);
        res.status(201).json(application);
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});

router.get('/changeApplicationStatus',async function(req,res){
    try{
        let appResponse = await uploadDocumentService.updateApplicationStatus(req);
		if(appResponse.code==200){
			res.status(200).json({msg:appResponse.msg});
		}else{
			res.status(400).json({err:appResponse.msg});
		}
        
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});
router.get('/changeApplicationStatusDealer',async function(req,res){
    try{
        let appResponse = await uploadDocumentService.updateApplicationStatusDealer(req);
		if(appResponse.code==200){
			res.status(200).json({msg:appResponse.msg});
		}else{
			res.status(400).json({err:appResponse.msg});
		}
        
    }
    catch(err){
        _handleError(res,400, err.message);
    }    
});

module.exports = router;