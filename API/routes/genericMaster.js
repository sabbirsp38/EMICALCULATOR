const express = require('express');
const router = express.Router();
const genericMaster = require('../services/generic_master');

let _handleError = (res,statusCode,err) => {
    let objResp = {
        message: err || 'Oops! Something went wrong at our end. Please try again later.',
        statusCode: statusCode || 500,
        errorCode: 0
    };
    console.log(err);
    res.status(objResp.statusCode).send(objResp);
}
router.get('/:masterName',async function(req,res){
 
    try{
        let masterName = req.params.masterName;
        let result = await genericMaster.fetchMaster(masterName);
      
        res.send(result);
    }
    catch(err){
        _handleError(res,500,err);
    };
});

module.exports = router;