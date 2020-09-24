const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarDetailsShema = new Schema({
    "bname":{
            type: String
        },
	"price": {
            type: String
        }
},{timestamps:true})


const CarDetailsShema = mongoose.model('cardetails',CarDetailsShema);

module.exports = CarDetailsShema;