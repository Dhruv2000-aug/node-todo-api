const mongoose=require('mongoose');

const connectDB=async ()=>{
    try
    {
        // const mongoURL="mongodb+srv://dhruv:@Dhruv2000@cluster0.nt9p2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        // const mongoURL=process.env.mongo_UR;
        const Con=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true
        })
        console.log(`mongodb Connected ${Con.connection.host}`);

    }   
    catch(err)
    {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports =connectDB;