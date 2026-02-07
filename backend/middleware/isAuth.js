// import jwt from 'jsonwebtoken'


// const isAuth = async (req,res,next) => {
//     try {
//         let {token} = req.cookies
        
//         if(!token){
//             return res.status(400).json({message:"user does not have token"})
//         }
//         let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

//         if(!verifyToken){
//             return res.status(400).json({message:"user does not have a valid token"})
//         }
//         req.userId = verifyToken.userId
//         next()

//     } catch (error) {
//          console.log("isAuth error")
//     return res.status(500).json({message:`isAuth error ${error}`})
        
//     }
// }

// export default isAuth;

//---------------------------------------------------------------------------------
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; // 🔥 MATCHED

    next();
  } catch (error) {
    console.log("isAuth error", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;

