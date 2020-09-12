require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cors = require('cors')
// Set up mongoose connection
const mongoose = require('mongoose');
let dbHost = process.env.dbhost;
let dbUserName = process.env.dbusername;
let dbPass = process.env.dbpasssword;
let connUrl = process.env.dbconnectionUrl;
let db_url =  dbHost + '://' + dbUserName + ':' + dbPass + '@' + connUrl;
 const userRoute = require('./routes/user');
// const customerRoute = require('./routes/customer');
// const appRoutes = require('./routes/individual_application');
// const companyRoutes = require('./routes/companyapplication');
// const masterRoutes = require('./routes/genericMaster');
// const fileUpload = require('./routes/fileUpload');
mongoose.connect('mongodb://localhost:27017/apply',{
    useUnifiedTopology: true, 
    useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
    console.log("DB connected");
    console.log(db_url);
}).catch(err => {
    console.log('Error occurred while connecting');
});
app.use(cors());
// Set EJS as templating engine 
app.set('view engine', 'ejs');
app.set( "views", path.join( __dirname, "views" ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 app.use('/apply/user',userRoute);
// app.use('/api/customer',customerRoute);
// app.use('/api/application',appRoutes);
// app.use('/api/companyapplication',companyRoutes);
// app.use('/api/master/',masterRoutes);
// app.use('/api/fileUpload/',fileUpload);
let port = process.env.port;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
