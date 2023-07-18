// Needs

const cartRouter = require("express").Router();
const cartController = require("../controller/carts");

// Init

cartController.init();

// EndPoints

cartRouter.post("/", async (req, res) => {
  // POST /api/cart
  try {
    const newProduct = await cartController.addCart();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  // GET /api/cart/:cid
  try {
    const { cid } = req.params;
    const product = cartController.getCartById(cid);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  // POST /api/cart/:cid/product/:pid
  try {
    const { cid, pid } = req.params;
    const product = req.body;
    const updatedProduct = await cartController.addProductToCart(
      cid,
      pid,
      product
    );
    if (product) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cartRouter;
