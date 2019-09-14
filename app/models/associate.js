var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssociateSchema = new Schema({
    empid: {type: String, lowercase: true, required:true, unique:true },
    name: {type: String, lowercase: true, required:true},
    email :{type:String, required: true, lowercase: true, unique: true},
    contact: {type:String, required: true, lowercase: true, unique: true},
    skills: {type:String, required: true, lowercase: true}
});


module.exports = mongoose.model('Associate', AssociateSchema);