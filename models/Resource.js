const mongoose=require('mongoose');

const ResourceSchema=new mongoose.Schema({
    id:{type:String},
    resourceId:{type:String},
    resourceName:{type:String},
    collections:[
        {
                collectionName:{type:String},
                collectionId:{type:String} 
        }
    ]
})
Resource=mongoose.model("resource",ResourceSchema)
module.exports={Resource}
