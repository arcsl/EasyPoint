/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const portada = document.getElementById("portada");
const aplicacion = document.getElementById("aplicacion");

const abrirBtn = document.getElementById("abrirBtn");
const nuevoBtn = document.getElementById("nuevoBtn");
const proyectoSelectBtn = document.getElementById("proyectoSelectBtn");
const nuevoInputBtn = document.getElementById("nuevoInputBtn");

const selectContainer = document.getElementById("selectContainer");
const inputContainer = document.getElementById("inputContainer");
const proyectoSelect = document.getElementById("proyectoSelect");
const nuevoInput = document.getElementById("nuevoInput");
const mensajeError = document.getElementById("mensajeError");

const divControlApp = document.getElementById("divControlApp");
const nombreProyecto = document.getElementById("nombreProyecto");
const divCabecera = document.getElementById("divCabecera");
const divEstudio = document.getElementById("divEstudio");
const blockSelect = document.getElementById("blockSelect");
const divSummario = document.getElementById("divSummario");


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;
let proyectosEasyPoint = JSON.parse(localStorage.getItem('proyectosEasyPoint')) || {};
let guardado = true;
let facilityName;
let headerText;
let anchosColumnas = [28, '*'];


/* ------------------------- GLOBALES PARA PDFMAKE ------------------------- */
const printDate = new Date().toLocaleDateString();
let nombresColumnas = [];
const colorCabeceraTablasPDF = "#ddfaff"


/* ------------------------- EJECUCIONES INICIALES ------------------------- */
if (location.hostname === "arcsl.github.io") {
    window.location.replace("https://easypoint.arcsl.com");
}

signalTypes.forEach(() => {
    anchosColumnas.push(28);
});


