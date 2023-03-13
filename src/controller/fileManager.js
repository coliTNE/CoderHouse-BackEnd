const fs = require("fs");

class FileManager {
  #path;

  constructor(route) {
    this.#path = route;
  }

  async init() {
    try {
      const list = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(list);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      } else {
        console.error(`Error al leer la petición ${error}`);
      }
    }
  }

  async write(list) {
    try {
      console.log(`INIT: ${list}`);
      await fs.promises.writeFile(this.#path, JSON.stringify(list));
    } catch (error) {
      console.error(`Error al actualizar peticion ${error}`);
    }
  }
}

module.exports = FileManager;
