/// <reference path="DXFbasicos.js" />
/// <reference path="DXFbloques.js" />
/// <reference path="DXFdispositivos.js" />

function hasheador(posX, posY, hash, franja, extraEstrecho = false) {

    let tamText = 2.5;
    let alineacion = "MC";
    let rotacion = 0;
    let estiloText = "Standard";
    let multAncho = 1;
    let desY = posY;


    if (franja === "Cinta") {
        tamText = 1.5;
        desY += 17;
    }

    if (franja === "Subcinta") {
        tamText = 1.5;
        desY += 15;
    }

    if (franja === "Simbolos") {
        desY += 9;
    }

    if (franja === "Numeracion") {
        multAncho = extraEstrecho ? 0.6 : 0.8;
        desY += 2;
    }

    if (franja === "Opcional") {

    }

    if (franja === "Etiqueta") {
        alineacion = "ML";
        rotacion = 90;
        desY -= 190;
    }


    if (!hash) return [];

    if (hash.startsWith("#")) {
        switch (hash) {
            case "#52": return hash52(posX, desY);
            case "#25": return hash25(posX, desY);
            case "#UD": return hashUD(posX, desY);
            case "#D": return hashD(posX, desY);
            case "#U": return hashU(posX, desY);
            case "#|": return hashPalo(posX, desY);
            case "#-": return hashGuion(posX, desY);
            case "#Sep": return hashSep(posX, desY);
            case "#/": return hashSemiSep(posX, desY);
            case "#d": return hashd(posX, desY);
            case "#RED": return hashLan(posX, desY);
            case "#T": return hashT(posX, desY, tamText);
            case "#uTierra": return hashuTierra(posX, desY);
            case "#Qc": return hashQconmutada(posX, desY);
            case "#Qs": return hashQsimple(posX, desY);
            case "#ext": return hashExterna(posX, desY);
            case "#ext2": return hashExterna2(posX, desY);
            case "#ext3": return hashExterna3(posX, desY);
            case "#L": return hashAlimL(posX, desY);
            case "#N": return hashAlimN(posX, desY);
            case "#G": return hashAlimG(posX, desY);
            case "#G0": return hashAlimG0(posX, desY);
            case "#b+": return hashBusMas(posX, desY);
            case "#b-": return hashBusMenos(posX, desY);
            case "#KNX": return hashKNX(posX, desY);
            case "#Sch": return hashSchucko(posX, desY);
            default: {
                console.warn(`Hash ${hash} no encontrado`);
                return [];
            }
        }


    } else if (hash.includes("%")) {
        return [textoMultiDXF(posX, desY, hash.split('%'), tamText, alineacion, rotacion, estiloText, multAncho)];

    } else {
        return [textoDXF(posX, desY, hash, tamText, alineacion, rotacion, estiloText, multAncho)];

    }
}

function hash52(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX - 5, posY + 0, posX + 0, posY + 0, 0));

    return entidades;

}

function hash25(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 5, posY + 0, 0));

    return entidades;

}

function hashUD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    entidades.push(solidDXF([[posX + 0, posY + 5], [posX - 0.5, posY + 3.5], [posX + 0.5, posY + 3.5], [posX + 0.5, posY + 3.5]]));
    entidades.push(solidDXF([[posX + 0, posY - 5], [posX - 0.5, posY - 3.5], [posX + 0.5, posY - 3.5], [posX + 0.5, posY - 3.5]]));

    return entidades;

}

function hashD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    entidades.push(solidDXF([[posX + 0, posY - 5], [posX - 0.5, posY - 3.5], [posX + 0.5, posY - 3.5], [posX + 0.5, posY - 3.5]]));

    return entidades;

}

function hashU(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    entidades.push(solidDXF([[posX + 0, posY + 5], [posX - 0.5, posY + 3.5], [posX + 0.5, posY + 3.5], [posX + 0.5, posY + 3.5]]));

    return entidades;

}

function hashPalo(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    return entidades;

}

function hashGuion(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX - 1.5, posY + 0, posX + 1.5, posY + 0, 0));

    return entidades;

}

