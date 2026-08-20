const buscador =
    document.getElementById("buscador");

const categoria =
    document.getElementById("categoria");

const ordenar =
    document.getElementById("ordenar");

const contenedorProductos =
    document.getElementById("productos");

const cantidadProductos =
    document.getElementById(
        "cantidadProductos"
    );

const sinResultados =
    document.getElementById(
        "sinResultados"
    );


// ARRAY DE PRODUCTOS

const productos = [

    {
        id: 1,
        nombre: "Laptop Lenovo",
        categoria: "Tecnología",
        precio: 2500,
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
        nombre: "Audífonos Bluetooth",
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
        nombre: "Casaca Negra",
        categoria: "Ropa",
        precio: 180,
        icono: "🧥"
    },

    {
        id: 7,
        nombre: "Zapatillas Running",
        categoria: "Deportes",
        precio: 250,
        icono: "👟"
    },

    {
        id: 8,
        nombre: "Balón de Fútbol",
        categoria: "Deportes",
        precio: 90,
        icono: "⚽"
    },

    {
        id: 9,
        nombre: "Mochila",
        categoria: "Hogar",
        precio: 100,
        icono: "🎒"
    },

    {
        id: 10,
        nombre: "Lámpara LED",
        categoria: "Hogar",
        precio: 80,
        icono: "💡"
    },

    {
        id: 11,
        nombre: "Silla de Oficina",
        categoria: "Hogar",
        precio: 450,
        icono: "🪑"
    },

    {
        id: 12,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        precio: 350,
        icono: "⌚"
    }

];


// MOSTRAR PRODUCTOS

function mostrarProductos(lista) {

    contenedorProductos.innerHTML = "";


    cantidadProductos.textContent =
        `${lista.length} producto(s) encontrado(s)`;


    if (lista.length === 0) {

        sinResultados.style.display =
            "block";

        return;
    }


    sinResultados.style.display =
        "none";


    lista.forEach(
        function(producto) {

            const tarjeta =
                document.createElement("div");

            tarjeta.classList.add(
                "producto"
            );


            tarjeta.innerHTML = `

                <div class="icono">
                    ${producto.icono}
                </div>

                <h2>
                    ${producto.nombre}
                </h2>

                <span class="categoria-producto">
                    ${producto.categoria}
                </span>

                <div class="precio">
                    S/ ${producto.precio.toFixed(2)}
                </div>

            `;


            contenedorProductos.appendChild(
                tarjeta
            );
        }
    );
}


// FILTRAR PRODUCTOS

function filtrarProductos() {

    const texto =
        buscador.value
            .toLowerCase()
            .trim();


    const categoriaSeleccionada =
        categoria.value;


    let resultado =
        productos.filter(
            function(producto) {

                const coincideNombre =
                    producto.nombre
                        .toLowerCase()
                        .includes(texto);


                const coincideCategoria =
                    categoriaSeleccionada ===
                    "todos" ||
                    producto.categoria ===
                    categoriaSeleccionada;


                return (
                    coincideNombre &&
                    coincideCategoria
                );
            }
        );


    // ORDENAR

    if (ordenar.value === "menor") {

        resultado.sort(
            function(a, b) {

                return a.precio -
                       b.precio;
            }
        );
    }


    if (ordenar.value === "mayor") {

        resultado.sort(
            function(a, b) {

                return b.precio -
                       a.precio;
            }
        );
    }


    if (ordenar.value === "nombre") {

        resultado.sort(
            function(a, b) {

                return a.nombre.localeCompare(
                    b.nombre
                );
            }
        );
    }


    mostrarProductos(resultado);
}


// EVENTOS

buscador.addEventListener(
    "input",
    filtrarProductos
);


categoria.addEventListener(
    "change",
    filtrarProductos
);


ordenar.addEventListener(
    "change",
    filtrarProductos
);


// MOSTRAR AL CARGAR

mostrarProductos(productos);