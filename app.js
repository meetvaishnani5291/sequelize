const express = require("express");
require("dotenv").config();

const sequelize = require("./utils/db-connection");
const queries = require("./utils/query");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

require("./models/association");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.get("/query/:queryName", async (req, res) => {
  const query = queries[req.params.queryName];
  if(query === undefined)
    return res.json({ message: "no query found!" });
  
  const data = await query();

  if (Array.isArray(data) && data.length === 0)
    return res.json({ message: "no detail found!" });
  return res.status(200).json(data);
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "internal server error" });
});

app.listen(process.env.PORT, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connection established.");
  console.log("server running on port:" + process.env.PORT);
});

sequelize.addHook("beforeConnect", (config) => {
  console.log("....................New connection will be established:");
});
sequelize.addHook("beforeDisconnect", (config) => {
  console.log("................................Disconnect connection");
});
