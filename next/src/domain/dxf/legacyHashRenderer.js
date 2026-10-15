import { createArc, createCircle, createEllipse, createLine, createMText, createPointHatch, createRawDxf, createSolid, createText } from "./primitives.js";

export function renderLegacyHash(x, y, token, band = "", options = {}) {
    let textSize = options.height ?? 2.5;
    let align = options.align ?? "MC";
    let rotation = options.rotation ?? 0;
    let widthFactor = options.widthFactor ?? 1;
    let shiftedY = y;

    if (band === "Cinta") {
        textSize = 1.5;
        shiftedY += 17;
    }

    if (band === "Subcinta") {
        textSize = 1.5;
        shiftedY += 15;
    }

    if (band === "Simbolos" || band === "Fijo") {
        shiftedY += 9;
    }

    if (band === "Numeracion") {
        shiftedY += 2;
    }

    if (band === "Etiqueta") {
        align = "ML";
        rotation = 90;
        shiftedY -= 190;
    }

    if (!token) {
        return [];
    }

    if (token.startsWith("#")) {
        return renderHashToken(x, shiftedY, token, textSize);
    }

    if (token.includes("%")) {
        return [createMText(x, shiftedY, token.split("%"), { height: textSize, align, rotation })];
    }

    return [createText(x, shiftedY, token, { height: textSize, align, rotation, widthFactor })];
}

export function renderLogoArc(x, y) {
    return [
        createSolid([[x + 210, y + 18], [x + 210, y + 21], [x + 219, y + 18], [x + 219, y + 21]]),
        createSolid([[x + 210, y + 21], [x + 210, y + 23], [x + 214, y + 21], [x + 214, y + 23]]),
        createSolid([[x + 215, y + 21], [x + 215, y + 24], [x + 219, y + 21], [x + 219, y + 24]]),
        createSolid([[x + 210, y + 24], [x + 210, y + 27], [x + 219, y + 24], [x + 219, y + 27]]),
        createSolid([[x + 220, y + 18], [x + 220, y + 27], [x + 224, y + 18], [x + 224, y + 27]]),
        createSolid([[x + 224, y + 24], [x + 224, y + 27], [x + 225, y + 24], [x + 225, y + 27]]),
        createSolid([[x + 225, y + 22], [x + 225, y + 27], [x + 229, y + 22], [x + 229, y + 27]]),
        createSolid([[x + 220, y + 8], [x + 220, y + 17], [x + 224, y + 8], [x + 224, y + 17]]),
        createSolid([[x + 224, y + 8], [x + 224, y + 11], [x + 225, y + 8], [x + 225, y + 11]]),
        createSolid([[x + 224, y + 14], [x + 224, y + 17], [x + 225, y + 14], [x + 225, y + 17]]),
        createSolid([[x + 225, y + 8], [x + 225, y + 12], [x + 229, y + 8], [x + 229, y + 12]]),
        createSolid([[x + 225, y + 13], [x + 225, y + 17], [x + 229, y + 13], [x + 229, y + 17]]),
    ];
}

