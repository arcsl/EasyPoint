async function generarMemoriaDOCX() {
    const {
        Document, Paragraph, TextRun, HeadingLevel,
        AlignmentType, Packer, Header, Footer,
        PageBreak, TableOfContents
    } = docx;

    const mainColor = "#003366"; // color corporativo (igual que en PDF)
    const lineColor = "#AAAAAA";
    const now = new Date().toLocaleDateString();
    const proyecto = nombreProyectoActual || "Proyecto sin título";

    /* ---------------- PORTADA ---------------- */
    const portada = [
        new Paragraph({
            text: proyecto,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: "Memoria de Control",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: `Fecha de creación: ${now}`,
            alignment: AlignmentType.CENTER,
            spacing: { before: 200 },
        }),
    ];

    /* ---------------- CABECERA Y PIE ---------------- */
    const header = new Header({
        children: [
            new Paragraph({
                children: [new TextRun({ text: proyecto, bold: true, color: mainColor, size: 20 })],
                alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
                borderBottom: { color: lineColor, space: 1, size: 6 },
            }),
        ],
    });

    const footer = new Footer({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Creado con Easy Point V2.0  ·  https://easypoint.arcsl.com",
                        color: "#777777",
                        size: 18,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: now,
                        color: "#777777",
                        size: 18,
                    }),
                ],
                alignment: AlignmentType.RIGHT,
            }),
        ],
    });

    /* ---------------- DOCUMENTO BASE ---------------- */
    const doc = new Document({
        creator: "Easy Point V2.0",
        description: "Memoria de crontrol",
        title: proyecto,
        styles: {
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    run: { font: "Arial", size: 22, color: mainColor },
                    paragraph: { spacing: { line: 276 } },
                },
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    run: { size: 32, bold: true, color: mainColor },
                    paragraph: { spacing: { before: 300, after: 200 } },
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    run: { size: 26, bold: true, color: mainColor },
                    paragraph: { spacing: { before: 150, after: 100 } },
                },
            ],
        },
        sections: [
            {
                // Portada centrada vertical y horizontalmente
                properties: {
                    page: {
                        margin: { top: 6000, bottom: 1000, left: 1200, right: 1200 },
                    },
                },
                children: portada,
            },
            {
                properties: {
                    page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } }
                },
                children: [
                    new Paragraph({
                        text: "Índice",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 },
                    }),
                    new Paragraph({
                        children: [new TableOfContents("Sumario", { hyperlink: true })],
                    }),
                ],
            },
        ],
    });

    /* ---------------- CONTENIDO DESDE HTML ---------------- */
    if (!UI.memoriaCont) return alert("No se encontró el contenedor #memoria");
    const bloques = UI.memoriaCont.querySelectorAll(".bloque-memoria");
    const contenidoBloques = [];
    bloques.forEach((bloque, i) => {
        const children = [];

        // Título principal del bloque
        const h2 = bloque.querySelector("h2")?.textContent || "Sin título";
        children.push(new Paragraph({
            text: h2,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
            pageBreakBefore: i > 0, // salto solo a partir del segundo bloque
        }));

        // Subtítulos y párrafos
        bloque.querySelectorAll("h3").forEach(h3 => {

            // if (h3.textContent !== "") {
                children.push(new Paragraph({
                    text: h3.textContent,
                    heading: HeadingLevel.HEADING_2,
                }));
            // } 

            const siguiente = h3.nextElementSibling;
            if (siguiente && siguiente.tagName === "UL") {
                siguiente.querySelectorAll("li").forEach(li => {
                    children.push(new Paragraph({
                        text: li.textContent.trim(),
                        spacing: { before: 50, after: 50 },
                        indent: { left: 600 },
                    }));
                });
            }
        });

        contenidoBloques.push(...children);
    });

    doc.addSection({
        headers: { default: header },
        footers: { default: footer },
        children: contenidoBloques,
    });

    /* ---------------- DESCARGA ---------------- */
    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${proyecto} - Memoria de Control.docx`;
    link.click();
    URL.revokeObjectURL(link.href);
}