// const fs = require('fs');

const signalTypes = ["EA", "ED", "SA", "SD"];

// En el array estan las diferentes opciones de dibujar la señal en el esquema
// El nombre del bloque a llamar será el nombre de la propiedad + el valor elegido. p ej  ED_1 + "Contactor" = ED_1_Contactor
const esq = {

    // TODO: valorar si es mejor hacer que los objetos tengan la estructira { Nombre: "EA_1", Opciones :["Pasiva",] } 
    // para poder tener un acceso mas facil y no tener que iterar las propiedades buscando cual es el nombre

    //EA
    PasivaEA_1: () => ({ EA_1: ["Pasiva",] }),
    SimpleEA_1: () => ({ EA_1: ["Externa",] }),
    ActivaEA_1: () => ({ EA_1: ["Activa",] }),
    ActivaEA_2: () => ({ EA_2: ["Activa",] }),
    ActivaEA_3: () => ({ EA_3: ["Activa",] }),
    //ED
    SimpleED_1: () => ({ ED_1: ["Externa",] }),
    EntradED_1: () => ({ ED_1: ["Externa", "Rele",] }),
    MotorED_1: () => ({ ED_1: ["Externa", "Rele", "Contactor", "Termico",] }),
    //SA
    SimpleSA_1: () => ({ SA_1: ["Externa",] }),
    ActuadSA_1: () => ({ SA_1: ["Externa", "Actuador",] }),
    //SD
    SimpleSD_1: () => ({ SD_1: ["Externa",] }),
    SalidaSD_1: () => ({ SD_1: ["Externa", "Rele",] }),
    MotorSD_1: () => ({ SD_1: ["Externa", "Rele", "Contactor",] }),
    MotorSD_3: () => ({ SD_3: ["Motor3V",] }),
    ActuadSD_1: () => ({ SD_1: ["Externa", "Rele", "Simple", "Conmutada",] }),
    ActuadSD_2: () => ({ SD_2: ["Externa", "Actuador",] }),
}

const opt = {
    // "Esquema" es un array de objetos y no un objeto con propiedades, por si se necesita duplicar el objeto, 
    // como por ejemplo en el actuador todo/nada con 2 micros, donde la entrada digital esta duplicada
    //Simples
    SimpleEA: (Nombre) => ({Nombre, Seniales: { "EA": 1, }, Esquema: [esq.SimpleEA_1()], }),
    SimpleED: (Nombre) => ({Nombre, Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1()], }),
    SimpleSA: (Nombre) => ({Nombre, Seniales: { "SA": 1, }, Esquema: [esq.SimpleSA_1()], }),
    SimpleSD: (Nombre) => ({Nombre, Seniales: { "SD": 1, }, Esquema: [esq.SimpleSD_1()], }),
    //sensor
    SensorPasi: (Nombre) => ({Nombre, Seniales: { "EA": 1, }, Esquema: [esq.PasivaEA_1()], }),
    SensorAct1: (Nombre) => ({Nombre, Seniales: { "EA": 1, }, Esquema: [esq.ActivaEA_1()], }),
    SensorAct2: (Nombre) => ({Nombre, Seniales: { "EA": 2, }, Esquema: [esq.ActivaEA_2()], }),
    SensorAct3: (Nombre) => ({Nombre, Seniales: { "EA": 3, }, Esquema: [esq.ActivaEA_3()], }),
    SensorDigi: (Nombre) => ({Nombre, Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1()], }),
    //Actuador
    Actuador010V: (Nombre) => ({Nombre, Seniales: { "SA": 1, }, Esquema: [esq.ActuadSA_1()], }),
    Actuador3Pun: (Nombre) => ({Nombre, Seniales: { "SD": 2, }, Esquema: [esq.ActuadSD_2()], }),
    ActuadorTN0M: (Nombre) => ({Nombre, Seniales: { "SD": 1, }, Esquema: [esq.ActuadSD_1(),], }),
    ActuadorTN1M: (Nombre) => ({Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.ActuadSD_1(),], }),
    ActuadorTN2M: (Nombre) => ({Nombre, Seniales: { "ED": 2, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.EntradED_1(), esq.ActuadSD_1(),], }),
    //motor
    MPyEstado: (Nombre) => ({Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.SalidaSD_1(),], }),
    MotorToNa: (Nombre) => ({Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.MotorED_1(), esq.MotorSD_1(),], }),
    MPEst010V: (Nombre) => ({Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.SimpleSA_1(), esq.SalidaSD_1(),], }),
    Motor010V: (Nombre) => ({Nombre, Seniales: { "ED": 1, "SA": 1, "SD": 1 }, Esquema: [esq.MotorED_1(), esq.SimpleSA_1(), esq.MotorSD_1(),], }),
    Motor3vel: (Nombre) => ({Nombre, Seniales: { "SD": 3 }, Esquema: [esq.MotorSD_3(),], }),
}

