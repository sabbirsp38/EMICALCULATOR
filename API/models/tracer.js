const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracerSchema = new Schema({
    "user": {
			"type": String,
			"ref": "User"
		},
	 "activityType" :
	 {
	 	"type" : String,
	 },
	 "userType" :
	 {
	 	"type" : String,
	 },
	 "time" :
	 {
	 	"type" : String,
	 },
	 
    
},{timestamps:true});

const Tracer = mongoose.model('tracer',TracerSchema);

module.exports = Tracer;