function hashSep(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 18, 0));

    return entidades;

}

function hashSemiSep(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY - 9, posX + 0, posY + 7, 0));

    return entidades;

}

function hashd(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0.75, posX + 0, posY + 0, 0));
    entidades.push(solidDXF([[posX + 0, posY - 0.75], [posX - 0.25, posY + 0], [posX + 0.25, posY + 0], [posX + 0.25, posY + 0]]));

    return entidades;

}

function hashEnv(posX, posY, largo) {

    const entidades = [];

    // vertical inicial
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 24, 40));

    // horizontales exterior
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + largo, posY + 0, 40));
    entidades.push(lineaDXF(posX + 0, posY + 24, posX + largo, posY + 24, 40));

    // horizontales cinta
    entidades.push(lineaDXF(posX + 0, posY + 18, posX + largo, posY + 18));
    entidades.push(lineaDXF(posX + 0, posY + 16, posX + largo, posY + 16));

    // vertical final
    entidades.push(lineaDXF(posX + largo, posY + 0, posX + largo, posY + 24, 40));

    return entidades;

}

function hashLan(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX - 6, posY - 5, posX - 6, posY - 2));
    entidades.push(lineaDXF(posX - 6, posY - 2, posX - 2, posY - 2));
    entidades.push(lineaDXF(posX - 2, posY - 2, posX - 2, posY - 5));
    entidades.push(lineaDXF(posX - 2, posY - 5, posX - 6, posY - 5));
    entidades.push(lineaDXF(posX + 2, posY - 2, posX + 6, posY - 2));
    entidades.push(lineaDXF(posX + 6, posY - 2, posX + 6, posY - 5));
    entidades.push(lineaDXF(posX + 6, posY - 5, posX + 2, posY - 5));
    entidades.push(lineaDXF(posX + 2, posY - 5, posX + 2, posY - 2));
    entidades.push(lineaDXF(posX - 2, posY + 2, posX - 2, posY + 5));
    entidades.push(lineaDXF(posX - 2, posY + 5, posX + 2, posY + 5));
    entidades.push(lineaDXF(posX + 2, posY + 5, posX + 2, posY + 2));
    entidades.push(lineaDXF(posX + 2, posY + 2, posX - 2, posY + 2));
    entidades.push(lineaDXF(posX - 4, posY - 2, posX - 4, posY + 0));
    entidades.push(lineaDXF(posX - 4, posY + 0, posX + 4, posY + 0));
    entidades.push(lineaDXF(posX + 4, posY + 0, posX + 4, posY - 2));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2));

    return entidades;

}

function hashT(posX, posY, textsize) {

    const entidades = [];

    entidades.push(textoDXF(posX, posY, "T", textsize, align = 'MC', rotation = 180));

    return entidades;

}

function hashuTierra(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 1, 0));
    entidades.push(lineaDXF(posX - 0.75, posY + 0, posX + 0.75, posY + 0, 0));
    entidades.push(lineaDXF(posX - 0.5, posY - 0.25, posX + 0.5, posY - 0.25, 0));
    entidades.push(lineaDXF(posX - 0.25, posY - 0.5, posX + 0.25, posY - 0.5, 0));
    entidades.push(arcoDXF(posX + 0, posY - 0.25, 1, 0, 180, 0));

    return entidades;

}

