/// <reference path="DXFbasicos.js" />
/// <reference path="DXFdispositivos.js" />
/// <reference path="DXFsimbolos.js" />

// === CAJETIN ===
function cajetin(posX, posY, infoCajetin = {}) {

    const {
        Inst = '-',
        Dibu = '-',
        Fech = '-',
        Revi = '-',
        Esqu = '-',
        Clie = '-',
        Loca = '-',
        Stye = '-',
        Stdo = '-',
        Refe = '-',
        Hoja = '-',
    } = infoCajetin;

    const entidades = [];

    // cuadrado externo
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 280, 40));
    entidades.push(lineaDXF(posX + 0, posY + 280, posX + 400, posY + 280, 40));
    entidades.push(lineaDXF(posX + 400, posY + 280, posX + 400, posY + 0, 40));
    entidades.push(lineaDXF(posX + 400, posY + 0, posX + 0, posY + 0, 40));

    // cuadrado cajetin
    entidades.push(lineaDXF(posX + 200, posY + 0, posX + 200, posY + 40, 40));
    entidades.push(lineaDXF(posX + 400, posY + 40, posX + 200, posY + 40, 40));


    entidades.push(lineaDXF(posX + 400, posY + 36, posX + 200, posY + 36));
    entidades.push(lineaDXF(posX + 400, posY + 32, posX + 200, posY + 32));
    entidades.push(lineaDXF(posX + 400, posY + 28, posX + 200, posY + 28));

    entidades.push(lineaDXF(posX + 400, posY + 16, posX + 230, posY + 16));
    entidades.push(lineaDXF(posX + 382, posY + 12, posX + 230, posY + 12));
    entidades.push(lineaDXF(posX + 400, posY + 8, posX + 230, posY + 8));
    entidades.push(lineaDXF(posX + 382, posY + 4, posX + 230, posY + 4));


    entidades.push(lineaDXF(posX + 230, posY + 0, posX + 230, posY + 40));

    entidades.push(lineaDXF(posX + 268, posY + 40, posX + 268, posY + 28));
    entidades.push(lineaDXF(posX + 306, posY + 40, posX + 306, posY + 28));

    entidades.push(lineaDXF(posX + 268, posY + 16, posX + 268, posY + 0));
    entidades.push(lineaDXF(posX + 306, posY + 16, posX + 306, posY + 0));
    entidades.push(lineaDXF(posX + 344, posY + 16, posX + 344, posY + 0));
    entidades.push(lineaDXF(posX + 382, posY + 16, posX + 382, posY + 0));

    // A
    entidades.push(solidDXF([[posX + 210, posY + 18], [posX + 210, posY + 21], [posX + 219, posY + 18], [posX + 219, posY + 21]]));
    entidades.push(solidDXF([[posX + 210, posY + 21], [posX + 210, posY + 23], [posX + 214, posY + 21], [posX + 214, posY + 23]]));
    entidades.push(solidDXF([[posX + 215, posY + 21], [posX + 215, posY + 24], [posX + 219, posY + 21], [posX + 219, posY + 24]]));
    entidades.push(solidDXF([[posX + 210, posY + 24], [posX + 210, posY + 27], [posX + 219, posY + 24], [posX + 219, posY + 27]]));
    // R
    entidades.push(solidDXF([[posX + 220, posY + 18], [posX + 220, posY + 27], [posX + 224, posY + 18], [posX + 224, posY + 27]]));
    entidades.push(solidDXF([[posX + 224, posY + 24], [posX + 224, posY + 27], [posX + 225, posY + 24], [posX + 225, posY + 27]]));
    entidades.push(solidDXF([[posX + 225, posY + 22], [posX + 225, posY + 27], [posX + 229, posY + 22], [posX + 229, posY + 27]]));
    // C
    entidades.push(solidDXF([[posX + 220, posY + 8], [posX + 220, posY + 17], [posX + 224, posY + 8], [posX + 224, posY + 17]]));
    entidades.push(solidDXF([[posX + 224, posY + 8], [posX + 224, posY + 11], [posX + 225, posY + 8], [posX + 225, posY + 11]]));
    entidades.push(solidDXF([[posX + 224, posY + 14], [posX + 224, posY + 17], [posX + 225, posY + 14], [posX + 225, posY + 17]]));
    entidades.push(solidDXF([[posX + 225, posY + 8], [posX + 225, posY + 12], [posX + 229, posY + 8], [posX + 229, posY + 12]]));
    entidades.push(solidDXF([[posX + 225, posY + 13], [posX + 225, posY + 17], [posX + 229, posY + 13], [posX + 229, posY + 17]]));


    //textos fijos
    entidades.push(textoDXF(posX + 201, posY + 16, "ARC S.L.", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 13, "Urazandi", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 10, "Industrialdea,", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 7, "Pabellón 6D", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 4, "Asua-Erandio (Vizcaya)", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 1, "www.arcsl.com", 2, "ML"));
    entidades.push(textoDXF(posX + 249, posY + 14, "Dibujado", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 10, "Fecha", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 6, "Revisado", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 2, "Esquema", 2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 14, "Cliente", 2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 10, "Localidad", 2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 6, "Sustituye a", 2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 2, "Sustituido por", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 38, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 34, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 30, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 38, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 34, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 30, "-", 2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 30, "Revisión 1", 2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 34, "Revisión 2", 2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 38, "Revisión 3", 2, "MC"));
    entidades.push(textoDXF(posX + 308, posY + 30, "-", 2, "ML"));
    entidades.push(textoDXF(posX + 308, posY + 34, "-", 2, "ML"));
    entidades.push(textoDXF(posX + 308, posY + 38, "-", 2, "ML"));
    entidades.push(textoDXF(posX + 391, posY + 14, "Hoja", 2, "MC"));
    entidades.push(textoDXF(posX + 391, posY + 6, "Ref.", 2, "MC"));

    // textos rellenables
    entidades.push(textoDXF(posX + 315, posY + 22, Inst, 5, "MC"));

    entidades.push(textoDXF(posX + 287, posY + 14, Dibu, 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 10, Fech, 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 6, Revi, 2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 2, Esqu, 2, "MC"));

    entidades.push(textoDXF(posX + 363, posY + 14, Clie, 2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 10, Loca, 2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 6, Stye, 2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 2, Stdo, 2, "MC"));


    entidades.push(textoDXF(posX + 391, posY + 2, Refe, 2, "MC"));
    entidades.push(textoDXF(posX + 391, posY + 10, Hoja, 2, "MC"));

    return entidades;

}