function renderHashToken(x, y, token, textSize) {
    if (token.startsWith("#Qsl")) {
        const label = `Q${token.slice(4)}`;
        return [
            ...renderHashToken(x, y, "#Qs", textSize),
            createText(x, y - 2, label, { height: 2.5, align: "MC" }),
        ];
    }

    switch (token) {
        case "#52":
            return [createLine(x, y, x, y + 2), createLine(x - 5, y, x, y)];
        case "#132":
            return [createLine(x, y, x, y + 2), createLine(x - 13, y, x, y)];
        case "#162":
            return [createLine(x, y, x, y + 2), createLine(x - 16, y, x, y)];
        case "#25":
            return [createLine(x, y, x, y + 2), createLine(x, y, x + 5, y)];
        case "#213":
            return [createLine(x, y, x, y + 2), createLine(x, y, x + 13, y)];
        case "#216":
            return [createLine(x, y, x, y + 2), createLine(x, y, x + 16, y)];
        case "#UD":
            return [
                createLine(x, y + 5, x, y - 5),
                createSolid([[x, y + 5], [x - 0.5, y + 3.5], [x + 0.5, y + 3.5], [x + 0.5, y + 3.5]]),
                createSolid([[x, y - 5], [x - 0.5, y - 3.5], [x + 0.5, y - 3.5], [x + 0.5, y - 3.5]]),
            ];
        case "#D":
            return [
                createLine(x, y + 5, x, y - 5),
                createSolid([[x, y - 5], [x - 0.5, y - 3.5], [x + 0.5, y - 3.5], [x + 0.5, y - 3.5]]),
            ];
        case "#U":
            return [
                createLine(x, y + 5, x, y - 5),
                createSolid([[x, y + 5], [x - 0.5, y + 3.5], [x + 0.5, y + 3.5], [x + 0.5, y + 3.5]]),
            ];
        case "#|":
            return [createLine(x, y + 5, x, y - 5)];
        case "#-":
            return [createLine(x - 1.5, y, x + 1.5, y)];
        case "#Sep":
            return [createLine(x, y, x, y + 18)];
        case "#/":
            return [createLine(x, y - 9, x, y + 7)];
        case "#d":
            return [
                createLine(x, y + 0.75, x, y),
                createSolid([[x, y - 0.75], [x - 0.25, y], [x + 0.25, y], [x + 0.25, y]]),
            ];
        case "#RED":
            return [
                createLine(x - 6, y - 5, x - 6, y - 2),
                createLine(x - 6, y - 2, x - 2, y - 2),
                createLine(x - 2, y - 2, x - 2, y - 5),
                createLine(x - 2, y - 5, x - 6, y - 5),
                createLine(x + 2, y - 2, x + 6, y - 2),
                createLine(x + 6, y - 2, x + 6, y - 5),
                createLine(x + 6, y - 5, x + 2, y - 5),
                createLine(x + 2, y - 5, x + 2, y - 2),
                createLine(x - 2, y + 2, x - 2, y + 5),
                createLine(x - 2, y + 5, x + 2, y + 5),
                createLine(x + 2, y + 5, x + 2, y + 2),
                createLine(x + 2, y + 2, x - 2, y + 2),
                createLine(x - 4, y - 2, x - 4, y),
                createLine(x - 4, y, x + 4, y),
                createLine(x + 4, y, x + 4, y - 2),
                createLine(x, y, x, y + 2),
            ];
        case "#T":
            return [createText(x, y, "T", { height: textSize, align: "MC", rotation: 180 })];
        case "#Tierra":
            return [
                createLine(x, y, x, y + 1.5),
                createLine(x - 1.5, y, x + 1.5, y),
                createLine(x - 1, y - 0.5, x + 1, y - 0.5),
                createLine(x - 0.5, y - 1, x + 0.5, y - 1),
                createArc(x, y - 1, 2, 0, 180),
            ];
        case "#uTierra":
            return [
                createLine(x, y, x, y + 1),
                createLine(x - 0.75, y, x + 0.75, y),
                createLine(x - 0.5, y - 0.25, x + 0.5, y - 0.25),
                createLine(x - 0.25, y - 0.5, x + 0.25, y - 0.5),
                createArc(x, y - 0.25, 1, 0, 180, { lineWeight: 0 }),
            ];
        case "#Qc":
            return [
                createLine(x + 2, y + 2, x + 2, y + 4),
                createLine(x + 4, y - 5, x + 4, y - 2),
                createLine(x, y - 2, x + 2, y + 2),
                createLine(x, y - 5, x, y - 2),
                createLine(x - 4, y - 5, x - 4, y + 4),
                createLine(x - 4, y + 4, x + 2, y + 4),
                createSolid([[x - 4, y - 3.5], [x - 4.5, y - 5], [x - 3.5, y - 5], [x - 3.5, y - 5]]),
                createSolid([[x, y - 5], [x - 0.5, y - 3.5], [x + 0.5, y - 3.5], [x + 0.5, y - 3.5]]),
                createSolid([[x + 4, y - 5], [x + 3.5, y - 3.5], [x + 4.5, y - 3.5], [x + 4.5, y - 3.5]]),
            ];
        case "#Qs":
            return [
                createLine(x - 4, y - 5, x - 4, y + 4),
                createLine(x + 4, y - 5, x + 4, y - 2),
                createLine(x - 4, y + 4, x + 4, y + 4),
                createLine(x + 4, y + 4, x + 4, y + 2),
                createLine(x + 4, y - 2, x + 2, y + 2),
                createSolid([[x - 4, y - 3.5], [x - 4.5, y - 5], [x - 3.5, y - 5], [x - 3.5, y - 5]]),
                createSolid([[x + 4, y - 5], [x + 3.5, y - 3.5], [x + 4.5, y - 3.5], [x + 4.5, y - 3.5]]),
            ];
        case "#inTierra":
            return [
                createLine(x + 3, y - 52, x - 3, y - 52),
                createLine(x, y, x, y - 52),
                createLine(x - 2, y - 53, x + 2, y - 53),
                createLine(x - 1, y - 54, x + 1, y - 54),
            ];
        case "#ext":
            return renderExternal(x, y, 1);
        case "#ext2":
            return renderExternal(x, y, 2);
        case "#ext3":
            return renderExternal(x, y, 3);
        case "#int":
            return [createLine(x, y, x, y - 104)];
        case "#utp":
            return [createLine(x, y, x, y - 104, { lineWeight: 40, color: 6 })];
        case "#L":
            return [createLine(x, y, x, y - 4), createPointHatch(x, y - 4)];
        case "#N":
            return [createLine(x, y, x, y - 100), createPointHatch(x, y - 100)];
        case "#G":
            return [createLine(x, y, x, y - 12), createPointHatch(x, y - 12)];
        case "#G0":
            return [createLine(x, y, x, y - 16), createPointHatch(x, y - 16)];
        case "#KNX":
            return renderKnx(x, y);
        case "#KNXsl":
            return [
                createLine(x, y, x, y - 28, { color: 96 }),
                createPointHatch(x, y - 28, { color: 96 }),
                createLine(x - 4, y, x - 4, y - 24, { color: 1 }),
                createPointHatch(x - 4, y - 24, { color: 1 }),
            ];
        case "#Sch":
            return [
                createLine(x, y, x, y - 36),
                createLine(x - 3, y - 39, x - 3, y - 42),
                createLine(x - 3, y - 42, x + 3, y - 42),
                createLine(x + 3, y - 42, x + 3, y - 39),
                createLine(x - 2, y - 42, x - 2, y - 45),
                createLine(x + 2, y - 42, x + 2, y - 45),
                createArc(x, y - 39, 3, 0, 180),
                createCircle(x, y - 50, 4),
                createCircle(x - 2, y - 50, 1),
                createCircle(x + 2, y - 50, 1),
            ];
        case "#AGen":
            return renderAlimGen(x, y);
        case "#A24v":
            return renderAlim24V(x, y);
        case "#APre1":
            return renderAlimPresostato(x, y, 1);
        case "#APre2":
            return renderAlimPresostato(x, y, 2);
        case "#APre3":
            return renderAlimPresostato(x, y, 3);
        case "#MBUS":
            return renderMbus(x, y, false);
        case "#MBUS2":
            return renderMbus(x, y, true);
        case "#3V":
            return renderThreeValueContact(x, y);
        case "#RTD":
            return [
                createLine(x, y, x, y - 32),
                createLine(x, y - 32, x + 4, y - 32),
                createLine(x + 4, y - 32, x + 4, y),
                createPointHatch(x + 4, y - 32),
            ];
        case "#MoI":
            return renderModbusIn(x, y);
        case "#MoO":
            return renderModbusOut(x, y);
        case "#ABC":
            return renderAbc(x, y);
        case "#VLC":
            return renderVlc(x, y);
        case "#Q8R":
            return renderQ8R(x, y);
        case "#Va":
            return [createText(x, y, "Va", { height: textSize, align: "MC" })];
        case "#Vb":
            return [createText(x, y, "Vb", { height: textSize, align: "MC" })];
        default:
            return [];
    }
}