/* ------------------------- ESCUCHADORES ------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    document.title = "Easy Point";

    populateProyectSelect();
    populateBlockSelect();

    const divCabeceraTable = document.createElement("table");
    divCabeceraTable.classList = "w3-table w3-bordered";
    divCabecera.appendChild(divCabeceraTable);
    divCabeceraTable.appendChild(totalHeader());

    const divSummarioTable = document.createElement("table");
    divSummarioTable.classList = "w3-table w3-bordered";
    divSummario.appendChild(divSummarioTable);
    divSummarioTable.appendChild(totalHeader());
    divSummarioTable.appendChild(totalBody());

    abrirBtn.focus();

});

document.addEventListener("change", (event) => {
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

divEstudio.addEventListener('input', (event) => {
    const target = event.target;
    if (target.tagName === 'INPUT' && ['checkbox', 'number', 'text'].includes(target.type)) {
        guardado = false;
    }
});

divEstudio.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        guardado = false;
    }
});

abrirBtn.addEventListener("click", () => {

    // Prevención adicional
    if (abrirBtn.disabled) return;

    // si se esta mostrando el select, se quiere abrir el proyecto seleccionado
    if (!selectContainer.classList.contains("oculto")) {

        // por seguridad
        if (!proyectoSelect.value.trim()) return;
        if (!proyectosEasyPoint.hasOwnProperty(proyectoSelect.value)) return;

        writeBlocks();
        nombreProyecto.value = proyectoSelect.value.trim();
        portada.style.display = "none";
        aplicacion.style.display = "block";

        return;
    }

    // si no es para abrir el select
    selectContainer.classList.remove("oculto");
    proyectoSelect.focus();
    inputContainer.classList.add("oculto"); // por si acaso

    // boton nuevo pasa a ser borrar para poder borrar el proyecto
    nuevoBtn.textContent = "Borrar";
    nuevoBtn.classList.remove("w3-green");
    nuevoBtn.classList.add("w3-red");

});

nuevoBtn.addEventListener("click", () => {

    // Prevención adicional
    if (nuevoBtn.disabled) return;

    // si se esta mostrando el select, se quiere borrar dicho proyecto
    if (!selectContainer.classList.contains("oculto")) {

        if (!confirm("Este cambio es irreversible\n\n¿Desea continuar?\n")) return;

        // Borrar la opción seleccionada
        delete proyectosEasyPoint[proyectoSelect.value];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // actualizar opciones
        populateProyectSelect();

        // si no quedan proyectos
        if (proyectoSelect.length === 0) {

            //restaurar botón nuevo
            nuevoBtn.textContent = "Nuevo";
            nuevoBtn.classList.remove("w3-red");
            nuevoBtn.classList.add("w3-green");

            // Ocultar select
            selectContainer.classList.add("oculto");

        }

        return;

    }

    // Si no se esta mostrando ni input ni select, mostrar input para nuevo nombre y cambiar Nuevo a Cancelar y deshabilitar abrir
    nuevoInput.value = "";
    inputContainer.classList.remove("oculto");
    nuevoInput.focus();
    nuevoBtn.disabled = true;
    abrirBtn.disabled = true;

});

nuevoInput.addEventListener("input", (e) => {

    const nuevoProyecto = nuevoInput.value.trim();

    // verificar si el proyecto ya existe
    if (proyectosEasyPoint.hasOwnProperty(nuevoProyecto)) {

        // Mostrar mensaje de error
        mensajeError.textContent = `El proyecto ${nuevoProyecto} ya existe.`;
        mensajeError.classList.add("w3-text-red");
        mensajeError.classList.remove("w3-text-blue");

        nuevoInput.classList.add("w3-pale-red");

    } else {

        // Mostrar mensaje informativo
        mensajeError.textContent = "Presione ENTER para validar.";
        mensajeError.classList.add("w3-text-blue");
        mensajeError.classList.remove("w3-text-red");

        nuevoInput.classList.remove("w3-pale-red");

    }

});

nuevoInput.addEventListener("keydown", (e) => {

    if (mensajeError.classList.contains("w3-text-red")) return;

    if (e.key === "Enter") {

        const nuevoProyecto = nuevoInput.value.trim();

        if (!nuevoProyecto) return;

        // agregar proyecto al objeto y salvar en localstorage
        proyectosEasyPoint[nuevoProyecto] = [];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // borrar contenido del input y ocultarlo
        nuevoInput.value = "";
        inputContainer.classList.add("oculto");

        // actualizar opciones del select de proyectos y seleccionar 
        populateProyectSelect();
        proyectoSelect.value = nuevoProyecto;

        // habilitar botones y simular click en abrir para mostrar el select de proyectos
        nuevoBtn.disabled = false;
        abrirBtn.disabled = false;
        abrirBtn.dispatchEvent(new Event("click"));

    }
});

proyectoSelectBtn.addEventListener("click", (e) => {

    //ocultar select
    selectContainer.classList.add("oculto")

    //restaurar botón nuevo
    nuevoBtn.textContent = "Nuevo";
    nuevoBtn.classList.remove("w3-red");
    nuevoBtn.classList.add("w3-green");

});

nuevoInputBtn.addEventListener("click", (e) => {

    //ocultar input
    inputContainer.classList.add("oculto");

    //habilitar botones
    nuevoBtn.disabled = false;
    abrirBtn.disabled = false;

});

nombreProyecto.addEventListener("input", (e) => {

    const estaVacio = nombreProyecto.value.trim() === "";
    const yaExiste = proyectosEasyPoint.hasOwnProperty(nombreProyecto.value.trim());
    const esElActual = nombreProyecto.value.trim() === proyectoSelect.value;

    if ((yaExiste && !esElActual) || estaVacio) {
        nombreProyecto.classList.add("w3-pale-red");
    } else {
        nombreProyecto.classList.remove("w3-pale-red");
    }

});

/* ------------------------- FUNCIONES ------------------------- */
function populateProyectSelect() {

    // Asegurarse de que existe el objeto
    if (proyectosEasyPoint) {
        proyectoSelect.innerHTML = "";
        // Recorrer las claves del objeto y agregarlas como opciones
        Object.keys(proyectosEasyPoint).forEach(clave => {
            const option = document.createElement('option');
            option.value = clave;
            option.textContent = clave;
            proyectoSelect.appendChild(option);
        });
    }

    abrirBtn.disabled = proyectoSelect.options.length === 0;


}

function populateBlockSelect() {
    Object.keys(blocksData).forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        if (blocksData[type] === null) option.disabled = true;
        blockSelect.appendChild(option);
    });
}

