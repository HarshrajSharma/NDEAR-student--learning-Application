 const router = require("express").Router();
const {User} = require("../models/User");

const {Resource} = require("../models/Resource");
//const {Collection} = require("../models/Collection"); 
const bcrypt = require("bcrypt");
const { Mongoose } = require("mongoose");
const jwt=require('jsonwebtoken');
const verifyToken=require('../middleware/Auth')//we will use it after setup will be over


router.get("/signup",(req,res)=>{
    res.send("you are on signup page , you should signup now or go for login ,if already have an account");
});
router.post("/signup",async(req,res)=>{
    try{
        const {data}=req.body
        const user=await User.findOne({email:req.body.email})

        if(user){
            res.status(409);
            return res.send({message:"User with this email Already Exists"})
        }
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

router.post("/login",async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        
        if(!user){
            res.status(401);
            return res.send({message:"No user with this email exists, Please signup"});
           
        }
        const validPassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword)
            return res.status(401).send({message:"Invalid Password"});

        const token = user.StudentToken();
        res.status(200).send({ data: token, message: "logged in successfully",user });

        const check=await Resource.findOne({_id:user._id})
        if(check){
           console.log("You can add resources")
        }
        else{
        await new Resource({
        _id:user._id,
       
       }).save();
    }
        next()
    }catch(err){
        console.log(err);
		res.status(500).send({ message: "Internal Server Error" });

    }
})
router.post("/update",async(req,res)=>{
    try{
        await User.findOneAndUpdate({
            email:req.body.email,
        },
        {
            $set:req.body
            
        }
        )
        res.status(200).send(" Updated Successfully")

    }catch(e){
        console.log(e)
    }
})
router.post('/resetpassword', async (req, res) => {
    try {


		const user = await User.findOne({ email: req.body.email });
	
		if (!user)
			return res.status(401).send({ message: "No existing user with this email" });
        
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);  
            
            User.findOneAndUpdate(
                { email: req.body.email },
        
                { password: hashPassword },
        
                function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(response);
                    }
                }
            )
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}

});
router.delete("/delete",async(req,res)=>{
    try{
        await Resource.findOneAndDelete({email:req.body.email})
        res.status(200).send("Successfully deleted user")

    }catch(e){
        console.log(e)
    }
})



module.exports=router 