const FileManager = require("./fileManager");

class Product {
  constructor({
    id,
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnail = thumbnail;
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

  //

  async addProduct(product) {
    try {
      const newProduct = new Product({ id: this.createId(), ...product });
      const { id, title, description, code, price, status, stock, category } =
        newProduct;

      if (
        !id ||
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        throw new Error(
          "Porfavor rellena todos los campos. (Excepto Thumbnails)"
        );
      }

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
        throw new Error(`El producto con el id ${id} no existe.`);
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
        throw new Error(`El producto con el id ${id} no existe.`);
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

const manager = new ProductManager("products.json");
manager.loadProducts();
module.exports = manager;
