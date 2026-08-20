// ===============================
// PRODUCTOS
// ===============================

const productos = [

    {
        id: 1,
        nombre: "Laptop Gamer",
        categoria: "Tecnología",
        precio: 3200,
        icono: "💻"
    },

    {
        id: 2,
        nombre: "Mouse Gamer",
        categoria: "Tecnología",
        precio: 120,
        icono: "🖱️"
    },

    {
        id: 3,
        nombre: "Teclado Mecánico",
        categoria: "Tecnología",
        precio: 250,
        icono: "⌨️"
    },

    {
        id: 4,
        nombre: "Audífonos",
        categoria: "Tecnología",
        precio: 180,
        icono: "🎧"
    },

    {
        id: 5,
        nombre: "Polo Deportivo",
        categoria: "Ropa",
        precio: 70,
        icono: "👕"
    },

    {
        id: 6,
        nombre: "Zapatillas",
        categoria: "Deportes",
        precio: 250,
        icono: "👟"
    },

    {
        id: 7,
        nombre: "Mochila",
        categoria: "Accesorios",
        precio: 100,
        icono: "🎒"
    },

    {
        id: 8,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        precio: 350,
        icono: "⌚"
    }

];


// ===============================
// ELEMENTOS HTML
// ===============================

const contenedorProductos =
    document.getElementById("productos");

const botonCarrito =
    document.getElementById("botonCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const seccionCarrito =
    document.getElementById("seccionCarrito");

const listaCarrito =
    document.getElementById("listaCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const subtotal =
    document.getElementById("subtotal");

const envio =
    document.getElementById("envio");

const total =
    document.getElementById("total");

const vaciar =
    document.getElementById("vaciar");

const comprar =
    document.getElementById("comprar");

const mensaje =
    document.getElementById("mensaje");


// ===============================
// CARGAR CARRITO
// ===============================

let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];


// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos() {

    contenedorProductos.innerHTML = "";

    productos.forEach(
        function(producto) {

            const tarjeta =
                document.createElement("div");

            tarjeta.classList.add("producto");

            tarjeta.innerHTML = `

                <div class="producto-icono">
                    ${producto.icono}
                </div>

                <h3>
                    ${producto.nombre}
                </h3>

                <span class="categoria">
                    ${producto.categoria}
                </span>

                <div class="precio">
                    S/ ${producto.precio.toFixed(2)}
                </div>

                <button
                    class="btn-agregar"
                    onclick="agregarAlCarrito(${producto.id})">

                    🛒 Agregar al carrito

                </button>
            `;

            contenedorProductos.appendChild(
                tarjeta
            );
        }
    );
}


// ===============================
// AGREGAR AL CARRITO
// ===============================

function agregarAlCarrito(id) {

    const producto =
        productos.find(
            function(item) {

                return item.id === id;
            }
        );


    const productoExistente =
        carrito.find(
            function(item) {

                return item.id === id;
            }
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            ...producto,

            cantidad: 1

        });
    }


    guardarCarrito();

    mostrarCarrito();

    mostrarMensaje(
        "✅ Producto agregado al carrito"
    );
}


// ===============================
// MOSTRAR CARRITO
// ===============================