function renderExternal(x, y, count) {
    const entities = [];
    for (let index = 0; index < count; index += 1) {
        const dx = index * -4;
        entities.push(
            createLine(x + dx, y, x + dx, y - 104),
            createLine(x - 2 + dx, y - 104, x + 2 + dx, y - 104, { lineWeight: 40 }),
            createLine(x - 2 + dx, y - 104, x - 2 + dx, y - 110, { lineWeight: 40 }),
            createLine(x + 2 + dx, y - 104, x + 2 + dx, y - 110, { lineWeight: 40 }),
            createLine(x - 2 + dx, y - 110, x + 2 + dx, y - 110, { lineWeight: 40 }),
            createLine(x + dx, y - 110, x + dx, y - 116),
        );
    }
    return entities;
}

function renderKnx(x, y) {
    const desLogoX = x + 1;
    const desLogoY = y - 37;

    return [
        createLine(x + 2, y, x + 2, y - 28, { color: 96 }),
        createPointHatch(x + 2, y - 28, { color: 96 }),
        createLine(x - 2, y, x - 2, y - 24, { color: 1 }),
        createPointHatch(x - 2, y - 24, { color: 1 }),
        createText(x + 6, y - 32, "2x0.8 Trenzado", { height: 2.5, align: "MC" }),
        createText(desLogoX - 7.5, desLogoY - 7.4203, "K", { height: 5, align: "BL", style: "KNX", color: 96 }),
        createText(desLogoX, desLogoY - 7.4203, "N", { height: 5, align: "BC", style: "KNX", color: 252 }),
        createText(desLogoX + 7, desLogoY - 7.4203, "X", { height: 5, align: "BR", style: "KNX", color: 152 }),
        createRawDxf(buildKnxLogoHatch(desLogoX, desLogoY)),
    ];
}

