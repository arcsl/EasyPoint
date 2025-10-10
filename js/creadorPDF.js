/* ------------------------- GLOBALES ------------------------- */
const colorCabeceraTablasPDF = "#ddfaff"
const easyPie = {
    text: 'Easy Point V2.0',
    link: 'https://easypoint.arcsl.com',
    color: 'blue',
    decoration: 'underline'
}


/* ------------------------- FUNCIONES ------------------------- */
function crearPDF(seccion) {

    const docPDF = docPDFDef(nombreProyectoActual, seccion); // creamos el objeto principal con la estructura para pasarselo a PDFmake

    let tables = [];            // coleccion de tablas a iterar en funcion a la seccion elegida
    let tilulosColumnas = [];    // titulos de cabecera de cada columna

    if (seccion === "estudio") {
        tilulosColumnas = ["", "", ...signalTypes];
        tables = estudioBloqCont.querySelectorAll("table");

    } else if (seccion === "listado") {
        tilulosColumnas = ["", "", "Num."];
        tables = listadoSenialesCont.querySelectorAll("table");

    } else {
        alert("❌ Error: no se pudo generar el PDF");
        console.error("Sección desconocida:", seccion);
        return;
    }

    tables.forEach(table => {

        let tituloTabla = "";

        if (seccion === "estudio") {
            const cabeceraInputs = table.querySelectorAll('thead th input');
            const nombreBloque = cabeceraInputs[0]?.value || "Tabla";
            const cantidadBloque = Number(cabeceraInputs[1]?.value) || 1;
            tituloTabla = cantidadBloque > 1 ? `${nombreBloque} (x${cantidadBloque})` : nombreBloque;

        } else if (seccion === "listado") {
            tituloTabla = table.querySelector('thead th label')?.textContent || "Tabla";
        }

        const tablaPDF = tablaPDFdef(tituloTabla, [...tilulosColumnas]); // creamos el objeto tabla 

        table.querySelectorAll("tbody tr").forEach((linea, indexLinea) => {

            const filasPDF = filasPDFdef(tilulosColumnas.length); // creamos el objeto filas 

            if (seccion === "estudio") {

                const checkbox = linea.querySelector('input[type="checkbox"]');
                if (!checkbox || !checkbox.checked) return;

                const numeroSenial = linea.querySelector('[name="numeroSenial"]')?.value || "";
                const nombreSenial = linea.querySelector('[name="nombreSenial"]')?.value || "";
                const opcionSenial = linea.querySelector('[name="opcionSenial"]');

                const opcionTexto = opcionSenial?.options[opcionSenial.selectedIndex]?.text || "";

                const textoCeldaNombre = opcionTexto
                    ? `${nombreSenial} ( ${opcionTexto} )`
                    : nombreSenial;

                const celdaNombre = { text: textoCeldaNombre, alignment: 'left' };

                let numeroSeñales = signalTypes.map(sig => linea.querySelector(`.${sig}`)?.textContent || "");

                filasPDF.table.body.push([...[numeroSenial, celdaNombre, ...numeroSeñales]]); // añadimos la fila al objeto filas

            } else if (seccion === "listado") {
                const nombreSenial = linea.querySelector('td:nth-child(2) input:nth-of-type(2)').value;                // segundo input dentro del segundo td
                const cantidadSenial = linea.Numero;
                filasPDF.table.body.push([...[indexLinea + 1, { text: nombreSenial, alignment: 'left' }, cantidadSenial]]); // añadimos la fila al objeto filas

            }

            tablaPDF.stack.push(filasPDF); // añadimos el objeto filas al objeto tabla

        });

        docPDF.content.push(tablaPDF); // añadimos el objeto tabla al objeto documento

    });

    // --- Fila de totales ---

    // elejimos la seccion en la que leer los totales
    const totalRow = seccion === "estudio"
        ? estudioSumarioCont.querySelector("table tbody tr")
        : listadoSumarioCont.querySelector("table tbody tr");

    // montamos el array con el total de cada señal
    let numeroTotalSeñales = [];
    signalTypes.forEach(sig => {
        const celdaSenial = totalRow.querySelector(`.${sig}`);
        numeroTotalSeñales.push(celdaSenial?.textContent || "");
    });

    const tablaTotalesPDF = tablaPDFdef("Totales", ["", "", ...signalTypes]); // creamos el objeto tabla con la cabecera de los tipos de señal
    tablaTotalesPDF.stack[0].table.body.push(                           // añadimos a la tabla el objeto representando la fila con el total de cada tipo de señal
        [
            {
                text: "",
                fontSize: 12,
                colSpan: 2,
            },
            {}, // celda vacia para el colspan
            ...numeroTotalSeñales.map(numero => ({
                text: numero,
                alignment: 'center', // ← corregido
                margin: [-8, 4, 0, 4],
            })),
        ],
    );

    docPDF.content.push(tablaTotalesPDF); // añadimos el objeto tablaTotalesPDF al objeto documento
    pdfMake.createPdf(docPDF).download(`${nombreProyectoActual} - ${seccion}.pdf`);     // Generar el PDF final

}


