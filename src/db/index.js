import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MONGODB is connected at:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGOOSE connection error :", error);
    process.exit(1);
  }
};
export { connectDB };
