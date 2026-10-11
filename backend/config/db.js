import mongoose from "mongoose";

export const connectDB =async () =>{
 await mongoose.connect('mongodb+srv://arshith2909_db_user:8618635682@cluster0.uqprp0y.mongodb.net/food-deliverables?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("Database connected")});
}