function buildKnxLogoHatch(x, y) {
    return `  0
HATCH
100
AcDbEntity
 62
    96
100
AcDbHatch
 10
${x}
 20
${y}
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
${x - 7}
 20
${y}
 11
${x - 4.847679857416324}
 21
${y}
 72
     2
 10
${x}
 20
${y - 11.25}
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
${x}
 20
${y + 1}
 11
${x}
 21
${y + 2}
 72
     2
 10
${x}
 20
${y - 11.25}
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
${x - 359.0}
 20
${y - 210.0}
  0
HATCH
100
AcDbEntity
 62
   152
100
AcDbHatch
 10
${x}
 20
${y}
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
${x + 7}
 20
${y}
 11
${x + 4.847679857416324}
 21
${y}
 72
     2
 10
${x}
 20
${y - 11.25}
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
${x}
 20
${y + 1}
 11
${x}
 21
${y + 2}
 72
     2
 10
${x}
 20
${y - 11.25}
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
${x + 365.0}
 20
${y - 193.0}`;
}

function renderAlimGen(x, y) {
    const entities = [];
    const lines = [
        [40, -1, 40, -118], [44, -1, 44, -118], [76, 18, 76, 12], [72, 22, 72, 12],
        [44, 18, 44, 12], [38, 12, 40, 8], [42, 12, 44, 8], [44, 8, 44, 6],
        [40, 8, 40, 6], [40, 6, 38, 6], [38, 6, 38, 4], [38, 4, 40, 4],
        [40, 4, 40, 2], [44, 6, 42, 6], [42, 6, 42, 4], [42, 4, 44, 4],
        [44, 4, 44, 2], [40, 22, 40, 12], [72, -1, 72, -4.536], [76, -1, 76, -4.536],
        [70, 12, 72, 8], [74, 12, 76, 8], [76, 8, 76, 6], [72, 8, 72, 6],
        [72, 6, 70, 6], [70, 6, 70, 4], [70, 4, 72, 4], [72, 4, 72, 2],
        [76, 6, 74, 6], [74, 6, 74, 4], [74, 4, 76, 4], [76, 4, 76, 2],
        [108, 18, 108, 12], [104, 22, 104, 12], [104, -1, 104, -4.536], [108, -1, 108, -4.536],
        [102, 12, 104, 8], [106, 12, 108, 8], [108, 8, 108, 6], [104, 8, 104, 6],
        [104, 6, 102, 6], [102, 6, 102, 4], [102, 4, 104, 4], [104, 4, 104, 2],
        [108, 6, 106, 6], [106, 6, 106, 4], [106, 4, 108, 4], [108, 4, 108, 2],
        [140, 18, 140, 12], [136, 22, 136, 12], [136, -1, 136, -4.536], [140, -1, 140, -4.536],
        [134, 12, 136, 8], [138, 12, 140, 8], [140, 8, 140, 6], [136, 8, 136, 6],
        [136, 6, 134, 6], [134, 6, 134, 4], [134, 4, 136, 4], [136, 4, 136, 2],
        [140, 6, 138, 6], [138, 6, 138, 4], [138, 4, 140, 4], [140, 4, 140, 2],
        [0, 18, 44, 18], [136, 22, 104, 22], [40, 22, 0, 22], [108, 18, 140, 18],
        [72, 22, 104, 22], [76, 18, 108, 18], [40, 22, 72, 22], [44, 18, 76, 18],
    ];
    const arcs = [[40, 0.5, 1.5], [44, 0.5, 1.5], [72, 0.5, 1.5], [76, 0.5, 1.5], [104, 0.5, 1.5], [108, 0.5, 1.5], [136, 0.5, 1.5], [140, 0.5, 1.5]];
    const circles = [[74, -8, 4], [72, -8, 1], [76, -8, 1], [106, -8, 4], [104, -8, 1], [108, -8, 1], [138, -8, 4], [136, -8, 1], [140, -8, 1]];
    const texts = [
        [36.986, 7, "6A", 2, "MR", 0], [40, -120, "S0", 2.5, "MR", 90], [44, -120, "N0", 2.5, "MR", 90],
        [-1, 22, "S 230V", 2, "MR", 0], [-1, 18, "N 230V", 2, "MR", 0], [72, -38, "ENCHUFE 16A", 2, "ML", 90],
        [76, -38, "SERVICIO", 2, "ML", 90], [42, -192, "ALIMENTACION 230V 50Hz", 2.5, "ML", 90], [68.986, 7, "16A", 2, "MR", 0],
        [104, -38, "ENCHUFE 16A", 2, "ML", 90], [108, -38, "ROUTER", 2, "ML", 90], [100.986, 7, "16A", 2, "MR", 0],
        [136, -38, "ENCHUFE 16A", 2, "ML", 90], [140, -38, "SERVIDOR", 2, "ML", 90], [132.986, 7, "16A", 2, "MR", 0],
    ];
    const points = [[44, 18], [40, 22], [76, 18], [72, 22], [108, 18], [104, 22]];

    for (const [x1, y1, x2, y2] of lines) entities.push(createLine(x + x1, y + y1, x + x2, y + y2));
    for (const [cx, cy, r] of arcs) entities.push(createArc(x + cx, y + cy, r, 90, 270));
    for (const [cx, cy, r] of circles) entities.push(createCircle(x + cx, y + cy, r));
    for (const [tx, ty, value, height, align, rotation] of texts) entities.push(createText(x + tx, y + ty, value, { height, align, rotation }));
    for (const [px, py] of points) entities.push(createPointHatch(x + px, y + py));
    return entities;
}

