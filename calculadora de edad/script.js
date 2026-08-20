const fechaNacimiento = document.getElementById("fechaNacimiento");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

calcular.addEventListener("click", function () {

    if (fechaNacimiento.value === "") {
        resultado.textContent = "Por favor, selecciona tu fecha de nacimiento.";
        return;
    }

    const nacimiento = new Date(fechaNacimiento.value);
    const hoy = new Date();

    if (nacimiento > hoy) {
        resultado.textContent = "La fecha no puede ser futura.";
        return;
    }

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    resultado.textContent = `Tienes ${edad} años.`;
});