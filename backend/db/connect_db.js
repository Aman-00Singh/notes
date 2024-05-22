import mongoose from "mongoose";

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected Successfully");
  } catch (error) {
    console.log("Error in connecting database", error.message);
  }
};
export default connect_db;
