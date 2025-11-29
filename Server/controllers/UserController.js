import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/car.js";



 const createToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
 }

  //// SignUp
 export const registerUser = async(req , res)=>{
    try{
         const {name,email,password} = req.body;
         
         if(!name || !email || !password){
            return res.status(400).json({
                message:"error while creating user",
                
            })
        }
        const userexist = await User.findOne({email})
        if(userexist){
            return res.status(400).json({
                message:"user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashedPassword});
        
        
        
        const token =  createToken({
              id:user._id.toString()

        })
            res.status(201).json({
                message:"User create successfull",
                
                token:token
            })
         
    }
    catch(err){
           res.status(500).json({
            message:err.message
           })
    }
 }

 /////////Login


 export const loginUser = async (req , res)=>{
    try{
     const {email , password} = req.body;
    const user = await User.findOne({email})
    if(!user){
       return res.status(400).json({
            message:"user not found"
        })
    }
      const match = await bcrypt.compare(password , user.password)
        if(!match){
            return res.status(400).json({
                message:"please enter correct password"
            })
        }
        
        const token = createToken({
            id:user._id.toString()
           
        })
        res.status(200).json({
            message:"User login successfully",
           
            token:token
        })
    
    }
    catch(err){
        res.status(500).json({
            message:err.message,
            stauts:"failed"
        })

    }
 }

 /////Get User data using Token (JWT)
    export const getUserData = async (req ,res)=>{
        try{

            const {user}=req;
             res.status(200).json({
                success:true,
                message:'get the user data',
                user:user
            })

        }
        catch(err){
         res.status(500).json({
                success:false,
                message:err.message,
                status:"failed"
            })
        }
    }

    //// get all cars for the frontend

    export const getCars = async(req, res)=>{
       try {
           const cars = await Car.find({isAvaliable: true})
           res.json({success:true, cars})

       } catch (error) {
            console.log(error.message);
            res.json({success:false, message:error.message})

       }
    }