import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
const port = process.env.PORT || 3000;

// Importing Routes
import authRoutes from "./routes/auth.js";

// Database Connection
import connectDB from "./config/db.js";
connectDB();

// Static files
app.use(express.static('public'));

// Templating engine setup
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", authRoutes);
app.use("/", (req, res) => {
    res.json("Project server")
})

app.listen(port, () => console.log(`Server is listening on ${port}`));
