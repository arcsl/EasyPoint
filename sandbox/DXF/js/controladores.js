const controladores = {
    "PXC4.E16-2": {
        "Nombre":"PXC4.E16-2",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                },
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["3", "4",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION KNX%",
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["5", "6", "7",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // entradas U1 a U6
                    "Cinta": ["V+", null, null, "U1", null, null, "#T", "U2", null, null, null, "U3", null, null, "#T", "U4", null, null, null, "U5", null, null, "#T", "U6", "V~",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", "#D",],
                    "Numeracion": ["8", null, null, "9", null, null, "10", "11", null, null, null, "12", null, null, "13", "14", null, null, null, "15", null, null, "16", "17", "18",],
                },
                {   // entradas U7 a U12
                    "Cinta": ["V+", null, null, "U7", null, null, "#T", "U8", null, null, null, "U9", null, null, "#T", "U10", null, null, null, "U11", null, null, "#T", "U12", "V~",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", "#D",],
                    "Numeracion": ["19", null, null, "20", null, null, "21", "22", null, null, null, "23", null, null, "24", "25", null, null, null, "26", null, null, "27", "28", "29",],

                },
                {   // M-BUS
                    "Cinta": "M-BUS",
                    "Subcinta": ["+", "-",],
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["66", "67",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION CONTADORES M-BUS%",
                },
                {   // COM 1
                    "Cinta": "COM 1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION MODBUS TERCEROS%",
                },
                {   // DO1
                    "Cinta": "DO1",
                    "Simbolos": "#Qc",
                    "Numeracion": ["75", "76", "77",],
                },
                {   // DO2
                    "Cinta": "DO2",
                    "Simbolos": "#Qc",
                    "Numeracion": ["78", "79", "80",],
                },
                {   // DO3
                    "Cinta": "DO3",
                    "Simbolos": "#Qc",
                    "Numeracion": ["81", "82", "83",],
                },
                {   // DO4
                    "Cinta": "DO4",
                    "Simbolos": "#Qc",
                    "Numeracion": ["84", "85", "86",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 198,
            "Alto": 125,
            "Hojas": 1,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "PXC5.E24": {
        "Nombre":"PXC5.E24",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                },
                {   // WAN
                    "Cinta": [null, "2", null,],
                    "Simbolos": [null, "#RED", null,],
                    "Numeracion": [null, "WAN", null,],
                },
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["3", "4",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION KNX%",
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["5", "6", "7",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // entradas Digitales
                    "Cinta": [null, "D1", null, "#T", "D2",],
                    "Simbolos": [null, "#U", null, "#-", "#U",],
                    "Numeracion": [null, "8", null, "9", "10",],
                },
                {   // entradas U1 a U4
                    "Cinta": [null, null, "U1", null, "#T", "U2", null, null, "U3", null, "#T", "U4",],
                    "Simbolos": [null, null, "#UD", null, "#-", "#UD", null, null, "#UD", null, "#-", "#UD",],
                    "Numeracion": [null, null, "20", null, "21", "22", null, null, "23", null, "24", "25",],
                },
                {   // entradas U5 a U8
                    "Cinta": [null, null, "U5", null, "#T", "U6", null, null, "U7", null, "#T", "U8",],
                    "Simbolos": [null, null, "#UD", null, "#-", "#UD", null, null, "#UD", null, "#-", "#UD",],
                    "Numeracion": [null, null, "26", null, "27", "28", null, null, "29", null, "30", "31",],
                },
                {   // Salidas tension
                    "Cinta": ["V~", "#T", "#T", "V+",],
                    "Simbolos": ["#D", "#-", "#-", "#D",],
                    "Numeracion": ["32", "33", "34", "35",],
                },
            ],
            [
                {   // Salidas tension
                    "Cinta": ["V~", "#T", "#T", "V+",],
                    "Simbolos": ["#D", "#-", "#-", "#D",],
                    "Numeracion": ["36", "37", "38", "39",],
                },
                {   // entradas X1 a x4
                    "Cinta": [null, null, "X1", null, "#T", "X2", null, null, "X3", null, "#T", "X4",],
                    "Simbolos": [null, null, "#UD", null, "#-", "#UD", null, null, "#UD", null, "#-", "#UD",],
                    "Numeracion": [null, null, "40", null, "41", "42", null, null, "43", null, "44", "45",],
                },
                {   // entradas X5 a X8
                    "Cinta": [null, null, "X5", null, "#T", "X6", null, null, "X7", null, "#T", "X8",],
                    "Simbolos": [null, null, "#UD", null, "#-", "#UD", null, null, "#UD", null, "#-", "#UD",],
                    "Numeracion": [null, null, "46", null, "47", "48", null, null, "49", null, "50", "51",],
                },
                {   // M-BUS
                    "Cinta": "M-BUS",
                    "Subcinta": ["+", "-",],
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["66", "67",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION CONTADORES M-BUS%",
                },
                {   // COM 1
                    "Cinta": "COM 1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION BACNET TERCEROS%",
                },
                {   // COM 2
                    "Cinta": "COM 2",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["71", "72", "73",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION MODBUS TERCEROS%",
                },
                {   // DO1
                    "Cinta": "DO1",
                    "Simbolos": "#Qc",
                    "Numeracion": ["75", "76", "77",],
                    "Fijo": ["#L", "#N", null,],

                },
                {   // DO2
                    "Cinta": "DO2",
                    "Simbolos": "#Qc",
                    "Numeracion": ["78", "79", "80",],
                },
                {   // DO3
                    "Cinta": "DO3",
                    "Simbolos": "#Qc",
                    "Numeracion": ["81", "82", "83",],
                },
                {   // DO4
                    "Cinta": "DO4",
                    "Simbolos": "#Qc",
                    "Numeracion": ["84", "85", "86",],
                },
                {   // DO5
                    "Cinta": "DO5",
                    "Simbolos": "#Qc",
                    "Numeracion": ["87", "88", "89",],
                },
                {   // DO6
                    "Cinta": "DO6",
                    "Simbolos": "#Qc",
                    "Numeracion": ["90", "91", "92",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 270,
            "Alto": 125,
            "Hojas": 1,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "PXC7.E400": {
        "Nombre":"PXC7.E400",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                },
                {   // WAN
                    "Cinta": [null, "2", null,],
                    "Simbolos": [null, "#RED", null,],
                    "Numeracion": [null, "WAN", null,],
                },
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["3", "4",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION KNX%",
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["5", "6", "7",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // entrada digital
                    "Subcinta": [ "D", "#T"],
                    "Simbolos": ["#U", "#|",],
                    "Numeracion": ["10", "11",],
                },
                {   // M-BUS
                    "Cinta": "M-BUS",
                    "Subcinta": ["+", "-",],
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["66", "67",],
                    "Opcional": ["#ext", "#ext",],
                    "Etiqueta": "INTEGRACION CONTADORES M-BUS%",
                },
                {   // COM 1
                    "Cinta": "COM 1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION TERCEROS%",
                },
                {   // COM 2
                    "Cinta": "COM 2",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["71", "72", "73",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION TERCEROS%",
                },
                {   // COM 3
                    "Cinta": "COM 3",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["74", "75", "76",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION TERCEROS%",
                },
                {   // COM 4
                    "Cinta": "COM 4",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["77", "78", "79",],
                    "Opcional": ["#ext", "#ext", "#ext",],
                    "Etiqueta": "INTEGRACION TERCEROS%",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 198,
            "Alto": 125,
            "Hojas": 1,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },    
    "TXS1.12F10": {
        "Nombre":"TXS1.12F10",
        "Paginas": [
            [
                {   // Entrada
                    "Cinta": ["~", "#T", "CS", "CD",],
                    "Simbolos": ["#U", "#U", "#U", "#U",],
                    "Numeracion": ["3", "4", "5", "6",],
                    "Opcional": ["#G", "#G0", null, null],
                },
                {   // Salida
                    "Cinta": ["CS", "CD",],
                    "Simbolos": ["#D", "#D",],
                    "Numeracion": ["1", "2",],
                    "Opcional": [null, null],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 96,
            "Alto": 78,
            "Hojas": 0.2,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "TXS1.EF10": {
        "Nombre":"TXS1.EF10",
        "Paginas": [
            [
                {   // Entrada
                    "Cinta": ["~", "#T", "CS", "CD",],
                    "Simbolos": ["#U", "#U", "#U", "#U",],
                    "Numeracion": ["3", "4", "5", "6",],
                    "Opcional": ["#G", "#G0", null, null],
                },
                {   // Salida
                    "Cinta": ["CS", "CD",],
                    "Simbolos": ["#D", "#D",],
                    "Numeracion": ["1", "2",],
                    "Opcional": [null, null],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 32,
            "Alto": 78,
            "Hojas": 0.2,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.8U": {
        "Nombre":"TXM1.8U",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "2", "4",],
                },
                {   // Canal 2
                    "Cinta": ["~", "#T", "(2)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["7", "6", "8",],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "10", "12",],
                },
                {   // Canal 4
                    "Cinta": ["~", "#T", "(4)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["15", "14", "16",],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "19", "21",],
                },
                {   // Canal 6
                    "Cinta": ["~", "#T", "(6)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["24", "23", "25",],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "27", "29",],
                },
                {   // Canal 8
                    "Cinta": ["~", "#T", "(8)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["32", "31", "33",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Hojas": 0.4,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.8D": {
        "Nombre":"TXM1.8D",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "1", "2",],
                },
                {   // Canal 2
                    "Cinta": [null, "#T", "(2)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "3", "4",],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "5", "6",],
                },
                {   // Canal 4
                    "Cinta": [null, "#T", "(4)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "7", "8",],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "9", "10",],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "11", "12",],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "13", "14",],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "15", "16",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Hojas": 0.4,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.16D": {
        "Nombre":"TXM1.16D",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "1", "2",],
                },
                {   // Canal 2
                    "Cinta": [null, "#T", "(2)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "3", "4",],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "5", "6",],
                },
                {   // Canal 4
                    "Cinta": [null, "#T", "(4)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "7", "8",],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "9", "10",],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "11", "12",],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "13", "14",],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "15", "16",],
                },
                {   // Canal 9
                    "Cinta": [null, "#T", "(9)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "17", "18",],
                },
                {   // Canal 10
                    "Cinta": [null, "#T", "(10)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "19", "20",],
                },
                {   // Canal 11
                    "Cinta": [null, "#T", "(11)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "21", "22",],
                },
                {   // Canal 12
                    "Cinta": [null, "#T", "(12)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "23", "24",],
                },
                {   // Canal 13
                    "Cinta": [null, "#T", "(13)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "25", "26",],
                },
                {   // Canal 14
                    "Cinta": [null, "#T", "(14)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "27", "28",],
                },
                {   // Canal 15
                    "Cinta": [null, "#T", "(15)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "29", "30",],
                },
                {   // Canal 16
                    "Cinta": [null, "#T", "(16)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "31", "32",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Hojas": 0.4,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.6R": {
        "Nombre":"TXM1.6R",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": "(1)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["4", "3", { num: "2", señales: ["SD"], nombre:"Canal 1"},],
                },
                {   // Canal 2
                    "Cinta": "(2)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["10", "9",  { num: "8", señales: ["SD"], nombre:"Canal 2"},],
                },
                {   // Canal 3
                    "Cinta": "(3)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["16", "15", "14",],
                },
                {   // Canal 4
                    "Cinta": "(4)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["19", "20", "21",],
                },
                {   // Canal 5
                    "Cinta": "(5)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["25", "26", "27",],
                },
                {   // Canal 6
                    "Cinta": "(6)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["31", "32", "33",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Hojas": 0.25,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.4D3R": {
        "Nombre":"TXM1.4D3R",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": "(1)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["4", "3", "2",],
                },
                {   // Canal 2
                    "Cinta": "(2)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["10", "9", "8",],
                },
                {   // Canal 3
                    "Cinta": "(3)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["16", "15", "14",],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "26", "27",],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "28", "29",],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "30", "31",],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "32", "33",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Hojas": 0.3,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
}