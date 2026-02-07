// import jwt from 'jsonwebtoken'

// const adminAuth = async (req,res,next) => {
//     try {
//         let {token} = req.cookies

//     if(!token) {
//         return res.status(400).json({message:"Not Authorized Login Again"})
//     }
    
//     let verifyToken =  jwt.verify(token,process.env.JWT_SECRET)

//     if(!verifyToken){
//          return res.status(400).json({message:"Not Authorized Login Again, Invalid token"})
//     }
//     req.adminEmail = process.env.ADMIN_EMAIL

//     next()
        
//     } catch (error) {
//            console.log("adminAuth error")
//     return res.status(500).json({message:`adminAuth error ${error}`})
//     }


// }

// export default adminAuth



//---------------------------------------------------------------




import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Admin access denied" });
    }

    req.adminEmail = decoded.email;

    next();
  } catch (error) {
    console.log("adminAuth error", error);
    return res.status(401).json({ message: "Invalid admin token" });
  }
};

export default adminAuth;
