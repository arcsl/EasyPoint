/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const portada = document.getElementById("portada");
const aplicacion = document.getElementById("aplicacion");

const abrirBtn = document.getElementById("abrirBtn");
const nuevoBtn = document.getElementById("nuevoBtn");
const selectContainer = document.getElementById("selectContainer");
const inputContainer = document.getElementById("inputContainer");
const proyectoSelect = document.getElementById("proyectoSelect");
const nuevoInput = document.getElementById("nuevoInput");
const mensajeError = document.getElementById("mensajeError");

const blockSelect = document.getElementById("blockSelect");
const divAddBlock = document.getElementById("divAddBlock");
const divCabecera = document.getElementById("divCabecera");
const divEstudio = document.getElementById("divEstudio");
const divSummario = document.getElementById("divSummario");


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;
let proyectosEasyPoint = JSON.parse(localStorage.getItem('proyectosEasyPoint')) || {};
let guardado = true;

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

    if (abrirBtn.disabled) return; // Prevención adicional

    // si se esta mostrando el select, y hemos hecho click es porque queremos cancelar
    if (!selectContainer.classList.contains("oculto")) {

        //ocultar select
        selectContainer.classList.add("oculto")

        //restaurar botón nuevo
        nuevoBtn.textContent = "Nuevo";
        nuevoBtn.classList.remove("w3-red");
        nuevoBtn.classList.add("w3-green");

        //restaurar botón abrir
        abrirBtn.textContent = "Abrir";
        abrirBtn.classList.remove("w3-red");
        abrirBtn.classList.add("w3-blue");

        return;
    }

    // si no es para abrir el select
    selectContainer.classList.remove("oculto");
    proyectoSelect.focus();
    inputContainer.classList.add("oculto"); // por si acaso

    // boton abrir pasa a ser cancelar
    abrirBtn.textContent = "Cancelar";
    abrirBtn.classList.remove("w3-blue");
    abrirBtn.classList.add("w3-red");

    // boton nuevo pasa a ser borrar
    nuevoBtn.textContent = "Borrar";
    nuevoBtn.classList.remove("w3-green");
    nuevoBtn.classList.add("w3-red");

});

nuevoBtn.addEventListener("click", () => {

    // si se esta mostrando el input cancelamos entrada y volvemos atras
    if (!inputContainer.classList.contains("oculto")) {

        inputContainer.classList.add("oculto");

        //restaurar botón nuevo
        nuevoBtn.textContent = "Nuevo";
        nuevoBtn.classList.remove("w3-red");
        nuevoBtn.classList.add("w3-green");

        abrirBtn.disabled = false;

        return;

    }

    // si se esta mostrando el select, se quiere borrar dicho proyecto
    if (!selectContainer.classList.contains("oculto")) {

        if (!confirm("Este cambio es irreversible\n\n¿Desea continuar?\n")) return;

        // Borrar la opción seleccionada
        delete proyectosEasyPoint[proyectoSelect.value];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        //restaurar botón nuevo
        nuevoBtn.textContent = "Nuevo";
        nuevoBtn.classList.remove("w3-red");
        nuevoBtn.classList.add("w3-green");

        //restaurar botón abrir
        abrirBtn.textContent = "Abrir";
        abrirBtn.classList.remove("w3-red");
        abrirBtn.classList.add("w3-blue");

        // Ocultar select
        selectContainer.classList.add("oculto");

        // actualizar opciones
        populateProyectSelect();

        return;

    }

    // Si no se esta mostrando ni input ni select, mostrar input para nuevo nombre y cambiar Nuevo a Cancelar y deshabilitar abrir
    nuevoInput.value = "";
    inputContainer.classList.remove("oculto");
    nuevoInput.focus();
    nuevoBtn.textContent = "Cancelar";
    nuevoBtn.classList.add("w3-red");
    nuevoBtn.classList.remove("w3-green");
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

        // agrecar proyecto al objeto y salvar en localstorage
        proyectosEasyPoint[nuevoProyecto] = [];
        localStorage.setItem("proyectosEasyPoint", JSON.stringify(proyectosEasyPoint));

        // borrar contenido del input y ocultarlo
        nuevoInput.value = "";
        inputContainer.classList.add("oculto");

        // actualizar opciones del select de proyectos y seleccionar 
        populateProyectSelect();
        proyectoSelect.value = nuevoProyecto;

        // habilitar abrir y simular click en abrir para mostrar el select de proyectos
        abrirBtn.disabled = false;
        abrirBtn.dispatchEvent(new Event("click"));

    }
});

