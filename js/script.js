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
    Listado: Object.fromEntries(signalTypes.map(key => [key, []])),
    Asignacion: [],
}

/* ------------------------- EJECUCIONES INICIALES ------------------------- */
if (location.hostname === "arcsl.github.io") {
    window.location.replace("https://easypoint.arcsl.com");
}
document.title = "Easy Point";
escuchadores();


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

    actualizaSumatorio();

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

        const tables = proyectoPie.querySelectorAll("table");
        tables.forEach((table, indexTable) => {
            const rows = table.querySelectorAll("tbody tr");
            rows.forEach(row => {
                totalesSeniales[signalTypes[indexTable]] += Number(row.Numero);
            });
        });
    }

    signalTypes.forEach(sig => {
        const cell = UI.proyectoPie.querySelector(`td.${sig}`);
        cell.textContent = totalesSeniales[sig];
    });

}


/* ------------------------- LISTADO SEÑALES ------------------------- */

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

    signalTypes.forEach((signalType, signalIndex) => {

        const listaSeniales = proyectoActual?.Listado?.[signalType];

        const table = document.createElement('table');
        UI.listadoCont.appendChild(table);
        table.classList.add("w3-table", "w3-bordered", "w3-margin-bottom");

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
        labelTitulo.innerText = signalTexts[signalIndex];
        celda.appendChild(labelTitulo);

        addSenial.textContent = "✚";
        addSenial.classList = "w3-button w3-green";

        addSenial.addEventListener('click', () => {
            const listaSenial = esq[`Vacio${signalType}_1`]();
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

    actualizaSumatorio();

}


/* ------------------------- MEMORIA ------------------------- */

function crearMemoria() {

    const divMemoria = document.getElementById("memoria");
    if (!divMemoria) return console.error("No se encontró el contenedor #memoria");

    divMemoria.innerHTML = "";

    // Recorremos los bloques del estudio
    proyectoActual.Estudio.forEach(bloque => {

        if (!Narrativa[bloque.Nombre]) return; // sin narrativa, no genera nada

        const divBloque = document.createElement("div");
        divBloque.classList.add("bloque-memoria");

        const titulo = document.createElement("h2");
        titulo.textContent = bloque.NombreUsuario || bloque.Nombre;
        divBloque.appendChild(titulo);


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
        divMemoria.appendChild(divBloque);
    });
    generarMemoriaDOCX();
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
                return `<br><label class="narrativa-checkbox"><input type="checkbox" ${checked ? "checked" : ""}>${label}</label>`;
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
            const select = `<select class="narrativa-select">${opts.map(o => `<option>${o}</option>`).join("")}</select>`;
            return select;
        }
        return match; // se deja intacto si no contiene "|"
    });

    // 7 Limpieza de referencias sueltas: {...}
    texto = texto.replace(/\{.*?\}/g, "");

    // 8 Eliminar abreviaturas
    texto = texto
        .replace(/\bTemp /g, "Temperatura ")
        .replace(/\bHum /g, "Humedad ")
        .replace(/\bCO2\b/gi, "CO<sub>2</sub>");

    return texto.trim();

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

function nomPropio(texto) {
    return texto[1].toUpperCase() + texto.slice(1);
}













function escuchadores() {

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
        UI.portada.classList.add("w3-hide");
        UI.portadaAbrProyecBtn.dispatchEvent(new Event('click', { bubbles: true }));
        portadaSelProyecSelect.value = nombreProyectoActual;

        // retomar el nombre provisional del proyecto por si el usuario lo estaba cambiando
        UI.proyectoInputNombre.value = localStorage.getItem('nuevoNombreProyecto') || nombreProyectoActual;
        UI.proyectoInputNombre.dispatchEvent(new Event('input', { bubbles: true }));

        // mostrar proyecto en el DOM
        writeBlocks();
        writeSignals();
        UI.proyecto.classList.remove("w3-hide");

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

        //crear los bloques del proyecto
        writeBlocks();
        writeSignals();
        UI.portada.classList.add("w3-hide");
        UI.proyecto.classList.remove("w3-hide");

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
        UI.overlay.classList.remove("w3-hide");
        UI.overlayPopExport.classList.remove("w3-hide");
    });
    // (azul seccion) cambiar de seccion en el estudio
    UI.proyectoSeccionBtn.addEventListener("click", () => {
        UI.proyecto.setAttribute('inert', ''); // bloquea el resto de inputs y botones
        UI.overlay.classList.remove("w3-hide");
        UI.overlayPopSeccion.classList.remove("w3-hide");
    });
    // (verde añadir) añadir el bloque seleccionado
    UI.sectionToolsBtn.addEventListener("click", () => {
        const bloque = structuredClone(blocksData[UI.sectionToolsSelect.value]);
        if (!bloque) return;
        bloque.id = crypto.randomUUID();
        proyectoActual.Estudio.push(bloque);
        addBlock(bloque);
        disableFirstAndLastMoveBlockButtons();
        proyectoNoGuardado();
    });


    /* ---------- EVENTOS ESTUDIO DE PUNTOS ---------- */

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


    /* ---------- BOTONES LISTADO DE PUNTOS ---------- */

    // ( verde generar ) generar el listado de señales borrando todo lo anterior
    // listadoGenerarBtn.addEventListener("click", () => {

    //     if (Object.values(proyectoActual.Listado).some(arr => arr.length > 0)) {
    //         if (!confirm("Se borraran todas las señales actuales.\n¿Desea continuar?")) return;
    //     }

    //     asignarValoresListado();
    //     writeSignals();

    // });


    /* ---------- BOTONES VENTANA POPUP EXPORTAR ---------- */

    // (morado PDF) Generar informe PDF y ocultar la interfaz.
    UI.expPDFBtn.addEventListener("click", () => {
        crearPDF(UI.overlayPopExport.seccion);
        UI.popExportCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    });
    // (morado CSV) Generar listado en CSV y ocultar la interfaz.
    UI.expCSVBtn.addEventListener("click", () => {
        crearCSV(UI.overlayPopExport.seccion);
        UI.popExportCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    });
    // (rojo aspa) ocultar la interfaz y no hacer nada.
    UI.expCerrarBtn.addEventListener("click", () => {
        UI.proyecto.removeAttribute('inert');
        UI.overlay.classList.add("w3-hide");
        UI.overlayPopExport.classList.add("w3-hide");
    });


    /* ---------- BOTONES VENTANA POPUP DOCUMENTACION ---------- */

    // (azul estudio) pasar al creador de memoria de control
    UI.estudioMostrarBtn.addEventListener("click", () => {
        UI.proyectoSeccionBtn.querySelector("img").src = "./images/estudio.svg";
        UI.estudioMostrarBtn.classList.add("w3-hide");
        UI.memoriaMostrarBtn.classList.remove("w3-hide");
        UI.listadoMostrarBtn.classList.remove("w3-hide");
        UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    });
    // (azul memoria) pasar al creador de memoria de control
    UI.memoriaMostrarBtn.addEventListener("click", () => {
        UI.proyectoSeccionBtn.querySelector("img").src = "./images/book.svg";
        UI.estudioMostrarBtn.classList.remove("w3-hide");
        UI.memoriaMostrarBtn.classList.add("w3-hide");
        UI.listadoMostrarBtn.classList.remove("w3-hide");
        UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    });
    // (azul listado) pasar al creador de listado de señales
    UI.listadoMostrarBtn.addEventListener("click", () => {
        UI.proyectoSeccionBtn.querySelector("img").src = "./images/listado.svg";
        UI.estudioMostrarBtn.classList.remove("w3-hide");
        UI.memoriaMostrarBtn.classList.remove("w3-hide");
        UI.listadoMostrarBtn.classList.add("w3-hide");
        UI.crearCerrarBtn.dispatchEvent(new Event('click', { bubbles: true }));
    });
    // (rojo aspa) ocultar la interfaz y no hacer nada.
    UI.crearCerrarBtn.addEventListener("click", () => {
        UI.proyecto.removeAttribute('inert');
        UI.overlay.classList.add("w3-hide");
        UI.overlayPopSeccion.classList.add("w3-hide");
    });

}

