function logoARC(posX, posY) {

    const entidades = [];

    entidades.push(solidDXF([[posX + 210, posY + 18], [posX + 210, posY + 21], [posX + 219, posY + 18], [posX + 219, posY + 21]]));
    entidades.push(solidDXF([[posX + 210, posY + 21], [posX + 210, posY + 23], [posX + 214, posY + 21], [posX + 214, posY + 23]]));
    entidades.push(solidDXF([[posX + 215, posY + 21], [posX + 215, posY + 24], [posX + 219, posY + 21], [posX + 219, posY + 24]]));
    entidades.push(solidDXF([[posX + 210, posY + 24], [posX + 210, posY + 27], [posX + 219, posY + 24], [posX + 219, posY + 27]]));

    entidades.push(solidDXF([[posX + 220, posY + 18], [posX + 220, posY + 27], [posX + 224, posY + 18], [posX + 224, posY + 27]]));
    entidades.push(solidDXF([[posX + 224, posY + 24], [posX + 224, posY + 27], [posX + 225, posY + 24], [posX + 225, posY + 27]]));
    entidades.push(solidDXF([[posX + 225, posY + 22], [posX + 225, posY + 27], [posX + 229, posY + 22], [posX + 229, posY + 27]]));

    entidades.push(solidDXF([[posX + 220, posY + 8], [posX + 220, posY + 17], [posX + 224, posY + 8], [posX + 224, posY + 17]]));
    entidades.push(solidDXF([[posX + 224, posY + 8], [posX + 224, posY + 11], [posX + 225, posY + 8], [posX + 225, posY + 11]]));
    entidades.push(solidDXF([[posX + 224, posY + 14], [posX + 224, posY + 17], [posX + 225, posY + 14], [posX + 225, posY + 17]]));
    entidades.push(solidDXF([[posX + 225, posY + 8], [posX + 225, posY + 12], [posX + 229, posY + 8], [posX + 229, posY + 12]]));
    entidades.push(solidDXF([[posX + 225, posY + 13], [posX + 225, posY + 17], [posX + 229, posY + 13], [posX + 229, posY + 17]]));

    return entidades;

}


// === AUXILIARES ===
function XX_Externa(posX, posY, Linea1, Linea2, desG0 = 0) {

    const entidades = [];
    entidades.push(...paloDesplazable(posX, posY, 0, 0));
    entidades.push(...paloDesplazable(posX - 4, posY, 0, desG0));
    entidades.push(textoMultiDXF(posX - 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));
    return entidades;

}

function paloDesplazable(posX, posY, desX = 0, desY = 0) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));

    if (desX === 0) {
        entidades.push(lineaDXF(posX + 0, posY - 104, posX + 0, posY - desY));
        if (desY !== 0) entidades.push(punto(posX, posY - desY));
    } else {
        entidades.push(lineaDXF(posX + 0, posY - 104, posX + 0, posY - 66));
        entidades.push(lineaDXF(posX + 0, posY - 66, posX + desX, posY - 66));
        entidades.push(lineaDXF(posX + desX, posY - 66, posX + desX, posY + 0));
    }

    return entidades;

}

function dispEnvolv(posX, posY, textos = ["G", "G0", "Y"]) {

    const entidades = [];

    const paso = 4;

    const ancho = textos.length * paso;

    // envolvente horizontales
    entidades.push(lineaDXF(posX + 2, posY - 116, posX + 2 - ancho, posY - 116, 40));
    entidades.push(lineaDXF(posX + 2, posY - 132, posX + 2 - ancho, posY - 132, 40));

    // envolvente verticales
    entidades.push(lineaDXF(posX + 2 - ancho, posY - 116, posX + 2 - ancho, posY - 132, 40));
    entidades.push(lineaDXF(posX + 2, posY - 132, posX + 2, posY - 116, 40));

    // textos elemento de campo
    textos.forEach((texto, indexTexto) => {
        entidades.push(textoDXF(posX - (textos.length - indexTexto - 1) * paso, posY - 118, texto, 2.5, "MC", 0, "Standard", 0.8));
    });

    return entidades;


}

