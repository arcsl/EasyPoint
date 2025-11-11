/// <reference path="script.js" />
/// <reference path="dibujador.js" />

// ---------- GENERALES ----------
document.addEventListener("DOMContentLoaded", () => {

    populateProyectSelect();
    populateBlockSelect();
    populateCustomPop();
    populateSumatorio();

    // verificar si existe la clave del nombre del proyecto actual en el local storage      
    nombreProyectoActual = localStorage.getItem('nombreProyectoActual');
    if (nombreProyectoActual === null) return;

    // verificar si existe tal proyecto en la biblioteca
    if (!proyectosEasyPoint.hasOwnProperty(nombreProyectoActual)) return;

    // intentar cargar el proyecto desde el almacenamiento
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
    UI.portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));
    portadaSelProyecSelect.value = nombreProyectoActual;

    // retomar el nombre provisional del proyecto por si el usuario lo estaba cambiando
    UI.proyectoInputNombre.value = localStorage.getItem('nuevoNombreProyecto') || nombreProyectoActual;
    UI.proyectoInputNombre.dispatchEvent(new Event('input', { bubbles: true }));

    muestraProyecto();

});


/* ---------- BOTONES PORTADA ---------- */

// (verde check) Crear nuevo proyecto
UI.portadaNueProyecCrear.addEventListener("click", () => {

    // si se esta mostrando mensaje error proyecto ya existe, no hacer nada
    if (!UI.portadaNueProyecMsg.classList.contains("w3-hide")) return;

    // verificar que se ha introducido algo de texto como nombre de proyecto
    const nuevoProyecto = UI.portadaNueProyecInput.value.trim();
    if (!nuevoProyecto) return;

    // agregar proyecto al objeto y salvar en localstorage
    proyectosEasyPoint[nuevoProyecto] = structuredClone(nuevoProyectoVacio);
    localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

    // borrar contenido del input y ocultarlo
    UI.portadaNueProyecInput.value = "";
    UI.portadaNueProyecCont.classList.add("w3-hide");

    // actualizar opciones del select de proyectos y seleccionar 
    populateProyectSelect();
    portadaSelProyecSelect.value = nuevoProyecto;

    // Simular click en abrir para mostrar el select de proyectos despues de haberlo creado
    UI.portadaAbrProyecBtn.dispatchEvent(new Event("click"), { bubbles: true });

    // Simular click en abrir proyecto para mostrar el estudio despues de haberlo creado
    UI.portadaSelProyecAbrir.dispatchEvent(new Event("click"), { bubbles: true });

    // O sea, al crear el proyecto nada mas darle al enter se abre el estudio del proyecto recien creado.

});
// (verde nuevo) boton para abrir dialogo para poner nombre de nuevo proyecto
UI.portadaNueProyecBtn.addEventListener("click", () => {

    if (UI.portadaNueProyecCont.classList.contains("w3-hide")) {

        // si no se esta mostrando el input, mostrarlo

        // mostrar input y hacer focus (y ocultar select por si acaso)
        UI.portadaSelProyecCont.classList.add("w3-hide"); // por si acaso
        UI.portadaNueProyecCont.classList.remove("w3-hide");
        UI.portadaNueProyecInput.value = "";
        UI.portadaNueProyecInput.focus();

        // boton Nuevo pasa a ser "Cancelar"
        UI.portadaNueProyecBtn.textContent = "Cancelar";
        UI.portadaNueProyecBtn.classList.remove("w3-green");
        UI.portadaNueProyecBtn.classList.add("w3-red");

        // Deshabilitar botones de importar y abrir
        UI.portadaImpProyecBtn.disabled = true;
        UI.portadaAbrProyecBtn.disabled = true;


    } else {

        // si se esta mostrando el input, se quiere cancelar y volver atras

        //ocultar input
        UI.portadaNueProyecCont.classList.add("w3-hide");

        // boton Nuevo vuelve a ser "Nuevo"
        UI.portadaNueProyecBtn.textContent = "Nuevo";
        UI.portadaNueProyecBtn.classList.remove("w3-red");
        UI.portadaNueProyecBtn.classList.add("w3-green");

        //habilitar botones
        UI.portadaImpProyecBtn.disabled = false;
        UI.portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

    }

});
// (morado importar) boton importar proyecto
UI.portadaImpProyecBtn.addEventListener("click", () => {

    if (UI.portadaSelProyecCont.classList.contains("w3-hide")) {

        // importar proyecto = simulamos click en input oculto
        UI.portadaImpProyecInput.click();

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
UI.portadaAbrProyecBtn.addEventListener("click", () => {

    if (UI.portadaSelProyecCont.classList.contains("w3-hide")) {

        // si no se esta mostrando el select, lo mostramos

        // mostrar select y hacer focus (y ocultar input por si acaso)
        UI.portadaNueProyecCont.classList.add("w3-hide"); // por si acaso
        UI.portadaSelProyecCont.classList.remove("w3-hide");
        portadaSelProyecSelect.focus();

        // restaurar boton nuevo deshabilitado
        UI.portadaNueProyecBtn.textContent = "Nuevo";
        UI.portadaNueProyecBtn.classList.remove("w3-red");
        UI.portadaNueProyecBtn.classList.add("w3-green");
        UI.portadaNueProyecBtn.disabled = true;

        // boton importar pasa a ser exportar
        UI.portadaImpProyecBtn.textContent = "Exportar";
        UI.portadaImpProyecBtn.disabled = false;

        // boton "Abrir" pasa a ser Cancelar para poder volver atras
        UI.portadaAbrProyecBtn.textContent = "Cancelar";
        UI.portadaAbrProyecBtn.classList.remove("w3-blue");
        UI.portadaAbrProyecBtn.classList.add("w3-red");
        UI.portadaAbrProyecBtn.disabled = false;

    } else {

        // es para abrir el select
        UI.portadaSelProyecCont.classList.add("w3-hide");
        UI.portadaNueProyecCont.classList.add("w3-hide"); // por si acaso

        // boton nuevo pasa a estar habilitado
        UI.portadaNueProyecBtn.disabled = false;

        // boton exportar pasa a ser importar
        UI.portadaImpProyecBtn.textContent = "Importar";

        // boton "Abrir" pasa a ser Abrir para poder abrir
        UI.portadaAbrProyecBtn.textContent = "Abrir";
        UI.portadaAbrProyecBtn.classList.add("w3-blue");
        UI.portadaAbrProyecBtn.classList.remove("w3-red");
        UI.portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

    }
});
// (rojo papelera) boton borrar proyecto
UI.portadaSelProyecBorrar.addEventListener("click", () => {

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
        UI.portadaSelProyecCont.classList.add("w3-hide");

        // Restaurar botón Abrir
        UI.portadaAbrProyecBtn.textContent = "Abrir";
        UI.portadaAbrProyecBtn.classList.remove("w3-red");
        UI.portadaAbrProyecBtn.classList.add("w3-blue");

        // Restaurar botón Importar
        UI.portadaImpProyecBtn.textContent = "Importar";

        // Habilitar/Deshabilitar botones
        UI.portadaNueProyecBtn.disabled = false;
        UI.portadaImpProyecBtn.disabled = false;
        UI.portadaAbrProyecBtn.disabled = true;

    }

});
// (verde flecha) boton abrir proyecto seleccionado
UI.portadaSelProyecAbrir.addEventListener("click", () => {

    const abrirProyecto = portadaSelProyecSelect.value.trim();

    // por seguridad
    if (!abrirProyecto) return;
    if (!proyectosEasyPoint.hasOwnProperty(abrirProyecto)) return;

    nombreProyectoActual = abrirProyecto;
    proyectoActual = structuredClone(proyectosEasyPoint[nombreProyectoActual]);
    proyectoActual.Guardado = true;
    proyectoActual.Viendo = "estudio";

    localStorage.setItem("nombreProyectoActual", nombreProyectoActual);
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

    muestraProyecto();

});

/* ---------- EVENTOS PORTADA ---------- */

// importacion de proyecto una vez el usuario acepta o cancela el dialogo de seleccion de archivo
UI.portadaImpProyecInput.addEventListener("change", (event) => {

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

            UI.portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));

        } catch (err) {
            alert("Archivo inválido o corrupto.");
        }
    };
    reader.readAsText(file);
});
// verificar si el nombre de proyecto ya existe para indicar input y subtexto en rojo
UI.portadaNueProyecInput.addEventListener("input", () => {

    const nuevoProyecto = UI.portadaNueProyecInput.value.trim();

    // verificar si el proyecto ya existe
    if (proyectosEasyPoint.hasOwnProperty(nuevoProyecto)) {

        // Mostrar mensaje de error y desactivar boton check
        UI.portadaNueProyecCrear.disabled = true;
        UI.portadaNueProyecMsg.textContent = `El proyecto "${nuevoProyecto}" ya existe.`;
        UI.portadaNueProyecMsg.classList.remove("w3-hide");
        UI.portadaNueProyecInput.classList.add("w3-pale-red");

    } else {

        // Ocultar mensaje de error
        UI.portadaNueProyecCrear.disabled = false;
        UI.portadaNueProyecMsg.classList.add("w3-hide");
        UI.portadaNueProyecInput.classList.remove("w3-pale-red");

    }

});
// escuchar enter como alternativa a tener que pulsar el boton de crear proyecto
UI.portadaNueProyecInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        UI.portadaNueProyecCrear.dispatchEvent(new Event('click', { bubbles: true }));
    }
});


