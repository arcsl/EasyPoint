/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const blockSelect = document.getElementById("blockSelect");
const divEstudio = document.getElementById("divEstudio");
const divSummario = document.getElementById("divSummario");



/* ------------------------- CONSTANTES GLOBALES ------------------------- */
const signalTypes = ["EA", "ED", "SA", "SD"];




/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;



/* ------------------------- ESCUCHADORES ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    populateSelect();
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

    divEstudio.style.display = "block";
    divSummario.style.display = "block";

    const table = document.createElement("table");
    table.className = "w3-table w3-bordered w3-margin-bottom";

    table.appendChild(addHeader(table));
    table.appendChild(addBody(table));

    divEstudio.appendChild(table);
    updateSummary();

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

    const titleTableRow = divSummario.querySelector("table thead tr");
    titleTableRow.innerHTML = "";

    const thTotal = document.createElement("th");
    thTotal.innerText = "TOTAL";
    titleTableRow.appendChild(thTotal);

    signalTypes.forEach(sig => {
        const thSig = document.createElement("th");
        thSig.innerText = sig;
        titleTableRow.appendChild(thSig);
    });

    const summaryTable = divSummario.querySelector("table tbody");

    // Limpio la fila existente (según tu DOM, solo una fila en tbody)
    summaryTable.innerHTML = "";

    // Inicializo total global para todos los tipos de señal
    const totalGlobal = {};
    signalTypes.forEach(sig => {
        totalGlobal[sig] = 0;
    });

    // Recorro todas las tablas dentro de divEstudio
    const tables = divEstudio.querySelectorAll("table");
    tables.forEach(table => {
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const checkbox = row.querySelector("input[type=checkbox]");
            if (!checkbox || !checkbox.checked) return;  // solo filas con checkbox checked

            const cells = row.querySelectorAll("td");

            signalTypes.forEach((sig, idx) => {
                // Para flexibilidad: si la tabla tiene menos columnas que señal, evita errores
                const cellText = cells[idx + 2]?.textContent;
                const val = parseInt(cellText) || 0;
                totalGlobal[sig] += val;
            });
        });
    });

    // Creo la fila resumen con los totales
    const summaryRow = document.createElement("tr");

    // Primera celda con texto "TOTAL"
    const nameCell = document.createElement("td");
    nameCell.textContent = "TOTAL";
    summaryRow.appendChild(nameCell);

    // Celdas con los totales globales según signalTypes
    signalTypes.forEach(sig => {
        const cell = document.createElement("td");
        cell.textContent = totalGlobal[sig];
        summaryRow.appendChild(cell);
    });

    summaryTable.appendChild(summaryRow);
}

function addHeader(table) {

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headerCell = document.createElement("th");
    headerCell.style.width = "calc(100% - 100px)";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "w3-button w3-red w3-small";
    deleteBtn.onclick = () => {
        table.remove();
        // updateSummary();
    };

    const nameInput = document.createElement("input");
    nameInput.className = "w3-input w3-border w3-small";
    nameInput.value = blockSelect.value;
    nameInput.style.display = "inline-block";
    nameInput.style.width = "500px";
    nameInput.style.marginLeft = "8px";

    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.style.display = "inline-block";
    numberInput.value = 1;
    numberInput.min = 1; // evita números negativos o cero si no son deseados
    numberInput.step = 1; // solo números enteros
    numberInput.className = "w3-input w3-border w3-small";
    numberInput.style.width = "60px";
    numberInput.style.marginLeft = "8px";
    numberInput.oninput = () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    };

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

    for (const [name, code] of Object.entries(elements)) {

        const row = document.createElement("tr");
        const nameCell = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = code === code.toUpperCase();

        const label = document.createElement("label");
        label.className = "w3-margin-left";
        label.innerText = name;

        nameCell.appendChild(checkbox);
        nameCell.appendChild(label);
        row.appendChild(nameCell);

        const multiplierInput = table.querySelector("thead input[type='number']");
        const signalCounts = countSignals(code);

        signalTypes.forEach(sig => {
            const cell = document.createElement("td");
            cell.classList.add(sig);
            // Multiplicar por el valor del input del thead
            const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
            cell.textContent = checkbox.checked
                ? (count === "-" ? "-" : count * (multiplierInput ? multiplierInput.value : 1))
                : "-";
            row.appendChild(cell);
        });

        checkbox.addEventListener("change", () => {
            row.querySelectorAll("td").forEach(cell => {
                signalTypes.forEach(sig => {
                    if (cell.classList.contains(sig)) {
                        const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
                        cell.textContent = checkbox.checked
                            ? (count === "-" ? "-" : count * (multiplierInput ? multiplierInput.value : 1))
                            : "-";
                    }
                });
            });
            updateSummary();
        });

        tbody.appendChild(row);
    }

    return tbody;
}