function valvula(posX, posY, text1, text2, text3) {

    const entidades = [];

    entidades.push(...dispEnvolv(posX, posY, [text1, text2, text3]));

    // textos elemento de campo
    entidades.push(textoDXF(posX - 4, posY - 124, "M", 2.5, "MC"));
    entidades.push(textoDXF(posX - 6, posY - 127, "1", 2.5, "MC"));
    entidades.push(textoDXF(posX - 2, posY - 127, "~", 2.5, "MC"));

    // dibujo elemento de campo
    entidades.push(lineaDXF(posX - 8, posY - 122, posX - 8, posY - 120));
    entidades.push(lineaDXF(posX - 4, posY - 121, posX - 4, posY - 120));
    entidades.push(lineaDXF(posX + 0, posY - 122, posX + 0, posY - 120));
    entidades.push(lineaDXF(posX - 8, posY - 122, posX - 7.536, posY - 122.464));
    entidades.push(lineaDXF(posX - 0.464, posY - 122.464, posX + 0, posY - 122,));
    entidades.push(circunferenciaDXF(posX - 4, posY - 126, 5));

    return entidades;

}

function ED_Rele(posX, posY, Linea1, Linea2, id, c1, c2, anchoId = 1, desG0 = 0, digLogo24 = false) {

    const entidades = [];

    const desComun = desG0 + (digLogo24 ? -4 : 0);


    entidades.push(lineaDXF(posX + 0, posY - 58, posX - 4, posY - 58));
    entidades.push(lineaDXF(posX - 4, posY - 46, posX - 6, posY - 42));
    entidades.push(lineaDXF(posX - 4, posY - 42, posX - 4, posY - desComun));
    entidades.push(lineaDXF(posX - 4, posY - 58, posX - 4, posY - 46));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 58));

    // punto sobre G0
    if (desComun !== 0) entidades.push(punto(posX - 4, posY - desComun));

    const desX = anchoId < 1 ? 1 : 0;

    // identificacion contacto
    entidades.push(textoDXF(posX - 6 - desX, posY - 44, id, 2.5, "MR", 0, "Standard", anchoId));
    entidades.push(textoDXF(posX - 5, posY - 40, c1, 1.5, "MR"));
    entidades.push(textoDXF(posX - 5, posY - 48, c2, 1.5, "MR"));

    // texto señal
    entidades.push(textoMultiDXF(posX - 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function Bus_LTE(posX, posY, Linea1, Linea2) {

    const entidades = [];

    // recuadro
    entidades.push(lineaDXF(posX + 4, posY, posX + 4, posY - 194, -1, "DASHED", 0.25));
    entidades.push(lineaDXF(posX + 4, posY - 194, posX - 12, posY - 194, -1, "DASHED", 0.25));
    entidades.push(lineaDXF(posX - 12, posY - 194, posX - 12, posY, -1, "DASHED", 0.25));

    // Texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;
}


// === EA ===
function EA_1_Pasiva(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    entidades.push(...XX_Externa(posX, posY, Linea1, Linea2, desG0));

    // dibujo interno elemento de campo
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX - 4, posY - 120, posX - 4, posY - 122));
    entidades.push(lineaDXF(posX - 5, posY - 122, posX - 3, posY - 122));
    entidades.push(lineaDXF(posX - 3, posY - 122, posX - 3, posY - 128));
    entidades.push(lineaDXF(posX - 3, posY - 128, posX - 5, posY - 128));
    entidades.push(lineaDXF(posX - 5, posY - 128, posX - 5, posY - 122));
    entidades.push(lineaDXF(posX - 2, posY - 123, posX - 6, posY - 127));
    entidades.push(lineaDXF(posX - 4, posY - 128, posX - 4, posY - 130));
    entidades.push(lineaDXF(posX - 4, posY - 130, posX + 0, posY - 130));
    entidades.push(lineaDXF(posX + 0, posY - 130, posX + 0, posY - 120));

    entidades.push(...dispEnvolv(posX, posY, ["M", "B"]));

    return entidades;
}

function EA_1_Externa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    const entidades = [];
    entidades.push(...XX_Externa(posX, posY, Linea1, Linea2, desG0));
    entidades.push(textoDXF(posX - 4, posY - 118, "-", 2.5, "MC"));
    entidades.push(textoDXF(posX + 0, posY - 118, "+", 2.5, "MC"));
    return entidades;
}

function EA_1_Bus_LTE(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    return Bus_LTE(posX, posY, Linea1, Linea2);
}

function EA_1_Activa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // conexiones verticales
    entidades.push(...paloDesplazable(posX - 8, posY, 0, desG)); // G
    entidades.push(...paloDesplazable(posX - 4, posY, 0, desG0)); // G0
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0)); // U

    // material de campo
    entidades.push(...dispEnvolv(posX, posY, ["G", "M", "U"]));

    // Texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;
}