/* ---------- BOTONES PROYECTO ---------- */

// (rojo salir) volver a la portada
UI.proyectoSalirBtn.addEventListener("click", () => {
    let seguir = proyectoActual.Guardado
        ? true
        : confirm("Hay cambios no guardados que se perderán.\n\n¿Desea continuar?\n");
    if (seguir) {

        // limpiar las claves del proyecto actual
        localStorage.removeItem('proyectoActual');
        localStorage.removeItem('nombreProyectoActual');
        localStorage.removeItem('nuevoNombreProyecto');
        nombreProyectoActual = null;
        proyectoActual = null;

        // poner pantalla principal en modo inicial (presionamos boton abrir que deberia estar en modo "cancelar")
        UI.proyecto.classList.add("w3-hide");
        UI.portada.classList.remove("w3-hide");

    }
});
// (verde guardar) guardar el estado actual del proyecto en el local storage del navegador
UI.proyectoGuardarBtn.addEventListener("click", () => {

    // leemos el nombre del proyecto en la casilla que el usuario puede modificar
    const nuevoNombreProyecto = UI.proyectoInputNombre.value.trim();

    if (!nuevoNombreProyecto) {
        alert("El nombre del proyecto no puede estar vacio.\n\n");
        return;
    }

    // si el nombre de proyecto ha cambiado
    if (nuevoNombreProyecto !== nombreProyectoActual) {

        // Si dicho nombre ya existe en el listado de proyectos, preguntamos al usuario si desea sobreescribir.
        if (proyectosEasyPoint.hasOwnProperty(nuevoNombreProyecto)) {
            if (!confirm("Ya existe un proyecto con ese nombre.\n\n¿Desea sobreescribirlo?\n")) return;

            // si no existe -> el usuario quiere renombrarlo
        } else {
            // copiamos la antigua clave en la nueva, borramos la antigua y actualizamos opciones de proyectoselec
            proyectosEasyPoint[nuevoNombreProyecto] = proyectosEasyPoint[nombreProyectoActual];
            delete proyectosEasyPoint[nombreProyectoActual];
            populateProyectSelect();
        }

        // llegados a este punto (sea cual sea el caso):
        // - dejamos seleccionado el nuevo nombre en portada
        // - actualizamos el nombre del proyecto actual
        // - quitamos el fondo rojo del input
        portadaSelProyecSelect.value = nuevoNombreProyecto;
        nombreProyectoActual = nuevoNombreProyecto;
        UI.proyectoInputNombre.classList.remove("w3-pale-red");

    }

    // marcar proyecto como guardado 
    proyectoActual.Guardado = true;

    // guardamos el proyecto en el listado de idem
    proyectosEasyPoint[nombreProyectoActual] = structuredClone(proyectoActual);

    // copiamos en local storage
    localStorage.setItem("nuevoNombreProyecto", nuevoNombreProyecto);
    localStorage.setItem("nombreProyectoActual", nombreProyectoActual);
    localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

    // Mostar notificación
    guardadoOK();

});
// (morado Exportar) mostar exportPop para seleccionar el formato de la exportación
UI.proyectoExportarBtn.addEventListener("click", () => {
    UI.proyecto.setAttribute('inert', ''); // bloquea el resto de inputs y botones
    if (proyectoActual.Viendo === "estudio") {
        UI.expPDFBtn.classList.remove("w3-hide");
        UI.expCSVBtn.classList.remove("w3-hide");
        UI.expWordBtn.classList.add("w3-hide");
        UI.expDXFBtn.classList.add("w3-hide");
        UI.overlayPopExport.style.left = "752px";
        
    } else if (proyectoActual.Viendo === "memoria") {
        UI.expPDFBtn.classList.remove("w3-hide");
        UI.expCSVBtn.classList.add("w3-hide");
        UI.expWordBtn.classList.remove("w3-hide");
        UI.expDXFBtn.classList.add("w3-hide");
        UI.overlayPopExport.style.left = "752px";
        
    } else if (proyectoActual.Viendo === "listado") {
        UI.expPDFBtn.classList.remove("w3-hide");
        UI.expCSVBtn.classList.remove("w3-hide");
        UI.expWordBtn.classList.add("w3-hide");
        UI.expDXFBtn.classList.add("w3-hide");
        UI.overlayPopExport.style.left = "752px";
        
    } else if (proyectoActual.Viendo === "dibujar") {
        UI.expPDFBtn.classList.add("w3-hide");
        UI.expCSVBtn.classList.add("w3-hide");
        UI.expWordBtn.classList.add("w3-hide");
        UI.expDXFBtn.classList.remove("w3-hide");
        UI.overlayPopExport.style.left = "822px";

    }
    UI.overlay.classList.remove("w3-hide");
    UI.overlayPopExport.classList.remove("w3-hide");
});
// (azul seccion) cambiar de seccion en el estudio
UI.proyectoSeccionBtn.addEventListener("click", () => {
    UI.proyecto.setAttribute('inert', ''); // bloquea el resto de inputs y botones
    UI.overlay.classList.remove("w3-hide");
    UI.overlayPopSeccion.classList.remove("w3-hide");
});
// (verde multifuncion) acciones en funcion de la seccion mostrada
UI.sectionToolsBtn.addEventListener("click", () => {

    if (proyectoActual.Viendo === "estudio") {
        const bloque = structuredClone(blocksData[UI.sectionToolsSelect.value]);
        if (!bloque) return;
        bloque.id = crypto.randomUUID();
        proyectoActual.Estudio.push(bloque);
        addBlock(bloque);
        disableFirstAndLastMoveBlockButtons();
        actualizaSumatorio();

    } else if (proyectoActual.Viendo === "listado") {
        if (Object.values(proyectoActual.Listado).some(arr => arr.length > 0)) {
            if (!confirm("Se borraran todas las señales actuales.\n¿Desea continuar?")) return;
        }
        asignarValoresListado();
        writeSignals();
        actualizaSumatorio();

    } else if (proyectoActual.Viendo === "memoria") {
        if (!confirm("Se borraran todas las modificaciones actuales.\n¿Desea continuar?")) return;
        crearMemoria();
    }

    proyectoNoGuardado();

});


