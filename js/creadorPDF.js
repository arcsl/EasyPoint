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

    const objDocumento = docDef(seccion);

    let textosColumnas = [];
    let tables = [];
    let anchosCols = [];

    // Configuración según sección
    if (seccion === "estudio") {
        textosColumnas = ["", "", ...signalTypes]; // cabecera de tablas de estudio
        tables = estudioBloqCont.querySelectorAll("table"); // tablas de estudio
    } else if (seccion === "listado") {
        textosColumnas = ["", ""];
        tables = document.querySelectorAll("#listadoSenialesCont table");
        anchosCols = ['*', 36];
    } else {
        console.error("Sección desconocida:", seccion);
        return;
    }

    // Construcción de nombres de columnas para PDF
    let nombresCols = textosColumnas.map(texto => ({ text: texto, fillColor: colorCabeceraTablasPDF }));

    let extraPages = [{ pageBreak: 'before', text: null }];

    tables.forEach(table => {

        // Crear tabla PDF con anchos y nombres de columnas específicos pero copiando la funcion layout
        let tablaPDF = JSON.parse(JSON.stringify(cuerpoTablaPDF(anchosCols, nombresCols, seccion)));
        tablaPDF.layout = (cuerpoTablaPDF(anchosCols, nombresCols, seccion)).layout;

        const bodyRows = table.querySelectorAll("tbody tr");

        bodyRows.forEach(linea => {
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

                let numeroSeñales = [];
                signalTypes.forEach(sig => {
                    const celdaSenial = linea.querySelector(`.${sig}`);
                    numeroSeñales.push(celdaSenial?.textContent || "");
                });

                tablaPDF.table.body.push([numeroSenial, celdaNombre, ...numeroSeñales]);

            } else if (seccion === "listado") {

                // Extraemos valor del segundo input dentro del segundo td
                const tdSegundo = linea.children[1];
                const inputs = tdSegundo.querySelectorAll('input');
                const valorSegundoInput = inputs[1]?.value || "";

                // Fila PDF: [valorSegundoInput, linea.Numero]
                tablaPDF.table.body.push([
                    { text: valorSegundoInput, alignment: 'left' },
                    { text: linea.Numero, alignment: 'center' }
                ]);
            }
        });

        // Título de tabla
        let tituloTabla = "";
        if (seccion === "estudio") {
            const nombreBloque = table.querySelector('[name="nombreBloque"]')?.value || "";
            const cantidadBloque = table.querySelector('[name="cantidadBloque"]')?.value || "";
            tituloTabla = cantidadBloque > 1 ? `${nombreBloque} (x${cantidadBloque})` : nombreBloque;
        } else if (seccion === "listado") {
            tituloTabla = table.querySelector('thead th label')?.textContent || "Tabla";
        }

        let extPagElem;
        if (seccion === "listado") {
            extPagElem = JSON.parse(JSON.stringify(extraPagesListado()));
            // cambiar el titulo en la segunda celdea de la primera fila de la tabla 
            extPagElem.stack[0].table.body[0][1].text = "Num.";
        } else {
            extPagElem = JSON.parse(JSON.stringify(tablaPDF()));
        }

        extPagElem.stack[0].table.body[0][0].text = tituloTabla;
        extPagElem.stack.push(tablaPDF);
        extraPages.push(extPagElem);
    });

    // --- Fila de totales ---
    if (seccion === "estudio") {
        // Totales por signalTypes, como en tu código original
        const totalRow = estudioSumarioCont.querySelector("table tbody tr");
        let tablaTotales = cuerpoTablaPDF(anchosCols, nombresCols, seccion);
        tablaTotales.layout = cuerpoTablaPDF(anchosCols, nombresCols, seccion).layout;

        let numeroTotalSeñales = [];
        signalTypes.forEach(sig => {
            const celdaSenial = totalRow.querySelector(`.${sig}`);
            numeroTotalSeñales.push(celdaSenial?.textContent || "");
        });

        tablaTotales.table.body.push(["", "", ...numeroTotalSeñales]);

        let extPagElemTotal = JSON.parse(JSON.stringify(tablaPDF()));
        extPagElemTotal.stack[0].table.body[0][0].text = "TOTAL";
        extPagElemTotal.stack.push(tablaTotales);
        extraPages.push(extPagElemTotal);

    }

    // Generar el PDF final

    objDocumento.content = objDocumento.content.concat(extraPages);
    pdfMake.createPdf(objDocumento).download(`${nombreProyectoActual} - ${seccion}.pdf`);
}


// portada del documento y estilo general
function docDef(seccion) {
    return {
        // Portada
        content: [
            {
                text: nombreProyectoActual,
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
            }
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
function tablaPDF(titulo, subtitulos, filaTipo) {

    // la tablaPDF es un stack indibisible compuesto por 2 tablas:
    // - titulo y subtitulos (de las columnas a la derecha)
    // - el resto de filas que es el listado de señales

    return {
        unbreakable: true,
        stack: [
            {
                table: {
                    widths: ['*', ...Array(subtitulos.length).fill(28)],
                    body: [
                        [
                            {
                                text: titulo,
                                fontSize: 18,
                                bold: true,
                                margin: [10, 5, 0, 0],
                            },
                            ...signalTypes.map(sig => ({
                                text: sig,
                                alignment: 'center', // ← corregido
                                margin: [-8, 12, 0, 0],
                            })),
                        ],
                    ]
                },
                layout: {
                    // Línea horizontal bajo la fila 1
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                        return (i === 1) ? '#AAA' : null;
                    }
                },
                fillColor: colorCabeceraTablasPDF,
            },
            {
                table: {
                    widths: [28, '*', ...Array(filaTipo.length - 2).fill(28)],
                    body: [filaTipo],
                },
                alignment: 'center',
                layout: {
                    // lineas verticales a partir de la columna 2
                    vLineWidth: function (i, node) {
                        return (i >= 2) ? 1 : 0;
                    },
                    vLineColor: function (i, node) {
                        return (i >= 2) ? '#AAA' : null;
                    },
                    // separacion lateral
                    paddingLeft: function (i, node) { return 4; },
                    paddingRight: function (i, node) { return 4; },
                },
            },
        ],
        margin: [10, 0, 10, 50],
    }
}
