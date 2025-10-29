/// <reference path="basicosDXF.js" />
/// <reference path="controladores.js" />

function hasheador(posX, posY, hash, franja) {

    let tamText = 2.5;
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
        estiloText = "Estrecho";
        multAncho = 0.8;
        desY += 2;
    }



    if (!hash) return [];

    if (hash.startsWith("#")) {
        if (hash === "#52") return hash52(posX, desY);
        if (hash === "#25") return hash25(posX, desY);
        if (hash === "#UD") return hashUD(posX, desY);
        if (hash === "#D") return hashD(posX, desY);
        if (hash === "#U") return hashU(posX, desY);
        if (hash === "#|") return hashPalo(posX, desY);
        if (hash === "#-") return hashGuion(posX, desY);
        if (hash === "#Sep") return hashSep(posX, desY);
        if (hash === "#d") return hashd(posX, desY);
        if (hash === "#RED") return hashLan(posX, desY);
        if (hash === "#T") return hashT(posX, desY, tamText);
        if (hash === "#uTierra") return hashuTierra(posX, desY);
        if (hash === "#Qc") return hashQconmutada(posX, desY);

    } else {
        return [textoDXF(posX, desY, hash, tamText, 'MC', 0, estiloText, multAncho)];
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

    entidades.push(solidDXF([[posX + 0, posY + 5], [posX - 0.5, posY + 3], [posX + 0.5, posY + 3], [posX + 0.5, posY + 3]]));
    entidades.push(solidDXF([[posX + 0, posY - 5], [posX - 0.5, posY - 3], [posX + 0.5, posY - 3], [posX + 0.5, posY - 3]]));

    return entidades;

}

function hashD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    entidades.push(solidDXF([[posX + 0, posY - 5], [posX - 0.5, posY - 3], [posX + 0.5, posY - 3], [posX + 0.5, posY - 3]]));

    return entidades;

}

function hashU(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX + 0, posY + 5, posX + 0, posY - 5, 0));

    entidades.push(solidDXF([[posX + 0, posY + 5], [posX - 0.5, posY + 3], [posX + 0.5, posY + 3], [posX + 0.5, posY + 3]]));

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

    entidades.push(lineaDXF(posX - 4, posY - 3, posX - 4, posY + 4, 0));
    entidades.push(lineaDXF(posX - 4, posY + 4, posX - 1, posY + 4, 0));
    entidades.push(lineaDXF(posX + 4, posY - 3, posX + 4, posY + 4, 0));
    entidades.push(lineaDXF(posX + 0, posY - 3, posX + 0, posY + 1, 0));
    entidades.push(lineaDXF(posX + 0, posY + 1, posX - 2, posY + 5, 0));
    entidades.push(lineaDXF(posX + 1, posY + 4, posX + 4, posY + 4, 0));

    entidades.push(solidDXF([[posX - 4, posY - 5], [posX - 4.5, posY - 3], [posX - 3.5, posY - 3], [posX - 3.5, posY - 3]]));
    entidades.push(solidDXF([[posX + 0, posY - 3], [posX - 0.5, posY - 5], [posX + 0.5, posY - 5], [posX + 0.5, posY - 5]]));
    entidades.push(solidDXF([[posX + 4, posY - 5], [posX + 3.5, posY - 3], [posX + 4.5, posY - 3], [posX + 4.5, posY - 3]]));

    return entidades;

}