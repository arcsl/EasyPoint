function wrapDXF(entities) {
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
 40
300.0
 41
1.538461
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

 70
     1
 40
0.0
 41
1.0
 50
0.0
 71
     0
 42
0.2
  3
GOST 2.303-68.shx
  4

  0
STYLE
  5
365
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
${entities.join('\n')}
  0
ENDSEC
  0
EOF`;
}

/**
 * Genera una entidad LINE en formato DXF.
 *
 * @param {number} posX1 - Coordenada X del punto inicial.
 * @param {number} posY1 - Coordenada Y del punto inicial.
 * @param {number} posX2 - Coordenada X del punto final.
 * @param {number} posY2 - Coordenada Y del punto final.
 * @param {number} [grosor=-1] - Grosor de línea DXF.
 *   Valores especiales:
 *     -3: por defecto,
 *     -2: por bloque,
 *     -1: por capa (valor por defecto),
 *     Otros valores: unidades de 0.01 mm (ej. 40 = 0.4 mm).
 * @param {string} [tipoLinea="Continuous"] - Tipo de línea (por ejemplo, "Dashed"). Se omite si es "Continuous".
 * @returns {string} Cadena en formato DXF que representa la entidad LINE.
 */
function lineaDXF(posX1, posY1, posX2, posY2, grosor = -1, tipoLinea = "Continuous") {

	// grosor
	// -3 by default
	// -2 by block
	// -1 by layer

	//   0 = 0mm
	//  10 = 0.1mm
	//  40 = 0.4mm
	// 100 = 1mm


	// insertar tipo de linea solo si es necesario
	let insertTipo;
	if (tipoLinea === "Continuous") {
		insertTipo = "";
	} else {
		insertTipo = `
6
${tipoLinea}`;
	}


	// insertar grosor de linea solo si es necesario
	let insertGrosor;
	if (grosor === -1) {
		insertGrosor = "";
	} else {
		insertGrosor = `
370
${grosor}`;
	}

	return `0
LINE
100
AcDbEntity${insertTipo}${insertGrosor}
100
AcDbLine
10
${posX1}
20
${posY1}
11
${posX2}
21
${posY2}`;
}

/**
 * Genera una entidad TEXT en formato DXF.
 *
 * @param {number} posX - Coordenada X de inserción del texto (punto de alineación).
 * @param {number} posY - Coordenada Y de inserción del texto (punto de alineación).
 * @param {string} text - Contenido del texto a mostrar.
 * @param {number} [textsize=2.5] - Tamaño de altura del texto.
 * @param {string} [align='ML'] - Código de alineación. Opciones:
 *   - TL, TC, TR (Top Left, Center, Right)
 *   - ML, MC, MR (Middle Left, Center, Right)
 *   - BL, BC, BR (Bottom Left, Center, Right)
 *   Valor por defecto: 'ML'.
 * @param {number} [rotation=0] - Ángulo de rotación del texto en grados (0, 90, 180, 270).
 *     Se emite advertencia si se proporciona un valor no soportado.
 * @param {string} [estilo="Standard"] - Estilo de texto DXF (nombre del estilo definido en el archivo DXF).
 *     Se omite si es "Standard".
 *
 * @returns {string} Cadena en formato DXF que representa la entidad TEXT con sus propiedades.
 */
function textoDXF(posX, posY, text,  textsize = 2.5, align = 'ML', rotation = 0,estilo = "Standard") {
	const alineaciones = {
		TL: [0, 3], TC: [1, 3], TR: [2, 3],
		ML: [0, 2], MC: [1, 2], MR: [2, 2],
		BL: [0, 1], BC: [1, 1], BR: [2, 1],
	};

	const [hAlign, vAlign] = alineaciones[align] || [0, 1]; // BL por defecto

	const anchoEstimado = text.length * textsize * 0.6;
	let desX = 0, desY = 0;

	// Horizontal
	if (hAlign === 1) desX = anchoEstimado / 2;
	else if (hAlign === 2) desX = anchoEstimado;

	// Vertical
	if (vAlign === 1) desY = textsize;
	else if (vAlign === 2) desY = textsize / 2;
	else if (vAlign === 3) desY = 0;

	// Aplicar desplazamiento según rotación
	let x0 = posX;
	let y0 = posY;

	switch (rotation % 360) {
		case 0:
			x0 = posX - desX;
			y0 = posY - desY;
			break;
		case 90:
			x0 = posX + desY;
			y0 = posY - desX;
			break;
		case 180:
			x0 = posX + desX;
			y0 = posY + desY;
			break;
		case 270:
			x0 = posX - desY;
			y0 = posY + desX;
			break;
		default:
			console.warn(`Rotación no soportada: ${rotation}° (usa 0, 90, 180, 270)`);
			x0 = posX - desX;
			y0 = posY - desY;
	}

	let insertRotation;
	if (rotation === 0) {
		insertRotation = "";
	} else {
		insertRotation = `
50
${rotation}`;
	}

	let insertEstilo;
	if (estilo === "Standard") {
		insertEstilo = "";
	} else {
		insertEstilo = `
7
${estilo}`;
	}

	return `0
TEXT
100
AcDbEntity
100
AcDbText
10
${x0.toFixed(3)}
20
${y0.toFixed(3)}
11
${posX.toFixed(3)}
21
${posY.toFixed(3)}
40
${textsize}${insertRotation}
1
${text}${insertEstilo}
72
${hAlign}
73
${vAlign}`;
}

/**
 * Genera una entidad SOLID  para DXF a partir de un listado de puntos.
 * Admite un listado de 3 o 4 puntos
 *
 * @param {Array<[number, number]>} puntos - Cada punto definido por coordenadas **x** e **y**: [x, y]
 * @returns {string} Cadena en formato DXF que representa una entidad SOLID.
 *
 * @example
 * const dxf = solidDXF([[0, 0], [100, 0], [100, 100]]);
 * console.log(dxf);
 */
function solidDXF(puntos) {
	// Si hay 3 puntos, repetir el último para que haya 4
	if (puntos.length === 3) {
		puntos.push(puntos[2]);
	}

	const etiquetas = ['10', '20', '11', '21', '12', '22', '13', '23'];
	const coords = puntos.flatMap(p => [p[0], p[1]]);

	const cuerpo = coords.map((valor, i) => `${etiquetas[i]}\n${valor}`).join('\n');

	return `0
SOLID
100
AcDbEntity
100
AcDbTrace
${cuerpo}`;
}

/**
 * Genera una entidad MTEXT en formato DXF con múltiples líneas de texto, posición, tamaño, rotación y alineación.
 *
 * Las líneas de texto se unen con el delimitador "^J" y se escapan las barras invertidas. 
 * La alineación se define mediante un código numérico que corresponde al punto de anclaje del texto.
 *
 * @param {number} posX - Coordenada X de la posición del texto.
 * @param {number} posY - Coordenada Y de la posición del texto.
 * @param {string[]} [text=[]] - Array de líneas de texto a incluir.
 * @param {number} [textsize=2.5] - Tamaño del texto.
 * @param {number} [rotation=0] - Rotación del texto en grados.
 * @param {string} [align='ML'] - Alineación del texto (por ejemplo: 'TL', 'MC', 'BR', etc.).
 * @returns {string} Cadena en formato DXF que representa una entidad MTEXT.
 *
 * @example
 * const dxf = textoMultiDXF(10, 20, ['Primera línea', 'Segunda línea'], 3, 45, 'MC');
 * console.log(dxf);
 */
function textoMultiDXF(posX, posY, text = [], textsize=2.5, rotation = 0, align = 'ML') {
	const contenido = text.map(linea => linea.replace(/\\/g, "\\\\")).join("^J");

	const alineaciones = {
		TL: 1, TC: 2, TR: 3,
		ML: 4, MC: 5, MR: 6,
		BL: 7, BC: 8, BR: 9,
	};

	const attachPoint = alineaciones[align] || [1, 1];

	return `0
MTEXT
8
0
100
AcDbEntity
100
AcDbMText
10
${posX}
20
${posY}
40
${textsize}
50
${rotation}
71
${attachPoint}
1
${contenido}`;
}

/**
 * Genera una circunferencia en formato DXF.
 *
 * @param {number} posXcentro - Coordenada X del centro
 * @param {number} posYcentro - Coordenada Y del centro
 * @param {number} radio - Radio de la circunferencia
 * @param {number} [grosor=-1] - Grosor de línea DXF. Por defecto: -1 (por capa)
 * @returns {string} Cadena en formato DXF que representa la entidad ARC.
 */
function circunferenciaDXF(posXcentro, posYcentro, radio, grosor = -1) {

  	// insertar grosor de linea solo si es necesario
	let insertGrosor;
	if (grosor === -1) {
		insertGrosor = "";
	} else {
		insertGrosor = `
370
${grosor}`;
	}


	return `0
CIRCLE
100
AcDbEntity
100
AcDbCircle
10
${posXcentro}
20
${posYcentro}
40
${radio}${insertGrosor}`;
}

/**
 * Genera una entidad ARC en formato DXF.
 *
 * @param {number} posXcentro - Coordenada X del centro del arco.
 * @param {number} posYcentro - Coordenada Y del centro del arco.
 * @param {number} radio - Radio del arco.
 * @param {number} angInicio - Ángulo de inicio en grados (0 = eje X positivo).
 * @param {number} angFin - Ángulo de fin en grados (en sentido antihorario desde angInicio).
 * @param {number} [grosor=-1] - Grosor de línea DXF. Por defecto: 1-.
 * @returns {string} Cadena en formato DXF que representa la entidad ARC.
 */
function arcoDXF(posXcentro, posYcentro, radio, angInicio, angFin, grosor = -1) {

  	// insertar grosor de linea solo si es necesario
	let insertGrosor;
	if (grosor === -1) {
		insertGrosor = "";
	} else {
		insertGrosor = `
370
${grosor}`;
	}

	return `0
ARC
100
AcDbEntity
100
AcDbCircle
10
${posXcentro}
20
${posYcentro}
40
${radio}
100
AcDbArc
50
${angInicio}
51
${angFin}${insertGrosor}`;
}