const elem = {

    //sencillos
    PasivaEA:    (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SensorPasi("Externa"),], }),
    SimpleEA:    (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleEA("Externa"),], }),
    SimpleED:    (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleED("Externa"),], }),
    SimpleSA:    (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSA("Externa"),], }),
    SimpleSD:    (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSD("Externa"),], }),

    //sensores 
    SensorAire:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SensorPasi("Temperatura"), opt.SensorAct2("Temp + Hume"), opt.SensorAct2("Temp + CO2"), opt.SensorAct3("Temp Hum CO2"),], }),
    SondaTermos: (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SensorPasi("Temperatura"), opt.SensorDigi("Termostato"),], }),
    SensorPres:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SensorDigi("Presostato"), opt.SensorAct1("Sonda"),], }),
    SoloActiva:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SensorAct1("Sonda"),], }),

    //valvulas
    ValvulaToNa: (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.ActuadorTN1M("1 Micro"), opt.ActuadorTN2M("2 Micros"), opt.ActuadorTN0M("Sin Micros"),], }),
    ValvulaProp: (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"),], }),
    ValvTNProp:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.ActuadorTN1M("Todo/Nada"), opt.Actuador3Pun("3 Puntos"), opt.Actuador010V("0..10Vcc"),], }),

    //organos de gobierno
    ExterModul:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.MPyEstado("Simple"), opt.MPEst010V("0..10Vcc"),], }),
    MotorModul:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.MotorToNa("Simple"), opt.Motor010V("0..10Vcc"),], }),
    MotorFC:     (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("1veloc"), opt.Motor3vel("3veloc"),], }),
    Recuperdor:  (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSD("Bypass"), opt.MotorToNa("Simple"), opt.Motor010V("0..10Vcc"),], }),

    //productores
    ModulaCalde: (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSA("0..10Vcc"), opt.Actuador3Pun("3 Puntos"), opt.SimpleSD("2ª llama"),], }),
    MPyEstado:   (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.MPyEstado("MPyEstado"),], }),
    Demanda:     (Nombre, Cantidad) => ({ Nombre, Cantidad, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("Todo/Nada"),], }),

}

