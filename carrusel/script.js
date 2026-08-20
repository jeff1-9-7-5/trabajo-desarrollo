const imagen = document.getElementById("imagen");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const contador = document.getElementById("contador");
const automatico = document.getElementById("automatico");

const imagenes = [
    "https://picsum.photos/id/1015/800/450",
    "https://picsum.photos/id/1016/800/450",
    "https://picsum.photos/id/1025/800/450",
    "https://picsum.photos/id/1035/800/450",
    "https://picsum.photos/id/1043/800/450"
];

let posicion = 0;
let intervalo = null;

function mostrarImagen() {
    imagen.src = imagenes[posicion];
    contador.textContent = `Imagen ${posicion + 1} de ${imagenes.length}`;
}

siguiente.addEventListener("click", function () {
    posicion++;

    if (posicion >= imagenes.length) {
        posicion = 0;
    }

    mostrarImagen();
});

anterior.addEventListener("click", function () {
    posicion--;

    if (posicion < 0) {
        posicion = imagenes.length - 1;
    }

    mostrarImagen();
});

automatico.addEventListener("click", function () {

    if (intervalo === null) {

        intervalo = setInterval(function () {
            posicion++;

            if (posicion >= imagenes.length) {
                posicion = 0;
            }

            mostrarImagen();

        }, 3000);

        automatico.textContent = "Detener reproducción";

    } else {

        clearInterval(intervalo);
        intervalo = null;

        automatico.textContent = "Iniciar reproducción";
    }
});