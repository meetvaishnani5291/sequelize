const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "flipkart",
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 2,
      min: 0,
      acquire: 300,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
