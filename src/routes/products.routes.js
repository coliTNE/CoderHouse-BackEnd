// Needs

const productsRouter = require("express").Router();
const productsController = require("../controller/products");

// Init

productsController.init();

// EndPoints

productsRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : null;
    const products = productsController.getProducts();
    if (limit) {
      const productsLimit = products.slice(0, limit);
      res.status(200).json(productsLimit);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = productsController.getProduct(pid);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsController.addProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productsController.updateProduct(pid, product);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productsController.deleteProduct(pid);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export

module.exports = productsRouter;
