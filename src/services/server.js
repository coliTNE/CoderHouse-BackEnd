// Needs

const express = require("express");
const indexRouter = require("../routes/index.routes");

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando");
});

app.use("/api", indexRouter);

// Export

module.exports = app;
