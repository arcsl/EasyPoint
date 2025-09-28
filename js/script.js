/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const portada = document.getElementById("portada");
const estudio = document.getElementById("estudio");

const portadaNueProyecBtn = document.getElementById("portadaNueProyecBtn");
const portadaImpProyecBtn = document.getElementById("portadaImpProyecBtn");
const portadaAbrProyecBtn = document.getElementById("portadaAbrProyecBtn");
const portadaImpProyecInput = document.getElementById("portadaImpProyecInput");

const portadaNueProyecCont = document.getElementById("portadaNueProyecCont");
const portadaNueProyecCancel = document.getElementById("portadaNueProyecCancel");
const portadaNueProyecInput = document.getElementById("portadaNueProyecInput");
const portadaNueProyecMsg = document.getElementById("portadaNueProyecMsg");

const portadaSelProyecCont = document.getElementById("portadaSelProyecCont");
const portadaSelProyecCancel = document.getElementById("portadaSelProyecCancel");
const portadaSelProyecSelect = document.getElementById("portadaSelProyecSelect");

const estudioBotonera = document.getElementById("estudioBotonera");
const estudioNombProyecInput = document.getElementById("estudioNombProyecInput");
const estudioCabeceraSeniales = document.getElementById("estudioCabeceraSeniales");
const estudioBloqCont = document.getElementById("estudioBloqCont");
const estudioBloqSelect = document.getElementById("estudioBloqSelect");
const estudioSumarioCont = document.getElementById("estudioSumarioCont");

const overlay = document.getElementById("overlay");
const customPop = document.getElementById("customPop");
const popLabelTR = document.getElementById("popLabelTR");
const popInputTR = document.getElementById("popInputTR");
const popAceptar = document.getElementById("popAceptar");
const popCancel = document.getElementById("popCancel");


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;
let proyectosEasyPoint = JSON.parse(localStorage.getItem('proyectosEasyPoint')) || {};
let nombreProyectoActual = null;
let proyectoActual = null;
const blocksData = blocks();


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
    estudio.appendChild(notificacion);
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
    portadaAbrProyecBtn.disabled = portadaSelProyecSelect.options.length === 0;

}

function populateBlockSelect() {
    blocksData.forEach((block, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = block.Nombre;
        if (block.Elementos === null) option.disabled = true;
        estudioBloqSelect.appendChild(option);
    });
}

function populateCustomPop() {

    //componer tabla de ventana popup para introducir señales custom
    signalTypes.forEach((signal) => {

        // --- Fila de labels ---
        const tdLabel = document.createElement("td");
        popLabelTR.appendChild(tdLabel);

        const typeLabel = document.createElement("label");
        tdLabel.appendChild(typeLabel);

        typeLabel.className = "w3-input w3-center";
        typeLabel.textContent = signal;

        // --- Fila de inputs ---
        const tdInput = document.createElement("td");
        popInputTR.appendChild(tdInput);

        const numSeniales = inputNumero(0);
        tdInput.appendChild(numSeniales);

        numSeniales.value = 0;
        numSeniales.min = 0
        numSeniales.className = "w3-input w3-center";

    });

}

function populateCabeceraYPie() {

    // poblar cabecera de señales en estudio
    const estudioCabeceraSenialesTable = document.createElement("table");
    estudioCabeceraSenialesTable.classList = "w3-table w3-bordered";
    estudioCabeceraSeniales.appendChild(estudioCabeceraSenialesTable);
    estudioCabeceraSenialesTable.appendChild(totalHeader());

    // poblar pie con sumatorio de señales en estudio
    const estudioSumarioSenialesTable = document.createElement("table");
    estudioSumarioSenialesTable.classList = "w3-table w3-bordered w3-pale-green w3-margin-top w3-margin-bottom";
    estudioSumarioCont.appendChild(estudioSumarioSenialesTable);
    estudioSumarioSenialesTable.appendChild(totalHeader());
    estudioSumarioSenialesTable.appendChild(totalBody());
}

