const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderDetail = require("./orderDetail");

Order.belongsToMany(Product, { through: OrderDetail, onDelete: "CASCADE" });
Product.belongsToMany(Order, { through: OrderDetail, onDelete: "CASCADE" });
OrderDetail.belongsTo(Product);

Product.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(Product, { onDelete: "CASCADE" });

User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User, { onDelete: "CASCADE" });
