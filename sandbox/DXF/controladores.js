const controladores = {
    "PXC5.E24": {
        "Paginas": [
            [
                {   // LAN
                    "Cinta":      [   null,   "1A",   null,    null,    null,   "1B",   null,],
                    "Simbolos":   [   null, "#RED",   null,    null,    null, "#RED",   null,],
                    "Numeracion": [   null,  "#25",   null,   "LAN",    null,  "#52",   null,],
                },
                {   // WAN
                    "Cinta":      [   null,    "2",   null,],
                    "Simbolos":   [   null, "#RED",   null,],
                    "Numeracion": [   null,  "WAN",   null,],
                },
                {   // KNX
                    "Cinta": "KNX",
                    "Simbolos":   [   "#|",   "#|", ],
                    "Numeracion": [    "3",    "4", ],
                },
                {   // alimentacion 24V
                    "Cinta": "AC 24V",
                    "Subcinta":   [    "~",   "#T",   "#uTierra", ],
                    "Simbolos":   [   "#|",   "#|",   "#|", ],
                    "Numeracion": [    "5",    "6",    "7", ],
                },
                {   // entradas Digitales
                    "Cinta":      [   null,   "D1",   null,   "#T",   "D2", ],
                    "Simbolos":   [   null,   "#U",   null,   "#-",   "#U", ],
                    "Numeracion": [   null,    "8",   null,    "9",   "10", ],
                },
                {   // entradas U1 a U4
                    "Cinta":      [   null,   null,   "U1",   null,   "#T",   "U2",    null,   null,   "U3",   null,   "#T",   "U4", ],
                    "Simbolos":   [   null,   null,  "#UD",   null,   "#-",  "#UD",    null,   null,  "#UD",   null,   "#-",  "#UD", ],
                    "Numeracion": [   null,   null,   "20",   null,   "21",   "22",    null,   null,   "23",   null,   "24",   "25", ],
                },
                {   // entradas U5 a U8
                    "Cinta":      [   null,   null,   "U5",   null,   "#T",   "U6",    null,   null,   "U7",   null,   "#T",   "U8", ],
                    "Simbolos":   [   null,   null,  "#UD",   null,   "#-",  "#UD",    null,   null,  "#UD",   null,   "#-",  "#UD", ],
                    "Numeracion": [   null,   null,   "26",   null,   "27",   "28",    null,   null,   "29",   null,   "30",   "31", ],
                },
                {   // Salidas tension
                    "Cinta":      [   "V~",   "#T",   "#T",   "V+", ],
                    "Simbolos":   [   "#D",   "#-",   "#-",   "#D", ],
                    "Numeracion": [   "32",   "33",   "34",   "35", ],
                },              
            ],
            [
                {   // Salidas tension
                    "Cinta":      [   "V~",   "#T",   "#T",   "V+", ],
                    "Simbolos":   [   "#D",   "#-",   "#-",   "#D", ],
                    "Numeracion": [   "36",   "37",   "38",   "39", ],
                },
                {   // entradas X1 a x4
                    "Cinta":      [   null,   null,   "X1",   null,   "#T",   "X2",    null,   null,   "X3",   null,   "#T",   "X4", ],
                    "Simbolos":   [   null,   null,  "#UD",   null,   "#-",  "#UD",    null,   null,  "#UD",   null,   "#-",  "#UD", ],
                    "Numeracion": [   null,   null,   "40",   null,   "41",   "42",    null,   null,   "43",   null,   "44",   "45", ],
                },
                {   // entradas X5 a X8
                    "Cinta":      [   null,   null,   "X5",   null,   "#T",   "X6",    null,   null,   "X7",   null,   "#T",   "X8", ],
                    "Simbolos":   [   null,   null,  "#UD",   null,   "#-",  "#UD",    null,   null,  "#UD",   null,   "#-",  "#UD", ],
                    "Numeracion": [   null,   null,   "46",   null,   "47",   "48",    null,   null,   "49",   null,   "50",   "51", ],
                },
                {   // M-BUS
                    "Cinta": "M-BUS",
                    "Subcinta":   [     "+",     "-", ],
                    "Simbolos":   [    "#|",    "#|", ],
                    "Numeracion": [    "66",    "67", ],
                },                
                {   // COM 1
                    "Cinta": "COM 1",
                    "Subcinta":   [    "+",   "-",    "#d", ],
                    "Simbolos":   [   "#|",   "#|",   "#|", ],
                    "Numeracion": [   "68",   "69",   "70", ],
                },
                {   // COM 2
                    "Cinta": "COM 2",
                    "Subcinta":   [    "+",   "-",    "#d", ],
                    "Simbolos":   [   "#|",   "#|",   "#|", ],
                    "Numeracion": [   "71",   "72",   "73", ],
                },
                {   // DO1
                    "Cinta": "DO1",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "75",   "76",   "77", ],
                },
                {   // DO2
                    "Cinta": "DO2",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "78",   "79",   "80", ],
                },
                {   // DO3
                    "Cinta": "DO3",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "81",   "82",   "83", ],
                },
                {   // DO4
                    "Cinta": "DO4",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "84",   "85",   "86", ],
                },
                {   // DO5
                    "Cinta": "DO5",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "87",   "88",   "89", ],
                },
                {   // DO6
                    "Cinta": "DO6",
                    "Simbolos":   "#Qc",
                    "Numeracion": [   "90",   "91",   "92", ],
                },
            ],
        ],
        "medidas": {},
    },
}