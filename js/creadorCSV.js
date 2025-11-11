function crearCSV() {

    let lineasCSV = [];

    if (proyectoActual.Viendo === "listado") {

        const nodosTablas = UI.listadoCont.querySelectorAll("table");

        nodosTablas.forEach(tabla => {

            // Buscar filas en thead            
            const label = tabla.querySelector("thead tr th label");

            lineasCSV.push(label.textContent.trim());

            // Buscar filas en tbody
            const filas = tabla.querySelectorAll("tbody tr");
            filas.forEach(fila => {
                const listaCeldas = fila.querySelectorAll("td, th"); // primera celda de la fila
                if (listaCeldas) {
                    if (listaCeldas.length > 1) {
                        const inputs = listaCeldas[1].querySelectorAll("input");
                        if (inputs) {
                            if (inputs.length > 1) {
                                lineasCSV.push(";" + inputs[1].value.trim() + ";" + inputs[2].value.trim() + ";" + fila.Numero);
                            }
                        }
                    }
                }
            });

            lineasCSV.push("");
        });
    }

    if (proyectoActual.Viendo === "estudio") {

        const nodosTablas = UI.estudioCont.querySelectorAll("table");
        nodosTablas.forEach(tabla => {

            // Obtener nombre del bloque y cantidad
            const nombreYcantidadBloque = tabla.querySelectorAll("thead tr th input");
            const nombreBloque = nombreYcantidadBloque[0].value
            const cantidadBloque = Number(nombreYcantidadBloque[1].value);
            const nombresBloquesProcesados = procesaNombres("", 1, nombreBloque, cantidadBloque);

            // Buscar filas en tbody para componer el listado de elementos del bloque
            let elemsBloque = [];

            const filas = tabla.querySelectorAll("tbody tr");
            filas.forEach(fila => {

                const nombreYcantidadElemento = fila.querySelectorAll("input");
                if (nombreYcantidadElemento.length > 0) {
                    if (nombreYcantidadElemento[0].checked) {

                        const nombreElemento = nombreYcantidadElemento[1].value
                        const cantidadElemento = Number(nombreYcantidadElemento[2].value);
                        const nombresElementosProcesados = procesaNombres("", 1, nombreElemento, cantidadElemento);

                        const numeroSeniales = fila.querySelectorAll("td");
                        const senialesEnTexto = Array.from(numeroSeniales)
                            .slice(1)                                               // excepto el primer td
                            .map(td => td.innerText === "-" ? "" : (Number(td.innerText) / cantidadElemento) / cantidadBloque)    // contenido de los td
                            .join(";")                                              // unidos por ;

                        nombresElementosProcesados.forEach(nombreProcesado => {
                            elemsBloque.push(nombreProcesado + ';;' + senialesEnTexto);
                        });
                    }
                }
            });

            // añadir el mismo bloque tantas veces como numero de bloques esten indicados, renombrando cada bloque
            nombresBloquesProcesados.forEach(nombreProcesado => {
                lineasCSV.push(nombreProcesado + ';;' + signalTypes.join(";"));
                lineasCSV.push(...elemsBloque);
                lineasCSV.push(...["", ""]); // dos lineas de separacion entre bloques
            });

        });

    }

    // Crear texto CSV
    const contenido = lineasCSV.join("\n");

    // Agregar BOM UTF-8 para Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + contenido], { type: "text/csv;charset=utf-8" });

    // Crear enlace temporal
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${nombreProyectoActual || "Proyecto"} - ${primeraMayusc(proyectoActual.Viendo)} de señales.csv`;
    enlace.click();

    // Liberar la URL
    URL.revokeObjectURL(enlace.href);

}