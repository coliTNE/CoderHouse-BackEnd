const e = require("express");
const fs = require("fs");

class CartManager {
  constructor(route) {
    this.path = route;
    this.carts = [];
  }
  // Utils

  createId() {
    const cart = this.cart;
    return cart.length === 0 ? 1 : this.cart[this.cart.length - 1].id + 1;
  }

  existingCart(id) {
    const cart = this.cart;
    const foundCart = cart.find((obj) => obj.id === id);
    return foundCart ? foundCart : null;
  }

  // Functions

  async init() {
    try {
      const cartList = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(cartList);
    } catch (error) {
      console.error(`Error al cargar el carrito ${error}`);
    }
  }

  async write() {
    try {
      const cartList = JSON.stringify(this.carts);
      await fs.promises.writeFile(this.path, cartList);
    } catch (error) {
      console.error(`Error al actualizar el carrito ${error}`);
    }
  }

  async addCart() {
    try {
      const id = this.createId();
      const newCart = { id, products: [] };
      this.carts.push(newCart);
      await this.write();
      return newCart;
    } catch (error) {
      console.error(`Error al agregar carrito ${error}`);
    }
  }

  getCartById(id) {
    try {
      const cart = this.existingCart(id);
      return cart;
    } catch (error) {
      console.error(`Error al buscar el carrito ${error}`);
    }
  }

  async addProductToCart(cid, pid, product) {
    try {
      const cart = this.existingCart(cid);
      if (cart) {
        const products = cart.products;
        const foundProduct = products.find((obj) => obj.id === pid);
        if (foundProduct) {
          foundProduct.quantity += product.quantity;
        } else {
          products.push(product);
        }
        cart.products.push(product);
        await this.write();
        return cart;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error al agregar producto al carrito ${error}`);
    }
  }
}

const cartManager = new CartManager("./carts.json");

module.exports = cartManager;
