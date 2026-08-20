const fechaEvento = document.getElementById("fechaEvento");

const iniciar = document.getElementById("iniciar");
const detener = document.getElementById("detener");

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

const mensaje = document.getElementById("mensaje");

let intervalo = null;


// FUNCIÓN PARA ACTUALIZAR EL CONTADOR

function actualizarContador() {

    const fechaSeleccionada = fechaEvento.value;

    if (fechaSeleccionada === "") {

        mensaje.textContent =
            "Primero selecciona una fecha.";

        return;
    }

    const fechaFinal = new Date(fechaSeleccionada).getTime();

    const fechaActual = new Date().getTime();

    const diferencia = fechaFinal - fechaActual;


    // SI EL TIEMPO TERMINÓ

    if (diferencia <= 0) {

        dias.textContent = "00";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        mensaje.textContent =
            "🎉 ¡El evento ha comenzado!";

        clearInterval(intervalo);

        intervalo = null;

        return;
    }


    // CALCULAR DÍAS

    const cantidadDias =
        Math.floor(diferencia / (1000 * 60 * 60 * 24));


    // CALCULAR HORAS

    const cantidadHoras =
        Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );


    // CALCULAR MINUTOS

    const cantidadMinutos =
        Math.floor(
            (diferencia / (1000 * 60)) % 60
        );


    // CALCULAR SEGUNDOS

    const cantidadSegundos =
        Math.floor(
            (diferencia / 1000) % 60
        );


    dias.textContent =
        String(cantidadDias).padStart(2, "0");

    horas.textContent =
        String(cantidadHoras).padStart(2, "0");

    minutos.textContent =
        String(cantidadMinutos).padStart(2, "0");

    segundos.textContent =
        String(cantidadSegundos).padStart(2, "0");

    mensaje.textContent =
        "Tiempo restante para el evento";
}


// BOTÓN INICIAR

iniciar.addEventListener("click", function () {

    if (fechaEvento.value === "") {

        mensaje.textContent =
            "Selecciona una fecha y hora.";

        return;
    }


    const fechaFinal =
        new Date(fechaEvento.value).getTime();

    const ahora =
        new Date().getTime();


    if (fechaFinal <= ahora) {

        mensaje.textContent =
            "La fecha debe ser futura.";

        return;
    }


    // Evita crear varios intervalos

    if (intervalo !== null) {

        clearInterval(intervalo);
    }


    actualizarContador();

    intervalo = setInterval(
        actualizarContador,
        1000
    );
});


// BOTÓN DETENER

detener.addEventListener("click", function () {

    clearInterval(intervalo);

    intervalo = null;

    mensaje.textContent =
        "⏸ Cuenta regresiva detenida.";
});