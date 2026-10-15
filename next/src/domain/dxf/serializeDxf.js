const ALIGNMENTS = {
    TL: [0, 3], TC: [1, 3], TR: [2, 3],
    ML: [0, 2], MC: [1, 2], MR: [2, 2],
    BL: [0, 1], BC: [1, 1], BR: [2, 1],
};

export function serializeDxf(entities) {
    return wrapDxf(entities.map(entity => serializeEntity(entity)));
}

function serializeEntity(entity) {
    if (typeof entity === "string") {
        return entity;
    }

    if (entity.kind === "RAW") {
        return entity.value;
    }

    if (entity.kind === "LINE") {
        return serializeLine(entity);
    }

    if (entity.kind === "TEXT") {
        return serializeText(entity);
    }

    if (entity.kind === "MTEXT") {
        return serializeMText(entity);
    }

    if (entity.kind === "SOLID") {
        return serializeSolid(entity);
    }

    if (entity.kind === "ARC") {
        return serializeArc(entity);
    }

    if (entity.kind === "CIRCLE") {
        return serializeCircle(entity);
    }

    if (entity.kind === "ELLIPSE") {
        return serializeEllipse(entity);
    }

    if (entity.kind === "HATCH_POINT") {
        return serializeHatchPoint(entity);
    }

    return "";
}

function serializeLine(entity) {
    const insertLineType = entity.lineType
        ? `
6
${entity.lineType}`
        : "";

    const insertLineWeight = entity.lineWeight === -1
        ? ""
        : `
370
${entity.lineWeight}`;

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
LINE
100
AcDbEntity${insertLineType}${insertLineWeight}${insertColor}
100
AcDbLine
10
${toNumber(entity.x1)}
20
${toNumber(entity.y1)}
11
${toNumber(entity.x2)}
21
${toNumber(entity.y2)}
48
1`;
}

function serializeText(entity) {
    const [hAlign, vAlign] = ALIGNMENTS[entity.align] || ALIGNMENTS.ML;
    const { x0, y0 } = computeTextInsertion(
        Number(entity.x),
        Number(entity.y),
        String(entity.value ?? ""),
        Number(entity.height) || 2.5,
        hAlign,
        vAlign,
        Number(entity.rotation) || 0,
    );

    const widthFactor = Number(entity.widthFactor) || 1;
    const insertRotation = Number(entity.rotation)
        ? `
50
${Number(entity.rotation)}`
        : "";

    const insertStyle = entity.style && entity.style !== "Standard"
        ? `
7
${entity.style}`
        : "";

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
TEXT
100
AcDbEntity${insertColor}
100
AcDbText
10
${x0.toFixed(3)}
20
${y0.toFixed(3)}
11
${Number(entity.x).toFixed(3)}
21
${Number(entity.y).toFixed(3)}
40
${toNumber(entity.height)}
41
${toNumber(widthFactor)}${insertRotation}
1
${sanitizeText(entity.value)}${insertStyle}
72
${hAlign}
73
${vAlign}`;
}

function serializeMText(entity) {
    const attachPoint = {
        TL: 1, TC: 2, TR: 3,
        ML: 4, MC: 5, MR: 6,
        BL: 7, BC: 8, BR: 9,
    }[entity.align] || 4;

    const insertStyle = entity.style && entity.style !== "Standard"
        ? `
7
${entity.style}`
        : "";

    const content = entity.lines
        .map(line => String(line ?? "").replace(/\\/g, "\\\\"))
        .join("^J");

    return `0
MTEXT
8
0
100
AcDbEntity
100
AcDbMText
10
${toNumber(entity.x)}
20
${toNumber(entity.y)}
40
${toNumber(entity.height)}
50
${toNumber(entity.rotation)}
71
${attachPoint}
1
${sanitizeText(content)}${insertStyle}`;
}

function serializeSolid(entity) {
    const points = [...entity.points];
    while (points.length < 4) {
        points.push(points[points.length - 1]);
    }

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    const coords = [
        ["10", points[0][0]], ["20", points[0][1]],
        ["11", points[1][0]], ["21", points[1][1]],
        ["12", points[2][0]], ["22", points[2][1]],
        ["13", points[3][0]], ["23", points[3][1]],
    ].map(([group, value]) => `${group}
${toNumber(value)}`).join(`
`);

    return `0
SOLID
100
AcDbEntity${insertColor}
100
AcDbTrace
${coords}`;
}

