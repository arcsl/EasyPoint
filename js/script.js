/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const blockSelect = document.getElementById("blockSelect");
const divEstudio = document.getElementById("divEstudio");
const divSummario = document.getElementById("divSummario");


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;


/* ------------------------- ESCUCHADORES ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    populateSelect();
    totalHeaderRow();
    updateSummary();
    blockSelect.focus();
});

document.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        if (!checkboxChangeScheduled) {
            checkboxChangeScheduled = true;
            Promise.resolve().then(() => {
                updateSummary();
                checkboxChangeScheduled = false;
                console.log(document.body.innerHTML);
            });
        }
    }
});


/* ------------------------- FUNCIONES ------------------------- */
function populateSelect() {
    for (const type in blocksData) {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        blockSelect.appendChild(option);
    }
}

function addBlock() {

    if (!blockSelect.value) return;

    const table = document.createElement("table");
    table.className = "w3-table w3-bordered w3-margin-bottom";

    table.appendChild(addHeader(table));
    table.appendChild(addBody(table));
    divEstudio.appendChild(table);

    updateSummary();
    blockSelect.focus();

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

function addHeader(table) {

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

    const numberInput = inputNumero();
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
        th.textContent = sig;
        th.style.textAlign = "center";
        th.style.fontWeight = "bold";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    return thead;

}

function addBody(table) {

    const tbody = document.createElement("tbody");
    const elements = blocksData[blockSelect.value];

    for (const [name, value] of Object.entries(elements)) {

        // multiplicador general de la tabla
        const multiplierInput = table.querySelector("thead input[type='number']");

        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        row.appendChild(nameCell);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const nameInput = inputNombre(name);

        const numberInput = inputNumero();
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

function totalHeaderRow() {

    const sumTableHeadRow = divSummario.querySelector("table thead tr");
    sumTableHeadRow.innerHTML = "";

    const headEmpty = document.createElement("th");
    sumTableHeadRow.appendChild(headEmpty);

    signalTypes.forEach(sig => {
        const headTitle = document.createElement("th");
        headTitle.innerText = sig;
        sumTableHeadRow.appendChild(headTitle);
    });

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
