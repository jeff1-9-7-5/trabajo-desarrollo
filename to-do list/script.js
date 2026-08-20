const tareaInput =
    document.getElementById("tarea");

const agregar =
    document.getElementById("agregar");

const listaTareas =
    document.getElementById("listaTareas");

const total =
    document.getElementById("total");

const completadas =
    document.getElementById("completadas");

const pendientes =
    document.getElementById("pendientes");

const eliminarTodas =
    document.getElementById("eliminarTodas");


// OBTENER TAREAS DEL LOCALSTORAGE

let tareas =
    JSON.parse(
        localStorage.getItem("tareas")
    ) || [];


// MOSTRAR TAREAS

function mostrarTareas() {

    listaTareas.innerHTML = "";


    tareas.forEach(function(tarea) {

        const li =
            document.createElement("li");

        li.classList.add("tarea-item");


        if (tarea.completada) {

            li.classList.add("completada");
        }


        // CHECKBOX

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            tarea.completada;


        checkbox.addEventListener(
            "change",
            function() {

                tarea.completada =
                    checkbox.checked;

                guardarTareas();

                mostrarTareas();
            }
        );


        // TEXTO

        const texto =
            document.createElement("span");

        texto.classList.add("tarea-texto");

        texto.textContent =
            tarea.texto;


        // BOTÓN EDITAR

        const editar =
            document.createElement("button");

        editar.textContent = "✏️";

        editar.classList.add(
            "btn-editar"
        );


        editar.addEventListener(
            "click",
            function() {

                const nuevoTexto =
                    prompt(
                        "Editar tarea:",
                        tarea.texto
                    );


                if (
                    nuevoTexto !== null &&
                    nuevoTexto.trim() !== ""
                ) {

                    tarea.texto =
                        nuevoTexto.trim();

                    guardarTareas();

                    mostrarTareas();
                }
            }
        );


        // BOTÓN ELIMINAR

        const eliminar =
            document.createElement("button");

        eliminar.textContent = "🗑️";

        eliminar.classList.add(
            "btn-eliminar"
        );


        eliminar.addEventListener(
            "click",
            function() {

                tareas =
                    tareas.filter(
                        function(item) {

                            return item.id !== tarea.id;
                        }
                    );

                guardarTareas();

                mostrarTareas();
            }
        );


        li.appendChild(checkbox);

        li.appendChild(texto);

        li.appendChild(editar);

        li.appendChild(eliminar);

        listaTareas.appendChild(li);

    });


    actualizarEstadisticas();
}


// AGREGAR TAREA

function agregarTarea() {

    const texto =
        tareaInput.value.trim();


    if (texto === "") {

        alert(
            "Escribe una tarea."
        );

        return;
    }


    const nuevaTarea = {

        id: Date.now(),

        texto: texto,

        completada: false
    };


    tareas.push(nuevaTarea);


    guardarTareas();


    tareaInput.value = "";


    mostrarTareas();
}


// GUARDAR TAREAS

function guardarTareas() {

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );
}


// ESTADÍSTICAS

function actualizarEstadisticas() {

    const cantidadTotal =
        tareas.length;


    const cantidadCompletadas =
        tareas.filter(
            function(tarea) {

                return tarea.completada;
            }
        ).length;


    const cantidadPendientes =
        cantidadTotal -
        cantidadCompletadas;


    total.textContent =
        cantidadTotal;

    completadas.textContent =
        cantidadCompletadas;

    pendientes.textContent =
        cantidadPendientes;
}


// EVENTO BOTÓN AGREGAR

agregar.addEventListener(
    "click",
    agregarTarea
);


// ENTER PARA AGREGAR

tareaInput.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Enter") {

            agregarTarea();
        }
    }
);


// ELIMINAR TODAS

eliminarTodas.addEventListener(
    "click",
    function() {

        if (tareas.length === 0) {

            return;
        }


        const confirmar =
            confirm(
                "¿Seguro que quieres eliminar todas las tareas?"
            );


        if (confirmar) {

            tareas = [];

            guardarTareas();

            mostrarTareas();
        }
    }
);


// CARGAR AL INICIAR

mostrarTareas();