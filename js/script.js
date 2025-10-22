/* ------------------------- REFERENCIAS AL DOM EN OBJETO UI ------------------------- */
const UI = {};
document.querySelectorAll("[id]").forEach(el => UI[el.id] = el);

/* ------------------------- VARIABLES GLOBALES ------------------------- */
let proyectosEasyPoint = JSON.parse(localStorage.getItem('proyectosEasyPoint')) || {};
let nombreProyectoActual = null;
let proyectoActual = null;
const blocksData = blocks();
const nuevoProyectoVacio = {
    Estudio: [],
    Memoria: "",
    Listado: Object.fromEntries(signalTypes.map(key => [key, []])),
    Asignacion: [],
}

/* ------------------------- EJECUCIONES INICIALES ------------------------- */
if (location.hostname === "arcsl.github.io") {
    window.location.replace("https://easypoint.arcsl.com");
}
document.title = "Easy Point";


/* ------------------------- GENERALES ------------------------- */
function guardadoOK() {
    const notificacion = document.createElement('div');
    notificacion.id = 'notificacion';
    notificacion.className = 'w3-center w3-button w3-green w3-round-large fadeinout notificacion-fija';
    notificacion.innerHTML = "<h3>Guardado</h3>";
    UI.proyecto.appendChild(notificacion);
    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}

/* ------------------------- POBLADORES ------------------------- */
function populateProyectSelect() {

    // Asegurarse de que existe el objeto
    if (proyectosEasyPoint) {
        portadaSelProyecSelect.innerHTML = "";
        // Recorrer las claves del objeto y agregarlas como opciones
        Object.keys(proyectosEasyPoint).forEach(clave => {
            const option = document.createElement('option');
            option.value = clave;
            option.textContent = clave;
            portadaSelProyecSelect.appendChild(option);
        });
    }

    // Deshabilitar boton abrir si no hay proyectos
    UI.portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

}

function populateBlockSelect() {
    blocksData.forEach((block, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = block.Nombre;
        if (block.Elementos === null) option.disabled = true;
        UI.sectionToolsSelect.appendChild(option);
    });
}

function populateCustomPop() {

    //componer tabla de ventana popup para introducir señales custom
    signalTypes.forEach((signal) => {

        // --- Fila de labels ---
        const tdLabel = document.createElement("td");
        UI.popCustomLabelTR.appendChild(tdLabel);

        const typeLabel = document.createElement("label");
        tdLabel.appendChild(typeLabel);

        typeLabel.className = "w3-input w3-center";
        typeLabel.textContent = signal;

        // --- Fila de inputs ---
        const tdInput = document.createElement("td");
        UI.popCustomInputTR.appendChild(tdInput);

        const numSeniales = inputNumero(0);
        tdInput.appendChild(numSeniales);

        numSeniales.value = 0;
        numSeniales.min = 0
        numSeniales.name = signal;
        numSeniales.className = "w3-input w3-center";

    });

}

function populateSumatorio() {

    const sumarioSenialesHead = UI.proyectoPie.querySelector("table thead tr");
    const sumarioSenialesBody = UI.proyectoPie.querySelector("table tbody tr");

    signalTypes.forEach(sig => {

        // celdas cabecera
        const headTitle = document.createElement("th");
        sumarioSenialesHead.appendChild(headTitle);
        headTitle.innerText = sig;

        // celdas con suma total
        const sumCell = document.createElement("td");
        sumarioSenialesBody.appendChild(sumCell);
        sumCell.classList.add(sig);
        sumCell.innerText = 0;

    });

}

/* ------------------------- ESTUDIO ------------------------- */
function writeBlocks() {
    UI.proyectoInputNombre.value = nombreProyectoActual;
    UI.estudioCont.innerHTML = "";
    proyectoActual?.Estudio?.forEach?.(addBlock);
    UI.sectionToolsSelect.selectedIndex = 0;
    disableFirstAndLastMoveBlockButtons();
}

function moveBlock(bloque, tabla, direccion) {

    const tablas = Array.from(UI.estudioCont.children);
    const indice = tablas.indexOf(tabla);
    const indiceBloque = proyectoActual.Estudio.indexOf(bloque);

    // si bloque no existe en el proyecto abortar
    if (indiceBloque === -1) return;

    // si el indice de bloque y de tabla no coinciden, abortar
    if (indice !== indiceBloque) return;

    // no deberia poder pasar por los botones deshabilitados, pero por si acaso    
    const nuevoIndice = indice + direccion;
    if (nuevoIndice < 0 || nuevoIndice >= tablas.length) return;

    // mover la tabla en el DOM
    UI.estudioCont.removeChild(tabla);
    if (direccion === -1) {
        UI.estudioCont.insertBefore(tabla, tablas[nuevoIndice]);
    } else {
        UI.estudioCont.insertBefore(tabla, tablas[nuevoIndice].nextSibling);
    }

    // mover el bloque en proyectoActual
    moverElemento(proyectoActual.Estudio, indice, nuevoIndice);
    proyectoNoGuardado();

    // repasar botones de movimiento
    disableFirstAndLastMoveBlockButtons();

}