function renderAlim24V(x, y) {
    const entities = [];
    const texts = [
        [-7.014, 9, "6A", 2, "MR", 0], [-7, -4, "230/24", 2, "MR", 0], [-7, -8, "160VA", 2, "MR", 0],
        [-7.014, -23, "10A", 2, "MR", 0], [-4, -118, "G", 2.5, "MR", 90], [0, -118, "G0", 2.5, "MR", 90],
    ];
    const lines = [
        [-4, -31, -4, -116], [0, -31, 0, -116], [0, 20, 0, 14], [-6, 14, -4, 10], [-2, 14, 0, 10],
        [0, 10, 0, 8], [-4, 10, -4, 8], [-4, 8, -6, 8], [-6, 8, -6, 6], [-6, 6, -4, 6], [-4, 6, -4, 4],
        [0, 8, -2, 8], [-2, 8, -2, 6], [-2, 6, 0, 6], [0, 6, 0, 4], [-4, 24, -4, 14], [-4, 1, -4, -2.536],
        [0, 1, 0, -2.536], [0, -13.236, 0, -18], [-6, -18, -4, -22], [-2, -18, 0, -22], [0, -22, 0, -24],
        [-4, -22, -4, -24], [-4, -24, -6, -24], [-6, -24, -6, -26], [-6, -26, -4, -26], [-4, -26, -4, -28],
        [0, -24, -2, -24], [-2, -24, -2, -26], [-2, -26, 0, -26], [0, -26, 0, -28], [-4, -13.236, -4, -18],
    ];
    const arcs = [[-4, 2.5, 1.5], [0, 2.5, 1.5], [-4, -29.5, 1.5], [0, -29.5, 1.5]];
    const circles = [[-2, -6, 4], [-2, -11, 3]];
    const points = [[0, 20], [-4, 24]];

    for (const [tx, ty, value, height, align, rotation] of texts) entities.push(createText(x + tx, y + ty, value, { height, align, rotation }));
    for (const [x1, y1, x2, y2] of lines) entities.push(createLine(x + x1, y + y1, x + x2, y + y2));
    for (const [cx, cy, r] of arcs) entities.push(createArc(x + cx, y + cy, r, 90, 270));
    for (const [cx, cy, r] of circles) entities.push(createCircle(x + cx, y + cy, r));
    for (const [px, py] of points) entities.push(createPointHatch(x + px, y + py));
    return entities;
}

