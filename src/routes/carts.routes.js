// Needs

const { Router } = require("express");
const manager = require("../controller/carts");

// Config

const cartsRouter = Router();

// EndPoints

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await manager.addCart();
    res.status(200).send(`Carrito: ${JSON.stringify(cart, null, 2)}`);
  } catch (error) {
    res.status(500).send(`Error al crear carrito: ${error}`);
  }
});

cartsRouter.get("/:cid", (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = manager.getCartById(+cid);
    res.status(200).send(`Carrito: ${JSON.stringify(cart, null, 2)}`);
  } catch (error) {
    res.status(500).send(`Error al buscar carrito: ${error}`);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = await manager.addProductToCart(+cid, +pid);
    res
      .status(200)
      .send(`Producto del Carrito: ${JSON.stringify(product, null, 2)}`);
  } catch (error) {
    res.status(500).send(`Error al agregar producto al carrito: ${error}`);
  }
});

// Export

module.exports = cartsRouter;
