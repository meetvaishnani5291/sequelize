const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");

const getUndeliveredOrders = async () => {
  const orders = await Order.findAll({
    where: {
      orderStatus: "undelivered",
    },
  });
  return orders;
};

module.exports = [getUndeliveredOrders];
