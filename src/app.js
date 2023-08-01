// Needs
const express = require("express");

// Init

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

const indexRouter = require("./routes/index.routes");

app.use("/api", indexRouter);

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
