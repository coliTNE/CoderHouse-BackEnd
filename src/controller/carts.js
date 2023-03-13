const FileManager = require("./fileManager");

class Cart {
  constructor({ cid, products }) {
    this.cid = cid;
    this.products = products || [];
  }
}

class CartsManager {
  #cartList;
  constructor(route) {
    this.#cartList = [];
    this.fileManager = new FileManager(route);
  }

  // Utils

  createProductId(cart) {
    const maxId = Math.max(...cart.map((product) => product.id));
    return maxId === -Infinity ? 1 : maxId + 1;
  }

  //

  async addCart() {
    try {
      const lastCart = this.#cartList[this.#cartList.length - 1];
      const newCart = new Cart({ cid: lastCart ? lastCart.cid + 1 : 1 });
      this.#cartList.push(newCart);
      await this.fileManager.write(this.#cartList);
      return newCart;
    } catch (error) {
      console.error(`Error al crear el carrito ${error}`);
    }
  }

  getCartById(cid) {
    return this.#cartList.find((cart) => cart.cid === cid);
  }

  async addProductToCart(cid, pid) {
    try {
      const cartIndex = this.#cartList.findIndex((cart) => cart.cid === cid);

      if (cartIndex === -1) {
        throw new Error(`El carrito con el cid ${cid} no existe.`);
      }

      const cart = this.#cartList[cartIndex].products;
      const product = cart.find((product) => product.id === pid);

      if (product) {
        product.quantity += 1;
      } else {
        cart.push({ id: pid, quantity: 1 });
      }

      await this.fileManager.write(this.#cartList);

      return cart;
    } catch (error) {
      console.error(
        `Error al agregar producto al carrito con cid ${cid}: ${error}`
      );
    }
  }

  async loadCarts() {
    try {
      const list = await this.fileManager.init();
      if (list) {
        this.#cartList = list.map((p) => new Cart(p));
      }
    } catch (error) {
      console.error(`Error al cargar la lista de carritos ${error}`);
    }
  }
}

const manager = new CartsManager("carts.json");
manager.loadCarts();
module.exports = manager;
