import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

class Connection{
    constructor(){
        const connectDB = async () => {
            try{
                const conn = await mongoose.connect(process.env.DB_URL);
                console.log(`Database connected successfully: ${conn.connection.host}`);
            }catch(err){
                console.log("Error connecting to database");
                console.log(err.message);
                process.exit(1);
            }
        };
        connectDB();
    }
}

export default Connection;