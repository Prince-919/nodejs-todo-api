import express from "express";
import { dbConnect } from "./config";
import noteRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Todo API.",
  });
});

app.use("/note", noteRouter);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(8000, () => {
      console.log("Server is running on port 8000.");
    });
  } catch (error) {
    console.log(`Error connecting to server: ${error}`);
  }
};

startServer();
