//web storage
//una vez que se carga el contenido de la pagina
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    fetch("./js/store.json") //carga la informacion de store.json - reemplaza una ruta de API
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar store.json");
        }
        return response.json();
    })
    .then(productos => {
        mostrarProductos(productos);
    })
    .catch(error => {
        console.error(error);
    });
});

// FUNCIONES DE CARRITO DE COMPRAS
//agregar contenido al carrito
/*document.querySelector(`#boton-agregar`).addEventListener(`click`, function () {

    //obtener carrito actual o crear uno vacio

    let carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];

    //agregar un producto al carrito
    carrito.push(producto);

    //guardar el carrito actualizado
    localStorage.setItem(`carrito`, JSON.stringify(carrito));

    //actualizar carrito
    actualizarCarrito();
});*/
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const producto = {
            nombre: e.target.dataset.nombre,
            precio: Number(e.target.dataset.precio)
        };
        //obtener carrito actual o crear uno vacio
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto); //agregar un producto al carrito
        localStorage.setItem("carrito", JSON.stringify(carrito)); //guardar el carrito actualizado

        actualizarCarrito();
    }
});

//Vaciar Carrito
const btnVaciar = document.querySelector("#vaciar-carrito");//obtenemos el boton para vaciar carrito y verificamos que exista
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });
}
/*document.querySelector(`#vaciar-carrito`).addEventListener(`click`, function () {
    localStorage.removeItem(`carrito`);
    actualizarCarrito();
});*/

//Funcion para mostrar carrito
function actualizarCarrito() {
    const listaCarrito = document.querySelector(`#lista-carrito`);
    if (!listaCarrito) return;

    const carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];

    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        const li = document.createElement(`li`);
        li.textContent = "El carrito esta vacio";
        listaCarrito.appendChild(li);
        return;
    }
    carrito.forEach(producto => {
        const li = document.createElement(`li`);
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });
};

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-contenedor"); //obtenemos el contenedor donde se mostraran los productos

    //iteramos sobre todos los prosductos obteneidos del store.js
    productos.forEach(producto => {
        //creamos un div para cada producto
        const productoDiv = document.createElement("article");
        productoDiv.classList.add("producto"); //le damos una clase 'producto' para darle estilos

        // creamos el contenido HTML del producto
        productoDiv.innerHTML = `
        <h2>${producto.name}</h2>
            <img src="${producto.img}" alt="${producto.name}">
            <p class="descripcionProducto">${producto.descripcion}</p>
            <h4 class="precio">$${producto.precio.toFixed(2)}</h4>
            <button class="agregar-carrito" data-nombre="${producto.name}" data-precio="${producto.precio}">Agregar al Carro</button>
        `;
            //<a href="#" class="comprar" id="boton-agregar">Comprar</a>
        //agregamos el producto al contenedor de productos en el DOM
        contenedor.appendChild(productoDiv);

    });
}