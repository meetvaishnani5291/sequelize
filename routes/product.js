const express = require("express");

const productController = require("../controller/product");

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:productID", productController.getProductByID);

router.post("/", productController.addProduct);

router.patch("/:productID", productController.updateProduct);

router.delete("/:productID", productController.deleteProduct);

module.exports = router;
