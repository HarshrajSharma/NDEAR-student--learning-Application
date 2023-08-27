const mongoose=require("mongoose");

const CollectionSchema=new mongoose.Schema({
    collectionId:{type:String},
    collectionName:{type:String},
    attachments:[{
        attachmentId:{type:String},
        attachment: {type:String}   
    }]
})
Collection=mongoose.model("collection",CollectionSchema);
module.exports={Collection}