/* ------------------------- ESTUDIO ------------------------- */
function readBlocks() {

    let lectura = [];

    const tables = estudioBloqCont.querySelectorAll("table");

    tables.forEach(table => {

        const block = {
            bloque: {
                tipo: table.name,
                nombre: table.querySelector('[name="nombreBloque"]')?.value || "",
                cantidad: table.querySelector('[name="cantidadBloque"]')?.value || ""
            },
            seniales: {},
        };

        const bodyRows = table.querySelectorAll("tbody tr");

        bodyRows.forEach(row => {

            const checkbox = row.querySelector('input[type="checkbox"]');
            if (!checkbox || !checkbox.checked) return;

            const tipoSenial = row.name;
            block.seniales[tipoSenial] = {
                nombre: row.querySelector('[name="nombreSenial"]')?.value || "",
                cantidad: row.querySelector('[name="numeroSenial"]')?.value || "",
                opcion: tipoSenial.substring(0, 6) === 'custom'
                    ? row.opcion
                    : row.querySelector('[name="opcionSenial"]')?.value || "",
            };
        });

        lectura.push(block);
    });

    return lectura;

}

function writeBlocks() {

    estudioBloqCont.innerHTML = "";

    proyectoActual.forEach(addBlock);

    // proyectosEasyPoint[portadaSelProyecSelect.value].forEach(seccion => {

    //     estudioBloqSelect.value = seccion.bloque.tipo;  // movemos el selecotr de añadir bloques al bloque que queremos
    //     const table = addBlock();   // usamos la funcion de añadir bloque para crear un bloque del tipo seleccionado con los valores por defecto

    //     // ajustamos el nombre del bloque segun lo que hubiese guardado en el proyecto
    //     const nombreBloque = table.querySelector('[name="nombreBloque"]');
    //     if (nombreBloque) nombreBloque.value = seccion.bloque.nombre;

    //     // ajustamos la cantidad general del bloque segun lo que hubiese guardado en el proyecto
    //     const cantidadBloque = table.querySelector('[name="cantidadBloque"]');
    //     if (cantidadBloque) cantidadBloque.value = seccion.bloque.cantidad;

    //     // seleccionar el body de la tabla para añadir lineas custom
    //     const tBody = table.querySelector('tbody');
    //     for (const [name, value] of Object.entries(seccion.seniales)) {
    //         if (name.substring(0, 6) === "custom") {
    //             const customFila = addFilaBody(name, value.opcion, cantidadBloque);
    //             tBody.insertBefore(customFila, tBody.lastElementChild);
    //         }
    //     }

    //     // recorremos las filas del bloque
    //     const bodyRows = table.querySelectorAll("tbody tr");
    //     bodyRows.forEach((row, index) => {

    //         // seleccionamos los elementos de cada fila
    //         const checkbox = row.querySelector('input[type="checkbox"]');
    //         const nombreSenial = row.querySelector('[name="nombreSenial"]');
    //         const numeroSenial = row.querySelector('[name="numeroSenial"]');
    //         const opcionSenial = row.querySelector('[name="opcionSenial"]');

    //         // si es una linea custom, asignamos el placeholder al valor que tuviera guardado
    //         if (row.name?.substring(0, 6) === "custom") {
    //             nombreSenial.placeholder = seccion.seniales[row.name].nombre;
    //         }

    //         if (checkbox) {

    //             // marcamos el checkbox en funcion a lo que hubiese guardado en el proyecto
    //             checkbox.checked = seccion.seniales.hasOwnProperty(row.name);

    //             // si el check esta marcado rellenamos el resto de valores conforme a lo que hubiese guardado en el proyecto
    //             if (checkbox.checked) {
    //                 if (nombreSenial) nombreSenial.value = seccion.seniales[row.name].nombre;
    //                 if (numeroSenial) numeroSenial.value = seccion.seniales[row.name].cantidad;
    //                 if (opcionSenial) {
    //                     opcionSenial.value = seccion.seniales[row.name].opcion;
    //                     opcionSenial.dispatchEvent(new Event('change', { bubbles: true }));
    //                 }
    //             }

    //             // disparamos el cambio del check para el recalculo de señales
    //             checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    //         }
    //     });
    // });

    // reiniciamos selector de bloques de proyecto
    estudioBloqSelect.selectedIndex = 0;

    disableFirstAndLastMoveBlockButtons();

}


function moveBlock(bloque, tabla, direccion) {

    const tablas = Array.from(estudioBloqCont.children);
    const indice = tablas.indexOf(tabla);
    const indiceBloque = proyectoActual.indexOf(bloque);

    // si bloque no existe en el proyecto abortar
    if (indiceBloque === -1) return;

    // si el indice de bloque y de tabla no coinciden, abortar
    if (indice !== indiceBloque) return;

    // no deberia poder pasar por los botones deshabilitados, pero por si acaso    
    const nuevoIndice = indice + direccion;
    if (nuevoIndice < 0 || nuevoIndice >= tablas.length) return;

    // mover la tabla en el DOM
    estudioBloqCont.removeChild(tabla);
    if (direccion === -1) {
        estudioBloqCont.insertBefore(tabla, tablas[nuevoIndice]);
    } else {
        estudioBloqCont.insertBefore(tabla, tablas[nuevoIndice].nextSibling);
    }

    // mover el bloque en proyectoActual
    moverElemento(proyectoActual, indice, nuevoIndice);
    proyectoActual.guardado = false;
    localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

    // repasar botones de movimiento
    disableFirstAndLastMoveBlockButtons();

}

