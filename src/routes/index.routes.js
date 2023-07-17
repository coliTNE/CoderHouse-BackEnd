const indexRouter = require("express").Router();

// Routes

indexRouter.use("/products", require("./products.routes"));
indexRouter.use("/cart", require("./cart.routes"));

// Export

module.exports = indexRouter;