/* ------------------------- GLOBALES ------------------------- */
const colorCabeceraTablasPDF = "#ddfaff"
const easyPie = {
    text: 'Easy Point V2.0',
    link: 'https://easypoint.arcsl.com',
    color: 'blue',
    decoration: 'underline'
}


/* ------------------------- FUNCIONES ------------------------- */
function crearPDF() {

    const docPDF = docPDFDef(nombreProyectoActual, proyectoActual.Viendo); // creamos el objeto principal con la estructura para pasarselo a PDFmake

    let tables = [];            // coleccion de tablas a iterar en funcion a la seccion elegida
    let tilulosColumnas = [];    // titulos de cabecera de cada columna

    if (proyectoActual.Viendo === "estudio") {
        tilulosColumnas = ["", "", ...signalTypes];
        tables = estudioBloqCont.querySelectorAll("table");

    } else if (proyectoActual.Viendo === "listado") {
        tilulosColumnas = ["", "", "Num."];
        tables = listado.querySelectorAll("table");

    } else {
        alert("❌ Error: no se pudo generar el PDF");
        console.error("Sección desconocida:", proyectoActual.Viendo);
        return;
    }

    tables.forEach(table => {

        let tituloTabla = "";

        if (proyectoActual.Viendo === "estudio") {
            const cabeceraInputs = table.querySelectorAll('thead th input');
            const nombreBloque = cabeceraInputs[0]?.value || "Tabla";
            const cantidadBloque = Number(cabeceraInputs[1]?.value) || 1;
            tituloTabla = cantidadBloque > 1 ? `${nombreBloque} (x${cantidadBloque})` : nombreBloque;

        } else if (proyectoActual.Viendo === "listado") {
            tituloTabla = table.querySelector('thead th label')?.textContent || "Tabla";
        }

        const tablaPDF = tablaPDFdef(tituloTabla, [...tilulosColumnas]); // creamos el objeto tabla 

        table.querySelectorAll("tbody tr").forEach((linea, indexLinea) => {

            const filasPDF = filasPDFdef(tilulosColumnas.length); // creamos el objeto filas 

            if (proyectoActual.Viendo === "estudio") {

                const checkbox = linea.querySelector('input[type="checkbox"]');
                if (!checkbox || !checkbox.checked) return;

                const numeroSenial = linea.querySelector('[name="numeroSenial"]')?.value || "";
                const nombreSenial = linea.querySelector('[name="nombreSenial"]')?.value || "";
                const opcionSenial = linea.querySelector('[name="opcionSenial"]');

                const opcionTexto = opcionSenial?.options[opcionSenial.selectedIndex]?.text || "";

                const textoCeldaNombre = opcionTexto
                    ? `${nombreSenial} ( ${opcionTexto} )`
                    : nombreSenial;

                const celdaNombre = { text: textoCeldaNombre, alignment: 'left' };

                let numeroSeñales = signalTypes.map(sig => linea.querySelector(`.${sig}`)?.textContent || "");

                filasPDF.table.body.push([...[numeroSenial, celdaNombre, ...numeroSeñales]]); // añadimos la fila al objeto filas

            } else if (proyectoActual.Viendo === "listado") {
                const nombreSenial = linea.querySelector('td:nth-child(2) input:nth-of-type(2)').value;                // segundo input dentro del segundo td
                const cantidadSenial = linea.Numero;
                filasPDF.table.body.push([...[indexLinea + 1, { text: nombreSenial, alignment: 'left' }, cantidadSenial]]); // añadimos la fila al objeto filas

            }

            tablaPDF.stack.push(filasPDF); // añadimos el objeto filas al objeto tabla

        });

        docPDF.content.push(tablaPDF); // añadimos el objeto tabla al objeto documento

    });

    // --- Fila de totales ---

    // elejimos la seccion en la que leer los totales
    const totalRow = proyectoActual.Viendo === "estudio"
        ? UI.proyectoPie.querySelector("table tbody tr")
        : UI.proyectoPie.querySelector("table tbody tr");

    // montamos el array con el total de cada señal
    let numeroTotalSeñales = [];
    signalTypes.forEach(sig => {
        const celdaSenial = totalRow.querySelector(`.${sig}`);
        numeroTotalSeñales.push(celdaSenial?.textContent || "");
    });

    const tablaTotalesPDF = tablaPDFdef("Totales", ["", "", ...signalTypes]); // creamos el objeto tabla con la cabecera de los tipos de señal
    tablaTotalesPDF.stack[0].table.body.push(                           // añadimos a la tabla el objeto representando la fila con el total de cada tipo de señal
        [
            {
                text: "",
                fontSize: 12,
                colSpan: 2,
            },
            {}, // celda vacia para el colspan
            ...numeroTotalSeñales.map(numero => ({
                text: numero,
                alignment: 'center', // ← corregido
                margin: [-8, 4, 0, 4],
            })),
        ],
    );

    docPDF.content.push(tablaTotalesPDF); // añadimos el objeto tablaTotalesPDF al objeto documento
    pdfMake.createPdf(docPDF).download(`${nombreProyectoActual} - ${proyectoActual.Viendo}.pdf`);     // Generar el PDF final

}


