const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "flipkart",
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  { host: "localhost", dialect: "mysql" }
);

module.exports = sequelize;
