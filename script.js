/* ------------------------- REFERENCIAS AL DOM ------------------------- */
const blockSelect = document.getElementById("blockSelect");
const divEstudio = document.getElementById("divEstudio");



/* ------------------------- CONSTANTES GLOBALES ------------------------- */
const signalTypes = ["EA", "ED", "SA", "SD"];

/* ------------------------- VARIABLES GLOBALES ------------------------- */




/* ------------------------- PRINCIPAL ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    populateSelect();
});

function populateSelect() {
    for (const type in blocksData) {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        blockSelect.appendChild(option);
    }
}

/* ------------------------- BLOQUES ------------------------- */
function addBlock() {

    if (!blockSelect.value) return;

    const table = document.createElement("table");
    table.className = "w3-table w3-bordered w3-margin-bottom";
    table.style.maxWidth = "1000px";

    table.appendChild(addHeader(table));
    table.appendChild(addBody(table));

    divEstudio.appendChild(table);
    //updateSummary();

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
    const summaryTable = document.getElementById("summary-table").querySelector("tbody");
    summaryTable.innerHTML = "";

    const blocks = document.getElementById("blocks-container")?.children || [];

    for (const block of blocks) {
        const nameInput = block.querySelector("input");
        const rows = block.querySelectorAll("tbody tr");
        const total = { EA: 0, ED: 0, SA: 0, SD: 0 };

        rows.forEach(row => {
            const checkbox = row.querySelector("input[type=checkbox]");
            if (!checkbox.checked) return;

            const cells = row.querySelectorAll("td");
            ["EA", "ED", "SA", "SD"].forEach((sig, idx) => {
                total[sig] += parseInt(cells[idx + 2].textContent) || 0;
            });
        });

        const summaryRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = nameInput.value;
        summaryRow.appendChild(nameCell);

        ["EA", "ED", "SA", "SD"].forEach(sig => {
            const cell = document.createElement("td");
            cell.textContent = total[sig];
            cell.style.textAlign = "center";
            summaryRow.appendChild(cell);
        });

        summaryTable.appendChild(summaryRow);
    }
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
        label.classList.add("w3-margin-left");
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
            cell.style.textAlign = "center";
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