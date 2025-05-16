/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const blockSelect = document.getElementById("blockSelect");
const divEstudio = document.getElementById("divEstudio");
const divSummario = document.getElementById("divSummario");


/* ------------------------- CONSTANTES GLOBALES ------------------------- */


/* ------------------------- VARIABLES GLOBALES ------------------------- */
let checkboxChangeScheduled = false;


/* ------------------------- ESCUCHADORES ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    populateSelect();
    totalHeaderRow();
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
    deleteBtn.onclick = () => {
        table.remove();
        updateSummary();
    };

    const nameInput = inputNombre(blockSelect.value);
    const numberInput = inputNumero();
    numberInput.onchange = () => {
        const checkboxes = table.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
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

    for (const [name, value] of Object.entries(elements)) {

        const row = document.createElement("tr");
        const nameCell = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        const nameInput = inputNombre(name);
                
        const numberInput = inputNumero();       
        numberInput.onchange = () => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        };
        
        nameCell.appendChild(checkbox);
        nameCell.appendChild(numberInput);
        nameCell.appendChild(nameInput);
        row.appendChild(nameCell);

        /* ----- VERIFICAR SI HAY QUE PONER SELECT O NO -----*/

        let code = value;
        let select; // solo existirá si es un subobjeto
        let signalCounts;

        if (typeof value === "object" && value !== null) {
            // Crear select si el valor es un subobjeto
            select = document.createElement("select");
            select.className = "w3-select w3-border w3-small";
            select.style.display = "inline-block";
            select.style.width = "auto";
            select.style.marginLeft = "8px";

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
            nameCell.appendChild(select);
        }


        
        checkbox.checked = code === code.toUpperCase();

        const multiplierInput = table.querySelector("thead input[type='number']");
        signalCounts = countSignals(code);

        signalTypes.forEach(sig => {
            const cell = document.createElement("td");
            cell.classList.add(sig);
            // Multiplicar por el valor del input del thead
            const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
            cell.textContent = checkbox.checked
                ? (count === "-" ? "-" : count * multiplierInput.value * numberInput.value)
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
    nameInput.className = "w3-input w3-border w3-small";
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
    numberInput.className = "w3-input w3-border w3-small";
    numberInput.style.width = "60px";
    numberInput.style.marginLeft = "8px";
    numberInput.oninput = () => {
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    };
    return numberInput;
}