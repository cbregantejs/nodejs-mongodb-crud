import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv"
import productRoute from "./routes/products.route";
import authRoute from "./routes/auth.route";
import morgan from "morgan";
import pkg from '../package.json';

// settings
const app = express();
app.set('pkg', pkg);
app.use(morgan('dev'))
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api/products", productRoute)
app.use("/api/auth", authRoute)

config();

// routes
app.get("/", (req, res) => {
    // res.send(`Welcome to my API - by ${app.get('pkg').author}`);
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

// mongodb connection
connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log(err));

// server listening
app.listen(port, () => console.log(`Server is running on port ${port}`))