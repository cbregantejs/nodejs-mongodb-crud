import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv"
import productRoute from "./routes/products.route.js";

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", productRoute)

config();

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongodb connection
connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log(err));

// server listening
app.listen(port, () => console.log(`Server is running on port ${port}`))