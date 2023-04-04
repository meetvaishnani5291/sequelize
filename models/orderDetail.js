const sequelize = require("../utils/db-connection");
const { DataTypes } = require("sequelize");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    // Model attributes are defined here
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = OrderDetail;
