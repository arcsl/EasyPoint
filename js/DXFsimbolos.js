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

        // mierda apaño toma deuda tecnica como si la fueran a prohibir
        if (hash.startsWith("#Qsl")) return hashQsimpleLogo(posX, desY, "Q" + hash.slice(4));
        
        switch (hash) {
            case "#52": return hash52(posX, desY);
            case "#132": return hash132(posX, desY);
            case "#162": return hash162(posX, desY);
            case "#25": return hash25(posX, desY);
            case "#213": return hash213(posX, desY);
            case "#216": return hash216(posX, desY);
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
            case "#Tierra": return hashTierra(posX, desY);
            case "#uTierra": return hashuTierra(posX, desY);
            case "#inTierra": return hashinTierra(posX, desY);
            case "#Qc": return hashQconmutada(posX, desY);
            case "#Qs": return hashQsimple(posX, desY);
            case "#ext": return hashExterna(posX, desY);
            case "#ext2": return hashExterna2(posX, desY);
            case "#ext3": return hashExterna3(posX, desY);
            case "#int": return hashInterna(posX, desY);
            case "#L": return hashAlimL(posX, desY);
            case "#N": return hashAlimN(posX, desY);
            case "#G": return hashAlimG(posX, desY);
            case "#G0": return hashAlimG0(posX, desY);
            case "#b+": return hashBusMas(posX, desY);
            case "#b-": return hashBusMenos(posX, desY);
            case "#KNX": return hashKNX(posX, desY);
            case "#KNXsl": return hashKNXsinlogo(posX, desY);
            case "#Sch": return hashSchucko(posX, desY);
            case "#AGen": return hashAlimGen(posX, desY);
            case "#A24v": return hashAlim24V(posX, desY);
            case "#APre1": return hashAlimPres1(posX, desY);
            case "#APre2": return hashAlimPres2(posX, desY);
            case "#APre3": return hashAlimPres3(posX, desY);
            case "#MBUS": return hashMBUS(posX, desY);
            case "#MBUSL": return hashMBUSL(posX, desY);
            case "#MBUSG": return hashMBUSG(posX, desY);
            case "#MBUS2": return hashMBUS2(posX, desY);
            case "#MBUS2L": return hashMBUS2L(posX, desY);
            case "#MBUS2G": return hashMBUS2G(posX, desY);
            case "#3V": return hash3V(posX, desY);
            case "#RTD": return hashRTD(posX, desY);
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

function hash132(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX - 13, posY + 0, posX + 0, posY + 0, 0));

    return entidades;

}

function hash162(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX - 16, posY + 0, posX + 0, posY + 0, 0));

    return entidades;

}

function hash25(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 5, posY + 0, 0));

    return entidades;

}

function hash213(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 13, posY + 0, 0));

    return entidades;

}

function hash216(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 16, posY + 0, 0));

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

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 18));

    return entidades;

}

function hashSemiSep(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY - 9, posX + 0, posY + 7));

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

    entidades.push(lineaDXF(posX - 6, posY - 5, posX - 6, posY - 2, 0));
    entidades.push(lineaDXF(posX - 6, posY - 2, posX - 2, posY - 2, 0));
    entidades.push(lineaDXF(posX - 2, posY - 2, posX - 2, posY - 5, 0));
    entidades.push(lineaDXF(posX - 2, posY - 5, posX - 6, posY - 5, 0));
    entidades.push(lineaDXF(posX + 2, posY - 2, posX + 6, posY - 2, 0));
    entidades.push(lineaDXF(posX + 6, posY - 2, posX + 6, posY - 5, 0));
    entidades.push(lineaDXF(posX + 6, posY - 5, posX + 2, posY - 5, 0));
    entidades.push(lineaDXF(posX + 2, posY - 5, posX + 2, posY - 2, 0));
    entidades.push(lineaDXF(posX - 2, posY + 2, posX - 2, posY + 5, 0));
    entidades.push(lineaDXF(posX - 2, posY + 5, posX + 2, posY + 5, 0));
    entidades.push(lineaDXF(posX + 2, posY + 5, posX + 2, posY + 2, 0));
    entidades.push(lineaDXF(posX + 2, posY + 2, posX - 2, posY + 2, 0));
    entidades.push(lineaDXF(posX - 4, posY - 2, posX - 4, posY + 0, 0));
    entidades.push(lineaDXF(posX - 4, posY + 0, posX + 4, posY + 0, 0));
    entidades.push(lineaDXF(posX + 4, posY + 0, posX + 4, posY - 2, 0));
    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 2, 0));

    return entidades;

}

function hashT(posX, posY, textsize) {

    const entidades = [];

    entidades.push(textoDXF(posX, posY, "T", textsize, align = 'MC', rotation = 180));

    return entidades;

}

function hashTierra(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY + 1.5));  // LINE en línea 0
    entidades.push(lineaDXF(posX - 1.5, posY + 0, posX + 1.5, posY + 0));  // LINE en línea 26
    entidades.push(lineaDXF(posX - 1, posY - 0.5, posX + 1, posY - 0.5));  // LINE en línea 52
    entidades.push(lineaDXF(posX - 0.5, posY - 1, posX + 0.5, posY - 1));  // LINE en línea 78

    entidades.push(arcoDXF(posX + 0, posY - 1, 2, 0, 180, - 1));  // ARC en línea 104

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

