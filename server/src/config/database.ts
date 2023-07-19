import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const database = process.env.DB_KEY;
const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(database || "");
    console.log(`DATABASE CONNECTED:${connect.connection.host}`);
  } catch (err) {
    console.log("ERROR CONNECT TO DATABASE!");
  }
};
export default connectDatabase;
