require("./userType");
require("./branch");
require("./dsa");
require("./dealer");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");

const ApplySchema = new Schema({
    
  number:{type: String},
  contactaddress:{type: String},
  hadd1:{type: String},
  hadd2:{type: String},
  hcity:{type: String},
  hpcode:{type: String},
  hpnumber:{type: String},
  hstate:{type: String},
  oadd1:{type: String},
  oadd2:{type: String},
  ocity:{type: String},
  opcode:{type: String},
  opnumber:{type: String},
  ostate:{type: String},
  loanamount:{type: String},
  yearreturn:{type: String},
  currentloan:{type: String},
  dilaration:{type: String},
  emiamount:{type: String},
  lonarunning:{type: String},
  mexpense:{type: String},
  mrent:{type: String},
  numberofemi:{type: String},
  Employmentnamees1:{type: String},
  applicationtypees3:{type: String},
  applicationtypees4:{type: String},
  city:{type: String},
  depreciationes3:{type: String},
  depreciationes4:{type: String},
  emlomentnamees3:{type: String},
  emlomentnamees4:{type: String},
  employmenttype:{type: String},
  irtes3:{type: String},
  irtes4:{type: String},
  personneame:{type: String},
  residencetype:{type: String},
  takehomeselary:{type: String},
  takehomeselarybuseness:{type: String},
  takehomeselaryprofesonal:{type: String},
  workexperincees3:{type: String},
  workexperincees4:{type: String},
  cardelarprice:{type: String},
  carmodel:{type: String},
  carprice:{type: String},
  insucost:{type: String},
  rtocost:{type: String},
  montyspendamount:{type: String},
  applicationid:{type: String},
  mothyemi:{type: String},
  fullamountreplay:{type: String},
  totalinterest:{type: String},
  preapproveamount:{type: String},
  totalcarprice:{type: String},
  "documentStatus":{
        "type": String
    },
},{timestamps:true});

const Apply = mongoose.model('apply',ApplySchema);

module.exports = Apply;