/* ---------- EVENTOS PROYECTO ---------- */

// cambiar color del input del nombre del proyecto si ya existe otro proyecto son ese nombre o esta vacio
UI.proyectoInputNombre.addEventListener("input", () => {

    const nuevoNombreProyecto = UI.proyectoInputNombre.value.trim();
    localStorage.setItem("nuevoNombreProyecto", nuevoNombreProyecto);

    const estaVacio = nuevoNombreProyecto === "";
    const yaExiste = proyectosEasyPoint.hasOwnProperty(nuevoNombreProyecto);
    const esElActual = nuevoNombreProyecto === nombreProyectoActual;

    if ((yaExiste && !esElActual) || estaVacio) {
        UI.proyectoInputNombre.classList.add("w3-pale-red");
    } else {
        UI.proyectoInputNombre.classList.remove("w3-pale-red");
    }

});


/* ---------- BOTONES DIBUJADOR ---------- */
UI.btnAddCarril.onclick = () => {

    // 1) Añadir un carril vacío al estado
    proyectoActual.Asignacion.push([]); // carril vacio

    // 2) Guardamos
    proyectoNoGuardado();

    // 3) Re-pintamos todo
    writeCarriles();
   
};


/* ---------- BOTONES VENTANA POPUP SEÑALES---------- */

