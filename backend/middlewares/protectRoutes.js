import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status.json({ error: "No token" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(400).json({
        erorr: "Unauthorized-Invalid token provided",
      });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ erorr: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectroutes", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoutes;
