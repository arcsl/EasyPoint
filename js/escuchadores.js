function escuchadores() {

    // ---------- GENERALES ----------
    document.addEventListener("DOMContentLoaded", () => {

        document.title = "Easy Point";

        populateProyectSelect();

        // deshabilitar boton abrir si no hay proyectos
        portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

        populateBlockSelect();

        const estudioCabeceraSenialesTable = document.createElement("table");
        estudioCabeceraSenialesTable.classList = "w3-table w3-bordered w3-margin-top w3-margin-bottom";
        estudioCabeceraSeniales.appendChild(estudioCabeceraSenialesTable);
        estudioCabeceraSenialesTable.appendChild(totalHeader());

        const estudioSumarioSenialesTable = document.createElement("table");
        estudioSumarioSenialesTable.classList = "w3-table w3-bordered w3-pale-green w3-margin-top w3-margin-bottom";
        estudioSumarioCont.appendChild(estudioSumarioSenialesTable);
        estudioSumarioSenialesTable.appendChild(totalHeader());
        estudioSumarioSenialesTable.appendChild(totalBody());


        // portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));
        // portadaSelProyecAbrir.dispatchEvent(new Event('click', { bubbles: true }));


    });

    // ---------- BOTONES PORTADA ----------

    portadaNueProyecCrear.addEventListener("click", () => {

        // si se esta mostrando mensaje error proyecto ya existe, no hacer nada
        if (!portadaNueProyecMsg.classList.contains("w3-hide")) return;

        const nuevoProyecto = portadaNueProyecInput.value.trim();

        if (!nuevoProyecto) return;

        // agregar proyecto al objeto y salvar en localstorage
        proyectosEasyPoint[nuevoProyecto] = [];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // borrar contenido del input y ocultarlo
        portadaNueProyecInput.value = "";
        portadaNueProyecCont.classList.add("w3-hide");

        // actualizar opciones del select de proyectos y seleccionar 
        populateProyectSelect();
        portadaSelProyecSelect.value = nuevoProyecto;

        // Simular click en abrir para mostrar el select de proyectos
        portadaAbrProyecBtn.dispatchEvent(new Event("click"));

    });

    portadaNueProyecBtn.addEventListener("click", () => {

        if (portadaNueProyecCont.classList.contains("w3-hide")) {

            // si no se esta mostrando el input, mostrarlo

            // mostrar input y hacer focus (y ocultar select por si acaso)
            portadaSelProyecCont.classList.add("w3-hide"); // por si acaso
            portadaNueProyecCont.classList.remove("w3-hide");
            portadaNueProyecInput.value = "";
            portadaNueProyecInput.focus();

            // boton Nuevo pasa a ser "Cancelar"
            portadaNueProyecBtn.textContent = "Cancelar";
            portadaNueProyecBtn.classList.remove("w3-green");
            portadaNueProyecBtn.classList.add("w3-red");

            // Deshabilitar botones de importar y abrir
            portadaImpProyecBtn.disabled = true;
            portadaAbrProyecBtn.disabled = true;


        } else {

            // si se esta mostrando el input, se quiere cancelar y volver atras

            //ocultar input
            portadaNueProyecCont.classList.add("w3-hide");

            // boton Nuevo vuelve a ser "Nuevo"
            portadaNueProyecBtn.textContent = "Nuevo";
            portadaNueProyecBtn.classList.remove("w3-red");
            portadaNueProyecBtn.classList.add("w3-green");

            //habilitar botones
            portadaImpProyecBtn.disabled = false;
            portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

        }

    });

    portadaImpProyecBtn.addEventListener("click", () => {

        if (portadaSelProyecCont.classList.contains("w3-hide")) {

            // importar proyecto = simulamos click en input oculto
            portadaImpProyecInput.click();

        } else {

            // exportar proyecto    

            // Convertir el objeto a una cadena JSON
            const jsonString = JSON.stringify(proyectosEasyPoint[portadaSelProyecSelect.value.trim()], null, 2); // El `2` agrega sangrado legible

            // Crear un Blob con el contenido del JSON
            const blob = new Blob([jsonString], { type: "application/json" });

            // Crear un enlace de descarga
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = portadaSelProyecSelect.value.trim() + ".json"; // Nombre del archivo

            // Hacer clic automáticamente en el enlace
            a.click();

            // Liberar la URL del objeto
            URL.revokeObjectURL(url);

        }

    });

    portadaAbrProyecBtn.addEventListener("click", () => {

        if (portadaSelProyecCont.classList.contains("w3-hide")) {

            // si no se esta mostrando el select, lo mostramos

            // mostrar select y hacer focus (y ocultar input por si acaso)
            portadaNueProyecCont.classList.add("w3-hide"); // por si acaso
            portadaSelProyecCont.classList.remove("w3-hide");
            portadaSelProyecSelect.focus();

            // restaurar boton nuevo deshabilitado
            portadaNueProyecBtn.textContent = "Nuevo";
            portadaNueProyecBtn.classList.remove("w3-red");
            portadaNueProyecBtn.classList.add("w3-green");
            portadaNueProyecBtn.disabled = true;

            // boton importar pasa a ser exportar
            portadaImpProyecBtn.textContent = "Exportar";
            portadaImpProyecBtn.disabled = false;

            // boton "Abrir" pasa a ser Cancelar para poder volver atras
            portadaAbrProyecBtn.textContent = "Cancelar";
            portadaAbrProyecBtn.classList.remove("w3-blue");
            portadaAbrProyecBtn.classList.add("w3-red");
            portadaAbrProyecBtn.disabled = false;

        } else {

            // es para abrir el select
            portadaSelProyecCont.classList.add("w3-hide");
            portadaNueProyecCont.classList.add("w3-hide"); // por si acaso

            // boton nuevo pasa a estar habilitado
            portadaNueProyecBtn.disabled = false;

            // boton exportar pasa a ser importar
            portadaImpProyecBtn.textContent = "Importar";

            // boton "Abrir" pasa a ser Abrir para poder abrir
            portadaAbrProyecBtn.textContent = "Abrir";
            portadaAbrProyecBtn.classList.add("w3-blue");
            portadaAbrProyecBtn.classList.remove("w3-red");
            portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

        }
    });

    portadaSelProyecBorrar.addEventListener("click", () => {

        // BORRAR PROYECTO

        // Pedir confirmacion
        if (!confirm("Este borrado es irreversible.\n\n¿Desea continuar?\n")) return;

        // Borrar la opción seleccionada
        delete proyectosEasyPoint[portadaSelProyecSelect.value];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // Actualizar opciones del selector de proyectos
        populateProyectSelect();

        // Si no quedan proyectos
        if (portadaSelProyecSelect.length === 0) {

            // Ocultar select
            portadaSelProyecCont.classList.add("w3-hide");

            // Restaurar botón Abrir
            portadaAbrProyecBtn.textContent = "Abrir";
            portadaAbrProyecBtn.classList.remove("w3-red");
            portadaAbrProyecBtn.classList.add("w3-blue");

            // Restaurar botón Importar
            portadaImpProyecBtn.textContent = "Importar";

            // Habilitar/Deshabilitar botones
            portadaNueProyecBtn.disabled = false;
            portadaImpProyecBtn.disabled = false;
            portadaAbrProyecBtn.disabled = true;

        }

    });

    portadaSelProyecAbrir.addEventListener("click", () => {

        // por seguridad
        if (!portadaSelProyecSelect.value.trim()) return;
        if (!proyectosEasyPoint.hasOwnProperty(portadaSelProyecSelect.value)) return;

        writeBlocks();

        estudioNombProyecInput.value = portadaSelProyecSelect.value.trim();
        portada.classList.add("w3-hide");
        estudio.classList.remove("w3-hide");

    });

    // ---------- PORTADA INPUT/SELECT ----------

    portadaImpProyecInput.addEventListener("change", (event) => {

        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {

            try {
                const proyectoJSON = JSON.parse(e.target.result);

                // Extraer el nombre del archivo sin la extensión
                let nombreArchivo = file.name;
                nombreArchivo = nombreArchivo.replace(/\.[^/.]+$/, ""); // elimina extensión

                // Verificar si ya existe en proyectosEasyPoint
                if (proyectosEasyPoint.hasOwnProperty(nombreArchivo)) {
                    const sobrescribir = confirm(`El proyecto "${nombreArchivo}" ya existe. ¿Deseas sobrescribirlo?`);
                    if (!sobrescribir) return;
                }

                proyectosEasyPoint[nombreArchivo] = proyectoJSON;
                localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));
                populateProyectSelect();
                portadaSelProyecSelect.value = nombreArchivo;

                portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));

            } catch (err) {
                alert("Archivo inválido o corrupto.");
            }
        };
        reader.readAsText(file);
    });

    portadaNueProyecInput.addEventListener("input", () => {

        const nuevoProyecto = portadaNueProyecInput.value.trim();

        // verificar si el proyecto ya existe
        if (proyectosEasyPoint.hasOwnProperty(nuevoProyecto)) {

            // Mostrar mensaje de error y desactivar boton check
            portadaNueProyecCrear.disabled = true;
            portadaNueProyecMsg.textContent = `El proyecto "${nuevoProyecto}" ya existe.`;
            portadaNueProyecMsg.classList.remove("w3-hide");
            portadaNueProyecInput.classList.add("w3-pale-red");

        } else {

            // Ocultar mensaje de error
            portadaNueProyecCrear.disabled = false;
            portadaNueProyecMsg.classList.add("w3-hide");
            portadaNueProyecInput.classList.remove("w3-pale-red");

        }

    });

    portadaNueProyecInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            portadaNueProyecCrear.dispatchEvent(new Event('click', { bubbles: true }));
        }
    });


    // ---------- BOTONES ESTUDIO DE PUNTOS ----------
    estudioGuardarBtn.addEventListener("click", () => {

        let sobreescribir = false;

        // leemos el nombre del proyecto en la casilla que el usuario puede modificar
        const nuevoNombreProyecto = estudioNombProyecInput.value.trim();

        if (!nuevoNombreProyecto) {
            alert("El nombre del proyecto no puede estar vacio.\n\n");
            return;
        }

        // Si dicho nombre ya existe y no es el nombre del proyecto que tenemos abierto (portadaSelProyecSelect.value) preguntamos al usuario si desea continuar.
        if (nuevoNombreProyecto !== portadaSelProyecSelect.value && proyectosEasyPoint.hasOwnProperty(nuevoNombreProyecto)) {
            if (confirm("Ya existe un proyecto con ese nombre.\n\n¿Desea sobreescribirlo?\n")) {
                // si = activamos flag sobreescribir
                sobreescribir = true;
            } else {
                // no = abortar guardado
                return;
            }
        }

        // si desea sobreescribir 
        if (sobreescribir) {

            // directamente leemos los bloques en la propiedad existente
            proyectosEasyPoint[nuevoNombreProyecto] = readBlocks();
            // cambiamos el valor seleccionado en proyectoselec al nuevo nombre donde hemos sobreescrito
            portadaSelProyecSelect.value = nuevoNombreProyecto;

            // asi no se ha modificado el proyecto que hemos abierto originalmente y hemos podidohacer copia de un proyecto en otro


            // si no desea sobreescribir 
        } else {

            // leemos los bloques en el proyecto abierto
            proyectosEasyPoint[portadaSelProyecSelect.value] = readBlocks();

            // verificamos si el nombre de proyecto ha cambiado por si el usuario queria renombrarlo
            if (nuevoNombreProyecto !== portadaSelProyecSelect.value) {

                // si ha cambiado copiamos la clave a una nueva clave con el nuevo nombre 
                proyectosEasyPoint[nuevoNombreProyecto] = proyectosEasyPoint[portadaSelProyecSelect.value];

                // y borramos la antigua clave.
                delete proyectosEasyPoint[portadaSelProyecSelect.value];

                // actualizamos opciones de proyectoselec usando la funcion
                populateProyectSelect();

                // y dejamos seleccionado el nuevo nombre
                portadaSelProyecSelect.value = nuevoNombreProyecto;

            }
        }

        // guardar en local storage
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // Marcar bandera global
        guardado = true;

        // Mostar notificación
        guardadoOK();

    });

    estudioCrearPDFBtn.addEventListener("click", () => {
        crearPDF();
    });

    estudioSalirBtn.addEventListener("click", () => {
        let seguir = guardado
            ? true
            : confirm("Hay cambios no guardados que se perderán.\n\n¿Desea continuar?\n");
        if (seguir) {
            // poner pantalla principal en modo inicial (presionamos boton abrir que deberia estar en modo "cancelar")
            estudio.classList.add("w3-hide");
            portada.classList.remove("w3-hide");
        }
    });

    estudioBloqAniaBtn.addEventListener("click", () => {
        addBlock();
        buttonsMoveBlock();
    });
    // ---------- ESTUDIO INPUT/SELECT ----------

    estudioNombProyecInput.addEventListener("input", (e) => {

        const estaVacio = estudioNombProyecInput.value.trim() === "";
        const yaExiste = proyectosEasyPoint.hasOwnProperty(estudioNombProyecInput.value.trim());
        const esElActual = estudioNombProyecInput.value.trim() === portadaSelProyecSelect.value;

        if ((yaExiste && !esElActual) || estaVacio) {
            estudioNombProyecInput.classList.add("w3-pale-red");
        } else {
            estudioNombProyecInput.classList.remove("w3-pale-red");
        }

    });

    estudioBloqCont.addEventListener("change", (event) => {
        if (event.target.type === "checkbox") {
            if (!checkboxChangeScheduled) {
                checkboxChangeScheduled = true;
                Promise.resolve().then(() => {
                    updateSummary();
                    checkboxChangeScheduled = false;
                });
            }
        }
    });

    estudioBloqCont.addEventListener('input', (event) => {
        const target = event.target;
        if (target.tagName === 'INPUT' && ['checkbox', 'number', 'text'].includes(target.type)) {
            guardado = false;
        }
    });

    estudioBloqCont.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            guardado = false;
        }
    });



}