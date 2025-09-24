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


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;
let proyectosEasyPoint = JSON.parse(localStorage.getItem('proyectosEasyPoint')) || {};
let guardado = true;

/* ------------------------- GLOBALES PARA PDFMAKE ------------------------- */
const printDate = new Date().toLocaleDateString();
const colorCabeceraTablasPDF = "#ddfaff"
let anchosColumnas = [28, '*'];
let nombresColumnas = [];
let facilityName;
let headerText;


/* ------------------------- EJECUCIONES INICIALES ------------------------- */
if (location.hostname === "arcsl.github.io") {
    window.location.replace("https://easypoint.arcsl.com");
}

signalTypes.forEach(() => {
    anchosColumnas.push(28);
});

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

/* ------------------------- PORTADA ------------------------- */
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

}

/* ------------------------- ESTUDIO ------------------------- */
function populateBlockSelect() {
    Object.keys(blocksData).forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        if (blocksData[type] === null) option.disabled = true;
        estudioBloqSelect.appendChild(option);
    });
}

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
                opcion: row.querySelector('[name="opcionSenial"]')?.value || "",
            };
        });

        lectura.push(block);
    });

    return lectura;

}

function writeBlocks() {

    estudioBloqCont.innerHTML = "";

    proyectosEasyPoint[portadaSelProyecSelect.value].forEach(seccion => {

        estudioBloqSelect.value = seccion.bloque.tipo
        const table = addBlock();

        const nombreBloque = table.querySelector('[name="nombreBloque"]');
        const cantidadBloque = table.querySelector('[name="cantidadBloque"]');

        if (nombreBloque) nombreBloque.value = seccion.bloque.nombre;
        if (cantidadBloque) cantidadBloque.value = seccion.bloque.cantidad;

        const bodyRows = table.querySelectorAll("tbody tr");

        bodyRows.forEach(row => {

            const checkbox = row.querySelector('input[type="checkbox"]');
            const nombreSenial = row.querySelector('[name="nombreSenial"]');
            const numeroSenial = row.querySelector('[name="numeroSenial"]');
            const opcionSenial = row.querySelector('[name="opcionSenial"]');

            if (checkbox) checkbox.checked = seccion.seniales.hasOwnProperty(row.name);

            if (checkbox.checked) {
                if (nombreSenial) nombreSenial.value = seccion.seniales[row.name].nombre;
                if (numeroSenial) numeroSenial.value = seccion.seniales[row.name].cantidad;
                if (opcionSenial) {
                    opcionSenial.value = seccion.seniales[row.name].opcion;
                    opcionSenial.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }

            if (checkbox) checkbox.dispatchEvent(new Event('change', { bubbles: true }));

        });

    });

    estudioBloqSelect.selectedIndex = 0;

    buttonsMoveBlock();

}

function moveBlock(tabla, direccion) {

    const tablas = Array.from(estudioBloqCont.children);
    const indice = tablas.indexOf(tabla);

    const nuevoIndice = indice + direccion;
    if (nuevoIndice < 0 || nuevoIndice >= tablas.length) return;

    estudioBloqCont.removeChild(tabla);
    if (direccion === -1) {
        estudioBloqCont.insertBefore(tabla, tablas[nuevoIndice]);
    } else {
        estudioBloqCont.insertBefore(tabla, tablas[nuevoIndice].nextSibling);
    }

    buttonsMoveBlock();

}

function buttonsMoveBlock() {

    const tablas = Array.from(estudioBloqCont.children);

    // deshabilitar el botor subir de la primera y el bajar de la ultima
    tablas.forEach((tabla, i) => {
        const botones = tabla.querySelectorAll('button');
        //botones[0] es el boton de eliminar la tabla
        botones[1].disabled = i === 0;               // Botón subir
        botones[2].disabled = i === tablas.length - 1; // Botón bajar
    });

}

function addBlock() {

    if (!estudioBloqSelect.value) return;

    const table = document.createElement("table");
    table.name = estudioBloqSelect.value;
    table.className = "w3-table w3-bordered w3-margin-bottom";

    table.appendChild(addBlockHeader(table));
    table.appendChild(addBlockBody(table));
    estudioBloqCont.appendChild(table);

    updateSummary();

    estudioBloqSelect.focus();

    return table;

}

function addBlockHeader(table) {

    const thead = document.createElement("thead");

    const headerRow = document.createElement("tr");
    const headerCell = document.createElement("th");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<img src="./images/papelera.svg" alt="Salir" width="15" height="15">';
    deleteBtn.className = "w3-button w3-red w3-margin-right";
    deleteBtn.addEventListener("click", () => {
        table.remove();
        buttonsMoveBlock();
        updateSummary();
    });

    const subirBtn = document.createElement('button');
    subirBtn.className = "w3-button w3-pale-green w3-margin-left";
    subirBtn.textContent = '▲';
    subirBtn.addEventListener('click', () => {
        moveBlock(table, -1)
    });

    const bajarBtn = document.createElement('button');
    bajarBtn.className = "w3-button w3-pale-red w3-margin-right";
    bajarBtn.textContent = '▼';
    bajarBtn.addEventListener('click', () => {
        moveBlock(table, 1)
    });

    const nameInput = inputNombre(estudioBloqSelect.value);
    nameInput.classList.add("nombreBloque");
    nameInput.name = "nombreBloque";

    const numberInput = inputNumero();
    numberInput.classList.add("cantidadBloque");
    numberInput.name = "cantidadBloque";

    numberInput.addEventListener("change", () => {
        const checkboxes = table.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    headerCell.appendChild(deleteBtn);
    headerCell.appendChild(nameInput);
    headerCell.appendChild(numberInput);
    headerCell.appendChild(subirBtn);
    headerCell.appendChild(bajarBtn);
    headerRow.appendChild(headerCell);

    signalTypes.forEach(sig => {
        const th = document.createElement("th");
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    return thead;

}

function addBlockBody(table) {

    const tbody = document.createElement("tbody");
    const elements = blocksData[estudioBloqSelect.value].Seniales;

    for (const [name, value] of Object.entries(elements)) {

        // multiplicador general de la tabla
        const multiplierInput = table.querySelector("thead input[type='number']");

        const row = document.createElement("tr");
        row.name = name;

        const nameCell = document.createElement("td");
        row.appendChild(nameCell);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const nameInput = inputNombre(name);
        nameInput.name = "nombreSenial";
        nameInput.placeholder = name;

        const numberInput = inputNumero();
        numberInput.name = "numeroSenial";

        numberInput.addEventListener("change", () => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });

        nameCell.appendChild(checkbox);
        nameCell.appendChild(nameInput);
        nameCell.appendChild(numberInput);

        let code = value;
        let select; // solo existirá si es un subobjeto
        let signalCounts;

        if (typeof value === "object" && value !== null) {
            // Crear select si el valor es un subobjeto
            select = document.createElement("select");
            select.name = "opcionSenial";
            select.className = "w3-select";

            for (const [label, val] of Object.entries(value)) {
                const option = document.createElement("option");
                option.value = val;
                option.textContent = label;
                select.appendChild(option);
            }

            // Selección por defecto: primera opción cuyo valor esté en mayúsculas
            for (const option of select.options) {
                if (option.value === option.value.toUpperCase()) {
                    select.value = option.value;
                    break;
                }
            }

            code = select.value; // usar valor seleccionado para contar señales

            select.addEventListener("change", () => {
                signalCounts = countSignals(select.value);
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            });

            nameCell.appendChild(select);
        }

        // verificar si la linea tiene que empezar con el check activo o no
        checkbox.checked = code === code.toUpperCase();
        signalCounts = countSignals(code);

        // poner el numero de señales inicial
        signalTypes.forEach(sig => {
            const cell = document.createElement("td");
            cell.classList.add(sig);
            cell.classList.add("celda-numero-seniales");
            // const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
            // cell.textContent = checkbox.checked
            //     ? (count === "-" ? "-" : count)
            //     : "-";
            row.appendChild(cell);
        });

        checkbox.addEventListener("change", () => {
            const checked = checkbox.checked;

            // Ocultar o mostrar inputs tipo number
            row.querySelectorAll('input[type="number"]').forEach(input => {
                input.classList.toggle("w3-hide", !checked);
            });

            // Ocultar o mostrar selects
            row.querySelectorAll("select").forEach(select => {
                select.classList.toggle("w3-hide", !checked);
            });

            // Actualizar celdas de tipos de señal
            row.querySelectorAll("td").forEach(cell => {
                signalTypes.forEach(sig => {
                    if (cell.classList.contains(sig)) {
                        const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
                        cell.textContent = checked
                            ? (count === "-" ? "-" : count * multiplierInput.value * numberInput.value)
                            : "-";
                    }
                });
            });
        });

        checkbox.dispatchEvent(new Event('change', { bubbles: true }));

        tbody.appendChild(row);
    }

    return tbody;
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

function inputNombre(texto) {
    const nameInput = document.createElement("input");
    nameInput.className = "w3-input w3-margin-right nobackground inputNombre";
    nameInput.value = texto;
    nameInput.style.display = "inline-block";
    return nameInput;
}

function inputNumero() {
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.value = 1;
    numberInput.min = 1; // evita números negativos o cero si no son deseados
    numberInput.step = 1; // solo números enteros
    numberInput.className = "w3-input w3-margin-right nobackground";
    numberInput.style.display = "inline-block";
    numberInput.addEventListener("input", () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    });

    return numberInput;
}

