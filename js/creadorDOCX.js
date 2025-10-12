async function generarMemoriaDOCX() {
    const {
        Document, Paragraph, TextRun, HeadingLevel,
        AlignmentType, Packer, Header, Footer,
        PageBreak, TableOfContents
    } = docx;

    const mainColor = "#003366"; // color corporativo (igual que en PDF)
    const lineColor = "#AAAAAA";
    const now = new Date().toLocaleDateString();
    const proyecto = window.nombreProyectoActual || "Proyecto sin título";

    /* ---------------- PORTADA ---------------- */
    const portada = [
        new Paragraph({
            text: proyecto,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: "Memoria Técnica",
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
                        text: "ÍNDICE",
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
    const memoria = document.getElementById("memoria");
    if (!memoria) return alert("No se encontró el contenedor #memoria");
    const bloques = memoria.querySelectorAll(".bloque-memoria");
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
            children.push(new Paragraph({
                text: h3.textContent,
                heading: HeadingLevel.HEADING_2,
            }));

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
    link.download = `${proyecto} - Memoria.docx`;
    link.click();
    URL.revokeObjectURL(link.href);
}


/* crear HTML directamente abrible con word. 
 * La estetica no se parece a la generada por pdfMake,
 * No admite encabezados o pies de pagina
 * no dependemos de librerias
function descargarDoc() {
    // 1 Clonar el contenido de la memoria para no alterar el original
    const memoria = document.getElementById("memoria");
    if (!memoria) return alert("No se encontró el contenido de memoria.");

    const clone = memoria.cloneNode(true);

    // 2 Procesar selects → convertirlos en texto plano
    clone.querySelectorAll("select").forEach(sel => {
        const selected = sel.options[sel.selectedIndex]?.textContent || "";
        sel.replaceWith(document.createTextNode(selected));
    });

    // 3 Procesar checkboxes → dejar solo los seleccionados
    clone.querySelectorAll(".narrativa-checkbox-group").forEach(group => {
        const selectedLabels = Array.from(group.querySelectorAll("input[type='checkbox']:checked"))
            .map(input => input.parentElement.textContent.trim());
        if (selectedLabels.length) {
            const txt = selectedLabels.join(", ");
            group.replaceWith(document.createTextNode(txt));
        } else {
            group.remove(); // Si no hay ninguno seleccionado, eliminamos el bloque
        }
    });

    // 4 Eliminar etiquetas vacías o residuales
    clone.querySelectorAll("label, span").forEach(el => {
        if (!el.textContent.trim()) el.remove();
    });

    // 5 Armar el HTML final con estilos
    const contenido = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Memoria Técnica</title>
        <style>
          body {
              font-family: "Segoe UI", Arial, sans-serif;
              background-color: #fdfdfd;
              color: #333;
              margin: 2em;
              line-height: 1.5;
          }

          h1, h2, h3 {
              color: #005fa3;
          }

          h2 {
              border-bottom: 2px solid #0078D7;
              padding-bottom: 4px;
              margin-top: 30px;
          }

          ul {
              list-style: none;
              padding-left: 0;
          }

          li::before {
              content: "• ";
              color: #0078D7;
          }

          .bloque-memoria {
              margin-bottom: 2em;
              padding: 1em 1.5em;
              border-radius: 8px;
              background: #ffffff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          footer {
              text-align: center;
              font-size: 0.8em;
              color: #888;
              margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <h1 style="text-align:center;">Memoria Técnica de Instalación</h1>
        <main>
          ${clone.innerHTML}
        </main>
        <footer>Documento generado automáticamente</footer>
      </body>
      </html>
    `;

    // 6 Crear y descargar el archivo
    const blob = new Blob(['\ufeff', contenido], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Memoria_Tecnica.doc";
    document.body.appendChild(link);
    link.click();

    // 7 Limpieza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
*/