function EA_2_Activa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // conexiones verticales
    entidades.push(...paloDesplazable(posX - 8, posY, 0, desG)); // G
    entidades.push(...paloDesplazable(posX - 4, posY, 0, desG0)); // G0
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0)); // U1
    entidades.push(...paloDesplazable(posX + 4, posY, 12, 0)); // U2

    // material de campo
    entidades.push(...dispEnvolv(posX + 4, posY, ["G", "M", "U1", "U2"]));

    // Texto señal
    entidades.push(textoMultiDXF(posX - 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;
}

function EA_3_Activa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // conexiones verticales
    entidades.push(...paloDesplazable(posX + 4, posY, 0, desG)); // G
    entidades.push(...paloDesplazable(posX + 8, posY, 0, desG0)); // G0
    entidades.push(...paloDesplazable(posX + 12, posY, -12, 0)); // U1
    entidades.push(...paloDesplazable(posX + 16, posY, 0, 0)); // U2
    entidades.push(...paloDesplazable(posX + 20, posY, 12, 0)); // U3

    // material de campo
    entidades.push(...dispEnvolv(posX + 20, posY, ["G", "M", "U1", "U2", "U3"]));

    // Texto señal
    entidades.push(textoMultiDXF(posX + 12, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}


// === ED ===
function ED_1_Externa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0, digLogo24 = false) {
    const entidades = [];
    const desComun = desG0 + (digLogo24 ? -4 : 0);
    entidades.push(...XX_Externa(posX, posY, Linea1, Linea2, desComun));
    return entidades;
}

function ED_1_Rele(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0, digLogo24 = false) {

    const entidades = [];

    // entrada rele base
    entidades.push(...ED_Rele(posX, posY, Linea1, Linea2, `R${tagNumber}`, "13", "14", 1, desG0, digLogo24));

    return entidades;

}

function ED_1_Contactor(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0, digLogo24 = false) {

    const entidades = [];

    // entrada rele base
    entidades.push(...ED_Rele(posX, posY, Linea1, Linea2, `KM${tagNumber}`, "13", "14", 1, desG0, digLogo24));

    return entidades;

}

function ED_1_Termico(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0, digLogo24 = false) {

    const entidades = [];

    // entrada rele base
    entidades.push(...ED_Rele(posX, posY, Linea1, Linea2, `FKM${tagNumber}`, "97", "98", 0.8, desG0, digLogo24));

    // simbolo termico
    entidades.push(lineaDXF(posX - 5, posY - 44, posX - 5.671, posY - 44.335, 0));
    entidades.push(lineaDXF(posX - 5.671, posY - 44.335, posX - 6.006, posY - 43.665, 0));
    entidades.push(lineaDXF(posX - 6.006, posY - 43.665, posX - 6.677, posY - 44, 0));
    entidades.push(lineaDXF(posX - 6.342, posY - 44.671, posX - 6.677, posY - 44, 0));
    entidades.push(lineaDXF(posX - 6.342, posY - 44.671, posX - 7.012, posY - 45.006, 0));

    return entidades;

}

function ED_1_Bus_LTE(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    return Bus_LTE(posX, posY, Linea1, Linea2);
}


// === SA ===
function SA_1_Externa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    const entidades = [];

    entidades.push(...XX_Externa(posX, posY, Linea1, Linea2, desG0));

    entidades.push(textoDXF(posX - 4, posY - 118, "-", 2.5, "MC"));
    entidades.push(textoDXF(posX + 0, posY - 118, "+", 2.5, "MC"));

    return entidades;
}

function SA_1_Actuador(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0));
    entidades.push(...paloDesplazable(posX - 4, posY, 0, desG0));
    entidades.push(...paloDesplazable(posX - 8, posY, 0, desG));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX, posY, "G", "G0", "Y"));

    // Texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;
}

function SA_1_Bus_LTE(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    return Bus_LTE(posX, posY, Linea1, Linea2);
}


// === SD ===
function SD_1_Externa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    const entidades = [];
    entidades.push(...paloDesplazable(posX - 4, posY, -4, 4));
    entidades.push(...paloDesplazable(posX, posY, 0, 0));
    entidades.push(textoMultiDXF(posX - 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));
    return entidades;
}

function SD_1_Selector_Base(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // 3 posiciones
    entidades.push(textoDXF(posX - 9.5, posY - 55, "1", 1, "MC", 0));
    entidades.push(textoDXF(posX - 8, posY - 55, "0", 1, "MC", 0));
    entidades.push(textoDXF(posX - 6.5, posY - 55, "2", 1, "MC", 0));
    entidades.push(lineaDXF(posX - 8, posY - 60, posX - 9.5, posY - 56));
    entidades.push(lineaDXF(posX - 8, posY - 60, posX - 8, posY - 56, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX - 8, posY - 60, posX - 6.5, posY - 56, -1, "DASHED", 0.1));

    // palomilla selector
    entidades.push(lineaDXF(posX - 9.5, posY - 57, posX - 10, posY - 57));
    entidades.push(lineaDXF(posX - 10, posY - 57, posX - 10, posY - 59));
    entidades.push(lineaDXF(posX - 10, posY - 59, posX - 10.5, posY - 59));
    entidades.push(lineaDXF(posX - 10, posY - 58, posX - 0.75, posY - 58, -1, "DASHED", 0.1));

    // 2 contactos
    entidades.push(lineaDXF(posX - 0, posY - 60, posX - 1.5, posY - 56));
    entidades.push(lineaDXF(posX - 4, posY - 60, posX - 5.5, posY - 56));

    //L inferior selector
    entidades.push(lineaDXF(posX - 4, posY - 66, posX + 0, posY - 66));
    entidades.push(lineaDXF(posX - 4, posY - 66, posX - 4, posY - 60));
    entidades.push(punto(posX + 0, posY - 66));

    return entidades;

}

