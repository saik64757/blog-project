const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
const path = require("path");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const postsRoutes = require("./routes/posts.routes");
const commentRoutes = require("./routes/comment.routes");

const PORT = process.env.PORT || 5000;
const app = express();

// const corsOption = {
//   credentials: true,
//   origin: [process.env.FRONT_URL],
// };
// aplly middewares
app.use(helmet());

app.use(express.json());

app.use(cors());

app.options("*", cors());

// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server connection established",
  });
});

app.use("*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}... `));
  } catch (error) {
    console.log(error.message);
  }
};

start();