function blocks() {
    // Separadores identificados con "Seniales: null"
    return [
        {
            "Nombre": "Condiciones Exteriores",
            "Elementos": [
                elem.SensorAire("Exterior", 1),
            ],
        },
        {
            "Nombre": " ----- Producción -----",
            "Elementos": null,
        },
        {
            "Nombre": "Gestor de Cascada de Producción",
            "Elementos": [
                elem.SondaTermos("Temperatura", 1),
                elem.MotorModul("Bomba", 0),
                elem.MotorModul("Ventilacion Forzada", 1),
                elem.SimpleSD("Electroválvula de Gas", 1),
                elem.SimpleED("Cambio de regimen externo", 0),
                elem.ValvulaToNa("Válvula Calor / Frío", 0),
                elem.SondaTermos("Control Presión", 1),
            ],
        },
        {
            "Nombre": "Caldera",
            "Elementos": [
                elem.SondaTermos("Temperatura", 1),
                elem.SimpleSD("Marcha-Paro", 0),
                elem.SimpleED("Estado / Alarma", 1),
                elem.ModulaCalde("Modulación / Consigna", 1),
                elem.MotorModul("Bomba", 1),
                elem.ValvTNProp("Válvula Aislamiento / Retorno", 0),
                elem.SondaTermos("Control Humos", 0),
                elem.SensorPres("Control Presión", 0),
            ],
        },
        {
            "Nombre": "Aerotermia",
            "Elementos": [
                elem.SondaTermos("Temperatura", 1),
                elem.MPyEstado("Marcha-Paro y alarma", 1),
                elem.SimpleSA("Modulación / Consigna", 0),
                elem.MotorModul("Bomba", 1),
                elem.SimpleED("Cambio de regimen externo", 0),
                elem.ValvulaToNa("Válvula Calor / Frío / ACS", 0),
                elem.SensorPres("Control Presión", 0),
            ],
        },
        {
            "Nombre": "Solar",
            "Elementos": [
                elem.SoloActiva("Radiacion Solar", 0),
                elem.SondaTermos("Temperatura Paneles", 1),
                elem.SondaTermos("Temperatura Secundario", 0),
                elem.SondaTermos("Temperatura Depósito", 1),
                elem.MotorModul("Bomba Primario", 1),
                elem.MotorModul("Bomba Secundario", 0),
                elem.MotorModul("Bomba Transvase", 0),
                elem.MotorModul("Aerotermo", 0),
                elem.ValvTNProp("Válvula Primario", 0),
                elem.ValvTNProp("Válvula Secundario", 0),
                elem.SensorPres("Control Presión", 0),
            ],
        },
        {
            "Nombre": " ----- Consumo -----",
            "Elementos": null,
        },
        {
            "Nombre": "Circuito Calefacción/Distribución",
            "Elementos": [
                elem.SondaTermos("Temp Impulsion", 1),
                elem.SensorAire("Sensor Ambiente", 0),
                elem.SoloActiva("Presion Diferencial", 0),
                elem.MotorModul("Bomba", 1),
                elem.ValvTNProp("Válvula control", 1),
                elem.SimpleED("Cambio de regimen externo", 0),
                elem.ValvulaToNa("Válvula Calor / Frío", 0),
                elem.Demanda("Demanda a terceros", 0),
            ],
        },
        {
            "Nombre": "ACS",
            "Elementos": [
                elem.SondaTermos("Temperatura Secundario", 0),
                elem.SondaTermos("Temperatura Depósito", 1),
                elem.SondaTermos("Temperatura Consumidores", 1),
                elem.MotorModul("Bomba Primario", 1),
                elem.MotorModul("Bomba Secundario", 0),
                elem.MotorModul("Bomba Retorno", 1),
                elem.ValvTNProp("Válvula Primario", 0),
                elem.ValvulaProp("Válvula Consumidores", 1),
                elem.ValvulaToNa("Bypass Válvula Consumidores", 0),
                elem.Demanda("Demanda a terceros", 0),
            ],
        },
        {
            "Nombre": "Climatizador",
            "Elementos": [
                elem.SensorAire("Sonda Ambiente / Retorno", 1),
                elem.SensorAire("Sonda Impulsión", 1),
                elem.SensorAire("Sonda Recuperación", 0),
                elem.SensorAire("Sonda toma aire del Exterior", 0),
                elem.SensorAire("Sonda salida aire al Exterior", 0),
                elem.ValvTNProp("Válvula Batería", 1),
                elem.MotorModul("Bomba Batería", 0),
                elem.SimpleED("Presostato filtro sucio", 0),
                elem.SoloActiva("Presión Ventilador", 0),
                elem.MotorModul("Ventilador", 1),
                elem.ExterModul("Humectador", 0),
                elem.Recuperdor("Recuperador", 0),
                elem.ValvTNProp("Compuertas", 0),
                elem.SimpleED("Cambio de regimen externo", 0),
                elem.Demanda("Demanda a terceros", 0),
            ],
        },
        {
            "Nombre": "Fan Coil",
            "Elementos": [
                elem.SensorAire("Sonda Ambiente / Retorno", 1),
                elem.SondaTermos("Temperatura Impulsión", 0),
                elem.ValvTNProp("Válvula Batería", 1),
                elem.SimpleED("Presostato filtro sucio", 0),
                elem.MotorFC("Ventilador", 1),
            ],
        },
    ]
}

// fs.writeFileSync("proyFull.json", JSON.stringify(blocks(), null, 4));

// console.log(JSON.stringify(blocksData(), null, 4));
// console.log(JSON.stringify(blocksData()["Circuito Calefacción/Distribución"], null, 4));
// console.log(JSON.stringify(blocksData()["Gestor de Cascada de Producción"], null, 4));
// console.log(JSON.stringify(blocksData()["Aerotermia / Geotermia"], null, 4));
// console.log(JSON.stringify(blocksData()["Condiciones Exteriores"], null, 4));
// console.log(JSON.stringify(blocksData()["Climatizador"], null, 4));
// console.log(JSON.stringify(blocksData()["Fan Coil"], null, 4));
// console.log(JSON.stringify(blocksData()["Caldera"], null, 4));
// console.log(JSON.stringify(blocksData()["Solar"], null, 4));
// console.log(JSON.stringify(blocksData()["ACS"], null, 4));
