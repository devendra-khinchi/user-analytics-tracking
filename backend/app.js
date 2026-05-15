import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db.config.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/api", eventRoutes);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
