// Needs
const express = require("express");

// Init

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
