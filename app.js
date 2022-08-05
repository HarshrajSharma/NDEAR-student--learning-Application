const express=require("express");
const cors=require("cors");

const Connect_mongo=require('./config/connect-mongo')

require('dotenv').config()

const app=express();
const User=require("./models/User")
//const expressfileupload=require("express-fileupload")

const fs=require('fs')
const util=require('util')
const unlinkFile=util.promisify(fs.unlink)



Connect_mongo();

const user=require("./routes/user");
const resource=require("./routes/resource");
const {uploadFile,getFileStream}=require("./controllers/userController")

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const multer=require("multer");
//storage
const imageStorage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
});
const upload=multer({
    dest:'uploads/'
})

app.use("/api/user",user);
app.use("/api/resource",resource)

app.get('/api/prof/:key',(req,res)=>{
    const key=req.params.key
    const readStream=getFileStream(key)

    readStream.pipe(res)
})

app.post("/api/prof",upload.single('image'),async(req,res)=>{
    const file=req.file
    console.log(file)
    const result=await uploadFile(file)
    console.log(result)
    await unlinkFile(file.path)
    const description=req.body.description
    res.send({imagePath:`/api/prof/${result.Key}`})
})

//not tested yet, little bit confused

/* app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage=User({
                email:req.body.email,
                state:req.body.state,
                country:req.body.country,
                fname:req.body.fname,
                lname:req.body.lname,
                dob:req.body.dob,
                password:req.body.password,
                image:`https://koa-prof.s3.ap-south-1.amazonaws.com/${req.file.key}`
            })
            User.save()
            .then(()=>res.status(200).send("Successfully Registered the User"))
            .catch((err)=>console.log(err))
        }
    })
}) */

const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is Listening to ${port}`)
})
