// Needs

const server = require("./services/server");

// Port

const PORT = 8080;

// Init

server.listen(PORT, () => {
  console.log(`Servidor express en funcionamiento http://localhost:${PORT}`);
});
