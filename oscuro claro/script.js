const botonTema = document.getElementById("tema");

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
    document.body.classList.add("oscuro");
    botonTema.textContent = "☀️ Modo claro";
}

botonTema.addEventListener("click", function () {

    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {

        localStorage.setItem("tema", "oscuro");

        botonTema.textContent = "☀️ Modo claro";

    } else {

        localStorage.setItem("tema", "claro");

        botonTema.textContent = "🌙 Modo oscuro";
    }
});