function hashinTierra(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF( posX + 3, posY - 52, posX - 3, posY - 52));
    entidades.push(lineaDXF( posX + 0, posY +  0, posX + 0, posY - 52));
    entidades.push(lineaDXF( posX - 2, posY - 53, posX + 2, posY - 53));
    entidades.push(lineaDXF( posX - 1, posY - 54, posX + 1, posY - 54));

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

function hashQsimpleLogo(posX, posY, texto="") {

    const entidades = [];

    entidades.push(...hashQsimple(posX, posY));
    entidades.push(textoDXF(posX, posY-2, texto, 2.5, "MC" ));

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

function hashInterna(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 104));

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

    entidades.push(...hashKNXsinlogo(posX, posY));

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

function hashKNXsinlogo(posX, posY) {
    const entidades = [];
    // rojo
    entidades.push(lineaDXF(posX + 2, posY + 0, posX + 2, posY - 28, -1, "Continuous", 1, 1));
    // entidades.push(lineaDXF(posX - 6, posY - 28, posX + 6, posY - 28, -1, "Continuous", 1, 1));
    entidades.push(punto(posX + 2, posY - 28));

    // verde
    entidades.push(lineaDXF(posX - 2, posY + 0, posX - 2, posY - 24, -1, "Continuous", 1, 96));
    // entidades.push(lineaDXF(posX - 6, posY - 24, posX + 6, posY - 24, -1, "Continuous", 1, 96));
    entidades.push(punto(posX - 2, posY - 24));
    return entidades;
}

function hashSchucko(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 0, posX + 0, posY - 36));  // LINE en línea 0
    entidades.push(lineaDXF(posX - 3, posY - 39, posX - 3, posY - 42));  // LINE en línea 24
    entidades.push(lineaDXF(posX - 3, posY - 42, posX + 3, posY - 42));  // LINE en línea 48
    entidades.push(lineaDXF(posX + 3, posY - 42, posX + 3, posY - 39));  // LINE en línea 72
    entidades.push(lineaDXF(posX - 2, posY - 42, posX - 2, posY - 45));  // LINE en línea 182
    entidades.push(lineaDXF(posX + 2, posY - 42, posX + 2, posY - 45));  // LINE en línea 210

    entidades.push(arcoDXF(posX + 0, posY - 39, 3, 0, 180, -1));  // ARC en línea 96

    entidades.push(circunferenciaDXF(posX + 0, posY - 50, 4, -1));  // CIRCLE en línea 122
    entidades.push(circunferenciaDXF(posX - 2, posY - 50, 1, -1));  // CIRCLE en línea 142
    entidades.push(circunferenciaDXF(posX + 2, posY - 50, 1, -1));  // CIRCLE en línea 162

    return entidades;

}

