const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderDetail = require("./orderDetail");

Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, { through: OrderDetail });

Product.belongsTo(User);
User.hasMany(Product);

User.hasMany(Order);
Order.belongsTo(User);
