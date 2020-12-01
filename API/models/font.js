const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FontSchema = new Schema({
    color:{
        type:String, 
    },
    h_font:{
        type:String, 
    },
    f_n_font:{
        type:String, 
    },
    f_i_font:{
        type:String, 
    },
    font_name:{
        type:String, 
    }
},{timestamps:true});

const Font = mongoose.model('font',FontSchema);

module.exports = Font;