 const {Resource} = require("../models/Resource");
const router = require("express").Router();

const {Collection}=require("../models/Collection")

router.get("/",(req,res)=>{
    try{
        Resource.find({},function(err,resources){
            if(err){
                res.status(500).send("Something went wrong");
            }
            res.send({resourcesPresent:resources[0],message:"List of all resources"})
        })
    }catch(err){
        console.log(err);
		res.status(500).send({ message: "Internal Server Error"});

    }
})
router.post("/add_resource",async(req,res)=>{
    try{
        const user= await Resource.findOneAndUpdate({
            _id:req.body._id,//or we can use req.params.id as well
        },
        {
            $set:req.body,
            $push:{
                collections:{
                    collectionName:req.body.collectionName,
                    collectionId:req.body.collectionId
                }
            }
        }
        )
        const check=await Collection.findOne({collectionId:user.collections[1]})
        if(check){
           console.log("You can add resources")
        }
        else{
        await new Collection({
        collectionName:user.collections[0],
        collectionId:user.collections[1],
       
       }).save();
    }
        res.status(200).send(" Resource added Successfully")


    }catch(e){
        console.log(e);
    }
})

router.delete("/delete",async()=>{
    try{
        await Resource.findOneAndDelete({_id:req.body._id})
        res.status(200).send("Successfully deleted")
    }catch(e){
        console.log(e);
    }
})

module.exports=router ;