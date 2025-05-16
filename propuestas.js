function addBody(table) {
    const tbody = document.createElement("tbody");
    const elements = blocksData[blockSelect.value];

    for (const [name, value] of Object.entries(elements)) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        nameCell.appendChild(checkbox);

        const nameInput = inputNombre(name);
        nameCell.appendChild(nameInput);

        const numberInput = inputNumero();
        nameCell.appendChild(numberInput);

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
            const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
            cell.textContent = checkbox.checked
                ? (count === "-" ? "-" : count * multiplierInput.value * numberInput.value)
                : "-";
            row.appendChild(cell);
        });

        // Evento cambio de checkbox
        checkbox.addEventListener("change", () => {
            updateRowCells(row, signalCounts, checkbox.checked, multiplierInput.value, numberInput.value);
        });

        // Evento cambio del select (si existe)
        if (select) {
            select.addEventListener("change", () => {
                const newCode = select.value;
                signalCounts = countSignals(newCode);
                updateRowCells(row, signalCounts, checkbox.checked, multiplierInput.value, numberInput.value);
            });
        }

        // Evento cambio del número individual
        numberInput.onchange = () => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        };

        tbody.appendChild(row);
    }

    return tbody;
}


function updateRowCells(row, signalCounts, isChecked, multiplier, units) {
    row.querySelectorAll("td").forEach(cell => {
        signalTypes.forEach(sig => {
            if (cell.classList.contains(sig)) {
                const count = signalCounts[sig] === 0 ? "-" : signalCounts[sig];
                cell.textContent = isChecked
                    ? (count === "-" ? "-" : count * multiplier * units)
                    : "-";
            }
        });
    });
}
