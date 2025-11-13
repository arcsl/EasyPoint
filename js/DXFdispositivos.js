/// <reference path="DXFbasicos.js" />
/// <reference path="DXFbloques.js" />
/// <reference path="DXFsimbolos.js" />

const dispositivos = {

    "ACOMETIDA": {
        "Nombre": "ACOMETIDA",
        "Paginas": [
            [
                {   // General
                    "Numeracion": ["#AGen",],
                },
                {   // 24V
                    "Numeracion": [null,],
                    "Opcional": [{ nombre: "24V 50Hz", dibujo: "#A24v", Linea1: "Alimentacion 24V 50Hz", Linea2: "", },],
                },
                {   // Separación
                    "Numeracion": [
                        null, null, null, null, null, null, null, null, null, null, null, null,
                    ],
                },
                {   // Presostato 1
                    "Numeracion": [null, null, null, null,],
                    "Opcional": [null, null, null, { nombre: "Presost. 1", dibujo: "#APre1", Linea1: "Presost. Calefacción", Linea2: "B12CN", Espejo1: 22, },],
                },
                {   // Separación
                    "Numeracion": [
                        null, null, null, null, null, null, null,
                    ],
                },
                {   // Presostato 2
                    "Numeracion": [null, null, null, null,],
                    "Opcional": [null, null, null, { nombre: "Presost. 2", dibujo: "#APre2", Linea1: "Presost. Primario ACS", Linea2: "B12CN", Espejo1: 22, },],
                },
                {   // Separación
                    "Numeracion": [
                        null, null, null, null, null, null, null,
                    ],
                },
                {   // Presostato 3
                    "Numeracion": [null, null, null, null,],
                    "Opcional": [null, null, null, { nombre: "Presost. 3", dibujo: "#APre3", Linea1: "Presost. Aerotermia", Linea2: "B12CN", Espejo1: 22, },],
                },
            ],
        ],
        "Disposicion": {
            "Familia": "General",
            "Tipo": "controlador",
        },
    },
    "PXC4.E16-2": {
        "Nombre": "PXC4.E16-2",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                    "Opcional": [
                        null, { nombre: "LAN 1A", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN 1B", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["3", "4",],
                    "Opcional": [null, { nombre: "KNX", dibujo: "#ext2", Linea1: "Integración KNX", Linea2: "", },],

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
                    "Numeracion": [
                        "8", null, null, { num: "9", señales: ["EA", "ED", "SA"], nombre: "U1" },
                        null, null, "10", { num: "11", señales: ["EA", "ED", "SA"], nombre: "U2" },
                        null, null, null, { num: "12", señales: ["EA", "ED", "SA"], nombre: "U3" },
                        null, null, "13", { num: "14", señales: ["EA", "ED", "SA"], nombre: "U4" },
                        null, null, null, { num: "15", señales: ["EA", "ED", "SA"], nombre: "U5" },
                        null, null, "16", { num: "17", señales: ["EA", "ED", "SA"], nombre: "U6" },
                        "18",],
                },
                {   // entradas U7 a U12
                    "Cinta": ["V+", null, null, "U7", null, null, "#T", "U8", null, null, null, "U9", null, null, "#T", "U10", null, null, null, "U11", null, null, "#T", "U12", "V~",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD", "#D",],
                    "Numeracion": [
                        "19", null, null, { num: "20", señales: ["EA", "ED", "SA"], nombre: "U7" },
                        null, null, "21", { num: "22", señales: ["EA", "ED", "SA"], nombre: "U8" },
                        null, null, null, { num: "23", señales: ["EA", "ED", "SA"], nombre: "U9" },
                        null, null, "24", { num: "25", señales: ["EA", "ED", "SA"], nombre: "U10" },
                        null, null, null, { num: "26", señales: ["EA", "ED", "SA"], nombre: "U11" },
                        null, null, "27", { num: "28", señales: ["EA", "ED", "SA"], nombre: "U12" },
                        "29",],

                },
                {   // COM
                    "Cinta": "COM",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": [null, null, { nombre: "COM", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
                {   // DO1
                    "Cinta": "DO1",
                    "Simbolos": "#Qc",
                    "Numeracion": ["76", "75", { num: "77", señales: ["SD"], nombre: "DO1" },],
                },
                {   // DO2
                    "Cinta": "DO2",
                    "Simbolos": "#Qc",
                    "Numeracion": ["79", "78", { num: "80", señales: ["SD"], nombre: "DO2" },],
                },
                {   // DO3
                    "Cinta": "DO3",
                    "Simbolos": "#Qc",
                    "Numeracion": ["82", "81", { num: "83", señales: ["SD"], nombre: "DO3" },],
                },
                {   // DO4
                    "Cinta": "DO4",
                    "Simbolos": "#Qc",
                    "Numeracion": ["85", "84", { num: "86", señales: ["SD"], nombre: "DO4" },],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 198,
            "Alto": 125,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "PXC5.E24": {
        "Nombre": "PXC5.E24",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                    "Opcional": [
                        null, { nombre: "LAN 1A", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN 1B", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
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
                    "Opcional": [null, { nombre: "KNX", dibujo: "#ext2", Linea1: "Integración KNX.", Linea2: "", },],
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
                    "Numeracion": [null, { num: "8", señales: ["ED"], nombre: "DI1" }, null, "9", { num: "10", señales: ["ED"], nombre: "DI2" },],
                },
                {   // entradas U1 a U4
                    "Cinta": [null, null, null, "U1", null, null, "#T", "U2", null, null, null, "U3", null, null, "#T", "U4",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD",],
                    "Numeracion": [
                        null, null, null, { num: "20", señales: ["EA", "ED", "SA"], nombre: "U1" },
                        null, null, "21", { num: "22", señales: ["EA", "ED", "SA"], nombre: "U2" },
                        null, null, null, { num: "23", señales: ["EA", "ED", "SA"], nombre: "U3" },
                        null, null, "24", { num: "25", señales: ["EA", "ED", "SA"], nombre: "U4" },
                    ],
                },
                {   // entradas U5 a U8
                    "Cinta": [null, null, null, "U5", null, null, "#T", "U6", null, null, null, "U7", null, null, "#T", "U8",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD",],
                    "Numeracion": [
                        null, null, null, { num: "26", señales: ["EA", "ED", "SA"], nombre: "U5" },
                        null, null, "27", { num: "28", señales: ["EA", "ED", "SA"], nombre: "U6" },
                        null, null, null, { num: "29", señales: ["EA", "ED", "SA"], nombre: "U7" },
                        null, null, "30", { num: "31", señales: ["EA", "ED", "SA"], nombre: "U8" },
                    ],
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
                    "Cinta": [null, null, null, "X1", null, null, "#T", "X2", null, null, null, "X3", null, null, "#T", "X4",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD",],
                    "Numeracion": [
                        null, null, null, { num: "40", señales: ["EA", "ED", "SA"], nombre: "X1" },
                        null, null, "41", { num: "42", señales: ["EA", "ED", "SA"], nombre: "X2" },
                        null, null, null, { num: "43", señales: ["EA", "ED", "SA"], nombre: "X3" },
                        null, null, "44", { num: "45", señales: ["EA", "ED", "SA"], nombre: "X4" },
                    ],
                },
                {   // entradas X5 a X8
                    "Cinta": [null, null, null, "X5", null, null, "#T", "X6", null, null, null, "X7", null, null, "#T", "X8",],
                    "Simbolos": [null, null, null, "#UD", null, null, "#-", "#UD", null, null, null, "#UD", null, null, "#-", "#UD",],
                    "Numeracion": [
                        null, null, null, { num: "46", señales: ["EA", "ED", "SA"], nombre: "X5" },
                        null, null, "47", { num: "48", señales: ["EA", "ED", "SA"], nombre: "X6" },
                        null, null, null, { num: "49", señales: ["EA", "ED", "SA"], nombre: "X7" },
                        null, null, "50", { num: "51", señales: ["EA", "ED", "SA"], nombre: "X8" },
                    ],
                },
                {   // M-BUS
                    "Cinta": "MBUS",
                    "Subcinta": ["+", "-",],
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["66", "67",],
                    "Opcional": [null, { nombre: "MBUS", dibujo: "#ext2", Linea1: "M-bus", Linea2: "", },],
                },
                {   // COM 1
                    "Cinta": "COM1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": [null, null, { nombre: "COM1", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
                {   // COM 2
                    "Cinta": "COM2",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["71", "72", "73",],
                    "Opcional": [null, null, { nombre: "COM2", dibujo: "#ext3", Linea1: "ModBus / BACnet", Linea2: "", },],
                    // "": "INTEGRACION MODBUS TERCEROS%",
                },
                {   // DO1
                    "Cinta": "DO1",
                    "Simbolos": "#Qc",
                    "Numeracion": ["76", "75", { num: "77", señales: ["SD"], nombre: "DO1" },],
                },
                {   // DO2
                    "Cinta": "DO2",
                    "Simbolos": "#Qc",
                    "Numeracion": ["79", "78", { num: "80", señales: ["SD"], nombre: "DO2" },],
                },
                {   // DO3
                    "Cinta": "DO3",
                    "Simbolos": "#Qc",
                    "Numeracion": ["82", "81", { num: "83", señales: ["SD"], nombre: "DO3" },],
                },
                {   // DO4
                    "Cinta": "DO4",
                    "Simbolos": "#Qc",
                    "Numeracion": ["85", "84", { num: "86", señales: ["SD"], nombre: "DO4" },],
                },
                {   // DO5
                    "Cinta": "DO5",
                    "Simbolos": "#Qc",
                    "Numeracion": ["88", "87", { num: "89", señales: ["SD"], nombre: "DO5" },],
                },
                {   // DO6
                    "Cinta": "DO6",
                    "Simbolos": "#Qc",
                    "Numeracion": ["91", "90", { num: "92", señales: ["SD"], nombre: "DO6" },],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 270,
            "Alto": 125,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "PXC7.E400": {
        "Nombre": "PXC7.E400",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                    "Opcional": [
                        null, { nombre: "LAN 1A", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN 1B", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
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
                    "Opcional": [null, { nombre: "KNX", dibujo: "#ext2", Linea1: "Integración KNX.", Linea2: "", },],
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["5", "6", "7",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // entrada digital
                    "Subcinta": ["#T", "D",],
                    "Simbolos": ["#|", "#U",],
                    "Numeracion": ["11", { num: "10", señales: ["ED"], nombre: "DI1" },],
                },
                {   // M-BUS
                    "Cinta": "MBUS",
                    "Subcinta": ["+", "-",],
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["66", "67",],
                    "Opcional": [null, { nombre: "MBUS", dibujo: "#ext2", Linea1: "M-bus", Linea2: "", },],
                },
                {   // COM 1
                    "Cinta": "COM1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "70",],
                    "Opcional": [null, null, { nombre: "COM1", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
                {   // COM 2
                    "Cinta": "COM2",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["71", "72", "73",],
                    "Opcional": [null, null, { nombre: "COM2", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
                {   // COM 3
                    "Cinta": "COM3",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["74", "75", "76",],
                    "Opcional": [null, null, { nombre: "COM3", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
                {   // COM 4
                    "Cinta": "COM4",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["77", "78", "79",],
                    "Opcional": [null, null, { nombre: "COM4", dibujo: "#ext3", Linea1: "M-bus / ModBus / BACnet", Linea2: "", },],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 198,
            "Alto": 125,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "TXS1.12F10": {
        "Nombre": "TXS1.12F10",
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
            "Familia": "PX",
            "Tipo": "alimentacion",
        },
    },
    "TXS1.EF10": {
        "Nombre": "TXS1.EF10",
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
            "Familia": "PX",
            "Tipo": "alimentacion",
        },
    },
    "TXM1.8U": {
        "Nombre": "TXM1.8U",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "2", { num: "4", señales: ["EA", "ED", "SA"], nombre: "U1" }],
                },
                {   // Canal 2
                    "Cinta": ["~", "#T", "(2)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["7", "6", { num: "8", señales: ["EA", "ED", "SA"], nombre: "U2" }],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "10", { num: "12", señales: ["EA", "ED", "SA"], nombre: "U3" }],
                },
                {   // Canal 4
                    "Cinta": ["~", "#T", "(4)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["15", "14", { num: "16", señales: ["EA", "ED", "SA"], nombre: "U4" }],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "19", { num: "21", señales: ["EA", "ED", "SA"], nombre: "U5" }],
                },
                {   // Canal 6
                    "Cinta": ["~", "#T", "(6)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["24", "23", { num: "25", señales: ["EA", "ED", "SA"], nombre: "U6" }],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#UD",],
                    "Numeracion": [null, "27", { num: "29", señales: ["EA", "ED", "SA"], nombre: "U7" }],
                },
                {   // Canal 8
                    "Cinta": ["~", "#T", "(8)",],
                    "Simbolos": ["#D", "#-", "#UD",],
                    "Numeracion": ["32", "31", { num: "33", señales: ["EA", "ED", "SA"], nombre: "U8" }],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.8D": {
        "Nombre": "TXM1.8D",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "1", { num: "2", señales: ["ED"], nombre: "DI1" }],
                },
                {   // Canal 2
                    "Cinta": [null, "#T", "(2)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "3", { num: "4", señales: ["ED"], nombre: "DI2" }],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "5", { num: "6", señales: ["ED"], nombre: "DI3" }],
                },
                {   // Canal 4
                    "Cinta": [null, "#T", "(4)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "7", { num: "8", señales: ["ED"], nombre: "DI4" }],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "9", { num: "10", señales: ["ED"], nombre: "DI5" }],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "11", { num: "12", señales: ["ED"], nombre: "DI6" }],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "13", { num: "14", señales: ["ED"], nombre: "DI7" }],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "15", { num: "16", señales: ["ED"], nombre: "DI8" }],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.16D": {
        "Nombre": "TXM1.16D",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": [null, "#T", "(1)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "1", { num: "2", señales: ["ED"], nombre: "DI1" }],
                },
                {   // Canal 2
                    "Cinta": [null, "#T", "(2)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "3", { num: "4", señales: ["ED"], nombre: "DI2" }],
                },
                {   // Canal 3
                    "Cinta": [null, "#T", "(3)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "5", { num: "6", señales: ["ED"], nombre: "DI3" }],
                },
                {   // Canal 4
                    "Cinta": [null, "#T", "(4)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "7", { num: "8", señales: ["ED"], nombre: "DI4" }],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "9", { num: "10", señales: ["ED"], nombre: "DI5" }],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "11", { num: "12", señales: ["ED"], nombre: "DI6" }],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "13", { num: "14", señales: ["ED"], nombre: "DI7" }],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "15", { num: "16", señales: ["ED"], nombre: "DI8" }],
                },
                {   // Canal 9
                    "Cinta": [null, "#T", "(9)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "17", { num: "18", señales: ["ED"], nombre: "DI9" }],
                },
                {   // Canal 10
                    "Cinta": [null, "#T", "(10)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "19", { num: "20", señales: ["ED"], nombre: "DI10" }],
                },
                {   // Canal 11
                    "Cinta": [null, "#T", "(11)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "21", { num: "22", señales: ["ED"], nombre: "DI11" }],
                },
                {   // Canal 12
                    "Cinta": [null, "#T", "(12)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "23", { num: "24", señales: ["ED"], nombre: "DI12" }],
                },
                {   // Canal 13
                    "Cinta": [null, "#T", "(13)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "25", { num: "26", señales: ["ED"], nombre: "DI13" }],
                },
                {   // Canal 14
                    "Cinta": [null, "#T", "(14)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "27", { num: "28", señales: ["ED"], nombre: "DI14" }],
                },
                {   // Canal 15
                    "Cinta": [null, "#T", "(15)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "29", { num: "30", señales: ["ED"], nombre: "DI15" }],
                },
                {   // Canal 16
                    "Cinta": [null, "#T", "(16)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "31", { num: "32", señales: ["ED"], nombre: "DI16" }],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.6R": {
        "Nombre": "TXM1.6R",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": "(1)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["3", "4", { num: "2", señales: ["SD"], nombre: "DO1" },],
                },
                {   // Canal 2
                    "Cinta": "(2)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["9", "10", { num: "8", señales: ["SD"], nombre: "DO2" },],
                },
                {   // Canal 3
                    "Cinta": "(3)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["15", "16", { num: "14", señales: ["SD"], nombre: "DO3" },],
                },
                {   // Canal 4
                    "Cinta": "(4)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["20", "19", { num: "21", señales: ["SD"], nombre: "DO4" },],
                },
                {   // Canal 5
                    "Cinta": "(5)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["26", "25", { num: "27", señales: ["SD"], nombre: "DO5" },],
                },
                {   // Canal 6
                    "Cinta": "(6)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["32", "31", { num: "33", señales: ["SD"], nombre: "DO6" },],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "TXM1.4D3R": {
        "Nombre": "TXM1.4D3R",
        "Paginas": [
            [
                {   // Canal 1
                    "Cinta": "(1)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["3", "4", { num: "2", señales: ["ED"], nombre: "DO1" },],
                },
                {   // Canal 2
                    "Cinta": "(2)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["9", "10", { num: "8", señales: ["ED"], nombre: "DO2" },],
                },
                {   // Canal 3
                    "Cinta": "(3)",
                    "Simbolos": "#Qc",
                    "Numeracion": ["15", "16", { num: "14", señales: ["ED"], nombre: "DO3" },],
                },
                {   // Canal 5
                    "Cinta": [null, "#T", "(5)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "26", { num: "27", señales: ["ED"], nombre: "DI5" },],
                },
                {   // Canal 6
                    "Cinta": [null, "#T", "(6)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "28", { num: "29", señales: ["SD"], nombre: "DI6" },],
                },
                {   // Canal 7
                    "Cinta": [null, "#T", "(7)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "30", { num: "31", señales: ["SD"], nombre: "DI7" },],
                },
                {   // Canal 8
                    "Cinta": [null, "#T", "(8)",],
                    "Simbolos": [null, "#-", "#U",],
                    "Numeracion": [null, "32", { num: "33", señales: ["SD"], nombre: "DI8" },],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 64,
            "Alto": 78,
            "Familia": "PX",
            "Tipo": "modulo",
        },
    },
    "PXG3.W100-2": {
        "Nombre": "PXG3.W100-2",
        "Paginas": [
            [
                {   // LAN
                    "Cinta": [null, "1A", null, null, null, "1B", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                    "Opcional": [
                        null, { nombre: "LAN 1A", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN 1B", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["5", "6", "7",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // WAN
                    "Cinta": [null, "2", null,],
                    "Simbolos": [null, "#RED", null,],
                    "Numeracion": [null, "WAN", null,],
                },
                {   // COM 1
                    "Cinta": "COM1",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["65", "66", "67",],
                },
                {   // COM 2
                    "Cinta": "COM2",
                    "Subcinta": ["+", "-", "#d",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["68", "69", "60",],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 144,
            "Alto": 125,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "PXM40": {
        "Nombre": "PXM40",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#|", "#|", "#|",],
                    "Numeracion": ["1", "2", "3",],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // LAN
                    "Simbolos": [null, "#RED", null,],
                    "Numeracion": [null, "LAN", null,],
                    "Opcional": [
                        null, { nombre: "LAN", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Mensaje": "Recorte en puerta de cuadro.",
            "Ancho": 258,
            "Alto": 168,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "DXR2.E09": {
        "Nombre": "DXR2.E09",
        "Paginas": [
            [
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["11", "12",],
                    "Opcional": [null, { nombre: "KNX", dibujo: "#ext2", Linea1: "Temperatura ambiente", Linea2: "QMX3.P35", },],
                },
                {   // LAN
                    "Cinta": [null, "1", null, null, null, "2", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#25", null, "LAN", null, "#52", null,],
                    "Opcional": [
                        null, { nombre: "LAN 1", dibujo: "#int", Linea1: "A DXR2 anterior", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN 2", dibujo: "#int", Linea1: "A DXR2 siguiente", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },
                {   // entradas Digitales
                    "Cinta": [null, "D1", null, null, "#T", "X1", null, null, "#T", "X2",],
                    "Simbolos": [null, "#U", null, null, "#-", "#U", null, null, "#-", "#U",],
                    "Numeracion": [
                        null, { num: "31", señales: ["ED"], nombre: "DI1" },
                        null, null, "32", { num: "33", señales: ["EA", "ED"], nombre: "X1" },
                        null, "34", "35", { num: "36", señales: ["EA", "ED"], nombre: "X2" },
                    ],
                },
                {   // alimentacion 230V
                    "Cinta": "230V~",
                    "Subcinta": ["L", "N", "L", "N",],
                    "Simbolos": ["#|", "#|", "#|", "#|",],
                    "Numeracion": ["51", "52", "53", "54",],
                    "Fijo": ["#L", "#N", null, null,],
                },
                {   // 3 velocidades
                    "Cinta": ["Q13", null, "Q14", null, null, null, "Q24", null, null, null, "Q34",],
                    "Simbolos": "#3V",
                    "Numeracion": [
                        "61", null, { num: "62", señales: ["SD"], nombre: "Q14" }, null,
                        null, null, { num: "63", señales: ["SD"], nombre: "Q24" }, null,
                        null, null, { num: "64", señales: ["SD"], nombre: "Q34" },
                    ],
                },
                {   // salidas analógicas
                    "Cinta": [null, null, "Y10", null, "V~", "#T", "Y20", null, null, "#T", "Y30",],
                    "Simbolos": [null, null, "#D", null, "#|", "#-", "#D", null, null, "#-", "#D",],
                    "Numeracion": [
                        null, null, { num: "71", señales: ["SA"], nombre: "Y10" }, null,
                        "73", "72", { num: "74", señales: ["SA"], nombre: "Y20" }, null,
                        null, "76", { num: "75", señales: ["SA"], nombre: "Y30" },
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 112,
            "Alto": 165,
            "Familia": "PX",
            "Tipo": "controlador",
        },
    },
    "SWITCH 5P": {
        "Nombre": "SWITCH XB005",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Cinta": "24V AC/DC",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#U", "#U", "#|",],
                    "Numeracion": ["L+", "M", "#Tierra"],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // LAN
                    "Cinta": [null, "P1", null, null, null, "P2", null, null, null, "P3", null, null, null, "P4", null, null, null, "P5", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#216", null, null, null, "#213", null, null, null, "LAN", null, null, null, "#132", null, null, null, "#162", null,],
                    "Opcional": [
                        null, { nombre: "LAN P1", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P2", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P3", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P4", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P5", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },

            ],
        ],
        "Disposicion": {
            "Ancho": 45,
            "Alto": 100,
            "Familia": "General",
            "Tipo": "controlador",
        },
    },
    "SWITCH 8P": {
        "Nombre": "SWITCH XB008",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Cinta": "24V AC/DC",
                    "Subcinta": ["~", "#T", "#uTierra",],
                    "Simbolos": ["#U", "#U", "#|",],
                    "Numeracion": ["L+", "M", "#Tierra"],
                    "Fijo": ["#G", "#G0", null,],
                },
                {   // LAN
                    "Cinta": [null, "P1", null, null, null, "P2", null, null, null, "P3", null, null, null, "P4", null, null, null, "P5", null, null, null, "P6", null, null, null, "P7", null, null, null, "P8", null,],
                    "Simbolos": [null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null, null, null, "#RED", null,],
                    "Numeracion": [null, "#216", null, null, null, "#216", null, null, null, "#216", null, null, null, "#25", null, "LAN", null, "#52", null, null, null, "#162", null, null, null, "#162", null, null, null, "#162", null,],
                    "Opcional": [
                        null, { nombre: "LAN P1", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P2", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P3", dibujo: "#int", Linea1: "A controlador anterior en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P4", dibujo: "#int", Linea1: "A router o rack de comunicaciones", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P5", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P6", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P7", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                        null, { nombre: "LAN P8", dibujo: "#int", Linea1: "A controlador siguiente en pag # - #", Linea2: "Ethernet UTP CAT-6", }, null,
                    ],
                },

            ],
        ],
        "Disposicion": {
            "Ancho": 45,
            "Alto": 100,
            "Familia": "General",
            "Tipo": "controlador",
        },
    },
    /* - base synco
        "RMT880": {
            "Nombre": "RMT880",
            "Paginas": [
                [
                    {   // alimentacion 24V
                        "Simbolos": ["#U", "#U",],
                        "Numeracion": ["G", "G0",],
                        "Fijo": ["#G", "#G0",],
                    },
                    {   // Entradas universales
                        "Simbolos": [
                            null, "#|", "#U", "#/",
                            "#D", "#|", "#U", "#/",
                            null, "#|", "#U", "#/",
                            "#D", "#|", "#U", "#/",
                            null, "#|", "#U", "#/",
                            "#D", "#|", "#U", "#/",
                            null, "#|", "#U", "#/",
                            "#D", "#|", "#U",
                        ],
                        "Numeracion": [
                            null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                            "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                            null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                            "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                            null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                            "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                            null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                            "G1", "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                        ],
                    },
                    {   // Entradas digitales
                        "Simbolos": [
                            "#|", "#U", "#/",
                            "#|", "#U",
                        ],
                        "Numeracion": [
                            "M", { num: "D1", señales: ["ED"], nombre: "D1" }, null,
                            "M", { num: "D2", señales: ["ED"], nombre: "D2" },
                        ],
                    },
                    {   // Salidas analógicas
                        "Simbolos": [
                            "#D", "#|", "#U", "#/",
                            "#D", "#|", "#U", "#/",
                            "#D", "#|", "#U", "#/",
                            "#D", "#|", "#U",
                        ],
                        "Numeracion": [
                            "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                            "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" }, null,
                            "G1", "M", { num: "Y3", señales: ["SA"], nombre: "Y3" }, null,
                            "G1", "M", { num: "Y4", señales: ["SA"], nombre: "Y4" },
                        ],
                    },
    
                    {   // Salidas digitales
                        "Simbolos": [
                            null, "#Qc", null, "#/",
                            null, "#Qs", null, "#/",
                            null, "#Qs", null, "#/",
                            null, "#Qc", null, "#/",
                            null, "#Qs", null, "#/",
                            null, "#Qs", null, "#/",
                            null, "#Qs", null,
                        ],
                        "Numeracion": [
                            { num: "Q11", extraEstrecho: true, desX: -1 },
                            { num: "Q12", extraEstrecho: true, desX: 0 },
                            { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,
    
                            "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                            "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,
    
                            { num: "Q41", desX: -1, extraEstrecho: true },
                            { num: "Q42", desX: 0, extraEstrecho: true },
                            { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" }, null,
    
                            "Q53", null, { num: "Q54", señales: ["SD"], nombre: "Q5" }, null,
                            "Q63", null, { num: "Q64", señales: ["SD"], nombre: "Q6" }, null,
                            "Q73", null, { num: "Q74", señales: ["SD"], nombre: "Q7" },
                        ],
    
                    },
                    {   // Bus KNX
                        "Simbolos": ["#UD", "#UD",],
                        "Numeracion": [
                            { num: "CE+", extraEstrecho: true, desX: -1 },
                            { num: "CE-", extraEstrecho: true, desX: 1 },
                        ],
                        "Opcional": "#KNX",
                    },
                ],
            ],
            "Disposicion": {
                "Ancho": 173,
                "Alto": 90,
                "Familia": "Synco",
                "Tipo": "controlador",
            },
        },
    */
    "RMK770": {
        "Nombre": "RMK770",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#U", "#U",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                        null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                        "G1", "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                    ],
                },
                {   // Entradas digitales
                    "Simbolos": [
                        "#|", "#U", "#/",
                        "#|", "#U",
                    ],
                    "Numeracion": [
                        "M", { num: "D1", señales: ["ED"], nombre: "D1" }, null,
                        "M", { num: "D2", señales: ["ED"], nombre: "D2" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA",], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA",], nombre: "Y2" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1", multSeñalMax: 2}, null,      // multSeñalMax indica que admite señales marcadas con n o menos, o sea deñales que ocupan n salidas, p ej una valvula a 3 puntos ocupa 2 salidas

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q41", desX: -1, extraEstrecho: true },
                        { num: "Q42", desX: 0, extraEstrecho: true },
                        { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" }, null,

                        "Q53", null, { num: "Q54", señales: ["SD"], nombre: "Q5" }, null,
                        "Q63", null, { num: "Q64", señales: ["SD"], nombre: "Q6" }, null,
                        "Q73", null, { num: "Q74", señales: ["SD"], nombre: "Q7" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMH760B": {
        "Nombre": "RMH760B",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#U", "#U",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q41", desX: -1, extraEstrecho: true },
                        { num: "Q42", desX: 0, extraEstrecho: true },
                        { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" }, null,

                        "Q53", null, { num: "Q54", señales: ["SD"], nombre: "Q5" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMS705B": {
        "Nombre": "RMS705B",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                        null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                        "G1", "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" }, null,
                        "G1", "M", { num: "Y3", señales: ["SA"], nombre: "Y3" }, null,
                        "G1", "M", { num: "Y4", señales: ["SA"], nombre: "Y4" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q41", desX: -1, extraEstrecho: true },
                        { num: "Q42", desX: 0, extraEstrecho: true },
                        { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" }, null,

                        "Q63", null, { num: "Q64", señales: ["SD"], nombre: "Q6" }, null,
                        "Q73", null, { num: "Q74", señales: ["SD"], nombre: "Q7" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#|", "#|",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMU710B": {
        "Nombre": "RMU710B",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#U", "#U",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",

                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#UD", "#UD",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMU720B": {
        "Nombre": "RMU720B",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#U", "#U",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                        null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                        "G1", "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" }, null,
                        "G1", "M", { num: "Y3", señales: ["SA"], nombre: "Y3" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,
                        "Q53", null, { num: "Q54", señales: ["SD"], nombre: "Q5" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#UD", "#UD",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMU730B": {
        "Nombre": "RMU730B",
        "Paginas": [
            [
                {   // alimentacion 24V
                    "Simbolos": ["#U", "#U",],
                    "Numeracion": ["G", "G0",],
                    "Fijo": ["#G", "#G0",],
                },
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                        null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                        "G1", "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" }, null,
                        "G1", "M", { num: "Y3", señales: ["SA"], nombre: "Y3" }, null,
                        "G1", "M", { num: "Y4", señales: ["SA"], nombre: "Y4" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q41", desX: -1, extraEstrecho: true },
                        { num: "Q42", desX: 0, extraEstrecho: true },
                        { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" }, null,

                        "Q63", null, { num: "Q64", señales: ["SD"], nombre: "Q6" }, null,
                        "Q73", null, { num: "Q74", señales: ["SD"], nombre: "Q7" },
                    ],

                },
                {   // Bus KNX
                    "Simbolos": ["#UD", "#UD",],
                    "Numeracion": [
                        { num: "CE+", extraEstrecho: true, desX: -1 },
                        { num: "CE-", extraEstrecho: true, desX: 1 },
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 173,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "RMZ782B": {
        "Nombre": "RMZ782B",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" },
                    ],

                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "RMZ783B": {
        "Nombre": "RMZ783B",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        null, "#|", "#U", // TODO tiene G1 en X4 o no ?
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        null, "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" },
                    ],
                },
                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,
                        "Q43", null, { num: "Q44", señales: ["SD"], nombre: "Q4" }, null,

                        { num: "Q51", desX: -1, extraEstrecho: true },
                        { num: "Q52", desX: 0, extraEstrecho: true },
                        { num: "Q54", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q5" },
                    ],

                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "RMZ785": {
        "Nombre": "RMZ785",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        null, "#|", "#U",  // TODO  X8 tiene G1 o no ?
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        "G1", "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" }, null,
                        null, "M", { num: "X7", señales: ["EA", "ED"], nombre: "X7" }, null,
                        null, "M", { num: "X8", señales: ["EA", "ED"], nombre: "X8" },
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "RMZ787": {
        "Nombre": "RMZ787",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" },
                    ],
                },
                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q51", desX: -1, extraEstrecho: true },
                        { num: "Q52", desX: 0, extraEstrecho: true },
                        { num: "Q54", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q5" },
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "RMZ788": {
        "Nombre": "RMZ788",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        "Q13", null, { num: "Q14", señales: ["SD"], nombre: "Q1" }, null,

                        { num: "Q51", desX: -1, extraEstrecho: true },
                        { num: "Q52", desX: 0, extraEstrecho: true },
                        { num: "Q54", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q5" },
                    ],

                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "RMZ789": {
        "Nombre": "RMZ789",
        "Paginas": [
            [
                {   // Entradas universales
                    "Simbolos": [
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        "#D", "#|", "#U", "#/",
                        null, "#|", "#U", "#/",
                        null, "#|", "#U", // TODO x6 tiene g1 o no ?
                    ],
                    "Numeracion": [
                        null, "M", { num: "X1", señales: ["EA", "ED"], nombre: "X1" }, null,
                        "G1", "M", { num: "X2", señales: ["EA", "ED"], nombre: "X2" }, null,
                        null, "M", { num: "X3", señales: ["EA", "ED"], nombre: "X3" }, null,
                        "G1", "M", { num: "X4", señales: ["EA", "ED"], nombre: "X4" }, null,
                        null, "M", { num: "X5", señales: ["EA", "ED"], nombre: "X5" }, null,
                        null, "M", { num: "X6", señales: ["EA", "ED"], nombre: "X6" },
                    ],
                },
                {   // Salidas analógicas
                    "Simbolos": [
                        "#D", "#|", "#U", "#/",
                        "#D", "#|", "#U",
                    ],
                    "Numeracion": [
                        "G1", "M", { num: "Y1", señales: ["SA"], nombre: "Y1" }, null,
                        "G1", "M", { num: "Y2", señales: ["SA"], nombre: "Y2" },
                    ],
                },

                {   // Salidas digitales
                    "Simbolos": [
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qc", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null, "#/",
                        null, "#Qs", null,
                    ],
                    "Numeracion": [
                        { num: "Q11", extraEstrecho: true, desX: -1 },
                        { num: "Q12", extraEstrecho: true, desX: 0 },
                        { num: "Q14", extraEstrecho: true, desX: 1, señales: ["SD"], nombre: "Q1" }, null,

                        "Q23", null, { num: "Q24", señales: ["SD"], nombre: "Q2" }, null,
                        "Q33", null, { num: "Q34", señales: ["SD"], nombre: "Q3" }, null,

                        { num: "Q41", desX: -1, extraEstrecho: true },
                        { num: "Q42", desX: 0, extraEstrecho: true },
                        { num: "Q44", desX: 1, extraEstrecho: true, señales: ["SD"], nombre: "Q4" },
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 120,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "modulo",
        },
    },
    "OZW772": {
        "Nombre": "OZW772",
        "Paginas": [
            [
                {   // alimentacion
                    "Simbolos": [null, "#|", null,],
                    "Numeracion": [null, "TRAF", null,],
                    "Fijo": "#Sch",
                },
                {   // LAN
                    "Simbolos": [null, "#RED", null,],
                    "Numeracion": [null, "LAN", null,],
                    "Opcional": "#int",
                    "Etiqueta": "A ROUTER O RACK DE COMUNICACIONES%ETHERNET CAT-6",
                },
                {   // Bus KNX
                    "Simbolos": [null, "#|", "#|", null,],
                    "Numeracion": [
                        null,
                        { num: "CE+", desX: -1 },
                        { num: "CE-", desX: 1 },
                        null,
                    ],
                    "Opcional": "#KNX",
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 90,
            "Alto": 90,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
    "ARCUS": {
        "Nombre": "ARCUS",
        "Paginas": [
            [
                {   // Bus KNX
                    "Simbolos": [null, "#UD", "#UD", null,],
                    "Numeracion": [
                        null,
                        { num: "CE+", desX: -1 },
                        { num: "CE-", desX: 1 },
                        null,
                    ],
                    "Opcional": "#KNXsl",
                },
                {   // Contador 1
                    "Simbolos": [null, "#|", "#|", null,],
                    "Numeracion": [
                        null,
                        { num: "MB+", desX: -1 },
                        { num: "MB-", desX: 1 },
                        null,
                    ],
                    "Opcional": [
                        null, null, null, { nombre: "Cont. 1 ", dibujo: "#MBUS", Linea1: "Contador calderas", Linea2: "UH50-A70", },
                    ],
                },
                {   // Bus Mbus
                    "noEnv": true,
                    "Simbolos": [null, "#|", "#|", null,],
                    "Numeracion": [
                        null,
                        { num: "MB+", desX: -1 },
                        { num: "MB-", desX: 1 },
                        null,
                    ],
                    "Opcional": [
                        null, null, null, { nombre: "Cont. 2 ", dibujo: "#MBUS2", Linea1: "Contador calderas", Linea2: "UH50-A70", },
                    ],
                },
                {   // Bus Mbus
                    "noEnv": true,
                    "Simbolos": [null, "#|", "#|", null,],
                    "Numeracion": [
                        null,
                        { num: "MB+", desX: -1 },
                        { num: "MB-", desX: 1 },
                        null,
                    ],
                    "Opcional": [
                        null, null, null, { nombre: "Cont. 3 ", dibujo: "#MBUS2", Linea1: "Contador calderas", Linea2: "UH50-A70", },
                    ],
                },
            ],
        ],
        "Disposicion": {
            "Ancho": 40,
            "Alto": 72,
            "Familia": "Synco",
            "Tipo": "controlador",
        },
    },
}