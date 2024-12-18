import { connection, connect } from "mongoose";

const dbConnect = async () => {
  try {
    connection.on("connected", () => {
      console.log("Connected to database successfully.");
    });
    connection.on("error", (err) => {
      console.log(`Failed to connect to database: ${err}`);
    });
    await connect(
      "mongodb+srv://next-prince:next-prince@cluster0.dxiokfd.mongodb.net/TODO?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log(`Error in connecting to database: ${err}`);
    process.exit(1);
  }
};

export default dbConnect;