function mostrarCarrito() {

    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p style="text-align:center;
                      padding:30px;
                      color:#777;">

                Tu carrito está vacío 🛒

            </p>
        `;

    } else {

        carrito.forEach(
            function(producto) {

                const item =
                    document.createElement("div");

                item.classList.add(
                    "item-carrito"
                );


                item.innerHTML = `

                    <div class="item-icono">
                        ${producto.icono}
                    </div>

                    <div class="item-info">

                        <h4>
                            ${producto.nombre}
                        </h4>

                        <div class="item-precio">
                            S/
                            ${producto.precio.toFixed(2)}
                        </div>

                        <div class="cantidad">

                            <button
                                onclick="disminuirCantidad(${producto.id})">
                                −
                            </button>

                            <span>
                                ${producto.cantidad}
                            </span>

                            <button
                                onclick="aumentarCantidad(${producto.id})">
                                +
                            </button>

                        </div>

                        <button
                            class="eliminar"
                            onclick="eliminarProducto(${producto.id})">

                            🗑️ Eliminar

                        </button>

                    </div>

                    <strong>

                        S/
                        ${(producto.precio *
                          producto.cantidad)
                          .toFixed(2)}

                    </strong>

                `;


                listaCarrito.appendChild(item);
            }
        );
    }


    actualizarResumen();
}


// ===============================
// AUMENTAR CANTIDAD
// ===============================

function aumentarCantidad(id) {

    const producto =
        carrito.find(
            function(item) {

                return item.id === id;
            }
        );


    if (producto) {

        producto.cantidad++;

    }


    guardarCarrito();

    mostrarCarrito();
}


// ===============================
// DISMINUIR CANTIDAD
// ===============================

function disminuirCantidad(id) {

    const producto =
        carrito.find(
            function(item) {

                return item.id === id;
            }
        );


    if (!producto) {

        return;
    }


    producto.cantidad--;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                function(item) {

                    return item.id !== id;
                }
            );
    }


    guardarCarrito();

    mostrarCarrito();
}


// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            function(item) {

                return item.id !== id;
            }
        );


    guardarCarrito();

    mostrarCarrito();

    mostrarMensaje(
        "🗑️ Producto eliminado"
    );
}


// ===============================
// CALCULAR TOTAL
// ===============================

function actualizarResumen() {

    let subtotalCalculado = 0;

    let cantidadTotal = 0;


    carrito.forEach(
        function(producto) {

            subtotalCalculado +=
                producto.precio *
                producto.cantidad;

            cantidadTotal +=
                producto.cantidad;
        }
    );


    // Envío gratis desde S/ 300

    let costoEnvio = 0;


    if (
        subtotalCalculado > 0 &&
        subtotalCalculado < 300
    ) {

        costoEnvio = 15;
    }


    const totalCalculado =
        subtotalCalculado +
        costoEnvio;


    subtotal.textContent =
        `S/ ${subtotalCalculado.toFixed(2)}`;

    envio.textContent =
        costoEnvio === 0
            ? "GRATIS"
            : `S/ ${costoEnvio.toFixed(2)}`;

    total.textContent =
        `S/ ${totalCalculado.toFixed(2)}`;


    contadorCarrito.textContent =
        cantidadTotal;
}


// ===============================
// GUARDAR EN LOCALSTORAGE
// ===============================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}


// ===============================
// ABRIR CARRITO
// ===============================

botonCarrito.addEventListener(
    "click",
    function() {

        seccionCarrito.classList.add(
            "abierto"
        );
    }
);


// ===============================
// CERRAR CARRITO
// ===============================

cerrarCarrito.addEventListener(
    "click",
    function() {

        seccionCarrito.classList.remove(
            "abierto"
        );
    }
);


// ===============================
// VACIAR CARRITO
// ===============================

vaciar.addEventListener(
    "click",
    function() {

        if (carrito.length === 0) {

            return;
        }


        const confirmar =
            confirm(
                "¿Deseas vaciar todo el carrito?"
            );


        if (confirmar) {

            carrito = [];

            guardarCarrito();

            mostrarCarrito();

            mostrarMensaje(
                "🗑️ Carrito vaciado"
            );
        }
    }
);


// ===============================
// FINALIZAR COMPRA
// ===============================

comprar.addEventListener(
    "click",
    function() {

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;
        }


        alert(
            "✅ Compra realizada correctamente.\n\n" +
            "Gracias por tu compra."
        );


        carrito = [];

        guardarCarrito();

        mostrarCarrito();
    }
);


// ===============================
// MENSAJE
// ===============================

function mostrarMensaje(texto) {

    mensaje.textContent = texto;

    mensaje.style.display = "block";


    setTimeout(
        function() {

            mensaje.style.display = "none";

        },
        2000
    );
}


// ===============================
// INICIAR
// ===============================

mostrarProductos();

mostrarCarrito();