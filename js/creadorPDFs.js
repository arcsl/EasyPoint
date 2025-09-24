function crearPDF() {

    facilityName = portadaSelProyecSelect.value;
    headerText = portadaSelProyecSelect.value;

    const textosColumnas = ["", "", ...signalTypes];

    nombresColumnas = [];
    textosColumnas.forEach(texto => {
        nombresColumnas.push({ text: texto, fillColor: colorCabeceraTablasPDF });
    });

    let extraPages = [{ pageBreak: 'before', text: null }];

    const tables = estudioBloqCont.querySelectorAll("table");

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
        if (cantidadBloque > 1) {
            extPagElem.stack[0].table.body[0][0].text = nombreBloque + " (x" + cantidadBloque + ")";
        } else {
            extPagElem.stack[0].table.body[0][0].text = nombreBloque;
        }
        extPagElem.stack.push(tablaSeniales);
        extraPages.push(extPagElem);

    });

    const totalRow = estudioSumarioCont.querySelector("table tbody tr");

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
    pdfMake.createPdf(docDefinition).download(portadaSelProyecSelect.value + ' - Listado de Puntos.pdf');

}

function tablaSig() {
    return {
        table: {
            widths: anchosColumnas,
            body: [nombresColumnas]
        },
        alignment: 'center',
        margin: [10, 0, 10, 50],
        layout: {
            hLineWidth: function (i, node) {
                return (i === 1) ? 1 : 0; // línea sólo bajo la fila 1 (header)
            },
            vLineWidth: function (i, node) {
                return (i >= 2) ? 1 : 0; // línea vertical sólo entre columnas desde la 2
            },
            hLineColor: function (i, node) {
                return (i === 1) ? '#AAA' : null;
            },
            vLineColor: function (i, node) {
                return (i >= 2) ? '#AAA' : null;
            },
            paddingLeft: function (i, node) { return 4; },
            paddingRight: function (i, node) { return 4; },
        },
    };
}

function docDef() {
    return {
        // Portada
        content: [
            {
                text: facilityName,
                style: 'header',
                margin: [0, 200, 0, 20],
                alignment: 'center'
            },
            {
                text: 'Listado de puntos de control',
                style: 'subheader',
                alignment: 'center'
            },
            {
                text: 'Fecha creacion: ' + printDate,
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
                    { text: headerText, fontSize: 10, bold: true, alignment: 'right', margin: [0, 5, 0, 0] },
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
                            text: [
                                'Creado con ',
                                {
                                    text: 'Easy Point V1.2',
                                    link: 'https://easypoint.arcsl.com',
                                    color: 'blue',
                                    decoration: 'underline'
                                }
                            ],
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
                            { fontSize: 8, alignment: 'left', margin: [0, 0, 40, 0], text: 'Easy Point V1.0', },
                            { fontSize: 8, alignment: 'center', margin: [0, 0, 0, 0], text: `${currentPage - 1} de ${pageCount - 1}`, },
                            { fontSize: 8, alignment: 'right', margin: [0, 0, 0, 0], text: printDate, },
                        ]
                    }
                ]
            };
        },
        pageMargins: [40, 60, 40, 60]
    };
}

function extraPagesElem() {
    return {
        unbreakable: true,
        stack: [
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'NombreTabla',
                                fontSize: 18,
                                bold: true,
                                margin: [10, 5, 10, 0]
                            }
                        ]
                    ]
                },
                layout: 'noBorders',
                fillColor: colorCabeceraTablasPDF,
                margin: [10, 0, 10, 0]
            }
        ],
    }
}

