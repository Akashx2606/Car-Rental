import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


dotenv.config()

const app = express();


mongoose.connect(`${process.env.MONGO_URI}/car-rental`)
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log("MongoDB Connection Failed:",err)
})
 
app.use(cors())
app.use(express.json());
app.use("/api/user", userRouter)
app.use("/api/owner",ownerRouter)
app.use('/api/bookings', bookingRouter)

app.get("/",(req,res)=> res.send("Server is running"))




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is run at port ${PORT}`)
})