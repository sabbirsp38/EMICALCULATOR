require('dotenv').config();
var xlsx = require('node-xlsx');
const mongoose = require('mongoose');
var fs = require('fs');
var HashMap = require('hashmap');
//const worksheet = xlsx.parse('manufacturer.xlsx');
//const worksheet = xlsx.parse('dealer.xlsx');
//const worksheet = xlsx.parse('branch.xlsx');
const worksheet = xlsx.parse('state_city.xlsx');
var manufacturerModel = require('./models/manufacturer');
var dealerModel = require('./models/dealer');
var branchModel = require('./models/branch');
var stateModel = require('./models/state');
var cityModel = require('./models/city');
let dbHost = process.env.dbhost;
let dbUserName = process.env.dbusername;
let dbPass = process.env.dbpasssword;
let connUrl = process.env.dbconnectionUrl;
let db_url =  dbHost + '://' + dbUserName + ':' + dbPass + '@' + connUrl;
var hmap = new HashMap();
var data = worksheet[0].data;
var header = data[0];

mongoose.connect(db_url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("DB connected");
    start();
}).catch(err => {
    console.log('Error occurred while connecting');
});


async function start(){
    for (let cell in header) {
        hmap.set(header[cell], cell);
    }
    
    for (let i = 1; i <= data.length; i++) {
        console.log("ROW NO "+i);
        var row = data[i];
        //await readDealerData(row);
       //await readManufacturerData(row);
       //await readBranchData(row);
       await readStateCity(row);
    }
}





async function readDealerData(row){
    var constObj = {
        'dealerName': "Dealer Name",
        'dealerAddress1': 'Dealer Address',
        'dealerAddress2': 'Address 2',
        'phone': 'Telephone Number',
        'manufacturer': 'Brand',
        'dealerType': 'Dealer Type',
        'contactPerson': 'Contact Person'
    };
    var dealerName = row[hmap.get(constObj.dealerName)];
    var addr1 = row[hmap.get(constObj.dealerAddress1)];
    var addr2 = row[hmap.get(constObj.dealerAddress2)];
    var phone = row[hmap.get(constObj.phone)];
    var manufacturerId = row[hmap.get(constObj.manufacturer)] ? row[hmap.get(constObj.manufacturer)].trim() : '';
    var dealerType = row[hmap.get(constObj.dealerType)];
    var contactPerson = row[hmap.get(constObj.contactPerson)];
    var dealerData = new dealerModel({
        name: dealerName,
        contactPerson: contactPerson,
        manufacturerId: manufacturerId,
        contactPersonPhone: phone,
        address: {
            addressLine1: addr1,
            addressLine2: addr2
        },
        dealerType: dealerType
    });
    try{
        let result = await dealerData.save();
        console.log('success');
    }catch(err){
        console.log('fail');
    }
}

async function readManufacturerData(row){
    var constObj = {
        Manufacturer: "Manufacturer",
    };
     //save manufacturer
    var manufacturer = row[hmap.get(constObj.Manufacturer)];
    console.log(manufacturer);
    var model = new manufacturerModel({
        name: manufacturer
    });
    try{
        let result = await model.save();
        console.log(result);
    }catch(err){
        console.log(err)
        }
}

async function readBranchData(row){
    var constObj = {
        'name': "Branch",
        'address': 'Branch Address',
        'phone': 'Phone No',
        'manager': 'Br.Mgr'
    };

    var name = row[hmap.get(constObj.name)] ? row[hmap.get(constObj.name)].trim() : '';
    var address = row[hmap.get(constObj.address)] ? row[hmap.get(constObj.address)].trim() : '';
    var phone = row[hmap.get(constObj.phone)]? row[hmap.get(constObj.phone)].trim() : '';
    var manager = row[hmap.get(constObj.manager)]? row[hmap.get(constObj.manager)].trim() : '';
    console.log(name)
    if(name){
        var branchData = new branchModel({
            name: name,
            address: {
                addressLine1: address
            },
            phoneNo: phone,
            manager: manager
        });
        try{
            let result = await branchData.save();
            console.log('success');
        }catch(err){
            console.log('fail');
        }
    }else{
        console.log('invalid name')
    }
    
}

async function readStateCity(row){
    var constObj = {
        District: "District",
        Towinship: "Towinship"
    };
   
    try{
        var District = row[hmap.get(constObj.District)].trim();
        var town = row[hmap.get(constObj.Towinship)].trim();
    
        let stateData = await stateModel.find({name:District}).exec();
        if(stateData.length){
            let stateId = stateData[0]._id;
            let dataToSave = new cityModel({
                name: town,
                stateId: stateId
            });
            await dataToSave.save();
        }else{
            let stateDataToSave = new stateModel({
                name: District
            });
            let stateResult =  await stateDataToSave.save();
            console.log(stateResult._id);
            let cityDataToSave = new cityModel({
                name: town,
                stateId: stateResult._id
            });
            let cityResult = await cityDataToSave.save();
        }
    }catch(err){
        console.log(err);
    }
    
}