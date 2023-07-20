// Needs
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");
const productsManager = require("./controller/products");

// Init
const app = express();
const httpServer = app.listen(8080, () => console.log("Server up"));
const socketServer = new Server(httpServer);

productsManager.init();

// Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  // GET /
  const productsList = productsManager.getProducts();
  const products = { products: productsList };
  res.render("index", products);
});

app.get("/realtimeproducts", (req, res) => {
  // GET /realtimeproducts
  const productsList = productsManager.getProducts();
  const products = { products: productsList };
  res.render("realTimeProducts", products);
});

app.use("/api", require("./routes/index.routes"));

// Server
const PORT = process.env.PORT || 8080;

socketServer.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("addProduct", (data) => {
    productsManager.addProduct(data);
    socket.emit("newProduct", data);
  });
});

httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