function SD_1_Rele_Base(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // Selector
    entidades.push(...SD_1_Selector_Base(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // rectangulo rele/contactor
    entidades.push(lineaDXF(posX - 4, posY - 90, posX - 4, posY - 94));
    entidades.push(lineaDXF(posX - 4, posY - 94, posX + 4, posY - 94));
    entidades.push(lineaDXF(posX + 4, posY - 94, posX + 4, posY - 90));
    entidades.push(lineaDXF(posX + 4, posY - 90, posX - 4, posY - 90));

    // A2 de rele/contactor a neutro y punto de union
    entidades.push(lineaDXF(posX + 0, posY - 94, posX + 0, posY - 100));
    entidades.push(punto(posX + 0, posY - 100));

    // Texto señal
    entidades.push(textoMultiDXF(posX + 0, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_Rele(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // Maniobra normal 230V
    entidades.push(lineaDXF(posX + 0, posY - 0, posX + 0, posY - 56));
    entidades.push(lineaDXF(posX - 4, posY - 4, posX - 4, posY - 56));
    entidades.push(lineaDXF(posX - 8, posY - 4, posX - 8, posY + 0));
    entidades.push(punto(posX - 4, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // rele base
    entidades.push(...SD_1_Rele_Base(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // sin magneto
    entidades.push(lineaDXF(posX + 0, posY - 60, posX + 0, posY - 90));

    // Nombre relé
    entidades.push(textoDXF(posX - 1, posY - 88, `R${tagNumber}`, 2.5, "MR", 0));


    return entidades;

}

function SD_1_Magneto(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // proteccion magneto
    entidades.push(textoDXF(posX - 2, posY - 78, `FKM${tagNumber}`, 2.5, "MR", 0));
    entidades.push(textoDXF(posX - 1, posY - 75, "95", 1, "MC", 0));
    entidades.push(textoDXF(posX - 1, posY - 81, "96", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 80, posX + 2.45, posY - 75.1));
    entidades.push(lineaDXF(posX + 0, posY - 76, posX + 3, posY - 76));
    entidades.push(lineaDXF(posX + 1, posY - 78, posX + 0.25, posY - 78));
    entidades.push(lineaDXF(posX + 0.25, posY - 78, posX + 0.25, posY - 77.25));
    entidades.push(lineaDXF(posX + 0.25, posY - 77.25, posX - 0.5, posY - 77.25));
    entidades.push(lineaDXF(posX - 0.5, posY - 77.25, posX - 0.5, posY - 78));
    entidades.push(lineaDXF(posX - 0.5, posY - 78, posX - 1.25, posY - 78));
    entidades.push(lineaDXF(posX + 0, posY - 90, posX + 0, posY - 80));
    entidades.push(lineaDXF(posX + 0, posY - 76, posX + 0, posY - 60));

    return entidades;

}

function SD_1_Contactor(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // Maniobra normal 230V
    entidades.push(lineaDXF(posX + 0, posY - 0, posX + 0, posY - 56));
    entidades.push(lineaDXF(posX - 4, posY - 4, posX - 4, posY - 56));
    entidades.push(lineaDXF(posX - 8, posY - 4, posX - 8, posY + 0));
    entidades.push(punto(posX - 4, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // rele base
    entidades.push(...SD_1_Rele_Base(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // proteccion magneto
    entidades.push(...SD_1_Magneto(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // Nombre contactor
    entidades.push(textoDXF(posX - 1, posY - 88, `KM${tagNumber}`, 2.5, "MR", 0));

    return entidades;

}

function SD_3_Motor3V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    entidades.push(punto(posX - 4, posY - 100));
    entidades.push(punto(posX - 8, posY - 4));

    entidades.push(lineaDXF(posX + 4, posY - 110, posX + 4, posY - 116));
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX + 0, posY - 104, posX + 0, posY + 0));
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));
    entidades.push(lineaDXF(posX - 4, posY - 104, posX - 4, posY - 100));

    entidades.push(textoDXF(posX - 4, posY - 118, "N", 2.5, "MC", 0));  // TEXT en línea 290
    entidades.push(textoDXF(posX + 0, posY - 118, "1", 2.5, "MC", 0));  // TEXT en línea 324
    entidades.push(textoDXF(posX + 4, posY - 118, "2", 2.5, "MC", 0));  // TEXT en línea 358
    entidades.push(textoDXF(posX + 2, posY - 124, "M", 2.5, "MC", 0));  // TEXT en línea 392
    entidades.push(textoDXF(posX + 0, posY - 127, "1", 2.5, "MC", 0));  // TEXT en línea 426
    entidades.push(textoDXF(posX + 4, posY - 127, "~", 2.5, "MC", 0));  // TEXT en línea 460

    entidades.push(circunferenciaDXF(posX + 2, posY - 126, 5, -1));  // CIRCLE en línea 518

    entidades.push(lineaDXF(posX - 4, posY - 122, posX - 4, posY - 120));
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 4));
    entidades.push(lineaDXF(posX + 32, posY + 0, posX + 32, posY - 56));
    entidades.push(lineaDXF(posX + 8, posY - 110, posX + 8, posY - 116));
    entidades.push(textoDXF(posX + 8, posY - 118, "3", 2.5, "MC", 0));  // TEXT en línea 610
    entidades.push(lineaDXF(posX + 8, posY - 120, posX + 8, posY - 122));
    entidades.push(lineaDXF(posX + 8, posY - 122, posX + 6.391, posY - 123.609));
    entidades.push(lineaDXF(posX + 4, posY - 121.417, posX + 4, posY - 120));
    entidades.push(lineaDXF(posX + 0, posY - 121.417, posX + 0, posY - 120));
    entidades.push(lineaDXF(posX - 4, posY - 122, posX - 2.391, posY - 123.609));
    entidades.push(lineaDXF(posX + 32, posY - 56, posX + 8, posY - 56));
    entidades.push(lineaDXF(posX + 4, posY - 104, posX + 4, posY - 52));
    entidades.push(lineaDXF(posX + 4, posY - 52, posX + 16, posY - 52));
    entidades.push(lineaDXF(posX + 16, posY + 0, posX + 16, posY - 52));
    entidades.push(lineaDXF(posX + 8, posY - 104, posX + 8, posY - 56));

    // bornas
    entidades.push(lineaDXF(posX + 6, posY - 104, posX + 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 6, posY - 110, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 6, posY - 104, posX + 6, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 10, posY - 104, posX + 6, posY - 104, 40));
    entidades.push(lineaDXF(posX + 10, posY - 110, posX + 6, posY - 110, 40));
    entidades.push(lineaDXF(posX + 10, posY - 104, posX + 10, posY - 110, 40));
    entidades.push(lineaDXF(posX + 10, posY - 116, posX - 6, posY - 116, 40));
    entidades.push(lineaDXF(posX + 10, posY - 132, posX - 6, posY - 132, 40));
    entidades.push(lineaDXF(posX - 6, posY - 116, posX - 6, posY - 132, 40));
    entidades.push(lineaDXF(posX + 10, posY - 132, posX + 10, posY - 116, 40));

    //texto señal
    entidades.push(textoMultiDXF(posX + 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;
}

function SD_1_Simple(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // alimentacion
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // verticales y bornas
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0));
    entidades.push(...paloDesplazable(posX - 4, posY, 0, 4));
    entidades.push(...paloDesplazable(posX - 8, posY, 0, 100));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX, posY, "N", "Y1", "Y2"));

    // texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_Conmutada(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // alimentacion
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // verticales y bornas
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0));
    entidades.push(...paloDesplazable(posX - 4, posY, 0, 0));
    entidades.push(...paloDesplazable(posX - 8, posY, 0, 100));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX, posY, "N", "Y1", "Y2"));

    // texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_2_Externa(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // alimentacion
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // alimentacion siguiente salida
    entidades.push(lineaDXF(posX + 8, posY + 0, posX + 8, posY - 4));
    entidades.push(punto(posX + 8, posY - 4));

    // verticales y bornas
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0));
    entidades.push(...paloDesplazable(posX + 4, posY, 0, 100));
    entidades.push(...paloDesplazable(posX + 8, posY, 8, 0));

    // texto señal
    entidades.push(textoMultiDXF(posX + 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_2_Actuador(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // alimentacion
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 4));
    entidades.push(punto(posX - 8, posY - 4));

    // alimentacion siguiente salida
    entidades.push(lineaDXF(posX + 8, posY + 0, posX + 8, posY - 4));
    entidades.push(punto(posX + 8, posY - 4));

    // verticales y bornas
    entidades.push(...paloDesplazable(posX - 0, posY, 0, 0));
    entidades.push(...paloDesplazable(posX + 4, posY, 0, 100));
    entidades.push(...paloDesplazable(posX + 8, posY, 8, 0));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX + 8, posY, "Y1", "N", "Y2"));

    // texto señal
    entidades.push(textoMultiDXF(posX + 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_Bus_LTE(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    return Bus_LTE(posX, posY, Linea1, Linea2);
}

// === SD a rele 24V (TXM1.8T y EM1.8R) ===
function SD_1_Rele24V_Base(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {
    const entidades = [];

    entidades.push(textoDXF(posX - 1, posY - 22, `R${tagNumber}`, 2.5, "MR", 0, "Standard", 0.8));

    // linea que baja de la salida hasta el rele
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 24,));

    // rectangulo rele
    entidades.push(lineaDXF(posX - 4, posY - 24, posX - 4, posY - 28));
    entidades.push(lineaDXF(posX - 4, posY - 28, posX + 4, posY - 28));
    entidades.push(lineaDXF(posX + 4, posY - 28, posX + 4, posY - 24));
    entidades.push(lineaDXF(posX + 4, posY - 24, posX - 4, posY - 24));

    // linea que baja del rectangulo 
    entidades.push(lineaDXF(posX + 0, posY - 28, posX + 0, posY - 32));

    //linea hacia la izquierda
    entidades.push(lineaDXF(posX + 0, posY - 32, posX - 8, posY - 32));

    return entidades;

}

function SD_1_Rele8T_Base(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    entidades.push(...SD_1_Rele24V_Base(posX, posY, Linea1, Linea2, tagNumber));

    // linea hacia arriba 
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 32));

    return entidades;

}

