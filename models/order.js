const sequelize = require("../utils/db-connection");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "Order",
  {
    // Model attributes are defined here
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expectedDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Order;
