// Needs
const { Router } = require("express");
const indexRouter = Router();
const productsRouter = require("./products.routes");
const cartsRouter = require("./carts.routes");

// Routes

indexRouter.use("/products", productsRouter);

indexRouter.use("/carts", cartsRouter);

// Export

module.exports = indexRouter;
