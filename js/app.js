const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch('./json/products.json',{
  method: 'GET',
  headers: {
  "Accept": "application/json",
  'Content-Type': 'application/json'
  }
})
.then(response => { return response.json();})
.then(responseData => {console.log(responseData); return responseData;})

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price"> $ ${product.precio} </p>`;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "Agregar al carrito";
  comprar.className = "Agregar al carrito";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
        tamaño: product.tamaño,
        material: product.material,
        origen: product.origen
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
      
    }
  });
});

//SET 
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