// portada del documento y estilo general
function docPDFDef(proyecto, seccion) {
    return {
        // Portada
        content: [
            {
                text: proyecto,
                style: 'header',
                margin: [0, 200, 0, 20],
                alignment: 'center'
            },
            {
                text: `${seccion.charAt(0).toUpperCase() + seccion.slice(1).toLowerCase()} de puntos de control`,
                style: 'subheader',
                alignment: 'center'
            },
            {
                text: 'Fecha creacion: ' + new Date().toLocaleDateString(),
                margin: [0, 20, 0, 0],
                alignment: 'center'
            },
            {
                pageBreak: 'before',
                text: null,
            },
        ],
        defaultStyle: {
            color: '#003366',
            fontSize: 11,
        },
        styles: {
            header: {
                fontSize: 24,
                bold: true,
            },
            subheader: {
                fontSize: 18,
                italics: true,
            },
        },
        header: function (currentPage, pageCount) {
            if (currentPage === 1) return ''; // sin cabecera en portada
            return {
                margin: [40, 20, 40, 10],
                stack: [
                    { text: nombreProyectoActual, fontSize: 10, bold: true, alignment: 'right', margin: [0, 5, 0, 0] },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5 }] },
                ]
            };
        },
        footer: function (currentPage, pageCount) {
            if (currentPage === 1) {
                return {
                    columns: [
                        { text: '', alignment: 'left', },
                        {
                            text: ['Creado con: ', easyPie],
                            alignment: 'right',
                            fontSize: 8,
                            margin: [0, 0, 40, 0],
                        }
                    ]
                };
            }
            return {
                margin: [40, 10, 40, 20],
                stack: [
                    {
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5 }],
                        margin: [0, 0, 0, 5],
                    },
                    {
                        columns: [
                            { fontSize: 8, alignment: 'left', margin: [0, 0, 40, 0], text: [easyPie], },
                            { fontSize: 8, alignment: 'center', margin: [0, 0, 0, 0], text: `${currentPage - 1} de ${pageCount - 1}`, },
                            { fontSize: 8, alignment: 'right', margin: [0, 0, 0, 0], text: new Date().toLocaleDateString(), },
                        ]
                    }
                ]
            };
        },
        pageMargins: [40, 60, 40, 60]
    };
}

/**
 * Genera un bloque de tabla para PDF con un título y subtítulos (columnas de señales).
 * @param {string} titulo - El texto que se mostrará como título de la tabla.
 * @param {string[]} subtitulos - Array de subtítulos (por ejemplo nombres de señales) que se mostrarán en la primera fila.
 * @returns {object} Objeto de definición de tabla para pdfMake, con formato y estilos aplicados.
 */
function tablaPDFdef(titulo, subtitulos) {

    // la tablaPDF es un stack indibisible compuesto por 2 tablas:
    // - titulo y subtitulos (de las columnas a la derecha)
    // - el resto de filas que es el listado de señales

    return {
        unbreakable: true,
        stack: [
            {
                table: {
                    widths: [28, '*', ...Array(subtitulos.length - 2).fill(28)],
                    body: [
                        [
                            {
                                text: titulo,
                                fontSize: 16,
                                bold: true,
                                margin: [10, 5, 0, 0],
                                colSpan: 2,
                            },
                            {}, // celda vacia para el colspan
                            ...subtitulos.slice(2).map(sub => ({
                                text: sub,
                                alignment: 'center', // ← corregido
                                margin: [-8, 12, 0, 0],
                            })),
                        ],
                    ]
                },
                layout: {

                    // lineas verticales no
                    vLineWidth: function (i, node) { return 0; },
                    vLineColor: function (i, node) { return null; },

                    // Línea horizontal bajo la fila 1
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                        return (i === 1) ? '#AAA' : null;
                    },
                },
                fillColor: colorCabeceraTablasPDF,
            },

        ],
        margin: [10, 0, 10, 50],
    }
}

function filasPDFdef(numeroColumnas) {
    return {
        table: {
            widths: [28, '*', ...Array(numeroColumnas - 2).fill(28)],
            body: [],
        },
        alignment: 'center',
        layout: {

            // lineas verticales a partir de la columna 2
            vLineWidth: function (i, node) { return (i >= 2) ? 1 : 0; },
            vLineColor: function (i, node) { return (i >= 2) ? '#AAA' : null; },

            // Línea horizontal no
            hLineWidth: function (i, node) { return 0; },
            hLineColor: function (i, node) { return null; },

            // separacion lateral
            // paddingLeft: function (i, node) { return 14; },
            // paddingRight: function (i, node) { return 14; },
        },
    };
}