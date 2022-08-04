
const {Collection}=require("../models/Collection");
const router=require('express').Router();

router.get("/",async(req,res)=>{
    try{
        await Collection.find({},(err,res)=>{
            if(err){
                console.log(err)
            }
            else{
                res.status(200).send("Collection's data");
            }
        })
    }catch(e){
        console.log(e)
    }
})
router.post("/add_collection",async(req,res)=>{
    try{
        const user= await Collection.findOneAndUpdate({
            collectionId:req.body.collectionId,   //or we can use req.params.id as well
        },
        {
            $push:{
                attachments:{
                    attachmentId:req.body.attachmentId,
                    attachment:req.body.attachment
                }
            }
        }
        )
        res.status(200).send(" Resource added Successfully")
    }catch(e){
        console.log(e);
    }
})
router.delete("/delete",async()=>{
    try{
        await Collection.findOneAndDelete({collectionId:req.body.collectionId})
        res.status(200).send("Successfully deleted")
    }catch(e){
        console.log(e);
    }
})
module.exports=router;
