function escuchadores() {

    // ---------- GENERALES ----------
    document.addEventListener("DOMContentLoaded", () => {

        populateProyectSelect();
        populateBlockSelect();
        populateCustomPop();
        populateCabeceraYPie();

        // verificar si existe la clave del nombre del proyecto actual en el local storage      
        nombreProyectoActual = localStorage.getItem('nombreProyectoActual');
        if (nombreProyectoActual === null) return;

        // verificar si existe tal proyecto en la biblioteca
        if (!proyectosEasyPoint.hasOwnProperty(nombreProyectoActual)) return;

        // intentar cargar el proyecto en memoria
        try {
            const data = localStorage.getItem('proyectoActual');
            if (data) {                       // primero verificamos que exista algo
                proyectoActual = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error al parsear proyectoActual:', error);
            proyectoActual = null;
            localStorage.removeItem('proyectoActual');
            return;
        }

        // dejar portada preparada con el proyecto actual seleccionado, 
        // y abrir la parte de estudio con los datos de localstorage
        portada.classList.add("w3-hide");
        portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));
        portadaSelProyecSelect.value = nombreProyectoActual;
        estudioNombProyecInput.value = nombreProyectoActual;
        writeBlocks();
        proyectoActual.guardado = false;
        estudio.classList.remove("w3-hide");

    });

    // ---------- BOTONES PORTADA ----------
    // (verde check) Crear nuevo proyecto
    portadaNueProyecCrear.addEventListener("click", () => {

        // si se esta mostrando mensaje error proyecto ya existe, no hacer nada
        if (!portadaNueProyecMsg.classList.contains("w3-hide")) return;

        // verificar que se ha introducido algo de texto como nombre de proyecto
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

        // Simular click en abrir para mostrar el select de proyectos despues de haberlo creado
        portadaAbrProyecBtn.dispatchEvent(new Event("click"), { bubbles: true });

        // Simular click en abrir proyecto para mostrar el estudio despues de haberlo creado
        portadaSelProyecAbrir.dispatchEvent(new Event("click"), { bubbles: true });

        // O sea, al crear el proyecto nada mas darle al enter se abre el estudio del proyecto recien creado.

    });
    // (verde nuevo) boton para abrir dialogo para poner nombre de nuevo proyecto
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
    // (morado importar) boton importar proyecto
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
    // (azul abrir) boton para abrir dialogo para seleccionar proyecto que se desea abrir
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
    // (rojo papelera) boton borrar proyecto
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
    // (verde flecha) boton abrir proyecto seleccionado
    portadaSelProyecAbrir.addEventListener("click", () => {

        const abrirProyecto = portadaSelProyecSelect.value.trim();

        // por seguridad
        if (!abrirProyecto) return;
        if (!proyectosEasyPoint.hasOwnProperty(abrirProyecto)) return;

        nombreProyectoActual = abrirProyecto;
        proyectoActual = structuredClone(proyectosEasyPoint[nombreProyectoActual]);
        proyectoActual.guardado = true;

        localStorage.setItem("nombreProyectoActual", nombreProyectoActual);
        localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

        //crear los bloques del proyecto
        writeBlocks();
        estudioNombProyecInput.value = portadaSelProyecSelect.value.trim();
        portada.classList.add("w3-hide");
        estudio.classList.remove("w3-hide");

    });

    // ---------- PORTADA INPUT/SELECT ----------
    // importacion de proyecto una vez el usuario acepta o cancela el dialogo de seleccion de archivo
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
    // verificar si el nombre de proyecto ya existe para indicar input y subtexto en rojo
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
    // escuchar enter como alternativa a tener que pulsar el boton de crear proyecto
    portadaNueProyecInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            portadaNueProyecCrear.dispatchEvent(new Event('click', { bubbles: true }));
        }
    });

    // ---------- BOTONES ESTUDIO DE PUNTOS ----------
    // (verde guardar) guardar el estado actual del proyecto en el local storage del navegador
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

        // TODO: por ahora guardamos directamente. Hace falta la logica de si se ha cambiasdo 
        // el npombre al proyecto, renombrar o si hay que sobreescribir...
        proyectosEasyPoint[nombreProyectoActual] = structuredClone(proyectoActual);

        /* Antiguo guardar
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
        */

        // guardar en local storage
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // Marcar bandera global
        proyectoActual.guardado = true;

        // Mostar notificación
        guardadoOK();

    });
    // (azul PDF) crear pdf de lo que se ve en pantalla
    estudioCrearPDFBtn.addEventListener("click", () => {
        crearPDF();
    });
    // (rojo salir) volver a la portada
    estudioSalirBtn.addEventListener("click", () => {
        let seguir = proyectoActual.guardado
            ? true
            : confirm("Hay cambios no guardados que se perderán.\n\n¿Desea continuar?\n");
        if (seguir) {

            // limpiar las claves del proyecto actual
            localStorage.removeItem('proyectoActual');
            localStorage.removeItem('nombreProyectoActual');
            nombreProyectoActual = null;
            proyectoActual = null;

            // poner pantalla principal en modo inicial (presionamos boton abrir que deberia estar en modo "cancelar")
            estudio.classList.add("w3-hide");
            portada.classList.remove("w3-hide");

        }
    });
    // (verde añadir) añadir el bloque seleccionado
    estudioBloqAniaBtn.addEventListener("click", () => {
        console.log("estudioBloqSelect.value", estudioBloqSelect.value);
        const bloque = structuredClone(blocksData[estudioBloqSelect.value]);
        if (!bloque) return;
        bloque.id = crypto.randomUUID();
        proyectoActual.push(bloque);
        addBlock(bloque);
        disableFirstAndLastMoveBlockButtons();
        proyectoNoGuardado();
    });

    // ---------- ESTUDIO INPUT/SELECT ----------
    // cambiar color del input del nombre del proyecto si ya existe otro proyecto son ese nombre o esta vacio
    estudioNombProyecInput.addEventListener("input", () => {

        const estaVacio = estudioNombProyecInput.value.trim() === "";
        const yaExiste = proyectosEasyPoint.hasOwnProperty(estudioNombProyecInput.value.trim());
        const esElActual = estudioNombProyecInput.value.trim() === portadaSelProyecSelect.value;

        if ((yaExiste && !esElActual) || estaVacio) {
            estudioNombProyecInput.classList.add("w3-pale-red");
        } else {
            estudioNombProyecInput.classList.remove("w3-pale-red");
        }

    });
    // TODO: escuchador global para no repetir en cada input ?
    // modificar el total de señales 
    // estudioBloqCont.addEventListener("change", (event) => {
    //     if (event.target.type === "checkbox") {
    //         if (!checkboxChangeScheduled) {
    //             checkboxChangeScheduled = true;
    //             Promise.resolve().then(() => {
    //                 updateSummary();
    //                 proyectoNoGuardado ();
    //                 checkboxChangeScheduled = false;
    //             });
    //         }
    //     }
    // });
    // TODO: cambiar escuchadores particulares de inputs creados programaticamente por un escuchador global
    // estudioBloqCont.addEventListener('input', (event) => {
    //     const target = event.target;
    //     if (target.tagName === 'INPUT' && ['checkbox', 'number', 'text'].includes(target.type)) {
    //         proyectoNoGuardado ();
    //     }
    // });
    // TODO: esto no funciona al añadir o eliminar bloques
    // solo funciona al cambiar el orden de los bloques
    // al añadir funciona porque la funcion añadir ya pone el guardado a falso
    // estudioBloqCont.addEventListener('click', (event) => {
    //     const target = event.target;
    //     if (target.tagName === 'BUTTON') {
    //         proyectoNoGuardado ();
    //     }
    // });

    // ---------- BOTONES POPUP AÑADIR ELEMENTOS ----------
    // TODO: modificar tambien el json de proyecto abierto para mantenerlo sincronizado
    popAceptar.addEventListener("click", () => {

        const bloque = customPop.bloqueOrigen;
        const table = customPop.tablaOrigen;
        const tBody = table.querySelector('tbody');

        // verificar si se ha introducido al menos una señal
        let algunoMayorQue1 = [...customPop.querySelectorAll('input')].some(input => Number(input.value) > 0);
        if (!algunoMayorQue1) {
            alert("Debe introducir al menos un tipo de señal.");
            return;
        }

        // Buscar el primer nombre tipo customXX disponible
        let rowName;
        for (let i = 0; i < 100; i++) {
            rowName = "custom" + String(i).padStart(2, "0");
            const existe = bloque.Elementos.some(el => el.Nombre === rowName);
            if (!existe) break;
            if (i === 99) {
                alert("No se pueden añadir más elementos");
                return;
            }
        }

        // componemos el elemento custom a insertar en "Elementos" del bloque
        const customElem = elem.Vacio(rowName, 1);
        customElem.NombreUsuario = "Elemento personalizado";
        // {
        //     "Nombre": "custom00",
        //     "Cantidad": 1,
        //     "Opciones": [
        //          {
        //              "Nombre": "Vacio",
        //              "Seniales": {},
        //              "Esquema": []
        //          }
        //     ]
        // }


        const senialesObj = customElem.Opciones[0].Seniales;
        const esquemaArray = customElem.Opciones[0].Esquema;
        signalTypes.forEach(sig => {
            const inputSignal = customPop.querySelector(`input[name="${sig}"]`);
            if (inputSignal.value * 1 > 0) {
                senialesObj[sig] = inputSignal.value * 1;
                const esqName = `Simple${sig}_1`; // "SimpleEA_1", "SimpleED_1", etc.
                for (let i = 0; i < inputSignal.value * 1; i++) {
                    esquemaArray.push(esq[esqName]());
                }
            }
        });

        // añadirmos elemento custom al bloque
        bloque.Elementos.push(structuredClone(customElem));

        // insertamos la fila correspondiente el elemento en la tabla
        const ultimoElemento = bloque.Elementos[bloque.Elementos.length - 1];
        addFilaBody(ultimoElemento, tBody, bloque);

        const filas = tBody.querySelectorAll("tr");
        const ultima = filas[filas.length - 1];
        const penultima = filas[filas.length - 2];

        //hacemos focus en el input del nombre para que el usuario pueda escribir el nombre del nuevo elemento
        ultima.querySelector('input[name="nombreSenial"]').focus();
        ultima.querySelector('input[name="nombreSenial"]').value = "";

        // movemos la fila creada por encima de la que tiene el boton añadir
        tBody.insertBefore(ultima, penultima);

        // volvemos a hacer seleccionables los elementos de "estudio"
        estudio.removeAttribute('inert');

        console.log(penultima.querySelectorAll('input'));

        // quitamos el overlay
        overlay.style.display = "none";

    });
    // (rojo cancelar) ocultar la interfaz para añadir elementos custom y no hacer nada.
    popCancel.addEventListener("click", () => {
        estudio.removeAttribute('inert');
        overlay.style.display = "none";
    });

}