function readBlocks() {

    let lectura = [];

    const tables = divEstudio.querySelectorAll("table");

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

    divEstudio.innerHTML = "";

    proyectosEasyPoint[proyectoSelect.value].forEach(seccion => {

        blockSelect.value = seccion.bloque.tipo
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

    blockSelect.selectedIndex = 0;

    console.log(document.documentElement.outerHTML);

}

function addBlock() {

    if (!blockSelect.value) return;

    const table = document.createElement("table");
    table.name = blockSelect.value;
    table.className = "w3-table w3-bordered w3-margin-bottom w3-margin-top ";

    table.appendChild(addBlockHeader(table));
    table.appendChild(addBlockBody(table));
    divEstudio.appendChild(table);

    updateSummary();
    blockSelect.focus();

    return table;

}

function addBlockHeader(table) {

    const thead = document.createElement("thead");

    const headerRow = document.createElement("tr");
    const headerCell = document.createElement("th");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<b>-</b>";
    deleteBtn.className = "w3-button w3-red botonTxiki";
    deleteBtn.addEventListener("click", () => {
        table.remove();
        updateSummary();
    });

    const nameInput = inputNombre(blockSelect.value);
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
    const elements = blocksData[blockSelect.value].Seniales;

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
            select.className = "w3-select optSel";

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
            const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
            cell.textContent = checkbox.checked
                ? (count === "-" ? "-" : count)
                : "-";
            row.appendChild(cell);
        });

        checkbox.addEventListener("change", () => {
            row.querySelectorAll("td").forEach(cell => {
                signalTypes.forEach(sig => {
                    if (cell.classList.contains(sig)) {
                        const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
                        cell.textContent = checkbox.checked
                            ? (count === "-" ? "-" : count * multiplierInput.value * numberInput.value)
                            : "-";
                    }
                });
            });
        });

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

    const sumTableBodyRow = divSummario.querySelector("table tbody tr");
    sumTableBodyRow.innerHTML = "";

    const totalGlobal = {};
    signalTypes.forEach(sig => {
        totalGlobal[sig] = 0;
    });

    const tables = divEstudio.querySelectorAll("table");
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
    nameInput.className = "w3-input noborder nobackground";
    nameInput.value = texto;
    nameInput.style.display = "inline-block";
    nameInput.style.width = "450px";
    nameInput.style.marginLeft = "8px";
    return nameInput;
}

function inputNumero() {
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.value = 1;
    numberInput.min = 1; // evita números negativos o cero si no son deseados
    numberInput.step = 1; // solo números enteros
    numberInput.className = "noborder nobackground";
    numberInput.style.display = "inline-block";
    numberInput.style.width = "60px";
    numberInput.style.marginLeft = "8px";
    numberInput.addEventListener("input", () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    });

    return numberInput;
}

function guardaProyecto() {

    let sobreescribir = false;

    // leemos el nombre del proyecto en la casilla que el usuario puede modificar
    const nuevoNombreProyecto = nombreProyecto.value.trim();

    if (!nuevoNombreProyecto) {
        alert("El nombre del proyecto no puede estar vacio.\n\n");
        return;
    }

    // Si dicho nombre ya existe y no es el nombre del proyecto que tenemos abierto (proyectoSelect.value) preguntamos al usuario si desea continuar.
    if (nuevoNombreProyecto !== proyectoSelect.value && proyectosEasyPoint.hasOwnProperty(nuevoNombreProyecto)) {
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
        proyectoSelect.value = nuevoNombreProyecto;

        // asi no se ha modificado el proyecto que hemos abierto originalmente y hemos podidohacer copia de un proyecto en otro


        // si no desea sobreescribir 
    } else {

        // leemos los bloques en el proyecto abierto
        proyectosEasyPoint[proyectoSelect.value] = readBlocks();

        // verificamos si el nombre de proyecto ha cambiado por si el usuario queria renombrarlo
        if (nuevoNombreProyecto !== proyectoSelect.value) {

            // si ha cambiado copiamos la clave a una nueva clave con el nuevo nombre 
            proyectosEasyPoint[nuevoNombreProyecto] = proyectosEasyPoint[proyectoSelect.value];

            // y borramos la antigua clave.
            delete proyectosEasyPoint[proyectoSelect.value];

            // actualizamos opciones de proyectoselec usando la funcion
            populateProyectSelect();

            // y dejamos seleccionado el nuevo nombre
            proyectoSelect.value = nuevoNombreProyecto;

        }
    }


    localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));
    guardado = true;
    guardadoOK();
}

