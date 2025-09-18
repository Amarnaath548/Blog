const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoute.js");
const blogRouter = require('./routes/blogRoute.js');
const path=require('path');
const morgan = require("morgan");

dotenv.config();
const app = express();
connectDB();

app.use(morgan("dev"));

app.use(cors({
    origin:["https://mernstackblogbyamarnaath.netlify.app"],
    credentials:true
}));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use('/api/blog',blogRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
