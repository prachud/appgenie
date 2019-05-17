const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    userEmail:{type:String, required:true},
    anaStatus:{type:String,required:true}  ,
    anaName:{type:String,required:true},
    anaEmail:{type:String,required:true}
});

module.exports=mongoose.model('Post',postSchema);