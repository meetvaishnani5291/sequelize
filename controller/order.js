const Order = require("../models/order");
const User = require("../models/user");
const OrderDetail = require("../models/orderDetail");
const sequelize = require("../utils/db-connection");

const addOrder = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findByPk(req.body.userId, { transaction: t });
      const order = await user.createOrder(req.body.order, { transaction: t });
      const products = req.body.order.products;
      products.forEach((product) => (product.OrderId = order.id));
      await OrderDetail.bulkCreate(products, { transaction: t });
      return;
    });

    res.status(200).json({ message: "order added sucessfully" });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const [result] = await Order.update(req.body.order, {
      where: {
        id: req.params.orderID,
      },
    });
    console.log(result);
    if (result) {
      res.status(200).json({ message: "order updated sucessfully" });
    } else {
      res.status(404).json({ message: "order not found!" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const result = await Order.destroy({
      where: {
        id: req.params.orderID,
      },
    });
    if (result) {
      res.status(200).json({ message: "order deleted sucessfully" });
    } else {
      res.status(404).json({ message: "order not found!" });
    }
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderByID = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderID);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "order not found!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrderByID,
};
