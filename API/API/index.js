//const _0xbd9b=['views','readFileSync','./routes/customer','dotenv','dbusername','cors','/api/user','https','body-parser','./routes/user','dbconnectionUrl','/api/fileUpload/','://','port','/api/application','catch','/api/customer','Error\x20occurred\x20while\x20connecting','dbpasssword','set','listen','/api/companyapplication','express','json','private.key','config','createServer','./routes/genericMaster','env','ca_bundle.crt','ejs','connect','mongoose','log','DB\x20connected','./routes/companyapplication','view\x20engine','join','path','use','Listening...\x20on\x20port\x20number\x20'];(function(_0x37b75c,_0xbd9bbd){const _0x5e5658=function(_0x2e7eb7){while(--_0x2e7eb7){_0x37b75c['push'](_0x37b75c['shift']());}};_0x5e5658(++_0xbd9bbd);}(_0xbd9b,0x157));const _0x5e56=function(_0x37b75c,_0xbd9bbd){_0x37b75c=_0x37b75c-0x0;let _0x5e5658=_0xbd9b[_0x37b75c];return _0x5e5658;};const _0x54ce85=_0x5e56;require(_0x54ce85('0x1d'))[_0x54ce85('0xa')]();const express=require(_0x54ce85('0x7')),https=require(_0x54ce85('0x21')),bodyParser=require(_0x54ce85('0x22')),path=require(_0x54ce85('0x17')),app=express(),fs=require('fs');var cors=require(_0x54ce85('0x1f'));const mongoose=require(_0x54ce85('0x11'));let dbHost=process[_0x54ce85('0xd')]['dbhost'],dbUserName=process[_0x54ce85('0xd')][_0x54ce85('0x1e')],dbPass=process[_0x54ce85('0xd')][_0x54ce85('0x3')],connUrl=process['env'][_0x54ce85('0x24')],db_url=dbHost+_0x54ce85('0x26')+dbUserName+':'+dbPass+'@'+connUrl;const userRoute=require(_0x54ce85('0x23')),customerRoute=require(_0x54ce85('0x1c')),appRoutes=require('./routes/individual_application'),companyRoutes=require(_0x54ce85('0x14')),masterRoutes=require(_0x54ce85('0xc')),fileUpload=require('./routes/fileUpload');mongoose[_0x54ce85('0x10')]('mongodb://localhost:27017/los',{'useUnifiedTopology':!![],'useNewUrlParser':!![],'useCreateIndex':!![]})['then'](()=>{const _0x25ab0e=_0x54ce85;console[_0x25ab0e('0x12')](_0x25ab0e('0x13'));})[_0x54ce85('0x0')](_0x2e7eb7=>{const _0x229bef=_0x54ce85;console['log'](_0x229bef('0x2'));}),app[_0x54ce85('0x18')](cors()),app[_0x54ce85('0x4')](_0x54ce85('0x15'),_0x54ce85('0xf')),app['set'](_0x54ce85('0x1a'),path[_0x54ce85('0x16')](__dirname,_0x54ce85('0x1a'))),app[_0x54ce85('0x18')](bodyParser[_0x54ce85('0x8')]()),app[_0x54ce85('0x18')](bodyParser['urlencoded']({'extended':!![]})),app[_0x54ce85('0x18')](_0x54ce85('0x20'),userRoute),app[_0x54ce85('0x18')](_0x54ce85('0x1'),customerRoute),app[_0x54ce85('0x18')](_0x54ce85('0x28'),appRoutes),app[_0x54ce85('0x18')](_0x54ce85('0x6'),companyRoutes),app[_0x54ce85('0x18')]('/api/master/',masterRoutes),app[_0x54ce85('0x18')](_0x54ce85('0x25'),fileUpload);let port=process[_0x54ce85('0xd')][_0x54ce85('0x27')];https[_0x54ce85('0xb')]({'key':fs['readFileSync'](_0x54ce85('0x9')),'cert':fs[_0x54ce85('0x1b')]('certificate.crt'),'ca':fs[_0x54ce85('0x1b')](_0x54ce85('0xe'))},app)[_0x54ce85('0x5')](port,()=>{const _0x42af4f=_0x54ce85;console[_0x42af4f('0x12')](_0x42af4f('0x19')+port);});
require('dotenv').config();
const express = require('express');
const https = require('https')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
var cors = require('cors')
// Set up mongoose connection
const mongoose = require('mongoose');
let dbHost = process.env.dbhost;
let dbUserName = process.env.dbusername;
let dbPass = process.env.dbpasssword;
let connUrl = process.env.dbconnectionUrl;
let db_url =  dbHost + '://' + dbUserName + ':' + dbPass + '@' + connUrl;
const userRoute = require('./routes/user');
const customerRoute = require('./routes/customer');
const appRoutes = require('./routes/individual_application');
const companyRoutes = require('./routes/companyapplication');
const masterRoutes = require('./routes/genericMaster');
const fileUpload = require('./routes/fileUpload');
mongoose.connect('mongodb://localhost:27017/los',{
    useUnifiedTopology: true, 
    useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
    console.log("DB connected");
   // console.log(db_url);
}).catch(err => {
    console.log('Error occurred while connecting');
});
app.use(cors());
// Set EJS as templating engine 
app.set('view engine', 'ejs');
app.set( "views", path.join( __dirname, "views" ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/user',userRoute);
app.use('/api/customer',customerRoute);
app.use('/api/application',appRoutes);
app.use('/api/companyapplication',companyRoutes);
app.use('/api/master/',masterRoutes);
app.use('/api/fileUpload/',fileUpload);
let port = process.env.port;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
// https.createServer({key: fs.readFileSync('private.key'),
//   cert: fs.readFileSync('certificate.crt'),
//   ca: fs.readFileSync('ca_bundle.crt')}, app).listen(port, () => {
//   console.log('Listening... on port number ' + port)
// })