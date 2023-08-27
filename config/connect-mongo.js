const mongoose=require("mongoose");

module.exports=()=>{
    const connectionParams={
		useNewUrlParser: true,
		useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB_url,connectionParams);
        console.log("Database connected");
    }catch(e){
        console.log("Could not connect to database"+e);
    }
}