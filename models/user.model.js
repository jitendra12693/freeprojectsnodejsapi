const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Password: {type:String,required:true},
    MobileNo: {type:String,required:false},
    ProfileImg: {type:String,required:false},
    CollegeName:{type:String,required:false},
    University:{type:String,required:false},
    UPIId:{type:String,required:false},
    ProgrammingSkill:{type:String,required:false},
    City:{type:String,required:false},
    AboutYourSelf:{type:String,required:false},
    EmployerName:{type:String,required:false},
    PaytmNumber:{type:String,required:false},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);