import imagekit from "../configs/imagekit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from '../models/car.js';
import Booking from "../models/Booking.js";



 export const changeRoleToOwner = async (req , res)=>{
    try{
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id , {role: "owner"})
        res.status(200).json({
            success: true,
            message:"Now you can list cars"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

///////api to list the car
export const addcar = async (req,res)=>{
     try{
        console.log("req.body:", req.body); 
        const {_id}= req.user;
        let car
        if (typeof req.body.carData === "string") {
         car = JSON.parse(req.body.carData);
           } else {
              car = req.body.carData;
         }


      //  let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
   
        /// upload  image to imagekit
        const fileBuffer =  fs.readFileSync(imageFile.path);
       const response =  await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:"/cars"
        })
    ///// optimization through imagekit URL transfromation
        const optimizedImageUrl = imagekit.url({
             path: response.filePath,       // file path (or full URL)
             transformation: [
               {width: '1280'},
               {format: "webp"},
               {quality:'auto'}  ///convert to modern format

  ],
});
 const image  = optimizedImageUrl;
 await Car.create({...car, owner: _id , image})
 res.json({success: true , message: "Car Added"})

     }
     catch(error){
         res.status(500).json({ 
            success:false,
            message:error.message
         })
     }
}

/// API to list Owner Cars
 export const getOwnerCars = async(req ,res)=>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner:_id})
        res.status(200).json({
            success:true,
            message:"Owner cars fetched successfully",
            cars
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
             message:error.message

         })
    }
 }
 ////Api  to toggle car Availability
 export const toggleCarAvailability = async (req,res)=>{
     try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        //// Checking is car belong to  the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"});
        }
         car.isAvaliable = !car.isAvaliable;
         await car.save()
        res.status(200).json({
            success:true,
            message:'Availability toggled'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:error.message
         })
    }
 }

////// Api to delete the car
  export const deleteCar = async (req,res)=>{
     try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        //// Checking is car belong to  the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"});
        }
         car.owner = null;
         car.isAvaliable = false;
         await car.save()
        res.status(200).json({
            success:true,
            message:'car remove'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:error.message
         })
    }
 }
 ////Api to get Dashboard Data

  export const getDashboardData = async (req,res)=>{
    try {
        const {_id ,role} = req.user;
        
        if(role !== "owner"){
            return res.json({success:false, message:"Unauthorized"})
        }

          const cars = await Car.find({owner:_id})
          const bookings = await Booking.find({owner:_id}).populate('car')
.sort({createdAt: -1});

  const pendingBookings = await Booking.find({owner:_id, status:"pending"})
  const completedBookings = await Booking.find({owner:_id, status:"confirmed"})

//// Calculate monthlyRevenue form booking where status is confirmed
 const monthlyRevenue = bookings.slice().filter(booking => booking.status ==="confirmed").reduce((acc ,booking)=> acc + booking.price, 0)

 const dashboardData  = {
    totalCars: cars.length,
    totalBooking: bookings.length,
    pendingBookings: pendingBookings.length,
    completedBookings:completedBookings.length,
    recentBookings: bookings.slice(0,3),
    monthlyRevenue
 }

 res.json({success:true, dashboardData});


    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:error.message
         })
    }
  }

  //// Api to update user image

  export const updateUserImage = async(req , res)=>{
    try {
        const {_id} = req.user;

        const imageFile = req.file;
   
        /// upload  image to imagekit
        const fileBuffer =  fs.readFileSync(imageFile.path);
       const response =  await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:"/users"
        })
    ///// optimization through imagekit URL transfromation
        const optimizedImageUrl = imagekit.url({
             path: response.filePath,       // file path (or full URL)
             transformation: [
               {width: '400'},
               {format: "webp"},
               {quality:'auto'}  ///convert to modern format

  ],
});
 const image  = optimizedImageUrl;
 await User.findByIdAndUpdate(_id, {image});
  res.json({success:true, message:"image Updated"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false , message:error.message})   
    }
  }