function renderAlimPresostato(x, y, index) {
    const entities = [];
    const lines = [
        [-14, -104, -14, -110], [-14, -110, -10, -110], [-10, -110, -10, -104], [-10, -104, -14, -104],
        [-12, -110, -12, -116], [-6, -104, -6, -110], [-6, -110, -2, -110], [-2, -104, -6, -104],
        [-2, -104, -2, -110], [-2, -110, 2, -110], [2, -110, 2, -104], [2, -104, -2, -104],
        [-4, -110, -4, -116], [0, -110, 0, -116], [-14, -116, 2, -116], [2, -116, 2, -132],
        [2, -132, -14, -132], [-14, -132, -14, -116], [-12, -120, -12, -130], [-12, -130, -2, -130],
        [0, -122, 0, -120], [-4, -120, -4, -122], [-4, -122, -2, -126], [-2, -126, -2, -130],
        [-3, -124, -6, -124], [-6, -124, -6, -122], [-6, -122, -10, -122], [-10, -122, -10, -126],
        [-10, -126, -6, -126], [-6, -126, -6, -124], [-8, -86, -8, -90], [-8, -90, 0, -90], [0, -90, 0, -86],
        [0, -86, -8, -86], [-4, -90, -4, -104], [12, -90, 12, -116], [16, -116, 16, -54], [-4, -86, -4, -50],
        [-12, -104, -12, -54], [16, -54, -36, -54], [-40, -50, 12, -50], [12, -90, 14.224, -85.553],
        [12, -86, 12, -50], [0, -88, 13, -88], [12, -86, 14.5, -86],
    ];
    const texts = [
        [-12, -118, "1", 2.5, "MC", 0], [-4, -118, "2", 2.5, "MC", 0], [0, -118, "4", 2.5, "MC", 0],
        [-8, -124, "P", 2.5, "MC", 0], [11, -84, "21", 1.5, "MR", 0], [11.025, -91.219, "22", 1.5, "MR", 0],
        [-4.776, -84, `R${index}`, 2, "MR", 0], [12, -117.72, `S${index}`, 2.5, "MR", 90],
        [16, -117.72, `N${index}`, 2.5, "MR", 90], [12, -190, "TENSION PROTEGIDA", 2.5, "ML", 90],
    ];
    const points = [[-40, -50], [-36, -54], [-12, -54], [-4, -50]];

    for (const [x1, y1, x2, y2] of lines) entities.push(createLine(x + x1, y + y1, x + x2, y + y2));
    for (const [tx, ty, value, height, align, rotation] of texts) entities.push(createText(x + tx, y + ty, value, { height, align, rotation }));
    for (const [px, py] of points) entities.push(createPointHatch(x + px, y + py));
    return entities;
}