function cerrarProyecto() {
    let seguir = guardado
        ? true
        : confirm("Hay cambios no guardados que se perderán.\n\n¿Desea continuar?\n");
    if (seguir) {
        // poner pantalla principal en modo inicial (presionamos boton abrir que deberia estar en modo "cancelar")
        abrirBtn.dispatchEvent(new Event('click', { bubbles: true }));
        portada.style.display = "block";
        aplicacion.style.display = "none";
        abrirBtn.focus();
    }
}

function guardadoOK() {
    const notificacion = document.createElement('div');
    notificacion.id = 'notificacion';
    notificacion.className = 'w3-center w3-button w3-green w3-round-large fadeinout notificacion-fija';
    notificacion.innerHTML = "<h3>Guardado</h3>";
    aplicacion.appendChild(notificacion);
    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}

function crearPDF() {

    facilityName = proyectoSelect.value;
    headerText = proyectoSelect.value;

    const textosColumnas = ["", "", ...signalTypes];

    nombresColumnas = [];
    textosColumnas.forEach(texto => {
        nombresColumnas.push({ text: texto, fillColor: colorCabeceraTablasPDF });
    });

    let extraPages = [{ pageBreak: 'before', text: null }];

    const tables = divEstudio.querySelectorAll("table");

    tables.forEach(table => {

        let tablaSeniales = JSON.parse(JSON.stringify(tablaSig()));
        tablaSeniales.layout = (tablaSig()).layout;

        const bodyRows = table.querySelectorAll("tbody tr");

        bodyRows.forEach(row => {

            const checkbox = row.querySelector('input[type="checkbox"]');
            if (!checkbox || !checkbox.checked) return;

            const numeroSenial = row.querySelector('[name="numeroSenial"]')?.value || "";
            const nombreSenial = row.querySelector('[name="nombreSenial"]')?.value || "";
            const opcionSenial = row.querySelector('[name="opcionSenial"]');

            const opcionTexto = opcionSenial?.options[opcionSenial.selectedIndex]?.text || "";

            const textoCeldaNombre = opcionTexto
                ? `${nombreSenial} ( ${opcionTexto} )`
                : nombreSenial;

            const celdaNombre = {
                text: textoCeldaNombre,
                alignment: 'left',
            }

            let numeroSeñales = [];
            signalTypes.forEach(sig => {
                const celdaSenial = row.querySelector(`.${sig}`);
                numeroSeñales.push(celdaSenial?.textContent || "");
            });

            tablaSeniales.table.body.push([numeroSenial, celdaNombre, ...numeroSeñales]);

        });

        const nombreBloque = table.querySelector('[name="nombreBloque"]')?.value || "";
        const cantidadBloque = table.querySelector('[name="cantidadBloque"]')?.value || "";

        let extPagElem = JSON.parse(JSON.stringify(extraPagesElem()));
        if(cantidadBloque > 1) {
             extPagElem.stack[0].table.body[0][0].text = nombreBloque + " x" + cantidadBloque;
        } else {
            extPagElem.stack[0].table.body[0][0].text = nombreBloque;
        }
        extPagElem.stack.push(tablaSeniales);
        extraPages.push(extPagElem);

    });

    const totalRow = divSummario.querySelector("table tbody tr");

    // let tablaTotales = JSON.parse(JSON.stringify(tablaSig()));
    let tablaTotales = JSON.parse(JSON.stringify(tablaSig()));
    tablaTotales.layout = (tablaSig()).layout;

    let numeroTotalSeñales = [];
    signalTypes.forEach(sig => {
        const celdaSenial = totalRow.querySelector(`.${sig}`);
        numeroTotalSeñales.push(celdaSenial?.textContent || "");
    });

    tablaTotales.table.body.push(["", "", ...numeroTotalSeñales]);

    let extPagElemTotal = JSON.parse(JSON.stringify(extraPagesElem()));
    extPagElemTotal.stack[0].table.body[0][0].text = "TOTAL";
    extPagElemTotal.stack.push(tablaTotales);
    extraPages.push(extPagElemTotal);

    let docDefinition = docDef();
    docDefinition.content = docDefinition.content.concat(extraPages);
    pdfMake.createPdf(docDefinition).download(proyectoSelect.value + ' - Listado de Puntos.pdf');

}