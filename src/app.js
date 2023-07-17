// Needs
const express = require("express");
const manager = require("./controller/products");

// Init

const app = express();
manager.init();
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api", require("./routes/index.routes"));

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