function hashAlimGen(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 40, posY - 1, posX + 40, posY - 118));  // LINE en línea 34
    entidades.push(lineaDXF(posX + 44, posY - 1, posX + 44, posY - 118));  // LINE en línea 58
    entidades.push(lineaDXF(posX + 76, posY + 18, posX + 76, posY + 12));  // LINE en línea 290
    entidades.push(lineaDXF(posX + 72, posY + 22, posX + 72, posY + 12));  // LINE en línea 314
    entidades.push(lineaDXF(posX + 44, posY + 18, posX + 44, posY + 12));  // LINE en línea 406
    entidades.push(lineaDXF(posX + 38, posY + 12, posX + 40, posY + 8));  // LINE en línea 430
    entidades.push(lineaDXF(posX + 42, posY + 12, posX + 44, posY + 8));  // LINE en línea 454
    entidades.push(lineaDXF(posX + 44, posY + 8, posX + 44, posY + 6));  // LINE en línea 478
    entidades.push(lineaDXF(posX + 40, posY + 8, posX + 40, posY + 6));  // LINE en línea 502
    entidades.push(lineaDXF(posX + 40, posY + 6, posX + 38, posY + 6));  // LINE en línea 526
    entidades.push(lineaDXF(posX + 38, posY + 6, posX + 38, posY + 4));  // LINE en línea 550
    entidades.push(lineaDXF(posX + 38, posY + 4, posX + 40, posY + 4));  // LINE en línea 574
    entidades.push(lineaDXF(posX + 40, posY + 4, posX + 40, posY + 2));  // LINE en línea 598
    entidades.push(lineaDXF(posX + 44, posY + 6, posX + 42, posY + 6));  // LINE en línea 622
    entidades.push(lineaDXF(posX + 42, posY + 6, posX + 42, posY + 4));  // LINE en línea 646
    entidades.push(lineaDXF(posX + 42, posY + 4, posX + 44, posY + 4));  // LINE en línea 670
    entidades.push(lineaDXF(posX + 44, posY + 4, posX + 44, posY + 2));  // LINE en línea 720
    entidades.push(lineaDXF(posX + 40, posY + 22, posX + 40, posY + 12));  // LINE en línea 770
    entidades.push(lineaDXF(posX + 72, posY - 1, posX + 72, posY - 4.536));  // LINE en línea 794
    entidades.push(lineaDXF(posX + 76, posY - 1, posX + 76, posY - 4.536));  // LINE en línea 818
    entidades.push(lineaDXF(posX + 70, posY + 12, posX + 72, posY + 8));  // LINE en línea 902
    entidades.push(lineaDXF(posX + 74, posY + 12, posX + 76, posY + 8));  // LINE en línea 926
    entidades.push(lineaDXF(posX + 76, posY + 8, posX + 76, posY + 6));  // LINE en línea 950
    entidades.push(lineaDXF(posX + 72, posY + 8, posX + 72, posY + 6));  // LINE en línea 974
    entidades.push(lineaDXF(posX + 72, posY + 6, posX + 70, posY + 6));  // LINE en línea 998
    entidades.push(lineaDXF(posX + 70, posY + 6, posX + 70, posY + 4));  // LINE en línea 1022
    entidades.push(lineaDXF(posX + 70, posY + 4, posX + 72, posY + 4));  // LINE en línea 1046
    entidades.push(lineaDXF(posX + 72, posY + 4, posX + 72, posY + 2));  // LINE en línea 1070
    entidades.push(lineaDXF(posX + 76, posY + 6, posX + 74, posY + 6));  // LINE en línea 1094
    entidades.push(lineaDXF(posX + 74, posY + 6, posX + 74, posY + 4));  // LINE en línea 1118
    entidades.push(lineaDXF(posX + 74, posY + 4, posX + 76, posY + 4));  // LINE en línea 1142
    entidades.push(lineaDXF(posX + 76, posY + 4, posX + 76, posY + 2));  // LINE en línea 1192
    entidades.push(lineaDXF(posX + 108, posY + 18, posX + 108, posY + 12));  // LINE en línea 1434
    entidades.push(lineaDXF(posX + 104, posY + 22, posX + 104, posY + 12));  // LINE en línea 1458
    entidades.push(lineaDXF(posX + 104, posY - 1, posX + 104, posY - 4.536));  // LINE en línea 1516
    entidades.push(lineaDXF(posX + 108, posY - 1, posX + 108, posY - 4.536));  // LINE en línea 1540
    entidades.push(lineaDXF(posX + 102, posY + 12, posX + 104, posY + 8));  // LINE en línea 1624
    entidades.push(lineaDXF(posX + 106, posY + 12, posX + 108, posY + 8));  // LINE en línea 1648
    entidades.push(lineaDXF(posX + 108, posY + 8, posX + 108, posY + 6));  // LINE en línea 1672
    entidades.push(lineaDXF(posX + 104, posY + 8, posX + 104, posY + 6));  // LINE en línea 1696
    entidades.push(lineaDXF(posX + 104, posY + 6, posX + 102, posY + 6));  // LINE en línea 1720
    entidades.push(lineaDXF(posX + 102, posY + 6, posX + 102, posY + 4));  // LINE en línea 1744
    entidades.push(lineaDXF(posX + 102, posY + 4, posX + 104, posY + 4));  // LINE en línea 1768
    entidades.push(lineaDXF(posX + 104, posY + 4, posX + 104, posY + 2));  // LINE en línea 1792
    entidades.push(lineaDXF(posX + 108, posY + 6, posX + 106, posY + 6));  // LINE en línea 1816
    entidades.push(lineaDXF(posX + 106, posY + 6, posX + 106, posY + 4));  // LINE en línea 1840
    entidades.push(lineaDXF(posX + 106, posY + 4, posX + 108, posY + 4));  // LINE en línea 1864
    entidades.push(lineaDXF(posX + 108, posY + 4, posX + 108, posY + 2));  // LINE en línea 1914
    entidades.push(lineaDXF(posX + 140, posY + 18, posX + 140, posY + 12));  // LINE en línea 2156
    entidades.push(lineaDXF(posX + 136, posY + 22, posX + 136, posY + 12));  // LINE en línea 2180
    entidades.push(lineaDXF(posX + 136, posY - 1, posX + 136, posY - 4.536));  // LINE en línea 2238
    entidades.push(lineaDXF(posX + 140, posY - 1, posX + 140, posY - 4.536));  // LINE en línea 2262
    entidades.push(lineaDXF(posX + 134, posY + 12, posX + 136, posY + 8));  // LINE en línea 2346
    entidades.push(lineaDXF(posX + 138, posY + 12, posX + 140, posY + 8));  // LINE en línea 2370
    entidades.push(lineaDXF(posX + 140, posY + 8, posX + 140, posY + 6));  // LINE en línea 2394
    entidades.push(lineaDXF(posX + 136, posY + 8, posX + 136, posY + 6));  // LINE en línea 2418
    entidades.push(lineaDXF(posX + 136, posY + 6, posX + 134, posY + 6));  // LINE en línea 2442
    entidades.push(lineaDXF(posX + 134, posY + 6, posX + 134, posY + 4));  // LINE en línea 2466
    entidades.push(lineaDXF(posX + 134, posY + 4, posX + 136, posY + 4));  // LINE en línea 2490
    entidades.push(lineaDXF(posX + 136, posY + 4, posX + 136, posY + 2));  // LINE en línea 2514
    entidades.push(lineaDXF(posX + 140, posY + 6, posX + 138, posY + 6));  // LINE en línea 2538
    entidades.push(lineaDXF(posX + 138, posY + 6, posX + 138, posY + 4));  // LINE en línea 2562
    entidades.push(lineaDXF(posX + 138, posY + 4, posX + 140, posY + 4));  // LINE en línea 2586
    entidades.push(lineaDXF(posX + 140, posY + 4, posX + 140, posY + 2));  // LINE en línea 2636
    entidades.push(lineaDXF(posX + 0, posY + 18, posX + 44, posY + 18));  // LINE en línea 2810
    entidades.push(lineaDXF(posX + 136, posY + 22, posX + 104, posY + 22));  // LINE en línea 2834
    entidades.push(lineaDXF(posX + 40, posY + 22, posX + 0, posY + 22));  // LINE en línea 2858
    entidades.push(lineaDXF(posX + 108, posY + 18, posX + 140, posY + 18));  // LINE en línea 2882
    entidades.push(lineaDXF(posX + 72, posY + 22, posX + 104, posY + 22));  // LINE en línea 2906
    entidades.push(lineaDXF(posX + 76, posY + 18, posX + 108, posY + 18));  // LINE en línea 2930
    entidades.push(lineaDXF(posX + 40, posY + 22, posX + 72, posY + 22));  // LINE en línea 2954
    entidades.push(lineaDXF(posX + 44, posY + 18, posX + 76, posY + 18));  // LINE en línea 2978

    entidades.push(arcoDXF(posX + 40, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 694
    entidades.push(arcoDXF(posX + 44, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 744
    entidades.push(arcoDXF(posX + 72, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 1166
    entidades.push(arcoDXF(posX + 76, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 1216
    entidades.push(arcoDXF(posX + 104, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 1888
    entidades.push(arcoDXF(posX + 108, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 1938
    entidades.push(arcoDXF(posX + 136, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 2610
    entidades.push(arcoDXF(posX + 140, posY + 0.5, 1.5, 90, 270, -1));  // ARC en línea 2660

    entidades.push(circunferenciaDXF(posX + 74, posY - 8, 4, -1));  // CIRCLE en línea 842
    entidades.push(circunferenciaDXF(posX + 72, posY - 8, 1, -1));  // CIRCLE en línea 862
    entidades.push(circunferenciaDXF(posX + 76, posY - 8, 1, -1));  // CIRCLE en línea 882
    entidades.push(circunferenciaDXF(posX + 106, posY - 8, 4, -1));  // CIRCLE en línea 1564
    entidades.push(circunferenciaDXF(posX + 104, posY - 8, 1, -1));  // CIRCLE en línea 1584
    entidades.push(circunferenciaDXF(posX + 108, posY - 8, 1, -1));  // CIRCLE en línea 1604
    entidades.push(circunferenciaDXF(posX + 138, posY - 8, 4, -1));  // CIRCLE en línea 2286
    entidades.push(circunferenciaDXF(posX + 136, posY - 8, 1, -1));  // CIRCLE en línea 2306
    entidades.push(circunferenciaDXF(posX + 140, posY - 8, 1, -1));  // CIRCLE en línea 2326

    entidades.push(textoDXF(posX + 36.986, posY + 7, "6A", 2, "MR", 0));  // TEXT en línea 0
    entidades.push(textoDXF(posX + 40, posY - 120, "S0", 2.5, "MR", 90));  // TEXT en línea 82
    entidades.push(textoDXF(posX + 44, posY - 120, "N0", 2.5, "MR", 90));  // TEXT en línea 118
    entidades.push(textoDXF(posX - 1, posY + 22, "S 230V", 2, "MR", 0));  // TEXT en línea 154
    entidades.push(textoDXF(posX - 1, posY + 18, "N 230V", 2, "MR", 0));  // TEXT en línea 188
    entidades.push(textoDXF(posX + 72, posY - 38, "ENCHUFE 16A", 2, "ML", 90));  // TEXT en línea 222
    entidades.push(textoDXF(posX + 76, posY - 38, "SERVICIO", 2, "ML", 90));  // TEXT en línea 256
    entidades.push(textoDXF(posX + 42, posY - 192, "ALIMENTACION 230V 50Hz", 2.5, "ML", 90));  // TEXT en línea 338
    entidades.push(textoDXF(posX + 68.986, posY + 7, "16A", 2, "MR", 0));  // TEXT en línea 372
    entidades.push(textoDXF(posX + 104, posY - 38, "ENCHUFE 16A", 2, "ML", 90));  // TEXT en línea 1366
    entidades.push(textoDXF(posX + 108, posY - 38, "ROUTER", 2, "ML", 90));  // TEXT en línea 1400
    entidades.push(textoDXF(posX + 100.986, posY + 7, "16A", 2, "MR", 0));  // TEXT en línea 1482
    entidades.push(textoDXF(posX + 136, posY - 38, "ENCHUFE 16A", 2, "ML", 90));  // TEXT en línea 2088
    entidades.push(textoDXF(posX + 140, posY - 38, "SERVIDOR", 2, "ML", 90));  // TEXT en línea 2122
    entidades.push(textoDXF(posX + 132.986, posY + 7, "16A", 2, "MR", 0));  // TEXT en línea 2204

    entidades.push(punto(posX + 44, posY + 18));  // HATCH punto línea 1242
    entidades.push(punto(posX + 40, posY + 22));  // HATCH punto línea 1304
    entidades.push(punto(posX + 76, posY + 18));  // HATCH punto línea 1964
    entidades.push(punto(posX + 72, posY + 22));  // HATCH punto línea 2026
    entidades.push(punto(posX + 108, posY + 18));  // HATCH punto línea 2686
    entidades.push(punto(posX + 104, posY + 22));  // HATCH punto línea 2748

    return entidades;

}

function hashAlim24V(posX, posY) {

    const entidades = [];

    entidades.push(textoDXF(posX - 7.014, posY + 9, "6A", 2, "MR", 0));  // TEXT en línea 0
    entidades.push(textoDXF(posX - 7, posY - 4, "230/24", 2, "MR", 0));  // TEXT en línea 34
    entidades.push(textoDXF(posX - 7, posY - 8, "160VA", 2, "MR", 0));  // TEXT en línea 68
    entidades.push(textoDXF(posX - 7.014, posY - 23, "10A", 2, "MR", 0));  // TEXT en línea 102
    entidades.push(lineaDXF(posX - 4, posY - 31, posX - 4, posY - 116));  // LINE en línea 136
    entidades.push(lineaDXF(posX + 0, posY - 31, posX + 0, posY - 116));  // LINE en línea 160
    entidades.push(textoDXF(posX - 4, posY - 118, "G", 2.5, "MR", 90));  // TEXT en línea 184
    entidades.push(textoDXF(posX + 0, posY - 118, "G0", 2.5, "MR", 90));  // TEXT en línea 220
    entidades.push(lineaDXF(posX + 0, posY + 20, posX + 0, posY + 14));  // LINE en línea 256
    entidades.push(lineaDXF(posX - 6, posY + 14, posX - 4, posY + 10));  // LINE en línea 280
    entidades.push(lineaDXF(posX - 2, posY + 14, posX + 0, posY + 10));  // LINE en línea 304
    entidades.push(lineaDXF(posX + 0, posY + 10, posX + 0, posY + 8));  // LINE en línea 328
    entidades.push(lineaDXF(posX - 4, posY + 10, posX - 4, posY + 8));  // LINE en línea 352
    entidades.push(lineaDXF(posX - 4, posY + 8, posX - 6, posY + 8));  // LINE en línea 376
    entidades.push(lineaDXF(posX - 6, posY + 8, posX - 6, posY + 6));  // LINE en línea 400
    entidades.push(lineaDXF(posX - 6, posY + 6, posX - 4, posY + 6));  // LINE en línea 424
    entidades.push(lineaDXF(posX - 4, posY + 6, posX - 4, posY + 4));  // LINE en línea 448
    entidades.push(lineaDXF(posX + 0, posY + 8, posX - 2, posY + 8));  // LINE en línea 472
    entidades.push(lineaDXF(posX - 2, posY + 8, posX - 2, posY + 6));  // LINE en línea 496
    entidades.push(lineaDXF(posX - 2, posY + 6, posX + 0, posY + 6));  // LINE en línea 520
    entidades.push(arcoDXF(posX - 4, posY + 2.5, 1.5, 90, 270, -1));  // ARC en línea 544
    entidades.push(lineaDXF(posX + 0, posY + 6, posX + 0, posY + 4));  // LINE en línea 570
    entidades.push(arcoDXF(posX + 0, posY + 2.5, 1.5, 90, 270, -1));  // ARC en línea 594
    entidades.push(lineaDXF(posX - 4, posY + 24, posX - 4, posY + 14));  // LINE en línea 620
    entidades.push(circunferenciaDXF(posX - 2, posY - 6, 4, -1));  // CIRCLE en línea 644
    entidades.push(circunferenciaDXF(posX - 2, posY - 11, 3, -1));  // CIRCLE en línea 664
    entidades.push(lineaDXF(posX - 4, posY + 1, posX - 4, posY - 2.536));  // LINE en línea 684
    entidades.push(lineaDXF(posX + 0, posY + 1, posX + 0, posY - 2.536));  // LINE en línea 708
    entidades.push(lineaDXF(posX + 0, posY - 13.236, posX + 0, posY - 18));  // LINE en línea 732
    entidades.push(lineaDXF(posX - 6, posY - 18, posX - 4, posY - 22));  // LINE en línea 756
    entidades.push(lineaDXF(posX - 2, posY - 18, posX + 0, posY - 22));  // LINE en línea 780
    entidades.push(lineaDXF(posX + 0, posY - 22, posX + 0, posY - 24));  // LINE en línea 804
    entidades.push(lineaDXF(posX - 4, posY - 22, posX - 4, posY - 24));  // LINE en línea 828
    entidades.push(lineaDXF(posX - 4, posY - 24, posX - 6, posY - 24));  // LINE en línea 852
    entidades.push(lineaDXF(posX - 6, posY - 24, posX - 6, posY - 26));  // LINE en línea 876
    entidades.push(lineaDXF(posX - 6, posY - 26, posX - 4, posY - 26));  // LINE en línea 900
    entidades.push(lineaDXF(posX - 4, posY - 26, posX - 4, posY - 28));  // LINE en línea 924
    entidades.push(lineaDXF(posX + 0, posY - 24, posX - 2, posY - 24));  // LINE en línea 948
    entidades.push(lineaDXF(posX - 2, posY - 24, posX - 2, posY - 26));  // LINE en línea 972
    entidades.push(lineaDXF(posX - 2, posY - 26, posX + 0, posY - 26));  // LINE en línea 996
    entidades.push(arcoDXF(posX - 4, posY - 29.5, 1.5, 90, 270, -1));  // ARC en línea 1020
    entidades.push(lineaDXF(posX + 0, posY - 26, posX + 0, posY - 28));  // LINE en línea 1046
    entidades.push(arcoDXF(posX + 0, posY - 29.5, 1.5, 90, 270, -1));  // ARC en línea 1070
    entidades.push(lineaDXF(posX - 4, posY - 13.236, posX - 4, posY - 18));  // LINE en línea 1096
    entidades.push(punto(posX + 0, posY + 20));  // HATCH punto línea 1120
    entidades.push(punto(posX - 4, posY + 24));  // HATCH punto línea 1182

    return entidades;

}

function hashAlimPresostato(posX, posY, index) {

    const entidades = [];
    entidades.push(lineaDXF(posX - 14, posY - 104, posX - 14, posY - 110));  // LINE en línea 0
    entidades.push(lineaDXF(posX - 14, posY - 110, posX - 10, posY - 110));  // LINE en línea 26
    entidades.push(lineaDXF(posX - 10, posY - 110, posX - 10, posY - 104));  // LINE en línea 52
    entidades.push(lineaDXF(posX - 10, posY - 104, posX - 14, posY - 104));  // LINE en línea 78
    entidades.push(lineaDXF(posX - 12, posY - 110, posX - 12, posY - 116));  // LINE en línea 104
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110));  // LINE en línea 128
    entidades.push(lineaDXF(posX - 6, posY - 110, posX - 2, posY - 110));  // LINE en línea 154
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104));  // LINE en línea 180
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110));  // LINE en línea 206
    entidades.push(lineaDXF(posX - 2, posY - 110, posX + 2, posY - 110));  // LINE en línea 232
    entidades.push(lineaDXF(posX + 2, posY - 110, posX + 2, posY - 104));  // LINE en línea 258
    entidades.push(lineaDXF(posX + 2, posY - 104, posX - 2, posY - 104));  // LINE en línea 284
    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));  // LINE en línea 310
    entidades.push(lineaDXF(posX + 0, posY - 110, posX + 0, posY - 116));  // LINE en línea 334
    entidades.push(lineaDXF(posX - 14, posY - 116, posX + 2, posY - 116));  // LINE en línea 358
    entidades.push(lineaDXF(posX + 2, posY - 116, posX + 2, posY - 132));  // LINE en línea 384
    entidades.push(lineaDXF(posX + 2, posY - 132, posX - 14, posY - 132));  // LINE en línea 410
    entidades.push(lineaDXF(posX - 14, posY - 132, posX - 14, posY - 116));  // LINE en línea 436
    entidades.push(lineaDXF(posX - 12, posY - 120, posX - 12, posY - 130));  // LINE en línea 564
    entidades.push(lineaDXF(posX - 12, posY - 130, posX - 2, posY - 130));  // LINE en línea 588
    entidades.push(lineaDXF(posX + 0, posY - 122, posX + 0, posY - 120));  // LINE en línea 612
    entidades.push(lineaDXF(posX - 4, posY - 120, posX - 4, posY - 122));  // LINE en línea 636
    entidades.push(lineaDXF(posX - 4, posY - 122, posX - 2, posY - 126));  // LINE en línea 660
    entidades.push(lineaDXF(posX - 2, posY - 126, posX - 2, posY - 130));  // LINE en línea 684
    entidades.push(lineaDXF(posX - 3, posY - 124, posX - 6, posY - 124));  // LINE en línea 708
    entidades.push(lineaDXF(posX - 6, posY - 124, posX - 6, posY - 122));  // LINE en línea 770
    entidades.push(lineaDXF(posX - 6, posY - 122, posX - 10, posY - 122));  // LINE en línea 798
    entidades.push(lineaDXF(posX - 10, posY - 122, posX - 10, posY - 126));  // LINE en línea 826
    entidades.push(lineaDXF(posX - 10, posY - 126, posX - 6, posY - 126));  // LINE en línea 854
    entidades.push(lineaDXF(posX - 6, posY - 126, posX - 6, posY - 124));  // LINE en línea 882
    entidades.push(lineaDXF(posX - 8, posY - 86, posX - 8, posY - 90));  // LINE en línea 910
    entidades.push(lineaDXF(posX - 8, posY - 90, posX + 0, posY - 90));  // LINE en línea 934
    entidades.push(lineaDXF(posX + 0, posY - 90, posX + 0, posY - 86));  // LINE en línea 958
    entidades.push(lineaDXF(posX + 0, posY - 86, posX - 8, posY - 86));  // LINE en línea 982
    entidades.push(lineaDXF(posX - 4, posY - 90, posX - 4, posY - 104));  // LINE en línea 1006
    entidades.push(lineaDXF(posX + 12, posY - 90, posX + 12, posY - 116));  // LINE en línea 1030
    entidades.push(lineaDXF(posX + 16, posY - 116, posX + 16, posY - 54));  // LINE en línea 1054
    entidades.push(lineaDXF(posX - 4, posY - 86, posX - 4, posY - 50));  // LINE en línea 1078
    entidades.push(lineaDXF(posX - 12, posY - 104, posX - 12, posY - 54));  // LINE en línea 1102
    entidades.push(lineaDXF(posX + 16, posY - 54, posX - 36, posY - 54));  // LINE en línea 1126
    entidades.push(lineaDXF(posX - 40, posY - 50, posX + 12, posY - 50));  // LINE en línea 1150
    entidades.push(lineaDXF(posX + 12, posY - 90, posX + 14.224, posY - 85.553));  // LINE en línea 1174
    entidades.push(lineaDXF(posX + 12, posY - 86, posX + 12, posY - 50));  // LINE en línea 1198
    entidades.push(lineaDXF(posX + 0, posY - 88, posX + 13, posY - 88));  // LINE en línea 1222
    entidades.push(lineaDXF(posX + 12, posY - 86, posX + 14.5, posY - 86));  // LINE en línea 1318

    entidades.push(textoDXF(posX - 12, posY - 118, "1", 2.5, "MC", 0));  // TEXT en línea 462
    entidades.push(textoDXF(posX - 4, posY - 118, "2", 2.5, "MC", 0));  // TEXT en línea 496
    entidades.push(textoDXF(posX + 0, posY - 118, "4", 2.5, "MC", 0));  // TEXT en línea 530
    entidades.push(textoDXF(posX - 8, posY - 124, "P", 2.5, "MC", 0));  // TEXT en línea 736
    entidades.push(textoDXF(posX + 11, posY - 84, "21", 1.5, "MR", 0));  // TEXT en línea 1250
    entidades.push(textoDXF(posX + 11.025, posY - 91.219, "22", 1.5, "MR", 0));  // TEXT en línea 1284
    entidades.push(textoDXF(posX - 4.776, posY - 84, `R${index}`, 2, "MR", 0));  // TEXT en línea 1342
    entidades.push(textoDXF(posX + 12, posY - 117.72, `S${index}`, 2.5, "MR", 90));  // TEXT en línea 1376
    entidades.push(textoDXF(posX + 16, posY - 117.72, `N${index}`, 2.5, "MR", 90));  // TEXT en línea 1412
    entidades.push(textoDXF(posX + 12, posY - 190, "TENSION PROTEGIDA", 2.5, "ML", 90));

    entidades.push(punto(posX - 40, posY - 50));  // HATCH punto línea 1448
    entidades.push(punto(posX - 36, posY - 54));  // HATCH punto línea 1510
    entidades.push(punto(posX - 12, posY - 54));  // HATCH punto línea 1572
    entidades.push(punto(posX - 4, posY - 50));  // HATCH punto línea 1634

    return entidades;

}

function hashAlimPres1(posX, posY) {
    const entidades = [];
    entidades.push(...hashAlimPresostato(posX, posY, 1));
    return entidades;
}

function hashAlimPres2(posX, posY) {
    const entidades = [];
    entidades.push(...hashAlimPresostato(posX, posY, 2));
    return entidades;
}

function hashAlimPres3(posX, posY) {
    const entidades = [];
    entidades.push(...hashAlimPresostato(posX, posY, 3));
    return entidades;
}

function hashMBUS(posX, posY) {
    const entidades = [];

    entidades.push(lineaDXF(posX - 4, posY + 0, posX - 4, posY - 104));
    entidades.push(lineaDXF(posX - 8, posY + 0, posX - 8, posY - 104));

    // borna 1
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));

    // borna 2
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 10, posY - 104, 40));
    entidades.push(lineaDXF(posX - 6, posY - 110, posX - 10, posY - 110, 40));
    entidades.push(lineaDXF(posX - 10, posY - 104, posX - 10, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));

    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));
    entidades.push(lineaDXF(posX - 8, posY - 110, posX - 8, posY - 116));

    // envolvente
    entidades.push(lineaDXF(posX - 2, posY - 116, posX - 10, posY - 116, 40));
    entidades.push(lineaDXF(posX - 2, posY - 132, posX - 10, posY - 132, 40));
    entidades.push(lineaDXF(posX - 10, posY - 116, posX - 10, posY - 132, 40));
    entidades.push(lineaDXF(posX - 2, posY - 132, posX - 2, posY - 116, 40));

    entidades.push(textoDXF(posX - 8, posY - 118, "M+", 2.5, "MC", 0, "Standard", 0.7));  // TEXT en línea 456
    entidades.push(textoDXF(posX - 4, posY - 118, "M-", 2.5, "MC", 0, "Standard", 0.7));  // TEXT en línea 492


    return entidades;
}

