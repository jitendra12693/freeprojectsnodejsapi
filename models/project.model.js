const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const schema =new Schema({
    UserId:{ type: String, required: true },
    ProjectName:{ type: String, required: true },
    ProjectNumber:{type:Number,required:false},
    ProjectPlatform:{ type: String, required: true },
    ProgrammingLanguage:{ type: String, required: true },
    IDETool:{ type: String, required: true },
    Database :{type:String,required:true},
    ProjectType:{type:String,requirclsed:true},
    ProjectSourceCode:{type:String,required:true},
    ProjectReport:{type:String,required:false},
    ProjectDescription:{type:String,required:true},
    ProjectImpStep:{type:String,required:false},
    createdDate: { type: Date, default: Date.now }
});
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', schema);