function hashQconmutada(posX, posY) {

    const entidades = [];

    // entidades.push(lineaDXF(posX - 4, posY - 3, posX - 4, posY + 4, 0));
    // entidades.push(lineaDXF(posX - 4, posY + 4, posX - 1, posY + 4, 0));
    // entidades.push(lineaDXF(posX + 4, posY - 3, posX + 4, posY + 4, 0));
    // entidades.push(lineaDXF(posX + 0, posY - 3, posX + 0, posY + 1, 0));
    // entidades.push(lineaDXF(posX + 0, posY + 1, posX - 2, posY + 5, 0));
    // entidades.push(lineaDXF(posX + 1, posY + 4, posX + 4, posY + 4, 0));

    entidades.push(lineaDXF(posX + 2, posY + 2, posX + 2, posY + 4, 0));
    entidades.push(lineaDXF(posX + 4, posY - 5, posX + 4, posY - 2, 0));
    entidades.push(lineaDXF(posX + 0, posY - 2, posX + 2, posY + 2, 0));
    entidades.push(lineaDXF(posX + 0, posY - 5, posX + 0, posY - 2, 0));
    entidades.push(lineaDXF(posX - 4, posY - 5, posX - 4, posY + 4, 0));
    entidades.push(lineaDXF(posX - 4, posY + 4, posX + 2, posY + 4, 0));

    entidades.push(solidDXF([[posX - 4, posY - 3.5], [posX - 4.5, posY - 5], [posX - 3.5, posY - 5], [posX - 3.5, posY - 5]]));
    entidades.push(solidDXF([[posX + 0, posY - 5], [posX - 0.5, posY - 3.5], [posX + 0.5, posY - 3.5], [posX + 0.5, posY - 3.5]]));
    entidades.push(solidDXF([[posX + 4, posY - 5], [posX + 3.5, posY - 3.5], [posX + 4.5, posY - 3.5], [posX + 4.5, posY - 3.5]]));

    return entidades;

}

function hashQsimple(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX - 4, posY - 5, posX - 4, posY + 4));
    entidades.push(lineaDXF(posX + 4, posY - 5, posX + 4, posY - 2));
    entidades.push(lineaDXF(posX - 4, posY + 4, posX + 4, posY + 4));
    entidades.push(lineaDXF(posX + 4, posY + 4, posX + 4, posY + 2));
    entidades.push(lineaDXF(posX + 4, posY - 2, posX + 2, posY + 2));

    entidades.push(solidDXF([[posX - 4, posY - 3.5], [posX - 4.5, posY - 5], [posX - 3.5, posY - 5], [posX - 3.5, posY - 5]]));
    entidades.push(solidDXF([[posX + 4, posY - 5], [posX + 3.5, posY - 3.5], [posX + 4.5, posY - 3.5], [posX + 4.5, posY - 3.5]]));

    return entidades;

}

function hashExterna(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 104));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX + 2, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 2, posY - 104, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX + 2, posY - 110, 40));
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));

    return entidades;

}

function hashExterna2(posX, posY) {

    const entidades = [];

    entidades.push(...hashExterna(posX, posY));
    entidades.push(...hashExterna(posX - 4, posY));

    return entidades;

}

function hashExterna3(posX, posY) {

    const entidades = [];

    entidades.push(...hashExterna(posX, posY));
    entidades.push(...hashExterna(posX - 4, posY));
    entidades.push(...hashExterna(posX - 8, posY));

    return entidades;

}

function hashAlimL(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 4));
    entidades.push(punto(posX + 0, posY - 4));

    return entidades;

}

function hashAlimN(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 100));
    entidades.push(punto(posX + 0, posY - 100));

    return entidades;

}

function hashAlimG(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 12));
    entidades.push(punto(posX + 0, posY - 12));
    return entidades;

}

function hashAlimG0(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 16));
    entidades.push(punto(posX + 0, posY - 16));

    return entidades;

}

function hashBusMas(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 24));
    entidades.push(punto(posX + 0, posY - 24));

    return entidades;

}

function hashBusMenos(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 28));
    entidades.push(punto(posX + 0, posY - 28));

    return entidades;

}