proyectoSelect.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        if (!proyectoSelect.value.trim()) return;
        if (!proyectosEasyPoint.hasOwnProperty(proyectoSelect.value)) return;

        writeBlocks();

        portada.style.display = "none";
        aplicacion.style.display = "block";

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

}

function addBlock() {

    if (!blockSelect.value) return;

    const table = document.createElement("table");
    table.name = blockSelect.value;
    table.className = "w3-table w3-bordered w3-margin-bottom";

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
    headerCell.style.width = "calc(100% - 100px)";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "w3-button w3-red w3-small botonTxiki";
    deleteBtn.addEventListener("click", () => {
        table.remove();
        updateSummary();
    });

    const nameInput = inputNombre(blockSelect.value);
    nameInput.name = "nombreBloque";

    const numberInput = inputNumero();
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
        // th.textContent = sig;
        // th.style.textAlign = "center";
        // th.style.fontWeight = "bold";
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
            select.className = "w3-select w3-small optSel";
            select.style.display = "inline-block";

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
        sumCell.innerText = 0;
        bodyRow.appendChild(sumCell);
    });

    return tableBody;

}

function inputNombre(texto) {
    const nameInput = document.createElement("input");
    nameInput.className = "w3-input w3-small noborder nobackground";
    nameInput.value = texto;
    nameInput.style.display = "inline-block";
    nameInput.style.width = "500px";
    nameInput.style.marginLeft = "8px";
    return nameInput;
}

function inputNumero() {
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.style.display = "inline-block";
    numberInput.value = 1;
    numberInput.min = 1; // evita números negativos o cero si no son deseados
    numberInput.step = 1; // solo números enteros
    numberInput.className = "w3-input w3-small noborder nobackground";
    numberInput.style.width = "60px";
    numberInput.style.marginLeft = "8px";
    numberInput.addEventListener("input", () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    });

    return numberInput;
}

function exportToPDF() {
    // Selecciona el contenido del estudio
    const element = document.getElementById('divEstudio').cloneNode(true);
    const resumen = document.getElementById('divSummario').cloneNode(true);

    // Crear un contenedor para PDF que combine contenido y resumen
    const container = document.createElement('div');
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.padding = '20px';

    // Agrega título
    const title = document.createElement('h2');
    title.textContent = 'Estudio de Entradas y Salidas';
    title.style.textAlign = 'center';
    container.appendChild(title);

    // Añadir contenido y resumen
    container.appendChild(element);
    container.appendChild(resumen);

    // Configuración del PDF
    const opt = {
        margin: 0.5,
        filename: 'Estudio_PLC.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generar PDF
    html2pdf().set(opt).from(container).save();
}

async function generateElegantPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const bloques = document.querySelectorAll("#divEstudio > table");
    let y = 20;

    for (let i = 0; i < bloques.length; i++) {
        const bloque = bloques[i];
        const clone = bloque.cloneNode(true);

        // Opcional: añade título de bloque manual o por orden
        const titulo = document.createElement("h2");
        titulo.innerText = `Bloque ${i + 1}`;
        titulo.style.fontSize = "16px";
        titulo.style.marginBottom = "10px";

        const contenedor = document.createElement("div");
        contenedor.style.padding = "10px";
        contenedor.style.background = "#fff";
        contenedor.appendChild(titulo);
        contenedor.appendChild(clone);

        document.body.appendChild(contenedor); // necesario para capturar
        const canvas = await html2canvas(contenedor, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
        document.body.removeChild(contenedor);
    }

    // Página resumen
    const resumen = document.querySelector("#divSummario");
    if (resumen) {
        const canvas = await html2canvas(resumen, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 30);
    }

    pdf.save("estudio-signales.pdf");
}

function guardaProyecto() {
    proyectosEasyPoint[proyectoSelect.value] = readBlocks();
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
    notificacion.className = 'w3-display-middle w3-center w3-button w3-green w3-round-large fadeinout';
    notificacion.innerHTML = "<h3>Guardado</h3>";
    aplicacion.appendChild(notificacion);
    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}