const express = require("express");
require("dotenv").config();

const sequelize = require("./utils/db-connection");

const userRoutes = require("./routes/user");

// const User = require("./models/user");
// const Product = require("./models/product");
// const Order = require("./models/order");
// const OrderDetail = require("./models/orderDetail");

require("./models/association");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(200).json({ message: "internal server error" });
});

app.listen(process.env.PORT, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connection established.");
  console.log("server running on port:" + process.env.PORT);
});
