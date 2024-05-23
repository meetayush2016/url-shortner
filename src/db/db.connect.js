import mongoose from "mongoose";



const connectDB = async(url)=>{
    try {
        const connectionInstance = await mongoose.connect(url)
        console.log("Mongodb database !! Connected");
        
    } catch (error) {
        console.log("MONGODB connection FAILED" , error);
        process.exit(1); 
        
    }
}

export default connectDB; 