const cantidad = document.getElementById("cantidad");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const convertir = document.getElementById("convertir");
const resultado = document.getElementById("resultado");

// Tasas de ejemplo
const tasas = {
    PEN: 1,
    USD: 3.50,
    EUR: 4.00
};

convertir.addEventListener("click", function() {

    const valor = parseFloat(cantidad.value);

    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = "Ingresa una cantidad válida.";
        return;
    }

    const monedaOrigen = origen.value;
    const monedaDestino = destino.value;

    // Primero convertimos a soles
    const soles = valor * tasas[monedaOrigen];

    // Después convertimos de soles a la moneda destino
    const conversion = soles / tasas[monedaDestino];

    resultado.textContent =
        `${valor.toFixed(2)} ${monedaOrigen} = ${conversion.toFixed(2)} ${monedaDestino}`;
});