// Needs

const { Router } = require("express");
const manager = require("../controller/products");

// Config

const productsRouter = Router();

// EndPoints

productsRouter.get("/", (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = manager.getProducts();
    let response = "";

    if (products.length > 0) {
      if (limit) {
        response = `Productos (Mostrando ${limit} de ${
          products.length
        }): ${JSON.stringify(products.slice(0, limit), null, 2)}`;
      } else {
        response = `Productos: ${JSON.stringify(products, null, 2)}`;
      }
      res.status(200).send(response);
    } else {
      response = "No hay productos";
      res.status(204).send(response);
    }
  } catch (error) {
    res.status(500).send(`Ocurrio un error al obtener los productos: ${error}`);
  }
});

productsRouter.get("/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const product = manager.getProductById(+pid);
    res.status(200).send(`Producto: ${JSON.stringify(product, null, 2)}`);
  } catch (error) {
    res.status(500).send(`Ocurrió un error al obtener el producto: ${error}`);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const product = await manager.addProduct(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(`Error al agregar producto: ${error}`);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = await manager.updateProduct(pid, req.body);
    res
      .status(200)
      .send(`Producto con pid: ${pid} actualizado: ${updatedProduct}`);
  } catch (error) {
    res.status(500).send(`Error al actualizar el producto: ${error}`);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    await manager.deleteProduct(+pid);
    res.status(204).send(`Producto con pid: ${pid} eliminado`);
  } catch (error) {
    res.status(500).send(`Ocurrió un error al eliminar el producto: ${error}`);
  }
});

// Export

module.exports = productsRouter;
