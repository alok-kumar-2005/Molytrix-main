const mongoose=require('mongoose');

const distributorsSchema=new mongoose.Schema({
        country:{type:String,required:true},
        company:{type:String,required:true},
        address:{type:String,required:true},
        phone:{type:String,required:true,unique:true},
});

module.exports=mongoose.model('Distributors',distributorsSchema);