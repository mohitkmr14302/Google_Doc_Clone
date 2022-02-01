import mongoose from 'mongoose'
const connection =async ()=>{
    const URL=`mongodb://mohit:9qg2hBH.ri84xMN@cluster0-shard-00-00.4nu99.mongodb.net:27017,cluster0-shard-00-01.4nu99.mongodb.net:27017,cluster0-shard-00-02.4nu99.mongodb.net:27017/DOC_CLONE?ssl=true&replicaSet=atlas-wlt3dc-shard-0&authSource=admin&retryWrites=true&w=majority`
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