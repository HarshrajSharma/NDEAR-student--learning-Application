const aws=require("aws-sdk/clients/s3");
const multer=require("multer")
const multers3=require("multer-s3");
const router = require("../routes/user");
const fs=require('fs')

const s3=new aws({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    region:process.env.S3_BUCKET_REGION
});

/* const upload= (bucketName)=> 
multer({
        storage:multers3({
           s3:s3 ,
           bucket:bucketName,
           contentType: multers3.AUTO_CONTENT_TYPE,
           metadata:function(req,file,cb){
            cb(null,{fieldName:file.fieldname});
           },
           key:function(req,file,cb){
            cb(null,Date.now+ file.originalname)
           }
        })
    })

    exports.setProfilePic =(req,res,next)=>{
    
    console.log(req.file);
    
    const uploadSingle=upload("koa-prof").single('image-upload');

    uploadSingle(req,res,err=>{
        if(err)
            return res.status(400).json({success:false,message:err.message})
        
        console.log(req.file);
    res.status(200).json({data:req.file});

    })

}; */

//uploading to s3
function uploadFile(file){
    const fileStream=fs.createReadStream(file.path)

    const uploadParams={
        Bucket:'koa-prof',
        Body:fileStream,
        Key:file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile=uploadFile

//downloading to s3

function getFileStream(fileKey){
    const downloadParams={
        Key:fileKey,
        Bucket:'koa-prof'

    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream=getFileStream