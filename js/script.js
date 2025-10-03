// TODO: Verificar que se hacen las copias structuredClone y no se asignan referencioas de objetos

/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const portada = document.getElementById("portada");
const estudio = document.getElementById("estudio");
const listado = document.getElementById("listado");

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
const estudioGuardarBtn = document.getElementById("estudioGuardarBtn");
const estudioCrearPDFBtn = document.getElementById("estudioCrearPDFBtn");
const estudioSalirBtn = document.getElementById("estudioSalirBtn");
const estudioListadoBtn = document.getElementById("estudioListadoBtn");
const estudioCabeceraSeniales = document.getElementById("estudioCabeceraSeniales");
const estudioBloqCont = document.getElementById("estudioBloqCont");
const estudioBloqSelect = document.getElementById("estudioBloqSelect");
const estudioSumarioCont = document.getElementById("estudioSumarioCont");

const listadoBotonera = document.getElementById("listadoBotonera");
const listadoNombProyecInput = document.getElementById("listadoNombProyecInput");
const listadoGenerarBtn = document.getElementById("listadoGenerarBtn");
const listadoImportarBtn = document.getElementById("listadoImportarBtn");
const listadoVolverBtn = document.getElementById("listadoVolverBtn");
const listadoAsignarBtn = document.getElementById("listadoAsignarBtn");
const listadoCabeceraSeniales = document.getElementById("listadoCabeceraSeniales");
const listadoSenialesCont = document.getElementById("listadoSenialesCont");
const listadoSumarioCont = document.getElementById("listadoSumarioCont");

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
        numSeniales.name = signal;
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

function populateListadoSeniales() {

    listadoSenialesCont.innerHTML = "";

    signalTexts.forEach(signalText => {

        const table = document.createElement('table');
        listadoSenialesCont.appendChild(table);
        table.classList.add("w3-table", "w3-bordered", "w3-margin-bottom");

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        const rowHead = document.createElement('tr');
        thead.appendChild(rowHead);

        const celda = document.createElement('th');
        rowHead.appendChild(celda);

        const labelTitulo = document.createElement('label');
        celda.appendChild(labelTitulo);

        labelTitulo.innerText = signalText;

    });

    const nodosTablas = listadoSenialesCont.querySelectorAll("table");

    // Mapeamos las tablas en un objeto con nombles tableEA, tableED, tableSA, tableSD
    const tablesObj = {};
    signalTypes.forEach((signal, i) => {
        tablesObj["table" + signal] = nodosTablas[i];
    });

    proyectoActual.forEach(bloque => {

        bloque.Elementos.forEach(elemento => {

            if (elemento.Cantidad > 0) {

                const optElegida = elemento.Opciones[elemento.Opcion];

                // descomponer el nombre en varios si hay mas de una unidad en el elemento
                // tipo 2 bombas -> daria 4 nombres: M/P Bomba 1, M/P Bomba 2, estado bomba 1, estado bomba 2
                let nombresSeniales = procesaNombres(bloque.NombreUsuario, bloque.Cantidad, elemento.NombreUsuario, elemento.Cantidad);

                optElegida.Esquema.forEach(senial => {

                    // asignar la tabla ( EA ED SA o SD ) en funcion al tipo de señal
                    // si no encuentra tabla lo metemos a pelo en el container
                    const tablaAsignada = getTableFor(senial, tablesObj, signalTypes) || listadoSenialesCont;

                    //añadir una linea a la tabla 
                    nombresSeniales.forEach(nombre => {

                        const row = document.createElement('tr');
                        tablaAsignada.querySelector("tbody").appendChild(row);

                        const celda = document.createElement('td');
                        row.appendChild(celda);

                        const inputNombreSenial = document.createElement('input');
                        celda.appendChild(inputNombreSenial);

                        inputNombreSenial.classList.add("w3-input");
                        // inputNombreSenial.style.fontSize = "12px";
                        // inputNombreSenial.style.height = "15px";
                        inputNombreSenial.style.width = "600px";

                        inputNombreSenial.value = (senial.Nombre + " " + nombre).toUpperCase().trim();

                    });

                });

                // TODO: eliminar las tablas sin rows en el tbody

            }
        });
    });

    /**
     * Retorna la tabla (elemento del DOM) correspondiente a un objeto,
     * según el prefijo de sus claves (EA, ED, SA, SD).
     *
     * @param {Object} obj - Objeto a analizar (ejemplo: { EA_2: ["Activa"], ... }).
     * @param {Object.<string, HTMLElement>} tables - Objeto con las tablas mapeadas, 
     *        con claves tipo "tableEA", "tableED", etc.
     * @param {string[]} [prefixes=["EA","ED","SA","SD"]] - Lista de prefijos válidos.
     * @returns {HTMLElement|null} - La tabla correspondiente, o `null` si no hay coincidencia.
     *
     * @example
     * const obj = { id: "1", EA_2: ["Activa"] };
     * const tables = { tableEA: document.createElement("table") };
     *
     * const table = getTableFor(obj, tables);
     * console.log(table); // <table>...</table>
     */
    function getTableFor(obj, tables, prefixes = ["EA", "ED", "SA", "SD"]) {
        const foundPrefix = prefixes.find(prefix =>
            Object.keys(obj).some(k => k.startsWith(prefix))
        );

        if (!foundPrefix) return null;
        return tables["table" + foundPrefix];
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
    proyectoNoGuardado();

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
    table.classList.add("w3-table", "w3-bordered", "w3-margin-bottom");

    addBlockHeader(bloque, table);
    addBlockBody(bloque, table);

    updateSummary();

    estudioBloqSelect.focus();

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
        proyectoActual.splice(proyectoActual.indexOf(bloque), 1);
        proyectoNoGuardado();

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
    addCustom.addEventListener('click', () => {

        // Asignar bloque y tabla desde el que se dispara
        customPop.tablaOrigen = table;
        customPop.bloqueOrigen = bloque;

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
    elimcustom.className = "w3-red w3-button";
    elimcustom.style.display = "inline-block";
    elimcustom.addEventListener('click', () => {

        // eliminar el elemento del bloque actual
        bloque.Elementos.splice(bloque.Elementos.indexOf(elemento), 1);
        proyectoNoGuardado();

        // eliminar la fila
        row.remove();

        // actualizar sumatorio
        updateSummary();
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
        updateSummary();
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
        updateSummary();
        proyectoNoGuardado();
    });

    // Si hay mas de una opcion, añadir el select
    if (elemento.Opciones.length > 1) {

        select.name = "opcionSenial";
        select.className = "w3-select";

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
    numberInput.addEventListener("change", () => {
        if (numberInput.value === "") numberInput.value = 1;
        if (numberInput.value * 1 < numberInput.min * 1) numberInput.value = numberInput.min;
    });

    return numberInput;
}

function proyectoNoGuardado() {
    proyectoActual.guardado = false;
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