function serializeArc(entity) {
    const insertLineWeight = entity.lineWeight === -1
        ? ""
        : `
370
${entity.lineWeight}`;

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
ARC
100
AcDbEntity${insertLineWeight}${insertColor}
100
AcDbCircle
10
${toNumber(entity.x)}
20
${toNumber(entity.y)}
40
${toNumber(entity.radius)}
100
AcDbArc
50
${toNumber(entity.startAngle)}
51
${toNumber(entity.endAngle)}`;
}

function serializeCircle(entity) {
    const insertLineWeight = entity.lineWeight === -1
        ? ""
        : `
370
${entity.lineWeight}`;

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
CIRCLE
100
AcDbEntity${insertLineWeight}${insertColor}
100
AcDbCircle
10
${toNumber(entity.x)}
20
${toNumber(entity.y)}
40
${toNumber(entity.radius)}`;
}

function serializeEllipse(entity) {
    const ejeHmayor = Number(entity.axisX) > Number(entity.axisY);
    const ejeMayor = ejeHmayor ? Number(entity.axisX) : Number(entity.axisY);
    const ejeMenor = !ejeHmayor ? Number(entity.axisX) : Number(entity.axisY);
    const ratio = ejeMayor === 0 ? 0 : ejeMenor / ejeMayor;

    const insertAxis = ejeHmayor
        ? `
 11
${toNumber(entity.axisX)}
 21
0`
        : `
 11
0
 21
${toNumber(entity.axisY)}`;

    const insertLineWeight = entity.lineWeight === -1
        ? ""
        : `
370
${entity.lineWeight}`;

    const insertLineType = entity.lineType
        ? `
6
${entity.lineType}`
        : "";

    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
ELLIPSE
100
AcDbEntity${insertLineType}${insertLineWeight}${insertColor}
100
AcDbEllipse
10
${toNumber(entity.x)}
20
${toNumber(entity.y)}${insertAxis}
 40
${ratio.toFixed(6)}
 41
0.0
 42
6.283185307179586
48
${toNumber(entity.scale ?? 1)}`;
}

function serializeHatchPoint(entity) {
    const insertColor = entity.color
        ? `
62
${entity.color}`
        : "";

    return `0
HATCH
100
AcDbEntity${insertColor}
100
AcDbHatch
  2
SOLID
 70
     1
 71
     1
 91
        1
 92
        1
 93
        1
 72
     2
 10
${toNumber(entity.x)}
 20
${toNumber(entity.y)}
 40
0.5
 50
0.0
 51
360.0
 73
     1
 97
        0`;
}

function computeTextInsertion(posX, posY, text, textSize, hAlign, vAlign, rotation) {
    const widthEstimate = text.length * textSize * 0.6;
    let offsetX = 0;
    let offsetY = 0;

    if (hAlign === 1) offsetX = widthEstimate / 2;
    else if (hAlign === 2) offsetX = widthEstimate;

    if (vAlign === 1) offsetY = textSize;
    else if (vAlign === 2) offsetY = textSize / 2;
    else if (vAlign === 3) offsetY = 0;

    let x0 = posX;
    let y0 = posY;

    switch (rotation % 360) {
        case 0:
            x0 = posX - offsetX;
            y0 = posY - offsetY;
            break;
        case 90:
            x0 = posX + offsetY;
            y0 = posY - offsetX;
            break;
        case 180:
            x0 = posX + offsetX;
            y0 = posY + offsetY;
            break;
        case 270:
            x0 = posX - offsetY;
            y0 = posY + offsetX;
            break;
        default: {
            const radians = rotation * Math.PI / 180;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);
            const rotatedX = offsetX * cos - offsetY * sin;
            const rotatedY = offsetX * sin + offsetY * cos;
            x0 = posX - rotatedX;
            y0 = posY - rotatedY;
            break;
        }
    }

    return { x0, y0 };
}

function sanitizeText(value) {
    return String(value ?? "").replace(/[^\x20-\x7E]/g, " ");
}

function toNumber(value) {
    return Number(value ?? 0);
}

function wrapDxf(entities) {
    return `  0
SECTION
  2
HEADER
  9
$ACADVER
  1
AC1015
  9
$LWDISPLAY
290
     1
  9
$CELTYPE
  6
ByLayer
  0
ENDSEC
  0
SECTION
  2
CLASSES
  0
ENDSEC
  0
SECTION
  2
TABLES
  0
TABLE
  2
VPORT
  5
8
330
0
100
AcDbSymbolTable
 70
     1
  0
VPORT
  5
EA
330
8
100
AcDbSymbolTableRecord
100
AcDbViewportTableRecord
  2
*ACTIVE
 70
     0
 12
200.0
 22
130.0
 14
1.0
 24
1.0
 15
1.0
 25
1.0
 40
300.0
 41
1.538461
 60
     2
 75
     1
 76
     0
  0
ENDTAB
  0
TABLE
  2
LTYPE
  5
5
330
0
100
AcDbSymbolTable
 70
     2
  0
LTYPE
  5
15
330
5
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
ByLayer
 70
     0
  3

 72
    65
 73
     0
 40
0.0
  0
LTYPE
  5
14
330
5
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
ByBlock
 70
     0
  3

 72
    65
 73
     0
 40
0.0
  0
LTYPE
  5
16
330
5
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
Continuous
 70
     0
  3
Solid line
 72
    65
 73
     0
 40
0.0
  0
LTYPE
  5
366
330
5
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
DASHED
 70
     0
  3
Dash (____  ____  ____  )
 72
    65
 73
     2
 40
19.05
 49
12.7
 74
     0
 49
-6.35
 74
     0
  0
ENDTAB
  0
TABLE
  2
LAYER
  5
2
330
0
100
AcDbSymbolTable
 70
     2
  0
LAYER
  5
10
330
2
100
AcDbSymbolTableRecord
100
AcDbLayerTableRecord
  2
0
 70
     0
 62
     7
  6
Continuous
370
    -3
390
F
  0
LAYER
  5
22D
330
2
100
AcDbSymbolTableRecord
100
AcDbLayerTableRecord
  2
Defpoints
 70
     0
 62
     7
  6
Continuous
290
     0
370
    -3
390
F
  0
ENDTAB
  0
TABLE
  2
STYLE
  5
3
330
0
100
AcDbSymbolTable
 70
     4
  0
STYLE
  5
11
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
Standard
 70
     0
 40
0.0
 41
1.0
 50
0.0
 71
     0
 42
2.5
  3

  4

1001
ACAD
1000
Arial
1071
        0
  0
STYLE
  5
1E3
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
Negrita
 70
     0
 40
0.0
 41
1.0
 50
0.0
 71
     0
 42
2.5
  3

  4

1001
ACAD
1000
Arial
1071
 33567744
  0
STYLE
  5
654
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
KNX
 70
     0
 40
0.0
 41
1.0
 50
0.0
 71
     0
 42
2.5
  3
tahomabd.ttf
  4

1001
ACAD
1000
Tahoma
1071
 33571584
  0
ENDTAB
  0
TABLE
  2
VIEW
  5
6
330
0
100
AcDbSymbolTable
 70
     0
  0
ENDTAB
  0
TABLE
  2
UCS
  5
7
330
0
100
AcDbSymbolTable
 70
     0
  0
ENDTAB
  0
TABLE
  2
APPID
  0
ENDTAB
  0
TABLE
  2
DIMSTYLE
  0
ENDTAB
  0
TABLE
  2
BLOCK_RECORD
  0
ENDTAB
  0
ENDSEC
  0
SECTION
  2
BLOCKS
  0
BLOCK
100
AcDbEntity
100
AcDbBlockBegin
  2
*Model_Space
  0
ENDBLK
100
AcDbEntity
100
AcDbBlockEnd
  0
BLOCK
100
AcDbEntity
100
AcDbBlockBegin
  2
*Paper_Space
  0
ENDBLK
100
AcDbEntity
100
AcDbBlockEnd
  0
ENDSEC
  0
SECTION
  2
ENTITIES
${entities.join("\n")}
  0
ENDSEC
  0
EOF`;
}
