function hash52(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY +  0, posX +  0, posY + 2,  0));
    entidades.push(lineaDXF(posX - 5, posY +  0, posX +  0, posY +  0,  0));

    return entidades;

}

function hash25(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY +  0, posX +  0, posY + 2,  0));
    entidades.push(lineaDXF(posX +  0, posY +  0, posX + 5, posY +  0,  0));

    return entidades;

}

function hashUD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY + 5, posX +  0, posY - 5,  0));

    entidades.push(solidDXF([[posX +  0, posY + 5], [posX - 0.5, posY + 3], [posX +  0.5, posY + 3], [posX +  0.5, posY + 3]]));
    entidades.push(solidDXF([[posX +  0, posY - 5], [posX - 0.5, posY - 3], [posX +  0.5, posY - 3], [posX +  0.5, posY - 3]]));

    return entidades;

}

function hashD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY + 5, posX +  0, posY - 5,  0));

    entidades.push(solidDXF([[posX +  0, posY - 5], [posX - 0.5, posY - 3], [posX +  0.5, posY - 3], [posX +  0.5, posY - 3]]));

    return entidades;

}

function hashU(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY + 5, posX +  0, posY - 5,  0));

    entidades.push(solidDXF([[posX +  0, posY + 5], [posX - 0.5, posY + 3], [posX +  0.5, posY + 3], [posX +  0.5, posY + 3]]));

    return entidades;

}

function hashPalo(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY + 5, posX +  0, posY - 5,  0));

    return entidades;

}

function hashGuion(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX - 1.5, posY +  0, posX + 1.5, posY +  0,  0));

    return entidades;

}

function hashSep(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY +  0, posX +  0, posY + 24,  0));

    return entidades;

}

function hashmD(posX, posY) {

    const entidades = [];

    entidades.push(lineaDXF(posX +  0, posY +  0.75, posX +  0, posY +  0,  0));
    entidades.push(solidDXF([[posX +  0, posY - 0.75], [posX - 0.25, posY +  0], [posX +  0.25, posY +  0], [posX +  0.25, posY +  0]]));

    return entidades;

}

function hashEnv(posX, posY, largo) {

    const entidades = [];

    // vertical inicial
    entidades.push(lineaDXF(posX +     0, posY +  0, posX +     0, posY + 24, 40));

    // horizontales exterior
    entidades.push(lineaDXF(posX +     0, posY +  0, posX + largo, posY +  0, 40));
    entidades.push(lineaDXF(posX +     0, posY + 24, posX + largo, posY + 24, 40));

    // horizontales cinta
    entidades.push(lineaDXF(posX +     0, posY + 18, posX + largo, posY + 18));
    entidades.push(lineaDXF(posX +     0, posY + 16, posX + largo, posY + 16));

    // vertical final
    entidades.push(lineaDXF(posX + largo, posY +  0, posX + largo, posY + 24, 40));
   
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
    entidades.push(lineaDXF(posX - 4, posY - 2, posX - 4, posY +  0));
    entidades.push(lineaDXF(posX - 4, posY +  0, posX + 4, posY +  0));
    entidades.push(lineaDXF(posX + 4, posY +  0, posX + 4, posY - 2));
    entidades.push(lineaDXF(posX +  0, posY +  0, posX +  0, posY + 2));

    return entidades;

}