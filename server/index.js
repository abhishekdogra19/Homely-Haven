require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");

//routers
const userRouter = require("./routes/user");
const placeRouter = require("./routes/place");
// error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
//middleware

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
//routes
app.use("/user", userRouter);
app.use("/place", placeRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(() =>
      console.log("Db Connected..")
    );
    app.listen(port, () => {
      console.log(`Server is listening on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
