const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const { Sequelize, where } = require("sequelize");

const getUndeliveredOrders = async () => {
  const orders = await Order.findAll({
    where: {
      orderStatus: "undelivered",
    },
  });
  return orders;
};
const getFiveMostRecentOrder = async () => {
  return await Order.findAll({ order: [["orderDate", "DESC"]], limit: 5 });
};

const getFiveMostActiveUser = async () => {
  return await Order.findAll({
    group: "UserId",
    include: {
      model: User,
      attributes: [],
    },
    attributes: [
      [
        Sequelize.literal("CONCAT(User.firstName,' ',User.lastName)"),
        "fullName",
      ],
      [Sequelize.literal("COUNT(UserId)"), "Order_count"],
    ],
    order: [[Sequelize.fn("COUNT", Sequelize.col("UserId")), "DESC"]],
    limit: 5,
    raw: true,
  });
};

const getInactiveUsers = async () => {
  return await User.findAll({
    include: {
      model: Order,
      attributes: [],
    },
    where: {
      "$Orders.id$": null,
    },
    attributes: {
      include: ["id"],
      exclude: ["Orders"],
    },
  });
};

const getFiveMostPurchasedProducts = async () => {
  return await OrderDetail.findAll({
    group: "ProductId",
    include: {
      model: Product,
      attributes: [],
    },
    attributes: [
      [Sequelize.col("Product.id"), "productid"],
      [Sequelize.col("Product.name"), "productname"],
      [Sequelize.fn("SUM", Sequelize.col("quantity")), "total_sales"],
    ],
    limit: 5,
    order: [[Sequelize.fn("SUM", Sequelize.col("quantity")), "DESC"]],
    raw: true,
  });
};

const getMostExpensiveOrCheapestOrder = async (getExpensive) => {
  return await OrderDetail.findAll({
    group: "OrderId",
    include: {
      model: Product,
      attributes: [],
    },
    attributes: [
      [
        Sequelize.literal("SUM(OrderDetail.quantity * Product.price)"),
        "total_amount",
      ],
      ["OrderId", "order_id"],
    ],
    limit: 1,
    order: [
      [
        Sequelize.literal("SUM(quantity * price)"),
        getExpensive ? "DESC" : "ASC",
      ],
    ],
    raw: true,
  });
};

const getMostExpensiveOrder = async () => {
  return await getMostExpensiveOrCheapestOrder(true);
};

const getMostCheapestOrder = async () => {
  return await getMostExpensiveOrCheapestOrder(false);
};
module.exports = [
  getUndeliveredOrders,
  getFiveMostRecentOrder,
  getFiveMostActiveUser,
  getInactiveUsers,
  getFiveMostPurchasedProducts,
  getMostExpensiveOrder,
  getMostCheapestOrder,
];
