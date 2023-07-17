const fs = require("fs");

class ProductManager {
  constructor(route) {
    this.path = route;
    this.list = [];
  }

  // Utils

  createId() {
    const list = this.list;
    return list.length === 0 ? 1 : this.list[this.list.length - 1].id + 1;
  }

  existingProduct(id) {
    const list = this.list;
    const foundProduct = list.find((obj) => obj.id === id);
    return foundProduct ? foundProduct : null;
  }

  // Functions

  async init() {
    try {
      const list = await fs.promises.readFile(this.path, "utf-8");
      this.list = JSON.parse(list);
    } catch (error) {
      console.error(`Error al cargar los productos ${error}`);
    }
  }

  async write() {
    try {
      const list = JSON.stringify(this.list);
      await fs.promises.writeFile(this.path, list);
    } catch (error) {
      console.error(`Error al actualizar productos ${error}`);
    }
  }

  async addProduct(product) {
    try {
      const id = this.createId();
      const newProduct = { ...product, id };
      this.list.push(newProduct);
      await this.write();
      return newProduct;
    } catch (error) {
      console.error(`Error al agregar producto ${error}`);
    }
  }

  getProducts() {
    try {
      return this.list;
    } catch (error) {
      console.error(`Error al buscar la lista de productos ${error}`);
    }
  }

  getProductById(id) {
    try {
      const product = this.existingProduct(id);
      return product ? product : `El producto con id ${id} no existe`;
    } catch (error) {
      console.error(`Error al buscar el producto ${error}`);
    }
  }

  async updateProduct(id, obj) {
    try {
      const existingProduct = this.existingProduct(id);
      if (!existingProduct) {
        return `El producto con el id ${id} no existe.`;
      }
      const updatedProduct = { ...existingProduct, ...obj };
      const index = this.list.indexOf(existingProduct);
      this.list[index] = updatedProduct;
      await this.write();
      return updatedProduct;
    } catch (error) {
      console.error(`Error al actualizar producto ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      const existingProduct = this.existingProduct(id);
      if (!existingProduct) {
        console.log(`El producto con el id ${id} no existe.`);
        return;
      }
      const index = this.list.indexOf(existingProduct);
      this.list.splice(index, 1);
      await this.write();
    } catch (error) {
      console.error(`Error al eliminar producto ${error}`);
    }
  }
}

const manager = new ProductManager("../../products.json");

module.exports = manager;
