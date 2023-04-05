const Product = require("../models/product");
const User = require("../models/user");

const addProduct = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId);
    await user.createProduct(req.body.product);
    res.status(200).json({ message: "product added sucessfully" });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const [result] = await Product.update(req.body.product, {
      where: {
        id: req.params.productID,
      },
    });
    console.log(result);
    if (result) {
      res.status(200).json({ message: "product updated sucessfully" });
    } else {
      res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.productID,
      },
    });
    if (result) {
      res.status(200).json({ message: "product deleted sucessfully" });
    } else {
      res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductByID = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productID);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "product not found!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByID,
};
