//  import jwt from "jsonwebtoken";
//  import User from "../models/User.js";


// export const protect = async (req, res, next)=>{
//      const token = req.headers.authorization;
//      if(!token){
//         return res.json({success: false , message:"not authorized"})
//         }
     
//      try{
//         const userId = jwt.decode(token , process.env.jwt_secret)
//         if(!userId){
//             return res.json({success: false , message:"not authorized"})
//         }
//         req.user = await User.findById(userId).select('-password')
//         next();
//      }
//      catch(error){
//          return res.json({success:false , message:"not authorized"})
//      }
// }

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
};