// (verde aceptar) ocultar la interfaz y añadir elementos
UI.popCustomAceptarBtn.addEventListener("click", () => {

    const bloque = UI.overlayPopCustom.bloqueOrigen;
    const table = UI.overlayPopCustom.tablaOrigen;
    const tBody = table.querySelector('tbody');

    // verificar si se ha introducido al menos una señal
    let algunoMayorQue1 = [...UI.overlayPopCustom.querySelectorAll('input')].some(input => Number(input.value) > 0);
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
        const inputSignal = UI.overlayPopCustom.querySelector(`input[name="${sig}"]`);
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

    // movemos la fila creada por encima de la que tiene el boton añadir
    tBody.insertBefore(ultima, penultima);

    actualizaSumatorio();
    proyectoNoGuardado();

    // volvemos a hacer seleccionables los elementos de "proyecto"
    UI.proyecto.removeAttribute('inert');

    //hacemos focus en el input del nombre para que el usuario pueda escribir el nombre del nuevo elemento
    ultima.querySelector('input[name="nombreSenial"]').value = "";
    ultima.querySelector('input[name="nombreSenial"]').focus();

    // quitamos el overlay
    UI.popCustomCancelBtn.dispatchEvent(new Event('click', { bubbles: true }));

});
// (rojo cancelar) ocultar la interfaz y no hacer nada.
UI.popCustomCancelBtn.addEventListener("click", () => {
    UI.proyecto.removeAttribute('inert');
    UI.overlayPopCustom.classList.add("w3-hide");
    UI.overlay.classList.add("w3-hide");
});