function renderMbus(x, y, extended) {
    const entities = [
        createLine(x - 2, y - 104, x - 6, y - 104, { lineWeight: 40 }),
        createLine(x - 2, y - 110, x - 6, y - 110, { lineWeight: 40 }),
        createLine(x - 6, y - 104, x - 6, y - 110, { lineWeight: 40 }),
        createLine(x - 2, y - 104, x - 2, y - 110, { lineWeight: 40 }),
        createLine(x - 6, y - 104, x - 10, y - 104, { lineWeight: 40 }),
        createLine(x - 6, y - 110, x - 10, y - 110, { lineWeight: 40 }),
        createLine(x - 10, y - 104, x - 10, y - 110, { lineWeight: 40 }),
        createLine(x - 6, y - 104, x - 6, y - 110, { lineWeight: 40 }),
        createLine(x - 2, y - 116, x - 10, y - 116, { lineWeight: 40 }),
        createLine(x - 2, y - 132, x - 10, y - 132, { lineWeight: 40 }),
        createLine(x - 10, y - 116, x - 10, y - 132, { lineWeight: 40 }),
        createLine(x - 2, y - 132, x - 2, y - 116, { lineWeight: 40 }),
        createText(x - 8, y - 118, "M+", { height: 2.5, align: "MC", widthFactor: 0.7 }),
        createText(x - 4, y - 118, "M-", { height: 2.5, align: "MC", widthFactor: 0.7 }),
    ];

    if (!extended) {
        return [
            createLine(x - 4, y, x - 4, y - 104),
            createLine(x - 8, y, x - 8, y - 104),
            createLine(x - 4, y - 110, x - 4, y - 116),
            createLine(x - 8, y - 110, x - 8, y - 116),
            ...entities,
        ];
    }

    return [
        ...entities,
        createLine(x - 4, y - 110, x - 4, y - 116),
        createLine(x - 4, y - 104, x - 4, y - 54),
        createLine(x - 4, y - 54, x - 24, y - 54),
        createLine(x - 8, y - 110, x - 8, y - 116),
        createLine(x - 8, y - 104, x - 8, y - 58),
        createLine(x - 8, y - 58, x - 28, y - 58),
        createPointHatch(x - 24, y - 54),
        createPointHatch(x - 28, y - 58),
    ];
}

function renderThreeValueContact(x, y) {
    return [
        createLine(x - 20, y - 4, x - 20, y + 5),
        createSolid([[x - 20, y - 2.5], [x - 20.5, y - 4], [x - 19.5, y - 4], [x - 19.5, y - 4]]),
        createLine(x - 12, y - 4, x - 12, y - 1),
        createLine(x - 12, y + 5, x - 12, y + 3),
        createLine(x - 12, y - 1, x - 14, y + 3),
        createSolid([[x - 12, y - 4], [x - 12.5, y - 2.5], [x - 11.5, y - 2.5], [x - 11.5, y - 2.5]]),
        createLine(x + 4, y - 4, x + 4, y - 1),
        createLine(x + 4, y + 5, x + 4, y + 3),
        createLine(x + 4, y - 1, x + 2, y + 3),
        createSolid([[x + 4, y - 4], [x + 3.5, y - 2.5], [x + 4.5, y - 2.5], [x + 4.5, y - 2.5]]),
        createLine(x + 20, y - 4, x + 20, y - 1),
        createLine(x + 20, y + 5, x + 20, y + 3),
        createLine(x + 20, y - 1, x + 18, y + 3),
        createSolid([[x + 20, y - 4], [x + 19.5, y - 2.5], [x + 20.5, y - 2.5], [x + 20.5, y - 2.5]]),
        createLine(x - 20, y + 5, x + 20, y + 5),
    ];
}

