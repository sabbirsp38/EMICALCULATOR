var Apply = require('../models/apply');

var moment = require('moment-timezone');
const {base64decode}  = require('nodejs-base64');
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config();
var asyncLoop = require('node-async-loop');


(function(){


    this.insertNumber = async function (req) {
       // console.log(req.body);
       console.log(req);
        let newUser = await new Apply({
            number: req

        }).save();
        delete newUser._doc['password'];
        return newUser;
    }

  
   
}).apply(module.exports);

