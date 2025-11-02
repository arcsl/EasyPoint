// hecho por el menda manualmente
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
    entidades.push(lineaDXF(posX +   0, posY +   0, posX +   0, posY + 280, 40));
    entidades.push(lineaDXF(posX +   0, posY + 280, posX + 400, posY + 280, 40));
    entidades.push(lineaDXF(posX + 400, posY + 280, posX + 400, posY +   0, 40));
    entidades.push(lineaDXF(posX + 400, posY +   0, posX +   0, posY +   0, 40));

    // cuadrado cajetin
    entidades.push(lineaDXF(posX + 200, posY +  0, posX + 200, posY + 40, 40));
    entidades.push(lineaDXF(posX + 400, posY + 40, posX + 200, posY + 40, 40));

    // lineas horizontales cajetin
    entidades.push(lineaDXF(posX + 400, posY + 36, posX + 200, posY + 36));
    entidades.push(lineaDXF(posX + 400, posY + 32, posX + 200, posY + 32));
    entidades.push(lineaDXF(posX + 400, posY + 28, posX + 200, posY + 28));

    entidades.push(lineaDXF(posX + 400, posY + 16, posX + 230, posY + 16));
    entidades.push(lineaDXF(posX + 382, posY + 12, posX + 230, posY + 12));
    entidades.push(lineaDXF(posX + 400, posY +  8, posX + 230, posY +  8));
    entidades.push(lineaDXF(posX + 382, posY +  4, posX + 230, posY +  4));

    // lineas verticales cajetin
    entidades.push(lineaDXF(posX + 230, posY +  0, posX + 230, posY + 40));

    entidades.push(lineaDXF(posX + 268, posY + 40, posX + 268, posY + 28));
    entidades.push(lineaDXF(posX + 306, posY + 40, posX + 306, posY + 28));

    entidades.push(lineaDXF(posX + 268, posY + 16, posX + 268, posY +  0));
    entidades.push(lineaDXF(posX + 306, posY + 16, posX + 306, posY +  0));
    entidades.push(lineaDXF(posX + 344, posY + 16, posX + 344, posY +  0));
    entidades.push(lineaDXF(posX + 382, posY + 16, posX + 382, posY +  0));

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
    entidades.push(solidDXF([[posX + 220, posY +  8], [posX + 220, posY + 17], [posX + 224, posY +  8], [posX + 224, posY + 17]]));
    entidades.push(solidDXF([[posX + 224, posY +  8], [posX + 224, posY + 11], [posX + 225, posY +  8], [posX + 225, posY + 11]]));
    entidades.push(solidDXF([[posX + 224, posY + 14], [posX + 224, posY + 17], [posX + 225, posY + 14], [posX + 225, posY + 17]]));
    entidades.push(solidDXF([[posX + 225, posY +  8], [posX + 225, posY + 12], [posX + 229, posY +  8], [posX + 229, posY + 12]]));
    entidades.push(solidDXF([[posX + 225, posY + 13], [posX + 225, posY + 17], [posX + 229, posY + 13], [posX + 229, posY + 17]]));


    //textos fijos
    entidades.push(textoDXF(posX + 201, posY + 16, "ARC S.L.",               2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 13, "Urazandi",               2, "ML"));
    entidades.push(textoDXF(posX + 201, posY + 10, "Industrialdea,",         2, "ML"));
    entidades.push(textoDXF(posX + 201, posY +  7, "Pabellón 6D",            2, "ML"));
    entidades.push(textoDXF(posX + 201, posY +  4, "Asua-Erandio (Vizcaya)", 2, "ML"));
    entidades.push(textoDXF(posX + 201, posY +  1, "www.arcsl.com",          2, "ML"));
    entidades.push(textoDXF(posX + 249, posY + 14, "Dibujado",               2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 10, "Fecha",                  2, "MC"));
    entidades.push(textoDXF(posX + 249, posY +  6, "Revisado",               2, "MC"));
    entidades.push(textoDXF(posX + 249, posY +  2, "Esquema",                2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 14, "Cliente",                2, "MC"));
    entidades.push(textoDXF(posX + 325, posY + 10, "Localidad",              2, "MC"));
    entidades.push(textoDXF(posX + 325, posY +  6, "Sustituye a",            2, "MC"));
    entidades.push(textoDXF(posX + 325, posY +  2, "Sustituido por",         2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 38, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 34, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 249, posY + 30, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 38, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 34, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 30, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 30, "Revisión 1",             2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 34, "Revisión 2",             2, "MC"));
    entidades.push(textoDXF(posX + 215, posY + 38, "Revisión 3",             2, "MC"));
    entidades.push(textoDXF(posX + 308, posY + 30, "-",                      2, "ML"));
    entidades.push(textoDXF(posX + 308, posY + 34, "-",                      2, "ML"));
    entidades.push(textoDXF(posX + 308, posY + 38, "-",                      2, "ML"));
    entidades.push(textoDXF(posX + 391, posY + 14, "Hoja",                   2, "MC"));
    entidades.push(textoDXF(posX + 391, posY +  6, "Ref.",                   2, "MC"));

    // textos rellenables
    entidades.push(textoDXF(posX + 315, posY + 22, Inst,                     5, "MC"));

    entidades.push(textoDXF(posX + 287, posY + 14, Dibu,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 10, Fech,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 6,  Revi,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 2,  Esqu,                     2, "MC"));

    entidades.push(textoDXF(posX + 363, posY + 14, Clie,                     2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 10, Loca,                     2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 6,  Stye,                     2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 2,  Stdo,                     2, "MC"));


    entidades.push(textoDXF(posX + 391, posY + 2,  Refe,                     2, "MC"));
    entidades.push(textoDXF(posX + 391, posY + 10, Hoja,                     2, "MC"));

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

    entidades.push(solidDXF([[posX + 220, posY +  8], [posX + 220, posY + 17], [posX + 224, posY +  8], [posX + 224, posY + 17]]));
    entidades.push(solidDXF([[posX + 224, posY +  8], [posX + 224, posY + 11], [posX + 225, posY +  8], [posX + 225, posY + 11]]));
    entidades.push(solidDXF([[posX + 224, posY + 14], [posX + 224, posY + 17], [posX + 225, posY + 14], [posX + 225, posY + 17]]));
    entidades.push(solidDXF([[posX + 225, posY +  8], [posX + 225, posY + 12], [posX + 229, posY +  8], [posX + 229, posY + 12]]));
    entidades.push(solidDXF([[posX + 225, posY + 13], [posX + 225, posY + 17], [posX + 229, posY + 13], [posX + 229, posY + 17]]));

    return entidades;

}