// portada del documento y estilo general
function docPDFDef(proyecto, seccion) {
    return {
        // Portada
        content: [
            {
                text: proyecto,
                style: 'header',
                margin: [0, 200, 0, 20],
                alignment: 'center'
            },
            {
                text: `${seccion.charAt(0).toUpperCase() + seccion.slice(1).toLowerCase()} de puntos de control`,
                style: 'subheader',
                alignment: 'center'
            },
            {
                text: 'Fecha creacion: ' + new Date().toLocaleDateString(),
                margin: [0, 20, 0, 0],
                alignment: 'center'
            },
            {
                pageBreak: 'before',
                text: null,
            },
        ],
        defaultStyle: {
            color: '#003366',
            fontSize: 11,
        },
        styles: {
            header: {
                fontSize: 24,
                bold: true,
            },
            subheader: {
                fontSize: 18,
                italics: true,
            },
        },
        header: function (currentPage, pageCount) {
            if (currentPage === 1) return ''; // sin cabecera en portada
            return {
                margin: [40, 20, 40, 10],
                stack: [
                    { text: nombreProyectoActual, fontSize: 10, bold: true, alignment: 'right', margin: [0, 5, 0, 0] },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5 }] },
                ]
            };
        },
        footer: function (currentPage, pageCount) {
            if (currentPage === 1) {
                return {
                    columns: [
                        { text: '', alignment: 'left', },
                        {
                            text: ['Creado con: ', easyPie],
                            alignment: 'right',
                            fontSize: 8,
                            margin: [0, 0, 40, 0],
                        }
                    ]
                };
            }
            return {
                margin: [40, 10, 40, 20],
                stack: [
                    {
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5 }],
                        margin: [0, 0, 0, 5],
                    },
                    {
                        columns: [
                            { fontSize: 8, alignment: 'left', margin: [0, 0, 40, 0], text: [easyPie], },
                            { fontSize: 8, alignment: 'center', margin: [0, 0, 0, 0], text: `${currentPage - 1} de ${pageCount - 1}`, },
                            { fontSize: 8, alignment: 'right', margin: [0, 0, 0, 0], text: new Date().toLocaleDateString(), },
                        ]
                    }
                ]
            };
        },
        pageMargins: [40, 60, 40, 60]
    };
}

