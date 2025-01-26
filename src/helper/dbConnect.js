import { User } from "../models/user";
import mongoose from "mongoose";

export const dbConnect = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGODB_URL,{
            dbName: "work_manager"
        });
        console.log("DB connected");
    }catch(err){
        console.log("Failed to connect the db", err);
    }
}