// simbolos de señales
// === EA ===
function EA_1_Pasiva(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function EA_1_Externa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function EA_1_Activa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function EA_2_Activa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function EA_3_Activa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}


// === ED ===
function ED_1_Externa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function ED_1_Rele(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function ED_1_Contactor(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function ED_1_Térmico(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}


// === SA ===
function SA_1_Externa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SA_1_Actuador(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}


// === SD ===
function SD_1_Externa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_1_Rele(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    entidades.push(lineaDXF( posX - 4, posY - 86, posX - 4, posY - 90,     0));
    entidades.push(lineaDXF( posX - 4, posY - 90, posX +     4, posY - 90,     0));
    entidades.push(lineaDXF( posX +     4, posY - 90, posX +     4, posY - 86,     0));
    entidades.push(lineaDXF( posX +     4, posY - 86, posX - 4, posY - 86,     0));
    entidades.push(lineaDXF( posX +     0, posY - 56, posX - 2, posY - 52,     0));
    entidades.push(lineaDXF( posX - 12, posY - 53, posX - 12, posY - 55,     0));
    entidades.push(lineaDXF( posX - 11, posY - 52, posX - 9, posY - 56,     0));
    entidades.push(lineaDXF( posX - 9, posY - 56, posX - 9, posY - 52,     0));
    entidades.push(lineaDXF( posX - 9, posY - 56, posX - 7, posY - 52,     0));
    entidades.push(lineaDXF( posX - 1, posY - 54, posX - 12, posY - 54,     0));
    entidades.push(lineaDXF( posX +     0, posY - 52, posX +     0, posY +     0,     0));
    entidades.push(lineaDXF( posX - 12, posY - 53, posX - 11, posY - 53,     0));
    entidades.push(lineaDXF( posX - 13, posY - 55, posX - 12, posY - 55,     0));
    entidades.push(lineaDXF( posX +     0, posY - 56, posX +     0, posY - 86,     0));
    entidades.push(lineaDXF( posX - 4, posY - 52, posX - 4, posY - 4,     0));
    entidades.push(lineaDXF( posX +     0, posY - 90, posX +     0, posY - 100,     0));
    entidades.push(lineaDXF( posX - 4, posY +     0, posX - 4, posY - 4,     0));
    entidades.push(lineaDXF( posX - 4, posY - 56, posX - 6, posY - 52,     0));
    entidades.push(lineaDXF( posX - 4, posY - 56, posX - 4, posY - 65,     0));
    entidades.push(lineaDXF( posX - 4, posY - 65, posX +     0, posY - 65,     0));

    entidades.push(textoDXF( posX - 11,  posY - 51, "1",     1,     0, "MC"));
    entidades.push(textoDXF( posX - 9,  posY - 51, "0",     1,     0, "MC"));
    entidades.push(textoDXF( posX - 7,  posY - 51, "2",     1,     0, "MC"));
    entidades.push(textoDXF( posX - 1,  posY - 84, `KA${tagNumber}`,   2.5,     0, "MR"));

    entidades.push(textoMultiDXF( posX +     0,  posY - 190, [Linea1,Linea2],   2.5, "ML",     0));

    entidades.push(punto(posX - 661, posY - 836));
    entidades.push(punto(posX - 665, posY - 740));
    entidades.push(punto(posX - 661, posY - 801));

    return entidades;
}

function SD_1_Contactor(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_3_Motor3V(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_1_Simple(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_1_Conmutada(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_2_Externa(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

function SD_2_Actuador(posX, posY, Linea1, Linea2, tagNumber) { 
    const entidades = [];

    return entidades;
}

