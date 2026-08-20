const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const operacion = document.getElementById("operacion");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

calcular.addEventListener("click", function() {

    const n1 = parseFloat(numero1.value);
    const n2 = parseFloat(numero2.value);

    if (isNaN(n1) || isNaN(n2)) {
        resultado.textContent = "Ingresa los dos números.";
        return;
    }

    let total;

    switch (operacion.value) {

        case "+":
            total = n1 + n2;
            break;

        case "-":
            total = n1 - n2;
            break;

        case "*":
            total = n1 * n2;
            break;

        case "/":

            if (n2 === 0) {
                resultado.textContent = "No se puede dividir entre cero.";
                return;
            }

            total = n1 / n2;
            break;
    }

    resultado.textContent = `Resultado: ${total}`;
});