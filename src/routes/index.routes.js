const indexRouter = require("express").Router();
const productsRouter = require("./products.routes");
const cartRouter = require("./cart.routes");

// Routes

indexRouter.use("/products", productsRouter);
indexRouter.use("/cart", cartRouter);

// Export

module.exports = indexRouter;