function disableFirstAndLastMoveBlockButtons() {

    const tablas = Array.from(estudioBloqCont.children);

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
    estudioBloqCont.appendChild(table);

    table.name = bloque.Nombre;
    table.className = "w3-table w3-bordered w3-margin-bottom";

    addBlockHeader(bloque, table);
    addBlockBody(bloque, table);

    updateSummary();

    estudioBloqSelect.focus();

}

function addBlockHeader(bloque, table) {

    // iniciar valores que fuede que no existan si es un bloque nuevo
    if (!bloque.NombreUsuario) bloque.NombreUsuario = bloque.Nombre;
    if (!bloque.Cantidad) bloque.Cantidad = 1;

    // crear y colocal los elementos del DOM
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

    // asifnar valores y dinamicas a los elementos del DOM
    nameInput.classList.add("nombreBloque");
    nameInput.name = "nombreBloque";
    nameInput.addEventListener('change', () => {
        bloque.NombreUsuario = nameInput.value;
        proyectoActual.guardado = false;
        localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
    });

    numberInput.classList.add("cantidadBloque");
    numberInput.name = "cantidadBloque";
    numberInput.addEventListener("change", () => {
        bloque.Cantidad = numberInput.value * 1;
        proyectoActual.guardado = false;
        localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
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
        proyectoActual.splice(proyectoActual.indexOf(bloque), 1);
        proyectoActual.guardado = false;
        localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));

        // eliminar la tabla
        table.remove();

        // actualizar botones mover y sumatorio
        disableFirstAndLastMoveBlockButtons();
        updateSummary();

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

    // multiplicador general del bloque
    const multipBloque = table.querySelector('[name="cantidadBloque"]');

    const tBody = document.createElement("tbody");
    table.appendChild(tBody);

    bloque.Elementos.forEach (elemento => {
        addFilaBody(elemento, tBody, multipBloque);
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
    addCustom.addEventListener('click', () => {

        // Asignar el bloque desde el que se dispara
        customPop.tablaOrigen = table;

        // Vaciar todos los inputs
        customPop.querySelectorAll('input').forEach(input => {
            input.value = 0;
        });

        // mostrar customPop centrado en pantalla
        estudio.setAttribute('inert', ''); // bloquea todos los inputs del fondo en estudio
        overlay.style.display = "block";
        customPop.style.top = (window.innerHeight - customPop.offsetWidth) / 2 + "px";
        customPop.style.left = (window.innerWidth - customPop.offsetWidth) / 2 + "px";
        customPop.querySelector('input').focus();

    });

}

function addFilaBody(elemento, tBody, multipBloque) {

    // iniciar valores que fuede que no existan si es un bloque nuevo
    if (!elemento.NombreUsuario) elemento.NombreUsuario = elemento.Nombre;

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


    
    row.name = elemento.Nombre;
    
    elimcustom.style.display = "none";
    
    checkbox.type = "checkbox"; 
   
    nameInput.type = "text";
    nameInput.name = "nombreSenial";

    // TODO: revisado hasta aqui

    /*    

    if (name.substring(0, 6) !== "custom") nameInput.placeholder = name;

    numberInput.name = "numeroSenial";

    numberInput.addEventListener("change", () => {
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    });


    let code = value;
    let select;
    let signalCounts;

    if (Array.isArray(value) && value !== null) { // procesar fila custom

        nameInput.value = "";       // no ponemos el texto "custom01" en el input
        row.opcion = value;         // almacenamos de señales para poder guardarlo luego enel json
        code = "";                  // vaciamos code para montar un code nuevo

        // generar code en funcion al array de señales custom
        for (let i = 0; i < signalTypes.length; i++) {
            for (let j = 0; j < value[i]; j++) {
                code += signalTypes[i];
            }
        }

        checkbox.checked = true;
        checkbox.style.display = "none";

        elimcustom.textContent = "X";
        elimcustom.className = "w3-red w3-button";
        elimcustom.style.display = "inline-block";
        elimcustom.addEventListener('click', () => {
            row.remove();
            updateSummary();
        });

    } else if (typeof value === "object" && value !== null) { // procesar linea con selector de opciones

        select = document.createElement("select");
        select.name = "opcionSenial";
        select.className = "w3-select";

        for (const [label, val] of Object.entries(value)) {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = label;
            select.appendChild(option);
        }

        for (const option of select.options) {
            if (option.value === option.value.toUpperCase()) {
                select.value = option.value;
                break;
            }
        }

        code = select.value;

        select.addEventListener("change", () => {
            signalCounts = countSignals(select.value);
            checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        });

        nameCell.appendChild(select);

    }

    checkbox.checked = code === code.toUpperCase();
    signalCounts = countSignals(code);

    signalTypes.forEach(sig => {
        const cell = document.createElement("td");
        cell.classList.add(sig, "celda-numero-seniales");
        row.appendChild(cell);
    });

    checkbox.addEventListener("change", () => {
        const checked = checkbox.checked;

        // mostrar/ocultar inputs number
        row.querySelectorAll('input[type="number"]').forEach(input => {
            input.classList.toggle("w3-hide", !checked);
        });

        // mostrar/ocultar selects
        row.querySelectorAll("select").forEach(sel => {
            sel.classList.toggle("w3-hide", !checked);
        });

        // actualizar celdas de tipos de señal
        row.querySelectorAll("td").forEach(cell => {
            signalTypes.forEach(sig => {
                if (cell.classList.contains(sig)) {
                    const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
                    cell.textContent = checked
                        ? (count === "-" ? "-" : count * multipBloque.value * numberInput.value)
                        : "-";
                }
            });
        });
    });

    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    */

}

function countSignals(code) {

    const result = {};

    // Inicializa el contador con 0 para cada tipo de señal
    for (const type of signalTypes) {
        result[type] = 0;
    }

    // Construye una expresión regular dinámica con los tipos del array
    const pattern = new RegExp(signalTypes.join('|'), 'gi');
    let match;

    while ((match = pattern.exec(code))) {
        const key = match[0].toUpperCase();
        if (result.hasOwnProperty(key)) {
            result[key]++;
        }
    }

    return result;
}

function updateSummary() {

    const sumTableBodyRow = estudioSumarioCont.querySelector("table tbody tr");
    sumTableBodyRow.innerHTML = "";

    const totalGlobal = {};
    signalTypes.forEach(sig => {
        totalGlobal[sig] = 0;
    });

    const tables = estudioBloqCont.querySelectorAll("table");
    tables.forEach(table => {

        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(row => {

            const checkbox = row.querySelector("input[type=checkbox]");
            if (!checkbox || !checkbox.checked) return;

            const cells = row.querySelectorAll("td");
            signalTypes.forEach((sig, idx) => {
                const cellText = cells[idx + 1]?.textContent;
                const val = parseInt(cellText) || 0;
                totalGlobal[sig] += val;
            });
        });
    });

    const nameCell = document.createElement("th");
    nameCell.innerText = "TOTAL";

    sumTableBodyRow.appendChild(nameCell);

    signalTypes.forEach(sig => {
        const cell = document.createElement("td");
        cell.classList.add(sig);
        cell.textContent = totalGlobal[sig];
        sumTableBodyRow.appendChild(cell);
    });

}

function totalHeader() {

    const tableHeader = document.createElement("thead");

    const headerRow = document.createElement("tr");
    tableHeader.appendChild(headerRow);

    const firstCell = document.createElement("th");
    headerRow.appendChild(firstCell);

    signalTypes.forEach(sig => {
        const headTitle = document.createElement("th");
        headTitle.innerText = sig;
        headerRow.appendChild(headTitle);
    });

    return tableHeader;

}

function totalBody() {

    const tableBody = document.createElement("tbody");

    const bodyRow = document.createElement("tr");
    tableBody.appendChild(bodyRow);

    const firstCell = document.createElement("th");
    firstCell.innerText = "TOTAL";
    bodyRow.appendChild(firstCell);

    signalTypes.forEach(sig => {
        const sumCell = document.createElement("td");
        sumCell.classList.add(sig);
        sumCell.innerText = 0;
        bodyRow.appendChild(sumCell);
    });

    return tableBody;

}

/* ------------------------- AUXILIARES ------------------------- */
function inputNombre(texto) {
    const nameInput = document.createElement("input");
    nameInput.className = "w3-input w3-margin-right nobackground inputNombre";
    nameInput.value = texto;
    nameInput.style.display = "inline-block";
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

    return numberInput;
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
