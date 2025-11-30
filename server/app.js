const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoute.js");
const blogRouter = require("./routes/blogRoute.js");
const commentRouter = require("./routes/commentRoute.js");
const morgan = require("morgan");

dotenv.config();
const app = express();
connectDB();

app.use(morgan("dev"));

app.use(
  cors({
    // origin:["https://mernstackblogbyamarnaath.netlify.app","http://localhost:5173/"],
    // credentials:true
  })
);
//,"http://localhost:5173"
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
