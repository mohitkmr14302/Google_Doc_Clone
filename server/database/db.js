import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connection =async ()=>{
    const URL=process.env.MONGO_URL;
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected sucessfully !!")
    } catch (error) {
        console.log("Error while connecting with th Database",error);
    }
}
export default connection;