const mongoose=require("mongoose");
const jwt =require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    email: {type:String, required:true},
    state: {type:String, required:true},
    country: {type:String, requied:true},
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    dob: {type:Date, required:true},   // 'yyyy-mm-dd' format
    image: {type:String},
    password: {type:String, required:true}
});

userSchema.methods.StudentToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "2h",
	});
	return token;
}

User=mongoose.model("user",userSchema)
module.exports={User}