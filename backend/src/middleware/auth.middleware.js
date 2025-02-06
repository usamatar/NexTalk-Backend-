import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // Debugging

    // FIX: Corrected from req.cookie.jwt to req.cookies.jwt
    const token = req.cookies.jwt; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }

    // Fetch user details
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};