function hashMBUS2(posX, posY) {
    const entidades = [];

    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 6, posY - 104, 40));
    entidades.push(lineaDXF(posX - 2, posY - 110, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));
    entidades.push(lineaDXF(posX - 2, posY - 104, posX - 2, posY - 110, 40));

    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 10, posY - 104, 40));
    entidades.push(lineaDXF(posX - 6, posY - 110, posX - 10, posY - 110, 40));
    entidades.push(lineaDXF(posX - 10, posY - 104, posX - 10, posY - 110, 40));
    entidades.push(lineaDXF(posX - 6, posY - 104, posX - 6, posY - 110, 40));

    entidades.push(lineaDXF(posX - 2, posY - 116, posX - 10, posY - 116, 40));
    entidades.push(lineaDXF(posX - 2, posY - 132, posX - 10, posY - 132, 40));
    entidades.push(lineaDXF(posX - 10, posY - 116, posX - 10, posY - 132, 40));
    entidades.push(lineaDXF(posX - 2, posY - 132, posX - 2, posY - 116, 40));

    entidades.push(lineaDXF(posX - 4, posY - 110, posX - 4, posY - 116));  // LINE en línea 104
    entidades.push(lineaDXF(posX - 4, posY - 104, posX - 4, posY - 54));  // LINE en línea 128
    entidades.push(lineaDXF(posX - 4, posY - 54, posX - 24, posY - 54));  // LINE en línea 152
    entidades.push(lineaDXF(posX - 8, posY - 110, posX - 8, posY - 116));  // LINE en línea 280
    entidades.push(lineaDXF(posX - 8, posY - 104, posX - 8, posY - 58));  // LINE en línea 304
    entidades.push(lineaDXF(posX - 8, posY - 58, posX - 28, posY - 58));  // LINE en línea 328
    entidades.push(textoDXF(posX - 8, posY - 118, "M+", 2.5, "MC", 0, "Standard", 0.7));  // TEXT en línea 456
    entidades.push(textoDXF(posX - 4, posY - 118, "M-", 2.5, "MC", 0, "Standard", 0.7));  // TEXT en línea 492
    entidades.push(punto(posX - 24, posY - 54));  // HATCH punto línea 566
    entidades.push(punto(posX - 28, posY - 58));  // HATCH punto línea 628

    return entidades;
}