function SD_1_Rele8R_Base(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    entidades.push(...SD_1_Rele24V_Base(posX, posY, Linea1, Linea2, tagNumber));

    // linea hacia arriba y punto para conectar en G0
    entidades.push(lineaDXF(posX - 8, posY - 32, posX - 8, posY - 16));
    entidades.push(punto(posX - 8, posY - 16));

    return entidades;

}

function SD_1_ExternaR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // discontinua de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 48, posX - 1, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));

    // arco
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 0, posY - 42));
    entidades.push(lineaDXF(posX - 4, posY - 104, posX - 4, posY - 42));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX + 0, posY - 104));
    entidades.push(lineaDXF(posX + 0, posY - 42, posX - 4, posY - 42));

    // contacto
    entidades.push(textoDXF(posX - 1, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX - 2, posY - 46));
    entidades.push(textoDXF(posX - 1, posY - 51, "14", 1, "MC", 0));

    // bornas
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));

    // salida de bornas
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));

    // Texto señal
    entidades.push(textoMultiDXF(posX - 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_ReleR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // Selector
    entidades.push(...SD_1_Selector_Base(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // discontinua de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 48, posX - 1, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));

    // arco
    entidades.push(lineaDXF(posX + 4, posY - 42, posX + 4, posY - 104));
    entidades.push(lineaDXF(posX + 0, posY - 60, posX + 0, posY - 104));
    entidades.push(lineaDXF(posX + 0, posY - 56, posX + 0, posY - 50));

    entidades.push(lineaDXF(posX - 4, posY - 56, posX - 4, posY - 42));
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 0, posY - 42));
    entidades.push(lineaDXF(posX + 4, posY - 42, posX - 4, posY - 42));
    entidades.push(punto(posX, posY - 42));

    // contacto
    entidades.push(textoDXF(posX - 1, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX - 2, posY - 46));
    entidades.push(textoDXF(posX - 1, posY - 51, "14", 1, "MC", 0));

    // bornas
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 6, posY - 104, posX + 2, posY - 104, 40));
    entidades.push(lineaDXF(posX + 6, posY - 110, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 6, posY - 104, posX + 6, posY - 110, 40));

    // salida de bornas
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX + 4, posY - 110, posX + 4, posY - 116));

    // Texto señal
    entidades.push(textoMultiDXF(posX + 2, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_SimpleR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // discontinua de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 48, posX - 1, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));

    // linea vertical con contacto
    entidades.push(punto(posX + 0, posY - 40));
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 0, posY - 40));
    entidades.push(textoDXF(posX - 1, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX - 2, posY - 46));
    entidades.push(textoDXF(posX - 1, posY - 51, "14", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX + 0, posY - 104));

    // line vertical fase
    entidades.push(punto(posX - 4, posY - 40));
    entidades.push(lineaDXF(posX - 4, posY - 104, posX - 4, posY - 40));

    // linea vertical neutro
    entidades.push(punto(posX - 8, posY - 100));
    entidades.push(lineaDXF(posX - 8, posY - 104, posX - 8, posY - 100));

    //bornas horizontal arriba
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 10, posY - 104, 40));

    // bornas verticales
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 10, posY - 104, posX - 10, posY - 110, 40));

    //bornas horizontal abajo
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 110, posX - 10, posY - 110, 40));

    // lineas salida de bornas
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));
    entidades.push(lineaDXF(posX - 8, posY - 110, posX - 8, posY - 116));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX, posY, "N", "Y1", "Y2"));

    // texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_ConmutadaR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // discontinua de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 48, posX - 4.55, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));

    // linea vertical con contacto cerrado
    entidades.push(punto(posX + 0, posY - 40));
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 0, posY - 40));
    entidades.push(textoDXF(posX - 1, posY - 45, "21", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 1.5, posY - 46));
    entidades.push(textoDXF(posX - 1, posY - 51, "22", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX + 1.1, posY - 45.5));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX + 0, posY - 104));

    // linea vertical con contacto abierto
    entidades.push(punto(posX - 4, posY - 40));
    entidades.push(lineaDXF(posX - 4, posY - 46, posX - 4, posY - 40));
    entidades.push(textoDXF(posX - 5, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX - 4, posY - 50, posX - 5, posY - 46));
    entidades.push(textoDXF(posX - 5, posY - 51, "14", 1, "MC", 0));
    entidades.push(lineaDXF(posX - 4, posY - 50, posX - 4, posY - 104));

    // linea vertical neutro
    entidades.push(punto(posX - 8, posY - 100));
    entidades.push(lineaDXF(posX - 8, posY - 104, posX - 8, posY - 100));

    //bornas horizontal arriba
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 10, posY - 104, 40));

    // bornas verticales
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 10, posY - 104, posX - 10, posY - 110, 40));

    //bornas horizontal abajo
    entidades.push(lineaDXF(posX + 2, posY - 110, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 110, posX - 10, posY - 110, 40));

    // lineas salida de bornas
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));
    entidades.push(lineaDXF(posX - 8, posY - 110, posX - 8, posY - 116));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX, posY, "N", "Y1", "Y2"));

    // texto señal
    entidades.push(textoMultiDXF(posX - 4, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_1_ContactorR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // discontinuas de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 48, posX - 1, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));

    //contacto del rele8T_Base
    entidades.push(textoDXF(posX - 1, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 0, posY - 50, posX - 2, posY - 46));
    entidades.push(textoDXF(posX - 1, posY - 51, "14", 1, "MC", 0));

    // conexion 230v para selector en 8T
    entidades.push(lineaDXF(posX + 0, posY - 56, posX + 0, posY - 50));
    entidades.push(lineaDXF(posX + 0, posY - 46, posX + 0, posY - 40));
    entidades.push(lineaDXF(posX - 4, posY - 56, posX - 4, posY - 40));
    entidades.push(punto(posX - 4, posY - 40));
    entidades.push(punto(posX + 0, posY - 40));

    // rele base
    entidades.push(...SD_1_Rele_Base(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // proteccion magneto
    entidades.push(...SD_1_Magneto(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // Nombre contactor
    entidades.push(textoDXF(posX - 1, posY - 88, `KM${tagNumber}`, 2.5, "MR", 0));

    return entidades;

}

function SD_2_ExternaR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // verticales bornas  
    entidades.push(lineaDXF(posX + 9, posY - 104, posX + 9, posY - 110, 40));
    entidades.push(lineaDXF(posX + 5, posY - 104, posX + 5, posY - 110, 40));
    entidades.push(lineaDXF(posX + 5, posY - 104, posX + 5, posY - 110, 40));
    entidades.push(lineaDXF(posX + 13, posY - 104, posX + 13, posY - 110, 40));
    entidades.push(lineaDXF(posX + 13, posY - 104, posX + 13, posY - 110, 40));
    entidades.push(lineaDXF(posX + 17, posY - 104, posX + 17, posY - 110, 40));

    // horizontales bornas
    entidades.push(lineaDXF(posX + 5, posY - 104, posX + 9, posY - 104, 40));
    entidades.push(lineaDXF(posX + 9, posY - 104, posX + 13, posY - 104, 40));
    entidades.push(lineaDXF(posX + 13, posY - 104, posX + 17, posY - 104, 40));
    entidades.push(lineaDXF(posX + 5, posY - 110, posX + 9, posY - 110, 40));
    entidades.push(lineaDXF(posX + 9, posY - 110, posX + 13, posY - 110, 40));
    entidades.push(lineaDXF(posX + 13, posY - 110, posX + 17, posY - 110, 40));

    // fase -> contacto -> bornas
    entidades.push(lineaDXF(posX + 7, posY - 46, posX + 7, posY - 40));

    entidades.push(textoDXF(posX + 6, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 7, posY - 50, posX + 5, posY - 46));
    entidades.push(textoDXF(posX + 6, posY - 51, "14", 1, "MC", 0));

    entidades.push(lineaDXF(posX + 7, posY - 104, posX + 7, posY - 50));
    entidades.push(lineaDXF(posX + 7, posY - 110, posX + 7, posY - 116));
    entidades.push(lineaDXF(posX + 11, posY - 104, posX + 11, posY - 100));
    entidades.push(lineaDXF(posX + 11, posY - 110, posX + 11, posY - 116));
    entidades.push(lineaDXF(posX + 15, posY - 46, posX + 15, posY - 40));

    entidades.push(textoDXF(posX + 14, posY - 45, "13", 1, "MC", 0));
    entidades.push(lineaDXF(posX + 15, posY - 50, posX + 13, posY - 46));
    entidades.push(textoDXF(posX + 14, posY - 51, "14", 1, "MC", 0));

    entidades.push(lineaDXF(posX + 15, posY - 104, posX + 15, posY - 50));
    entidades.push(lineaDXF(posX + 15, posY - 110, posX + 15, posY - 116));

    // discontinuas de rele a contacto
    entidades.push(lineaDXF(posX + 2, posY - 28, posX + 2, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 2, posY - 48, posX + 6, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 18, posY - 48, posX + 14, posY - 48, -1, "DASHED", 0.1));
    entidades.push(lineaDXF(posX + 18, posY - 28, posX + 18, posY - 48, -1, "DASHED", 0.1));

    // puntos
    entidades.push(punto(posX + 11, posY - 100));
    entidades.push(punto(posX + 7, posY - 40));
    entidades.push(punto(posX + 15, posY - 40));

    // texto señal
    entidades.push(textoMultiDXF(posX + 11, posY - 190, [Linea1, Linea2], 2.5, "ML", 90));

    return entidades;

}

function SD_2_ActuadorR24V(posX, posY, Linea1, Linea2, tagNumber, desG = 0, desG0 = 0) {

    const entidades = [];

    // maniobra
    entidades.push(...SD_2_ExternaR24V(posX, posY, Linea1, Linea2, tagNumber, desG, desG0));

    // cuerpo elemento de campo
    entidades.push(...valvula(posX + 15, posY, "Y1", "N", "Y2"));

    return entidades;

}