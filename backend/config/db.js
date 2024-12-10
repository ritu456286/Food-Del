import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://ritukansal456:EHBSFIzmQBmLAJ3k@cluster0.vgqan.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB Connected")); 
}