function hashKNX(posX, posY) {

    const entidades = [];

    // rojo
    entidades.push(lineaDXF(posX + 2, posY + 0, posX + 2, posY - 28, -1, "Continuous", 1, 1));
    entidades.push(lineaDXF(posX - 6, posY - 28, posX + 6, posY - 28, -1, "Continuous", 1, 1));
    entidades.push(punto(posX + 2, posY - 28));

    // verde
    entidades.push(lineaDXF(posX - 2, posY + 0, posX - 2, posY - 24, -1, "Continuous", 1, 96));
    entidades.push(lineaDXF(posX - 6, posY - 24, posX + 6, posY - 24, -1, "Continuous", 1, 96));
    entidades.push(punto(posX - 2, posY - 24));

    // tipo cable
    entidades.push(textoDXF(posX + 6, posY - 32, "2x0.8 Trenzado", 2.5, 'MC'));

    const desLogoX = posX + 1;
    const desLogoY = posY - 37;

    entidades.push(textoDXF(desLogoX - 7.5, desLogoY - 7.4203, "K", 5, 'BL', 0, "KNX", 1, 96));
    entidades.push(textoDXF(desLogoX, desLogoY - 7.4203, "N", 5, 'BC', 0, "KNX", 1, 252));
    entidades.push(textoDXF(desLogoX + 7, desLogoY - 7.4203, "X", 5, 'BR', 0, "KNX", 1, 152));

    const logoKNX = `  0
HATCH
100
AcDbEntity
 62
    96
100
AcDbHatch
 10
${desLogoX}
 20
${desLogoY}
  2
SOLID
 70
     1
 71
     0
 91
        1
 92
        1
 93
        4
 72
     1
 10
${desLogoX - 7}
 20
${desLogoY}
 11
${desLogoX - 4.847679857416324}
 21
${desLogoY}
 72
     2
 10
${desLogoX}
 20
${desLogoY - 11.25}
 40
12.25
 50
246.6885543184899
 51
270.0
 73
     0
 72
     1
 10
${desLogoX}
 20
${desLogoY + 1}
 11
${desLogoX}
 21
${desLogoY + 2}
 72
     2
 10
${desLogoX}
 20
${desLogoY - 11.25}
 40
13.25
 50
90.0
 51
121.8907918018457
 73
     1
 97
        0
 75
     0
 76
     1
 98
        1
 10
${desLogoX - 359.0}
 20
${desLogoY - 210.0}
  0
HATCH
100
AcDbEntity
 62
   152
100
AcDbHatch
 10
${desLogoX}
 20
${desLogoY}
  2
SOLID
 70
     1
 71
     0
 91
        1
 92
        1
 93
        4
 72
     1
 10
${desLogoX + 7}
 20
${desLogoY}
 11
${desLogoX + 4.847679857416324}
 21
${desLogoY}
 72
     2
 10
${desLogoX}
 20
${desLogoY - 11.25}
 40
12.25
 50
66.68855431848984
 51
90.0
 73
     1
 72
     1
 10
${desLogoX}
 20
${desLogoY + 1}
 11
${desLogoX}
 21
${desLogoY + 2}
 72
     2
 10
${desLogoX}
 20
${desLogoY - 11.25}
 40
13.25
 50
270.0
 51
301.8907918018458
 73
     0
 97
        0
 75
     0
 76
     1
 98
        1
 10
${desLogoX + 365.0}
 20
${desLogoY - 193.0}`

    entidades.push(logoKNX);

    return entidades;

}

function hashSchucko(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 24));  // LINE en línea 0
    entidades.push(lineaDXF(posX - 3, posY - 27, posX - 3, posY - 30));  // LINE en línea 24
    entidades.push(lineaDXF(posX - 3, posY - 30, posX + 3, posY - 30));  // LINE en línea 48
    entidades.push(lineaDXF(posX + 3, posY - 30, posX + 3, posY - 27));  // LINE en línea 72
    entidades.push(lineaDXF(posX - 2, posY - 30, posX - 2, posY - 33));  // LINE en línea 182
    entidades.push(lineaDXF(posX + 2, posY - 30, posX + 2, posY - 33));  // LINE en línea 210

    entidades.push(arcoDXF(posX + 0, posY - 27, 3, 0, 180, -1));  // ARC en línea 96

    entidades.push(circunferenciaDXF(posX + 0, posY - 38, 4, -1));  // CIRCLE en línea 122
    entidades.push(circunferenciaDXF(posX - 2, posY - 38, 1, -1));  // CIRCLE en línea 142
    entidades.push(circunferenciaDXF(posX + 2, posY - 38, 1, -1));  // CIRCLE en línea 162

    return entidades;

}