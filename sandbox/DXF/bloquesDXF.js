// hecho por el menda manualmente
function cajetin(posX, posY, infoCajetin = {}) {

    const {
        Refe = '-',
        Hoja = '-',
        Loca = '-',
        Clie = '-',
        Fech = '-',
        Dibu = '-',
        Esqu = '-',
        Inst = '-',
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
    entidades.push(textoDXF(posX + 287, posY +  6, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 363, posY +  6, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 363, posY +  2, "-",                      2, "MC"));
    entidades.push(textoDXF(posX + 391, posY + 14, "Hoja",                   2, "MC"));
    entidades.push(textoDXF(posX + 391, posY +  6, "Ref.",                   2, "MC"));

    // textos rellenables
    entidades.push(textoDXF(posX + 391, posY + 2,  Refe,                     2, "MC"));
    entidades.push(textoDXF(posX + 391, posY + 10, Hoja,                     2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 10, Loca,                     2, "MC"));
    entidades.push(textoDXF(posX + 363, posY + 14, Clie,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 10, Fech,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 14, Dibu,                     2, "MC"));
    entidades.push(textoDXF(posX + 287, posY + 2,  Esqu,                     2, "MC"));
    entidades.push(textoDXF(posX + 315, posY + 22, Inst,                     5, "MC"));

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