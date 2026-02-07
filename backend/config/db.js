import dns from "dns";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Optional DNS fix
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
