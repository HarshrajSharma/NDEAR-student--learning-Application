const express=require("express");
const cors=require("cors");

const Connect_mongo=require('./config/connect-mongo')

require('dotenv').config()

const app=express();
const User=require("./models/User")

Connect_mongo();

const user=require("./routes/user");
const resource=require("./routes/resource");

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
    storage:imageStorage
}).single('testImage');

app.use("/api/user",user);
app.use("/api/resource",resource)

app.post('/upload',(req,res)=>{
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
                image:{
                    data:req.file,
                    contentType:'image/png'
                }
            })
            User.save()
            .then(()=>res.status(200).send("Successfully Registered the User"))
            .catch((err)=>console.log(err))
        }
    })
})

const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is Listening to ${port}`)
})
