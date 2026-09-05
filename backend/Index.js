require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./Config/dbConnection");
const prodRouter = require("./Routes/productRouter");
const userRouter = require("./Routes/userRouter");
const orderRouter = require("./Routes/orderRouter"); // Add this import

const app = express();

dbConnection();

app.use(express.json());
app.use(cors());
app.use("/api", prodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter); // Mount the router

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});