function disableFirstAndLastMoveBlockButtons() {

    const tablas = Array.from(UI.estudioCont.children);

    // deshabilitar el botor subir de la primera y el bajar de la ultima
    tablas.forEach((tabla, i) => {
        const botones = tabla.querySelectorAll('button');
        //botones[0] es el boton de eliminar la tabla
        botones[1].disabled = i === 0;               // Botón subir
        botones[2].disabled = i === tablas.length - 1; // Botón bajar
    });

}

function addBlock(bloque) {

    // inserta un bloque en el DOM segun la estructura JSON 

    const table = document.createElement("table");
    UI.estudioCont.appendChild(table);

    table.name = bloque.Nombre;
    table.classList.add("w3-table", "w3-bordered", "w3-margin-bottom");

    addBlockHeader(bloque, table);
    addBlockBody(bloque, table);

    UI.sectionToolsSelect.focus();

}

function addBlockHeader(bloque, table) {

    // iniciar valores que fuede que no existan si es un bloque nuevo
    if (!bloque.NombreUsuario) bloque.NombreUsuario = bloque.Nombre;
    if (!bloque.Cantidad) bloque.Cantidad = 1;

    // crear los elementos del DOM
    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    const headerCell = document.createElement("th");
    headerRow.appendChild(headerCell);

    const deleteBtn = document.createElement("button");
    headerCell.appendChild(deleteBtn);

    const nameInput = inputNombre(bloque.NombreUsuario);
    headerCell.appendChild(nameInput);

    const numberInput = inputNumero(bloque.Cantidad);
    headerCell.appendChild(numberInput);

    const subirBtn = document.createElement('button');
    headerCell.appendChild(subirBtn);

    const bajarBtn = document.createElement('button');
    headerCell.appendChild(bajarBtn);

    // asignar valores y dinamicas a los elementos del DOM
    nameInput.classList.add("nombreBloque");
    nameInput.name = "nombreBloque";
    nameInput.addEventListener('change', () => {
        bloque.NombreUsuario = nameInput.value;
        proyectoNoGuardado();
    });

    numberInput.classList.add("cantidadBloque", "w3-center");
    numberInput.name = "cantidadBloque";
    numberInput.addEventListener("change", () => {
        bloque.Cantidad = numberInput.value * 1;
        proyectoNoGuardado();
        // simulamos un cambio en cada checkbox para recalculas todas las señales
        const checkboxes = table.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    deleteBtn.innerHTML = '<img src="./images/papelera.svg" alt="Salir" width="15" height="15">';
    deleteBtn.className = "w3-button w3-red w3-margin-right";
    deleteBtn.addEventListener("click", () => {

        // eliminar el bloque del proyectoActual
        proyectoActual.Estudio.splice(proyectoActual.Estudio.indexOf(bloque), 1);
        proyectoNoGuardado();

        // eliminar la tabla
        table.remove();

        // actualizar botones mover y sumatorio
        disableFirstAndLastMoveBlockButtons();
        actualizaSumatorio();

    });

    subirBtn.className = "w3-button w3-pale-green w3-margin-left";
    subirBtn.textContent = '▲';
    subirBtn.addEventListener('click', () => {
        moveBlock(bloque, table, -1)
    });

    bajarBtn.className = "w3-button w3-pale-red w3-margin-right";
    bajarBtn.textContent = '▼';
    bajarBtn.addEventListener('click', () => {
        moveBlock(bloque, table, 1)
    });

    // añadir una columna por cada tiopo de señal para mantener la alineacion de toda la tabla
    signalTypes.forEach(() => {
        const th = document.createElement("th");
        headerRow.appendChild(th);
    });

}

function addBlockBody(bloque, table) {

    const tBody = document.createElement("tbody");
    table.appendChild(tBody);

    //añadimos una fila por cada elemento del bloque
    bloque.Elementos.forEach(elemento => {
        addFilaBody(elemento, tBody, bloque);
    });

    //añadimos una fila para insertar el boton para añadir lineas custom
    const lastRow = document.createElement("tr");
    tBody.appendChild(lastRow);

    const lastCell = document.createElement("td");
    lastRow.appendChild(lastCell);

    const addCustom = document.createElement("button");
    lastCell.appendChild(addCustom);

    addCustom.textContent = "✚";
    addCustom.classList = "w3-button w3-green addBtn";
    addCustom.addEventListener('click', event => {

        // Asignar bloque y tabla desde el que se dispara
        UI.overlayPopCustom.tablaOrigen = table;
        UI.overlayPopCustom.bloqueOrigen = bloque;

        // Vaciar todos los inputs
        UI.overlayPopCustom.querySelectorAll('input').forEach(input => {
            input.value = 0;
        });

        // mostrar customPop centrado en pantalla
        UI.proyecto.setAttribute('inert', ''); // bloquea todos los inputs del fondo en estudio
        UI.overlay.classList.remove("w3-hide");
        UI.overlayPopCustom.classList.remove("w3-hide");

        // Obtener tamaño y posición del contenedor
        const contRect = UI.estudioCont.getBoundingClientRect();

        // Calcular posición centrada dentro del contenedor
        const left = contRect.left + (contRect.width - UI.overlayPopCustom.offsetWidth) / 2;

        // Posicionar el poup
        UI.overlayPopCustom.style.top = (window.innerHeight - UI.overlayPopCustom.offsetHeight) / 2 + "px";
        UI.overlayPopCustom.style.left = contRect.left + (contRect.width - UI.overlayPopCustom.offsetWidth) / 2 + "px";

        // focus al primer input
        UI.overlayPopCustom.querySelector('input').focus();

    });

}

function addFilaBody(elemento, tBody, bloque) {

    // iniciar valores que fuede que no existan si es un bloque nuevo
    if (!elemento.hasOwnProperty("NombreUsuario")) elemento.NombreUsuario = elemento.Nombre;
    if (!elemento.hasOwnProperty("Opcion")) elemento.Opcion = 0;
    if (!elemento.hasOwnProperty("Checked")) elemento.Checked = elemento.Cantidad > 0;

    // crear los elementos del DOM
    const row = document.createElement("tr");
    tBody.appendChild(row);

    const nameCell = document.createElement("td");
    row.appendChild(nameCell);

    const elimcustom = document.createElement("button");
    nameCell.appendChild(elimcustom);

    const checkbox = document.createElement("input");
    nameCell.appendChild(checkbox);

    const nameInput = inputNombre(elemento.NombreUsuario);
    nameCell.appendChild(nameInput);

    const numberInput = inputNumero(elemento.Cantidad);
    nameCell.appendChild(numberInput);

    const select = document.createElement("select");
    nameCell.appendChild(select);

    // asignar valores y dinamicas a los elementos del DOM
    row.name = elemento.Nombre;

    elimcustom.textContent = "X";
    elimcustom.classList.add("w3-red", "w3-button");
    elimcustom.addEventListener('click', () => {

        // eliminar el elemento del bloque actual
        bloque.Elementos.splice(bloque.Elementos.indexOf(elemento), 1);
        proyectoNoGuardado();

        // eliminar la fila
        row.remove();

        // actualizar sumatorio
        actualizaSumatorio();
    });

    checkbox.type = "checkbox";
    checkbox.checked = elemento.Checked;
    checkbox.addEventListener("change", () => {
        elemento.Checked = checkbox.checked;
        if (checkbox.checked && elemento.Cantidad === 0) {
            elemento.Cantidad = 1;
            numberInput.value = 1;
        }
        mostrarOcultarInputsYSelects(row, checkbox.checked);
        calculaSeniales(row, elemento, bloque, checkbox.checked);
        actualizaSumatorio();
        proyectoNoGuardado();
    });

    nameInput.type = "text";
    nameInput.name = "nombreSenial";
    if (elemento.Nombre.substring(0, 6) === "custom") {
        nameInput.placeholder = elemento.NombreUsuario;
        checkbox.style.display = "none";
        checkbox.checked = true;
    } else {
        elimcustom.style.display = "none";
        nameInput.placeholder = elemento.Nombre;
    }
    nameInput.addEventListener('change', () => {
        elemento.NombreUsuario = nameInput.value;
        proyectoNoGuardado();
    });

    numberInput.name = "numeroSenial";
    numberInput.classList.add("w3-center");
    numberInput.addEventListener("change", () => {
        elemento.Cantidad = numberInput.value * 1;
        calculaSeniales(row, elemento, bloque, checkbox.checked);
        actualizaSumatorio();
        proyectoNoGuardado();
    });

    // Si hay mas de una opcion, añadir el select
    if (elemento.Opciones.length > 1) {

        select.name = "opcionSenial";
        select.classList.add("w3-select");

        elemento.Opciones.forEach(seleccion => {
            const option = document.createElement("option");
            select.appendChild(option);
            option.textContent = seleccion.Nombre;
        });

        select.selectedIndex = elemento.Opcion;

        select.addEventListener("change", () => {
            elemento.Opcion = select.selectedIndex;
            calculaSeniales(row, elemento, bloque, checkbox.checked);
            proyectoNoGuardado();
            actualizaSumatorio();
        });

    } else {
        select.style.display = "none";
    }

    signalTypes.forEach(sig => {
        const cell = document.createElement("td");
        cell.classList.add(sig, "celda-numero-seniales");
        row.appendChild(cell);
    });

    mostrarOcultarInputsYSelects(row, checkbox.checked);

    function mostrarOcultarInputsYSelects(row, check) {

        // mostrar/ocultar inputs tipo number
        row.querySelectorAll('input[type="number"]').forEach(input => {
            input.classList.toggle("w3-hide", !check);
        });

        // mostrar/ocultar selects
        row.querySelectorAll("select").forEach(sel => {
            sel.classList.toggle("w3-hide", !check);
        });

    }

    calculaSeniales(row, elemento, bloque, checkbox.checked);

    function calculaSeniales(row, elemento, bloque, checked) {

        signalTypes.forEach(sig => {    // verificamos por cada tipo de señal

            // seleccionamos la celda que tiene la clase de la señal que estamos verificando
            const cell = row.querySelector(`td.${sig}`)

            // acortamos seleccionando el objeto
            const seniales = elemento.Opciones[elemento.Opcion].Seniales;

            // si la fila tiene el check y seniales contiene el tipo de señal que estamos evaluando
            if (checked && seniales.hasOwnProperty(sig)) {
                cell.textContent = seniales[sig] * elemento.Cantidad * bloque.Cantidad;
            } else {
                cell.textContent = "-"
            }

        });

    }

}

function actualizaSumatorio() {

    const totalesSeniales = {};
    signalTypes.forEach(sig => totalesSeniales[sig] = 0);

    if (proyectoActual.Viendo === "estudio") {
        // TODO: hacer el conteo desde el json en vez de la tabla del DOM
        const tables = UI.estudioCont.querySelectorAll("table");
        tables.forEach(table => {

            const rows = table.querySelectorAll("tbody tr");
            rows.forEach(row => {

                const checkbox = row.querySelector("input[type=checkbox]");
                if (!checkbox || !checkbox.checked) return;

                signalTypes.forEach(sig => {
                    const cellText = row.querySelector(`td.${sig}`)?.textContent;
                    const val = parseInt(cellText) || 0;
                    totalesSeniales[sig] += val;
                });

            });
        });
    }

    if (proyectoActual.Viendo === "listado") {
        signalTypes.forEach(sig => {
            const listaSeniales = proyectoActual?.Listado?.[sig];
            listaSeniales.forEach(listaSenial => {
                totalesSeniales[sig] += listaSenial.Numero;
            });
        });
    }

    signalTypes.forEach(sig => {
        const cell = UI.proyectoPie.querySelector(`td.${sig}`);
        cell.textContent = totalesSeniales[sig];
    });

}


/* ------------------------- LISTADO ------------------------- */

function asignarValoresListado() {

    proyectoActual.Listado = Object.fromEntries(signalTypes.map(key => [key, []]));

    proyectoActual.Estudio.forEach(bloque => {

        bloque.Elementos.forEach(elemento => {

            if (elemento.Checked) {

                const optElegida = elemento.Opciones[elemento.Opcion];

                // descomponer el nombre en varios si hay mas de una unidad en el elemento
                // tipo 2 bombas -> daria 4 nombres: M/P Bomba 1, M/P Bomba 2, estado bomba 1, estado bomba 2
                let nombresSenialesProcesados = procesaNombres(bloque.NombreUsuario, bloque.Cantidad, elemento.NombreUsuario, elemento.Cantidad);

                optElegida.Esquema.forEach(senialesDeEsquema => {

                    //añadir señal al array correspondiente, una señal por nombre generado
                    // una "senial" puede generar por ejemplo 4 señales si estamos en el bloque 
                    // calderas y hay 2 y ademas dentro del bloque hay 2 temperaturas por caldera
                    nombresSenialesProcesados.forEach(nombreProcesado => {

                        const { Nombre, Tipo, ...senialParaListado } = structuredClone(senialesDeEsquema);

                        const textoCompuesto = ((Nombre + " " + nombreProcesado).trim()).toLowerCase();

                        // Primera letra en mayuscula
                        const primMayus = textoCompuesto[0].toUpperCase() + textoCompuesto.slice(1);

                        // Abreviamos textos genericos
                        senialParaListado.Linea1 = primMayus
                            .replace("Marcha-paro", "M/P")
                            .replace("M/p", "M/P")
                            .replace("Temperatura", "Temp");

                        // Añadir linea2 solo en ciertos casos
                        if (Tipo === "ED" && senialParaListado.Opciones?.[0]?.toUpperCase().startsWith("EXT")) {
                            senialParaListado.Linea2 = "(Contacto libre de potencial)";
                        }

                        proyectoActual.Listado[Tipo].push(senialParaListado);

                    });
                });
            }
        });
    });

    proyectoNoGuardado();

}

/**
 * Genera un array de nombres combinados de bloques y elementos.
 * Aplica prefijos y numeración automática si el nombre contiene comas o "y".
 *
 * @param {string} bName - Nombre del bloque.
 * @param {number} bCant - Cantidad de bloques.
 * @param {string} eName - Nombre del elemento.
 * @param {number} eCant - Cantidad de elementos.
 * @returns {string[]} Array con todos los nombres combinados de elementos y bloques.
 */
function procesaNombres(bName, bCant, eName, eCant) {
    /**
     * Divide un nombre compuesto en un prefijo y un array de partes.
     * Aplica una early exit si no hay exactamente una ocurrencia de " y ".
     *
     * @param {string} nombre - El nombre a procesar, puede contener comas y " y ".
     * @returns {{prefijo: string, partes: string[]} | null} Objeto con el prefijo y las partes,
     *          o null si no se cumple la condición de una sola "y" o si las partes son insuficientes.
     */
    function splitNombre(nombre) {
        // Contar cuántas veces aparece " y " -> Early exit: si no hay exactamente una "y"
        const countY = (nombre.match(/ y /g) || []).length;
        if (countY !== 1) return null;

        // Dividir por comas, luego cada parte por " y ", aplanar el array resultante y eliminar espacios
        let partes = nombre.split(",");
        partes = partes.flatMap(p => p.split(" y "));
        partes = partes.map(p => p.trim());

        // Separar prefijo del primer elemento
        let primerElemento = partes[0];
        let palabras = primerElemento.split(" ");
        partes[0] = palabras.pop();        // último elemento del primer elemento
        const prefijo = palabras.join(" "); // resto de palabras como prefijo

        // Validaciones finales o retornar objeto valido
        if (prefijo === "" || partes[0] === "" || partes.length < 2) return null;
        return { prefijo, partes };
    }

    // array de bloques
    let arrayBloques = [];
    if (bCant > 1) {
        let splitBloques = splitNombre(bName);
        if (!splitBloques || splitBloques.partes.length !== bCant) {
            for (let i = 1; i <= bCant; i++) { arrayBloques.push(bName + " " + i); }
        } else {
            splitBloques.partes.forEach(parte => arrayBloques.push(splitBloques.prefijo + " " + parte));
        }
    } else {
        arrayBloques = [bName];
    }

    // array de elementos
    let arrayElems = [];
    if (eCant > 1) {
        let splitElems = splitNombre(eName);
        if (!splitElems || splitElems.partes.length !== eCant) {
            for (let i = 1; i <= eCant; i++) { arrayElems.push(eName + " " + i); }
        } else {
            splitElems.partes.forEach(parte => arrayElems.push(splitElems.prefijo + " " + parte));
        }
    } else {
        arrayElems = [eName];
    }

    // --- Combinar bloques y elementos ---
    const resultado = [];
    for (let b of arrayBloques) {
        for (let e of arrayElems) {
            resultado.push(e + " " + b);
        }
    }

    return resultado;
}

function writeSignals() {

    UI.listadoCont.innerHTML = "";

    signalTypes.forEach((sig, index) => {

        const listaSeniales = proyectoActual?.Listado?.[sig];

        const table = document.createElement('table');
        UI.listadoCont.appendChild(table);

        table.classList.add("w3-table", "w3-bordered", "w3-margin-bottom");
        table.signalType = sig;

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        const rowHead = document.createElement('tr');
        thead.appendChild(rowHead);

        const celda = document.createElement('th');
        celda.colSpan = 2;
        rowHead.appendChild(celda);

        const addSenial = document.createElement("button");
        celda.appendChild(addSenial);

        const labelTitulo = document.createElement('label');
        labelTitulo.innerText = signalTexts[index];
        celda.appendChild(labelTitulo);

        addSenial.textContent = "✚";
        addSenial.classList = "w3-button w3-green";

        addSenial.addEventListener('click', () => {
            const listaSenial = esq[`Vacio${sig}_1`]();
            listaSeniales.push(listaSenial);
            proyectoNoGuardado();
            crearFilaSenial(listaSenial);
            renumerarFilas();
            actualizaSumatorio();
        });

        // crear una fila por cada senial del array
        listaSeniales?.forEach?.(crearFilaSenial);

        function crearFilaSenial(listaSenial) {

            const indexListaSenial = table.querySelector("tbody").querySelectorAll("tr").length;

            const row = document.createElement('tr');
            tbody.appendChild(row);
            row.Numero = listaSenial.Numero;

            const celdaEstadoAsignacion = document.createElement('td');
            celdaEstadoAsignacion.classList.add("w3-pale-yellow");
            row.appendChild(celdaEstadoAsignacion);

            const elimSenial = document.createElement("button");
            celdaEstadoAsignacion.appendChild(elimSenial);
            // elimSenial.textContent = "X";
            elimSenial.innerHTML = '<img src="./images/papelera.svg" alt="Salir" width="12" height="12">';
            elimSenial.classList.add("w3-red", "w3-button");
            elimSenial.addEventListener('click', () => {
                if (!confirm("Esta acción no se puede deshacer.\n¿Desea continuar?")) return;
                listaSeniales.splice(listaSeniales.indexOf(listaSenial), 1);
                proyectoNoGuardado();
                row.remove();
                renumerarFilas();
                actualizaSumatorio();
            });

            const labelNumSenial = document.createElement('label');
            labelNumSenial.innerText = (indexListaSenial + 1).toString().padStart(2, '0');
            celdaEstadoAsignacion.appendChild(labelNumSenial);

            const celdaTextos = document.createElement('td');
            row.appendChild(celdaTextos);

            const selectDibujoSenial = document.createElement('select');
            selectDibujoSenial.classList.add("w3-margin-right", "nobackground");
            celdaTextos.appendChild(selectDibujoSenial);

            if (listaSenial.Opciones.length > 1) {
                listaSenial.Opciones.forEach(opcion => {
                    const opcionDibujoSenial = document.createElement('option');
                    opcionDibujoSenial.value = opcion.toUpperCase();
                    opcionDibujoSenial.innerText = opcion;
                    selectDibujoSenial.appendChild(opcionDibujoSenial);
                });
                selectDibujoSenial.addEventListener('change', (event) => {
                    const val = selectDibujoSenial.value;
                    inputIndex.style.visibility = (val === "RELÉ" || val === "CONTACTOR" || val === "TÉRMICO") ? "visible" : "hidden";
                    listaSenial.Opcion = event.target.selectedIndex;
                    proyectoNoGuardado();
                });
                selectDibujoSenial.selectedIndex = listaSenial.Opcion ?? 0;
            } else {
                selectDibujoSenial.style.visibility = "hidden";
            }

            const val = selectDibujoSenial.value;

            const inputIndex = inputNombre("");
            celdaTextos.appendChild(inputIndex);
            inputIndex.style.visibility = (val === "RELÉ" || val === "CONTACTOR" || val === "TÉRMICO") ? "visible" : "hidden";
            inputIndex.placeholder = "##";
            inputIndex.addEventListener('change', (event) => {
                listaSenial.tagNumber = event.target.value;
                proyectoNoGuardado();
            });

            const inputListaSenialLinea1 = inputNombre(listaSenial.Linea1 ?? "");
            celdaTextos.appendChild(inputListaSenialLinea1);
            inputListaSenialLinea1.placeholder = "Nombre de la señal";
            inputListaSenialLinea1.addEventListener('change', (event) => {
                listaSenial.Linea1 = event.target.value;
                proyectoNoGuardado();
            });

            const inputListaSenialLinea2 = inputNombre(listaSenial.Linea2 ?? "");
            celdaTextos.appendChild(inputListaSenialLinea2);
            inputListaSenialLinea2.placeholder = "Modelo / Anotaciones";
            inputListaSenialLinea2.addEventListener('change', (event) => {
                listaSenial.Linea2 = event.target.value;
                proyectoNoGuardado();
            });

            const labelCantSenial = document.createElement('label');
            labelCantSenial.innerText = listaSenial.Numero;
            celdaTextos.appendChild(labelCantSenial);

        }

        function renumerarFilas() {
            const filas = tbody?.querySelectorAll("tr") ?? [];
            filas.forEach((fila, i) => {
                const label = fila.querySelector("td:first-child label");
                if (label) {
                    label.innerText = (i + 1).toString().padStart(2, '0');
                }
            });
        }

    });

}


/* ------------------------- MEMORIA ------------------------- */

function writeMemo() {
    UI.memoriaCont.innerHTML = proyectoActual.Memoria;
}

function crearMemoria() {

    if (!UI.memoriaCont) return console.error("No se encontró el contenedor para la memoria");

    UI.memoriaCont.innerHTML = "";

    const introDivBloque = document.createElement("div");
    UI.memoriaCont.appendChild(introDivBloque);
    introDivBloque.classList.add("bloque-memoria");

    const introTitulo = document.createElement("h2");
    introDivBloque.appendChild(introTitulo);
    introTitulo.textContent = "Introducción";

    const categorias = ["Presentación", "Estrategias", "Comunicaciones", "Programación", "Conclusión"];
    Intro.forEach((categ, indexCat) => {

        console.log('parrafo', indexCat);

        const introSubtitulo = document.createElement("h3");
        introDivBloque.appendChild(introSubtitulo);
        introSubtitulo.textContent = categorias[indexCat];

        const introTexto = document.createElement("p");
        introDivBloque.appendChild(introTexto);
        // seleccionar un parrafo al azar
        const idx = Math.floor(Math.random() * categ.length);
        introTexto.textContent = categ[idx];

    });

    // 3 lineas de separacion
    for (let i = 0; i < 3; i++) {
        UI.memoriaCont.appendChild(document.createElement("br"));
    }

    // Recorremos los bloques del estudio
    proyectoActual.Estudio.forEach(bloque => {

        if (!Narrativa[bloque.Nombre]) return; // sin narrativa, no genera nada

        const divBloque = document.createElement("div");
        UI.memoriaCont.appendChild(divBloque);
        divBloque.classList.add("bloque-memoria");

        const titulo = document.createElement("h2");
        divBloque.appendChild(titulo);
        titulo.textContent = bloque.NombreUsuario || bloque.Nombre;


        partesNarrativa.forEach(seccionNombre => {

            const seccion = Narrativa[bloque.Nombre][seccionNombre];
            if (!seccion) return; // si no existe, la salta

            const subtitulo = document.createElement("h3");
            subtitulo.textContent = seccionNombre;
            divBloque.appendChild(subtitulo);

            const listado = document.createElement("ul");
            divBloque.appendChild(listado);

            const seccionArray = Array.isArray(seccion) ? seccion : [seccion];

            seccionArray.forEach(texto => {
                const textoPuntoListado = interpretarNarrativa(texto, bloque).trim();
                if (textoPuntoListado !== "") {
                    const puntoListado = document.createElement("li");
                    puntoListado.innerHTML = textoPuntoListado;
                    listado.appendChild(puntoListado);
                }
            });
        });

        // 3 lineas de separacion
        for (let i = 0; i < 3; i++) {
            UI.memoriaCont.appendChild(document.createElement("br"));
        }

    });

    guardaCambiosMemoria();

}

function interpretarNarrativa(texto, bloque) {

    if (!texto) return "";

    // 1 Condicional: {{ ... }}{Ref} → Muestra solo si el elemento Ref está "checked"
    texto = texto.replace(/\{\{(.*?)\}\}\{(.*?)\}/g, (match, contenido, ref) => {
        const elem = bloque.Elementos.find(e => e.Ref === ref);
        return (elem && elem.Checked) ? contenido : "";
    });

    // 2 Condicional por cantidad > 1: [[ ... ]]{Ref}
    texto = texto.replace(/\[\[(.*?)\]\]\{(.*?)\}/g, (match, contenido, ref) => {
        const elem = bloque.Elementos.find(e => e.Ref === ref);
        return (elem && elem.Cantidad > 1) ? contenido : "";
    });

    // 3 Multiples checks <opcion1 / opcion2>
    texto = texto.replace(/<(.*?)>/g, (match, opciones) => {
        if (opciones.includes("|")) {
            const opts = opciones.split("|").map(o => o.trim());
            const checkboxes = opts.map(o => {
                const checked = o.startsWith("+");
                const label = o.replace(/^\+/, "").trim();
                return `<br><input type="checkbox" onchange="guardaCambiosMemoria()" ${checked ? "checked" : ""}><label class="narrativa-checkbox">${label}</label>`;
            }).join("\n");
            return `<span class="narrativa-checkbox-group">${checkboxes}</span>`;
        }
        return match;
    });

    // 4 Propiedad de un elemento: [{Propiedad}]{Ref}
    texto = texto.replace(/\[\{(.*?)\}\]\{(.*?)\}/g, (match, prop, ref) => {
        const elem = bloque.Elementos.find(e => e.Ref === ref) || (ref === "MainBloc" ? bloque : null);
        if (!elem) return "";

        // Si la propiedad es "Opcion", se devuelve el nombre de la opción seleccionada
        if (prop === "Opcion" && elem.Opciones && elem.Opciones.length > 0) {
            const seleccion = elem.Opciones[elem.Opcion] || {};
            return seleccion.Nombre || "";
        }

        // Caso general
        return (elem && prop in elem) ? elem[prop] : "";
    });

    // 5 Selección por cantidad: [opcion1 / opcion2]{Ref}
    texto = texto.replace(/\[(?=[^[\]]*\/)(.*?)\/(.*?)\]\{(.*?)\}/g, (match, singular, plural, ref) => {
        const elem = bloque.Elementos.find(e => e.Ref === ref);
        const cantidad = elem ? (elem.Cantidad || 0) : 0;
        return cantidad > 1 ? plural : singular;
    });

    // 6 Selector editable por el usuario: [op1 | op2 | op3]
    texto = texto.replace(/\[(?=[^[\]]*\|)(.*?)\]/g, (match, opciones) => {
        if (opciones.includes("|")) {
            const opts = opciones.split("|").map(o => o.trim());
            const select = `<select class="narrativa-select" onchange="guardaCambiosMemoria()">${opts.map(o => `<option>${o}</option>`).join("")}</select>`;
            return select;
        }
        return match; // se deja intacto si no contiene "|"
    });

    // 7 Limpieza de referencias sueltas: {...}
    texto = texto.replace(/\{.*?\}/g, "");

    // 8 Eliminar abreviaturas
    texto = texto
        .replace(/\bTemp /g, "Temperatura ")
        .replace(/\bTemp, /g, "Temperatura, ")
        .replace(/\bHum /g, "Humedad ")
        .replace(/\bCO2\b/gi, "CO<sub>2</sub>");

    return texto.trim();

}

function guardaCambiosMemoria() {

    UI.memoriaCont.querySelectorAll("input[type=checkbox]").forEach(chk => {
        chk.checked
            ? chk.setAttribute("checked", "checked")
            : chk.removeAttribute("checked");
    });

    UI.memoriaCont.querySelectorAll("select").forEach(sel => {
        sel.querySelectorAll("option").forEach(opt => {
            opt.selected
                ? opt.setAttribute("selected", "selected")
                : opt.removeAttribute("selected");
        });
    });

    proyectoActual.Memoria = UI.memoriaCont.innerHTML;
    proyectoNoGuardado();

}

/* ------------------------- AUXILIARES ------------------------- */
function inputNombre(texto) {
    const nameInput = document.createElement("input");
    nameInput.classList.add("w3-input", "w3-margin-right", "nobackground");
    nameInput.value = texto;
    return nameInput;
}

function inputNumero(valorDef = 1) {
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.value = valorDef;
    numberInput.min = 1; // evita números negativos o cero si no son deseados
    numberInput.step = 1; // solo números enteros
    numberInput.className = "w3-input w3-margin-right nobackground";
    numberInput.style.display = "inline-block";
    numberInput.addEventListener("input", () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    });
    numberInput.addEventListener("change", () => {
        if (numberInput.value === "") numberInput.value = 1;
        if (numberInput.value * 1 < numberInput.min * 1) numberInput.value = numberInput.min;
    });

    return numberInput;
}

function proyectoNoGuardado() {
    proyectoActual.Guardado = false;
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
}

function muestraProyecto() {

    // escribir secciones del proyecto en el DOM
    writeBlocks();
    writeSignals();
    writeMemo();

    // activar seccion visible en el DOM
    if (proyectoActual.Viendo === "estudio") UI.estudioMostrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    if (proyectoActual.Viendo === "listado") UI.listadoMostrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    if (proyectoActual.Viendo === "memoria") UI.memoriaMostrarBtn.dispatchEvent(new Event('click', { bubbles: true }));

    // mostrar proyecto en el DOM
    UI.portada.classList.add("w3-hide");
    UI.proyecto.classList.remove("w3-hide");

}

/**
 * Mueve un elemento dentro de un array de una posición a otra.
 *
 * @param {Array} array - El array que contiene el elemento a mover.
 * @param {number} fromIndex - Índice actual del elemento que se va a mover.
 * @param {number} toIndex - Nuevo índice donde se insertará el elemento.
 *
 * @returns {void} Modifica el array original en lugar de crear uno nuevo.
 *
 * @example
 * const arr = ['a', 'b', 'c', 'd'];
 * moverElemento(arr, 1, 3);
 * console.log(arr); // ['a', 'c', 'd', 'b']
 */
function moverElemento(array, fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= array.length) return; // fuera de rango
    const [item] = array.splice(fromIndex, 1);
    array.splice(toIndex, 0, item);
}


