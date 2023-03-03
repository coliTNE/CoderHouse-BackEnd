// Needs
const express = require("express");
const productList = require("./src/products");

// Init

const app = express();
productList.init();
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/products", (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = productList.getProducts();
    let response = "";

    if (products.length > 0) {
      if (limit) {
        response = `Productos (Mostrando ${limit} de ${
          products.length
        }): ${JSON.stringify(products.slice(0, limit), null, 2)}`;
      } else {
        response = `Productos: ${JSON.stringify(products, null, 2)}`;
      }
    } else {
      response = "No hay productos";
    }

    res.send(response);
  } catch (error) {
    res.send(`Ocurrio un error al obtener los productos: ${error}`);
  }
});

app.get("/products/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const product = productList.getProductById(+pid);
    if (typeof product === "string") {
      res.send(product);
    } else {
      res.send(`Producto: ${JSON.stringify(product, null, 2)}`);
    }
  } catch (error) {
    res.send(`Ocurrió un error al obtener el producto: ${error}`);
  }
});

// Server

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(
    `Servidor Express funcionando en puerto: http://localhost:${PORT}`
  )
);

server.on("error", (error) =>
  console.error(`Error al iniciar el servidor ${error}`)
);