/* ---------- BOTONES VENTANA POPUP EXPORTAR ---------- */

// (morado PDF) Generar informe PDF y ocultar la interfaz.
UI.expPDFBtn.addEventListener("click", () => {
    crearPDF(UI.overlayPopExport.seccion);
    UI.expCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (morado CSV) Generar listado en CSV y ocultar la interfaz.
UI.expCSVBtn.addEventListener("click", () => {
    crearCSV(UI.overlayPopExport.seccion);
    UI.expCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (morado Word) Generar memoria en word y ocultar la interfaz.
UI.expWordBtn.addEventListener("click", () => {
    generarMemoriaDOCX();
    UI.expCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (morado Word) Generar memoria en word y ocultar la interfaz.
UI.expDXFBtn.addEventListener("click", () => {
    descargarDXF();
    UI.expCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (rojo aspa) ocultar la interfaz y no hacer nada.
UI.expCerrarBtn.addEventListener("click", () => {
    UI.proyecto.removeAttribute('inert');
    UI.overlay.classList.add("w3-hide");
    UI.overlayPopExport.classList.add("w3-hide");
});


/* ---------- BOTONES VENTANA POPUP CAMBIO DE SECCION ---------- */

// (azul estudio) pasar al creador de memoria de control
UI.estudioMostrarBtn.addEventListener("click", () => {
    // cambiar icono en la barra de botones
    UI.proyectoSeccionBtn.querySelector("img").src = "./images/estudio.svg";

    // cambiar contenido del label informativo de seccion
    UI.proyectoLabelSeccion.innerText = "ESTUDIO DE PUNTOS DE CONTROL DEL PROYECTO";

    // cambiar botones mostrados en el popup para no mostrar el boton de la seccion en la que ya estamos
    UI.estudioMostrarBtn.classList.add("w3-hide");
    UI.memoriaMostrarBtn.classList.remove("w3-hide");
    UI.listadoMostrarBtn.classList.remove("w3-hide");
    UI.dibujarMostrarBtn.classList.remove("w3-hide");

    // cambiar la seccion mostrada
    UI.estudioCont.classList.remove("w3-hide");
    UI.memoriaCont.classList.add("w3-hide");
    UI.listadoCont.classList.add("w3-hide");
    UI.dibujarCont.classList.add("w3-hide");
    proyectoActual.Viendo = "estudio";
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
    actualizaSumatorio();

    // mostrar el select de la barra de herramients y el sumatorio de señales
    UI.sectionToolsCont.classList.remove("w3-hide");
    UI.sectionToolsSelect.classList.remove("w3-invisible");
    UI.proyectoPie.classList.remove("w3-hide");

    // cambiar el icono del boton de la barra de herramientas
    UI.sectionToolsBtn.title = "Añadir bloque de señales al estudio"
    UI.sectionToolsBtn.querySelector("img").src = "./images/aniacirc.svg";

    // cerrar popup
    UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (azul listado) pasar al creador de listado de señales
UI.listadoMostrarBtn.addEventListener("click", () => {

    // cambiar icono en la barra de botones
    UI.proyectoSeccionBtn.querySelector("img").src = "./images/listado.svg";

    // cambiar contenido del label informativo de seccion
    UI.proyectoLabelSeccion.innerText = "LISTADO DE PUNTOS Y ESTADO DE ASIGNACIÓN";

    // cambiar botones mostrados en el popup para no mostrar el boton de la seccion en la que ya estamos
    UI.estudioMostrarBtn.classList.remove("w3-hide");
    UI.memoriaMostrarBtn.classList.remove("w3-hide");
    UI.listadoMostrarBtn.classList.add("w3-hide");
    UI.dibujarMostrarBtn.classList.remove("w3-hide");

    // cambiar la seccion mostrada
    UI.estudioCont.classList.add("w3-hide");
    UI.memoriaCont.classList.add("w3-hide");
    UI.listadoCont.classList.remove("w3-hide");
    UI.dibujarCont.classList.add("w3-hide");
    proyectoActual.Viendo = "listado";
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
    actualizaSumatorio();

    // ocultar el select de la barra de herramients y mostrar el sumatorio de señales
    UI.sectionToolsCont.classList.remove("w3-hide");
    UI.sectionToolsSelect.classList.add("w3-invisible");
    UI.proyectoPie.classList.remove("w3-hide");

    // cambiar el texto e icono del boton de la barra de herramientas
    UI.sectionToolsBtn.title = "Regenerar listado de señales conforme al estado actual del estudio."
    UI.sectionToolsBtn.querySelector("img").src = "./images/regen.svg";

    // cerrar popup
    UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (azul dibujar) pasar al creador de listado de señales
UI.dibujarMostrarBtn.addEventListener("click", () => {

    // cambiar icono en la barra de botones
    UI.proyectoSeccionBtn.querySelector("img").src = "./images/techDraw.svg";

    // cambiar contenido del label informativo de seccion
    UI.proyectoLabelSeccion.innerText = "ASIGNACIÓN DE SEÑALES Y CREACIÓN DE PLANOS";

    // cambiar botones mostrados en el popup para no mostrar el boton de la seccion en la que ya estamos
    UI.estudioMostrarBtn.classList.remove("w3-hide");
    UI.memoriaMostrarBtn.classList.remove("w3-hide");
    UI.listadoMostrarBtn.classList.remove("w3-hide");
    UI.dibujarMostrarBtn.classList.add("w3-hide");

    // cambiar la seccion mostrada
    UI.estudioCont.classList.add("w3-hide");
    UI.memoriaCont.classList.add("w3-hide");
    UI.listadoCont.classList.add("w3-hide");
    UI.dibujarCont.classList.remove("w3-hide");

    proyectoActual.Viendo = "dibujar";
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

    // ocultar barra de herramients y el sumatorio de señales
    UI.sectionToolsCont.classList.add("w3-hide");
    UI.proyectoPie.classList.add("w3-hide");

    // cerrar popup
    UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (azul memoria) pasar al creador de memoria de control
UI.memoriaMostrarBtn.addEventListener("click", () => {

    // cambiar el texto e icono del boton de la barra de herramientas
    UI.sectionToolsBtn.title = "Regenerar la memoria de control conforme al estado actual del estudio."
    UI.proyectoSeccionBtn.querySelector("img").src = "./images/book.svg";

    // cambiar contenido del label informativo de seccion
    UI.proyectoLabelSeccion.innerText = "MEMORIA DE CONTROL";

    // cambiar botones mostrados en el popup para no mostrar el boton de la seccion en la que ya estamos
    UI.estudioMostrarBtn.classList.remove("w3-hide");
    UI.memoriaMostrarBtn.classList.add("w3-hide");
    UI.listadoMostrarBtn.classList.remove("w3-hide");
    UI.dibujarMostrarBtn.classList.remove("w3-hide");

    // cambiar la seccion mostrada
    UI.estudioCont.classList.add("w3-hide");
    UI.memoriaCont.classList.remove("w3-hide");
    UI.listadoCont.classList.add("w3-hide");
    UI.dibujarCont.classList.add("w3-hide");

    proyectoActual.Viendo = "memoria";
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

    // mostrar barra de herramientas ocultar el select de la barra de herramients y sumatorio de señales
    UI.sectionToolsCont.classList.remove("w3-hide");
    UI.sectionToolsSelect.classList.add("w3-invisible");
    UI.proyectoPie.classList.add("w3-hide");

    // cambiar el icono del boton de la barra de herramientas
    UI.sectionToolsBtn.querySelector("img").src = "./images/regen.svg";

    // cerrar popup
    UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
});
// (rojo aspa) ocultar la interfaz y no hacer nada.
UI.crearCerrarBtn.addEventListener("click", () => {
    UI.proyecto.removeAttribute('inert');
    UI.overlay.classList.add("w3-hide");
    UI.overlayPopSeccion.classList.add("w3-hide");
});

/* ---------- CHECKBOX MOSTRAR U OCULTAR FAMILIAS DE DISPOSITIVOS ---------- */

UI.dibujarCont.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.addEventListener("change", () => { writeCarriles(); });
});