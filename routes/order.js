const express = require("express");

const orderController = require("../controller/order");

const router = express.Router();

router.get("/", orderController.getOrders);

router.get("/:orderID", orderController.getOrderByID);

router.post("/", orderController.addOrder);

router.patch("/:orderID", orderController.updateOrder);

router.delete("/:orderID", orderController.deleteOrder);

module.exports = router;