/**
 * Genera un bloque de tabla para PDF con un título y subtítulos (columnas de señales).
 * @param {string} titulo - El texto que se mostrará como título de la tabla.
 * @param {string[]} subtitulos - Array de subtítulos (por ejemplo nombres de señales) que se mostrarán en la primera fila.
 * @returns {object} Objeto de definición de tabla para pdfMake, con formato y estilos aplicados.
 */
function tablaPDFdef(titulo, subtitulos) {

    // la tablaPDF es un stack indibisible compuesto por 2 tablas:
    // - titulo y subtitulos (de las columnas a la derecha)
    // - el resto de filas que es el listado de señales

    return {
        unbreakable: true,
        stack: [
            {
                table: {
                    widths: [28, '*', ...Array(subtitulos.length - 2).fill(28)],
                    body: [
                        [
                            {
                                text: titulo,
                                fontSize: 16,
                                bold: true,
                                margin: [10, 5, 0, 0],
                                colSpan: 2,
                            },
                            {}, // celda vacia para el colspan
                            ...subtitulos.slice(2).map(sub => ({
                                text: sub,
                                alignment: 'center', // ← corregido
                                margin: [-8, 12, 0, 0],
                            })),
                        ],
                    ]
                },
                layout: {

                    // lineas verticales no
                    vLineWidth: function (i, node) { return 0; },
                    vLineColor: function (i, node) { return null; },

                    // Línea horizontal bajo la fila 1
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                        return (i === 1) ? '#AAA' : null;
                    },
                },
                fillColor: colorCabeceraTablasPDF,
            },

        ],
        margin: [10, 0, 10, 50],
    }
}