function renderModbusIn(x, y) {
    return [
        createLine(x, y, x - 1, y - 1, { color: 1 }),
        createLine(x - 1, y - 1, x - 1, y - 24, { color: 1 }),
        createLine(x - 1, y - 24, x - 8, y - 24, { color: 1 }),
        createLine(x + 4, y, x + 3, y - 1, { color: 4 }),
        createLine(x + 3, y - 1, x + 3, y - 28, { color: 4 }),
        createLine(x + 3, y - 28, x - 8, y - 28, { color: 4 }),
        createLine(x + 8, y, x + 7, y - 1, { color: 3 }),
        createLine(x + 7, y - 1, x + 7, y - 32, { color: 3 }),
        createLine(x + 7, y - 32, x - 8, y - 32, { color: 3 }),
        createLine(x - 4, y - 36, x - 8, y - 36),
        createEllipse(x - 4, y - 29, 2, 7),
        createText(x - 10, y - 24, "+", { height: 2.5, align: "MC" }),
        createText(x - 10, y - 28, "T", { height: 2.5, align: "MC", rotation: 180 }),
        createText(x - 10, y - 32, "-", { height: 2.5, align: "MC" }),
    ];
}

function renderModbusOut(x, y) {
    return [
        createLine(x - 8, y, x - 7, y - 1, { color: 1 }),
        createLine(x - 7, y - 1, x - 7, y - 24, { color: 1 }),
        createLine(x - 7, y - 24, x + 8, y - 24, { color: 1 }),
        createLine(x - 4, y, x - 3, y - 1, { color: 4 }),
        createLine(x - 3, y - 1, x - 3, y - 28, { color: 4 }),
        createLine(x - 3, y - 28, x + 8, y - 28, { color: 4 }),
        createLine(x, y, x + 1, y - 1, { color: 3 }),
        createLine(x + 1, y - 1, x + 1, y - 32, { color: 3 }),
        createLine(x + 1, y - 32, x + 8, y - 32, { color: 3 }),
        createEllipse(x + 4, y - 29, 2, 7),
        createLine(x + 4, y - 36, x + 8, y - 36),
        createText(x + 10, y - 24, "+", { height: 2.5, align: "MC" }),
        createText(x + 10, y - 28, "T", { height: 2.5, align: "MC", rotation: 180 }),
        createText(x + 10, y - 32, "-", { height: 2.5, align: "MC" }),
    ];
}

function renderAbc(x, y) {
    return [
        createLine(x - 132, y, x - 132, y - 24, { color: 1 }),
        createLine(x - 4, y - 24, x - 132, y - 24, { color: 1 }),
        createLine(x - 4, y, x - 4, y - 24, { color: 1 }),
        createLine(x - 128, y, x - 128, y - 28, { color: 4 }),
        createLine(x, y - 28, x - 128, y - 28, { color: 4 }),
        createLine(x, y, x, y - 28, { color: 4 }),
        createLine(x - 124, y, x - 124, y - 32, { color: 3 }),
        createLine(x + 4, y - 32, x - 124, y - 32, { color: 3 }),
        createLine(x + 4, y, x + 4, y - 32, { color: 3 }),
    ];
}

function renderVlc(x, y) {
    return [
        createLine(x - 2, y, x - 2, y - 24, { color: 3 }),
        createLine(x - 38, y, x - 38, y - 24, { color: 3 }),
        createLine(x - 2, y - 24, x - 38, y - 24, { color: 3 }),
        createLine(x + 2, y, x + 2, y - 28, { color: 1 }),
        createLine(x - 34, y, x - 34, y - 28, { color: 1 }),
        createLine(x + 2, y - 28, x - 34, y - 28, { color: 1 }),
    ];
}

function renderQ8R(x, y) {
    return [
        createLine(x - 24, y - 5, x - 24, y + 4),
        createSolid([[x - 24, y - 3.5], [x - 24.5, y - 5], [x - 23.5, y - 5], [x - 23.5, y - 5]]),
        createLine(x - 16, y - 5, x - 16, y - 2),
        createLine(x - 16, y + 4, x - 16, y + 2),
        createLine(x - 16, y - 2, x - 18, y + 2),
        createSolid([[x - 16, y - 5], [x - 16.5, y - 3.5], [x - 15.5, y - 3.5], [x - 15.5, y - 3.5]]),
        createLine(x, y - 5, x, y - 2),
        createLine(x, y + 4, x, y + 2),
        createLine(x, y - 2, x - 2, y + 2),
        createSolid([[x, y - 5], [x - 0.5, y - 3.5], [x + 0.5, y - 3.5], [x + 0.5, y - 3.5]]),
        createLine(x - 24, y + 4, x, y + 4),
    ];
}