function hash3V(posX, posY) {

    const entidades = [];

    entidades.push(textoDXF(posX + 287, posY + 2, "", 2, "MC", 0));  // TEXT en línea 0
    entidades.push(textoDXF(posX + 363, posY + 14, "", 2, "MC", 0));  // TEXT en línea 34
    entidades.push(textoDXF(posX + 363, posY + 10, "", 2, "MC", 0));  // TEXT en línea 68
    entidades.push(textoDXF(posX + 707, posY + 2, "", 2, "MC", 0));  // TEXT en línea 102
    entidades.push(textoDXF(posX + 783, posY + 14, "", 2, "MC", 0));  // TEXT en línea 136
    entidades.push(textoDXF(posX + 783, posY + 10, "", 2, "MC", 0));  // TEXT en línea 170
    entidades.push(textoDXF(posX + 1127, posY + 2, "", 2, "MC", 0));  // TEXT en línea 204
    entidades.push(textoDXF(posX + 1203, posY + 14, "", 2, "MC", 0));  // TEXT en línea 238
    entidades.push(textoDXF(posX + 1203, posY + 10, "", 2, "MC", 0));  // TEXT en línea 272
    entidades.push(lineaDXF(posX - 20, posY - 4, posX - 20, posY + 5));  // LINE en línea 306
    entidades.push(solidDXF([[posX - 20, posY - 2.5], [posX - 20.5, posY - 4], [posX - 19.5, posY - 4], [posX - 19.5, posY - 4]]));  // SOLID en línea 330
    entidades.push(lineaDXF(posX - 12, posY - 4, posX - 12, posY - 1));  // LINE en línea 366
    entidades.push(lineaDXF(posX - 12, posY + 5, posX - 12, posY + 3));  // LINE en línea 390
    entidades.push(lineaDXF(posX - 12, posY - 1, posX - 14, posY + 3));  // LINE en línea 414
    entidades.push(solidDXF([[posX - 12, posY - 4], [posX - 12.5, posY - 2.5], [posX - 11.5, posY - 2.5], [posX - 11.5, posY - 2.5]]));  // SOLID en línea 438
    entidades.push(lineaDXF(posX + 4, posY - 4, posX + 4, posY - 1));  // LINE en línea 474
    entidades.push(lineaDXF(posX + 4, posY + 5, posX + 4, posY + 3));  // LINE en línea 498
    entidades.push(lineaDXF(posX + 4, posY - 1, posX + 2, posY + 3));  // LINE en línea 522
    entidades.push(solidDXF([[posX + 4, posY - 4], [posX + 3.5, posY - 2.5], [posX + 4.5, posY - 2.5], [posX + 4.5, posY - 2.5]]));  // SOLID en línea 546
    entidades.push(lineaDXF(posX + 20, posY - 4, posX + 20, posY - 1));  // LINE en línea 582
    entidades.push(lineaDXF(posX + 20, posY + 5, posX + 20, posY + 3));  // LINE en línea 606
    entidades.push(lineaDXF(posX + 20, posY - 1, posX + 18, posY + 3));  // LINE en línea 630
    entidades.push(solidDXF([[posX + 20, posY - 4], [posX + 19.5, posY - 2.5], [posX + 20.5, posY - 2.5], [posX + 20.5, posY - 2.5]]));  // SOLID en línea 654
    entidades.push(lineaDXF(posX - 20, posY + 5, posX + 20, posY + 5));  // LINE en línea 690

    return entidades;

}

function hashRTD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX    , posY     , posX    , posY - 32)); 
    entidades.push(lineaDXF(posX    , posY - 32, posX + 4, posY - 32)); 
    entidades.push(lineaDXF(posX + 4, posY - 32, posX + 4, posY     )); 
    entidades.push(punto(posX +4, posY - 32));

    return entidades;

}