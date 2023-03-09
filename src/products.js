const fs = require("fs");

class Product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

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
      console.error(`Error al actualizar productos ${error}`);
    }
  }

  async write(list) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(list));
    } catch (error) {
      console.error(`Error al actualizar productos ${error}`);
    }
  }
}

class ProductManager {
  #productsList;

  constructor(route) {
    this.#productsList = [];
    this.fileManager = new FileManager(route);
  }

  // Utils

  createId() {
    return this.#productsList.length === 0
      ? 1
      : this.#productsList[this.#productsList.length - 1].id + 1;
  }

  async addProduct(product) {
    try {
      const newProduct = new Product({ id: this.createId(), ...product });

      this.#productsList.push(newProduct);
      await this.fileManager.write(this.#productsList);

      return newProduct;
    } catch (error) {
      console.error(`Error al agregar producto ${error}`);
    }
  }

  getProducts() {
    try {
      return this.#productsList;
    } catch (error) {
      console.error(`Error al buscar la lista de productos ${error}`);
    }
  }

  getProductById(id) {
    return this.#productsList.find((product) => product.id === id);
  }

  async updateProduct(id, obj) {
    try {
      const index = this.#productsList.findIndex(
        (product) => product.id === id
      );

      if (index === -1) {
        console.log(`El producto con el id ${id} no existe.`);
        return;
      }

      this.#productsList[index] = { ...this.#productsList[index], ...obj };
      await this.fileManager.write(this.#productsList);

      return this.#productsList[index];
    } catch (error) {
      console.error(`Error al actualizar producto ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      const index = this.#productsList.findIndex(
        (product) => product.id === id
      );

      if (index === -1) {
        console.log(`El producto con el id ${id} no existe.`);
        return;
      }

      this.#productsList.splice(index, 1);
      await this.fileManager.write(this.#productsList);
    } catch (error) {
      console.error(`Error al eliminar producto ${error}`);
    }
  }

  async loadProducts() {
    const list = await this.fileManager.init();
    if (list) {
      this.#productsList = list.map((p) => new Product(p));
    }
  }
}

const manager = new ProductManager("src/products.json");
manager.loadProducts();

module.exports = manager;
