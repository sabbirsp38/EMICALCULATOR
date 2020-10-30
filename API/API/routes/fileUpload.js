const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const express = require('express');
const router = express.Router();

const expires = 120;
router.get('/',async function(req,res){
  const bucketName = req.query.bucketName;
  const key = req.query.key;

  const contentType = req.query.contentType;
  var credentials = {
    accessKeyId: 'AKIAQ5IH5SQPZKZ52H5C',
    secretAccessKey: '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'
  }
  AWS.config.update({credentials:credentials,region:'ap-south-1'});
  if (!bucketName || !key || !contentType) {
    return res.status(400).json({
      message: 'One or more required parameters are missing or invalid'
    });
  }

  _getSignedURL(bucketName, key, contentType).then((response) => {
    const responseObj = {
      signedUrl: response,
      type: 'put'
    }
    return res.status(200).json(responseObj);
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Oops! Something went wrong at our end. Please try again later.'
    });
  });
});

var _getSignedURL = (bucket, key, contentType) => {
  return new Promise((resolve, reject) => {
    var s3bucket = S3;
    var params = {
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      Expires: expires
    };

    s3bucket.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });

  });
}

module.exports = router;