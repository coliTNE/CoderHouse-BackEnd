const socket = io();
const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const title = data.get("title");
  const description = data.get("description");
  const price = data.get("price");
  const code = data.get("code");
  socket.emit("addProduct", { title, description, price });
  form.reset();
});

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("newProduct", (data) => {
  const item = document.createElement("li");
  const title = document.createElement("p");
  const description = document.createElement("p");
  const price = document.createElement("p");
  const code = document.createElement("p");
  title.textContent = data.title;
  description.textContent = data.description;
  price.textContent = data.price;
  code.textContent = data.code;
  item.appendChild(title);
  item.appendChild(description);
  item.appendChild(price);
  item.appendChild(code);
  list.appendChild(item);
});