function filasPDFdef(numeroColumnas) {
    return {
        table: {
            widths: [28, '*', ...Array(numeroColumnas - 2).fill(28)],
            body: [],
        },
        alignment: 'center',
        layout: {

            // lineas verticales a partir de la columna 2
            vLineWidth: function (i, node) { return (i >= 2) ? 1 : 0; },
            vLineColor: function (i, node) { return (i >= 2) ? '#AAA' : null; },

            // Línea horizontal no
            hLineWidth: function (i, node) { return 0; },
            hLineColor: function (i, node) { return null; },

            // separacion lateral
            // paddingLeft: function (i, node) { return 14; },
            // paddingRight: function (i, node) { return 14; },
        },
    };
}






























async function generarMemoriaDOCX() {
    const {
        Document, Paragraph, TextRun, HeadingLevel,
        AlignmentType, Packer, Header, Footer,
        PageBreak, TableOfContents
    } = docx;

    const mainColor = "#003366"; // color corporativo (igual que en PDF)
    const lineColor = "#AAAAAA";
    const now = new Date().toLocaleDateString();
    const proyecto = window.nombreProyectoActual || "Proyecto sin título";

    /* ---------------- PORTADA ---------------- */
    const portada = [
        new Paragraph({
            text: proyecto,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: "Memoria Técnica",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: `Fecha de creación: ${now}`,
            alignment: AlignmentType.CENTER,
            spacing: { before: 200 },
        }),
    ];

    /* ---------------- CABECERA Y PIE ---------------- */
    const header = new Header({
        children: [
            new Paragraph({
                children: [new TextRun({ text: proyecto, bold: true, color: mainColor, size: 20 })],
                alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
                borderBottom: { color: lineColor, space: 1, size: 6 },
            }),
        ],
    });

    const footer = new Footer({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Creado con Easy Point V2.0  ·  https://easypoint.arcsl.com",
                        color: "#777777",
                        size: 18,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: now,
                        color: "#777777",
                        size: 18,
                    }),
                ],
                alignment: AlignmentType.RIGHT,
            }),
        ],
    });

    /* ---------------- DOCUMENTO BASE ---------------- */
    const doc = new Document({
        creator: "Easy Point V2.0",
        description: "Memoria de crontrol",
        title: proyecto,
        styles: {
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    run: { font: "Arial", size: 22, color: mainColor },
                    paragraph: { spacing: { line: 276 } },
                },
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    run: { size: 32, bold: true, color: mainColor },
                    paragraph: { spacing: { before: 300, after: 200 } },
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    run: { size: 26, bold: true, color: mainColor },
                    paragraph: { spacing: { before: 150, after: 100 } },
                },
            ],
        },
        sections: [
            {
                // Portada centrada vertical y horizontalmente
                properties: {
                    page: {
                        margin: { top: 6000, bottom: 1000, left: 1200, right: 1200 },
                    },
                },
                children: portada,
            },
            {
                properties: {
                    page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } }
                },
                children: [
                    new Paragraph({
                        text: "ÍNDICE",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 },
                    }),
                    new Paragraph({
                        children: [new TableOfContents("Sumario", { hyperlink: true })],
                    }),
                ],
            },
        ],
    });

    /* ---------------- CONTENIDO DESDE HTML ---------------- */
    const memoria = document.getElementById("memoria");
    if (!memoria) return alert("No se encontró el contenedor #memoria");
    const bloques = memoria.querySelectorAll(".bloque-memoria");
    const contenidoBloques = [];
    bloques.forEach((bloque, i) => {
        const children = [];

        // Título principal del bloque
        const h2 = bloque.querySelector("h2")?.textContent || "Sin título";
        children.push(new Paragraph({
            text: h2,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
            pageBreakBefore: i > 0, // salto solo a partir del segundo bloque
        }));

        // Subtítulos y párrafos
        bloque.querySelectorAll("h3").forEach(h3 => {
            children.push(new Paragraph({
                text: h3.textContent,
                heading: HeadingLevel.HEADING_2,
            }));

            const siguiente = h3.nextElementSibling;
            if (siguiente && siguiente.tagName === "UL") {
                siguiente.querySelectorAll("li").forEach(li => {
                    children.push(new Paragraph({
                        text: li.textContent.trim(),
                        spacing: { before: 50, after: 50 },
                        indent: { left: 600 },
                    }));
                });
            }
        });

        contenidoBloques.push(...children);
    });

    doc.addSection({
        headers: { default: header },
        footers: { default: footer },
        children: contenidoBloques,
    });

    /* ---------------- DESCARGA ---------------- */
    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${proyecto} - Memoria.docx`;
    link.click();
    URL.revokeObjectURL(link.href);
}


/* crear HTML directamente abrible con word. 
 * La estetica no se parece a la generada por pdfMake,
 * No admite encabezados o pies de pagina
 * no dependemos de librerias
function descargarDoc() {
    // 1 Clonar el contenido de la memoria para no alterar el original
    const memoria = document.getElementById("memoria");
    if (!memoria) return alert("No se encontró el contenido de memoria.");

    const clone = memoria.cloneNode(true);

    // 2 Procesar selects → convertirlos en texto plano
    clone.querySelectorAll("select").forEach(sel => {
        const selected = sel.options[sel.selectedIndex]?.textContent || "";
        sel.replaceWith(document.createTextNode(selected));
    });

    // 3 Procesar checkboxes → dejar solo los seleccionados
    clone.querySelectorAll(".narrativa-checkbox-group").forEach(group => {
        const selectedLabels = Array.from(group.querySelectorAll("input[type='checkbox']:checked"))
            .map(input => input.parentElement.textContent.trim());
        if (selectedLabels.length) {
            const txt = selectedLabels.join(", ");
            group.replaceWith(document.createTextNode(txt));
        } else {
            group.remove(); // Si no hay ninguno seleccionado, eliminamos el bloque
        }
    });

    // 4 Eliminar etiquetas vacías o residuales
    clone.querySelectorAll("label, span").forEach(el => {
        if (!el.textContent.trim()) el.remove();
    });

    // 5 Armar el HTML final con estilos
    const contenido = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Memoria Técnica</title>
        <style>
          body {
              font-family: "Segoe UI", Arial, sans-serif;
              background-color: #fdfdfd;
              color: #333;
              margin: 2em;
              line-height: 1.5;
          }

          h1, h2, h3 {
              color: #005fa3;
          }

          h2 {
              border-bottom: 2px solid #0078D7;
              padding-bottom: 4px;
              margin-top: 30px;
          }

          ul {
              list-style: none;
              padding-left: 0;
          }

          li::before {
              content: "• ";
              color: #0078D7;
          }

          .bloque-memoria {
              margin-bottom: 2em;
              padding: 1em 1.5em;
              border-radius: 8px;
              background: #ffffff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          footer {
              text-align: center;
              font-size: 0.8em;
              color: #888;
              margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <h1 style="text-align:center;">Memoria Técnica de Instalación</h1>
        <main>
          ${clone.innerHTML}
        </main>
        <footer>Documento generado automáticamente</footer>
      </body>
      </html>
    `;

    // 6 Crear y descargar el archivo
    const blob = new Blob(['\ufeff', contenido], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Memoria_Tecnica.doc";
    document.body.appendChild(link);
    link.click();

    // 7 Limpieza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
*/




































function crearCSV(seccion) {

    let lineasCSV = [];

    if (seccion === "listado") {

        const nodosTablas = listado.querySelectorAll("table");

        nodosTablas.forEach(tabla => {

            // Buscar filas en thead            
            const label = tabla.querySelector("thead tr th label");

            lineasCSV.push(label.textContent.trim());

            // Buscar filas en tbody
            const filas = tabla.querySelectorAll("tbody tr");
            filas.forEach(fila => {
                const listaCeldas = fila.querySelectorAll("td, th"); // primera celda de la fila
                if (listaCeldas) {
                    if (listaCeldas.length > 1) {
                        const inputs = listaCeldas[1].querySelectorAll("input");
                        if (inputs) {
                            if (inputs.length > 1) {
                                lineasCSV.push(";" + inputs[1].value.trim() + ";" + inputs[2].value.trim() + ";" + fila.Numero);
                            }
                        }
                    }
                }
            });

            lineasCSV.push("");
        });
    }

    if (seccion === "estudio") {

        const nodosTablas = UI.estudioCont.querySelectorAll("table");
        nodosTablas.forEach(tabla => {

            // Obtener nombre del bloque y cantidad
            const nombreYcantidadBloque = tabla.querySelectorAll("thead tr th input");
            const nombreBloque = nombreYcantidadBloque[0].value
            const cantidadBloque = Number(nombreYcantidadBloque[1].value);
            const nombresBloquesProcesados = procesaNombres("", 1, nombreBloque, cantidadBloque);

            // Buscar filas en tbody para componer el listado de elementos del bloque
            let elemsBloque = [];

            const filas = tabla.querySelectorAll("tbody tr");
            filas.forEach(fila => {

                const nombreYcantidadElemento = fila.querySelectorAll("input");
                if (nombreYcantidadElemento.length > 0) {
                    if (nombreYcantidadElemento[0].checked) {

                        const nombreElemento = nombreYcantidadElemento[1].value
                        const cantidadElemento = Number(nombreYcantidadElemento[2].value);
                        const nombresElementosProcesados = procesaNombres("", 1, nombreElemento, cantidadElemento);

                        const numeroSeniales = fila.querySelectorAll("td");
                        const senialesEnTexto = Array.from(numeroSeniales)
                            .slice(1)                                               // excepto el primer td
                            .map(td => td.innerText === "-" ? "" : (Number(td.innerText) / cantidadElemento) / cantidadBloque)    // contenido de los td
                            .join(";")                                              // unidos por ;

                        nombresElementosProcesados.forEach(nombreProcesado => {
                            elemsBloque.push(nombreProcesado + ';;' + senialesEnTexto);
                        });
                    }
                }
            });

            // añadir el mismo bloque tantas veces como numero de bloques esten indicados, renombrando cada bloque
            nombresBloquesProcesados.forEach(nombreProcesado => {
                lineasCSV.push(nombreProcesado + ';;' + signalTypes.join(";"));
                lineasCSV.push(...elemsBloque);
                lineasCSV.push(...["", ""]); // dos lineas de separacion entre bloques
            });

        });

    }

    // Crear texto CSV
    const contenido = lineasCSV.join("\n");

    // Agregar BOM UTF-8 para Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + contenido], { type: "text/csv;charset=utf-8" });

    // Crear enlace temporal
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreProyectoActual + " - " + seccion[0].toUpperCase() + seccion.slice(1) + " señales.csv";
    enlace.click();

    // Liberar la URL
    URL.revokeObjectURL(enlace.href);

}