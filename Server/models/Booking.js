import mongoose from "mongoose";
const {ObjectId}  = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
     car:{
        //type:mongoose.Schema.Types.ObjectId,
        type: ObjectId,
        ref:"Car",
        required:true
     },
     user:{
        //type:mongoose.Schema.Types.ObjectId,
        type: ObjectId,
        ref:"User",
        required:true
     },
     owner:{
        //type:mongoose.Schema.Types.ObjectId,
        type: ObjectId,
        ref:"User",
        required:true
     },
     pickupDate:{
        //type:mongoose.Schema.Types.ObjectId,
        type: Date,
        required:true
     },
      returnDate:{
        //type:mongoose.Schema.Types.ObjectId,
        type: Date,
        required:true
     },
     status:{
        type:String,
        enum:["pending", "confirmed","cancelled"],default:"pending"
     },
     price:{
        type:Number,
        required:true
     }



},{timestamps:true}) 

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking