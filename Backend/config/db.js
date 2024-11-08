import mongoose from "mongoose";

 export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://asadillohdeveloper05:Asadilloh2004@cluster0.pjewtd6.mongodb.net/food-del").then(()=>console.log("DB Connected."))
};
