const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    if (nombre.value.trim() === "") {
        resultado.textContent = "Ingresa tu nombre.";
        resultado.style.color = "red";
        return;
    }

    if (correo.value.trim() === "") {
        resultado.textContent = "Ingresa tu correo.";
        resultado.style.color = "red";
        return;
    }

    if (!correo.value.includes("@")) {
        resultado.textContent = "Ingresa un correo válido.";
        resultado.style.color = "red";
        return;
    }

    if (mensaje.value.trim() === "") {
        resultado.textContent = "Escribe un mensaje.";
        resultado.style.color = "red";
        return;
    }

    resultado.textContent = "¡Mensaje enviado correctamente!";
    resultado.style.color = "green";

    formulario.reset();
});