const fs = require('fs');

const signalTypes = ["EA", "ED", "SA", "SD"];

// En el array estan las diferentes opciones de dibujar la señal en el esquema
// El nombre del bloque a llamar será el nombre de la propiedad + el valor elegido. p ej  ED_1 + "Contactor" = ED_1_Contactor
const esq = {
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
    //Simples
    SimpleEA: () => ({ Seniales: { "EA": 1, }, Esquema: [esq.SimpleEA_1()], }),
    SimpleED: () => ({ Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1()], }),
    SimpleSA: () => ({ Seniales: { "SA": 1, }, Esquema: [esq.SimpleSA_1()], }),
    SimpleSD: () => ({ Seniales: { "SD": 1, }, Esquema: [esq.SimpleSD_1()], }),
    //sensor
    SensorPasi: () => ({ Seniales: { "EA": 1, }, Esquema: [esq.PasivaEA_1()], }),
    SensorAct1: () => ({ Seniales: { "EA": 1, }, Esquema: [esq.ActivaEA_1()], }),
    SensorAct2: () => ({ Seniales: { "EA": 2, }, Esquema: [esq.ActivaEA_2()], }),
    SensorAct3: () => ({ Seniales: { "EA": 3, }, Esquema: [esq.ActivaEA_3()], }),
    SensorDigi: () => ({ Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1()], }),
    //Actuador
    Actuador010V: () => ({ Seniales: { "SA": 1, }, Esquema: [esq.ActuadSA_1()], }),
    Actuador3Pun: () => ({ Seniales: { "SD": 2, }, Esquema: [esq.ActuadSD_2()], }),
    ActuadorTN0M: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.ActuadSD_1(),], }),
    ActuadorTN1M: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.ActuadSD_1(),], }),
    ActuadorTN2M: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.EntradED_1(), esq.ActuadSD_1(),], }),
    //motor
    MPyEstado: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.SalidaSD_1(),], }),
    MotorToNa: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.MotorED_1(), esq.MotorSD_1(),], }),
    MPEst010V: () => ({ Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1(), esq.SimpleSA_1(), esq.SalidaSD_1(),], }),
    Motor010V: () => ({ Seniales: { "ED": 1, "SA": 1, "SD": 1 }, Esquema: [esq.MotorED_1(), esq.SimpleSA_1(), esq.MotorSD_1(),], }),
    Motor3vel: () => ({ Seniales: { "SD": 3 }, Esquema: [esq.MotorSD_3(),], }),
}
const elem = {

    //sencillos
    PasivaEA: (Cantidad) => ({ Cantidad, Opciones: { "Externa": opt.SensorPasi(), }, }),
    SimpleEA: (Cantidad) => ({ Cantidad, Opciones: { "Externa": opt.SimpleEA(), }, }),
    SimpleED: (Cantidad) => ({ Cantidad, Opciones: { "Externa": opt.SimpleED(), }, }),
    SimpleSA: (Cantidad) => ({ Cantidad, Opciones: { "Externa": opt.SimpleSA(), }, }),
    SimpleSD: (Cantidad) => ({ Cantidad, Opciones: { "Externa": opt.SimpleSD(), }, }),

    //sensores 
    SensorAire: (Cantidad) => ({ Cantidad, Opciones: { "Temperatura": opt.SensorPasi(), "Temp + Hume": opt.SensorAct2(), "Temp + CO2": opt.SensorAct2(), "Temp Hum CO2": opt.SensorAct3(), }, }),
    SondaTermos: (Cantidad) => ({ Cantidad, Opciones: { "Temperatura": opt.SensorPasi(), "Termostato": opt.SensorDigi(), }, }),
    SensorPres: (Cantidad) => ({ Cantidad, Opciones: { "Presostato": opt.SensorDigi(), "Sonda": opt.SensorAct1(), }, }),
    SoloActiva: (Cantidad) => ({ Cantidad, Opciones: { "Sonda": opt.SensorAct1(), }, }),

    //valvulas
    ValvulaToNa: (Cantidad) => ({ Cantidad, Opciones: { "1 Micro": opt.ActuadorTN1M(), "2 Micros": opt.ActuadorTN2M(), "Sin Micros": opt.ActuadorTN0M(), }, }),
    ValvulaProp: (Cantidad) => ({ Cantidad, Opciones: { "0..10Vcc": opt.Actuador010V(), "3 Puntos": opt.Actuador3Pun(), }, }),
    ValvTNProp: (Cantidad) => ({ Cantidad, Opciones: { "Todo/Nada": opt.ActuadorTN1M(), "3 Puntos": opt.Actuador3Pun(), "0..10Vcc": opt.Actuador010V(), }, }),

    //organos de gobierno
    ExterModul: (Cantidad) => ({ Cantidad, Opciones: { "Simple": opt.MPyEstado(), "0..10Vcc": opt.MPEst010V(), }, }),
    MotorModul: (Cantidad) => ({ Cantidad, Opciones: { "Simple": opt.MotorToNa(), "0..10Vcc": opt.Motor010V(), }, }),
    MotorFC: (Cantidad) => ({ Cantidad, Opciones: { "0..10Vcc": opt.SimpleSA(), "1veloc": opt.SimpleSD(), "3veloc": opt.Motor3vel(), }, }),
    Recuperdor: (Cantidad) => ({ Cantidad, Opciones: { "Bypass": opt.SimpleSD(), "Simple": opt.MotorToNa(), "0..10Vcc": opt.Motor010V(), }, }),

    //productores
    ModulaCalde: (Cantidad) => ({ Cantidad, Opciones: { "0..10Vcc": opt.SimpleSA(), "3 Puntos": opt.Actuador3Pun(), "2ª llama": opt.SimpleSD(), }, }),
    MPyEstado: (Cantidad) => ({ Cantidad, Opciones: { "MPyEstado": opt.MPyEstado(), }, }),
    Demanda: (Cantidad) => ({ Cantidad, Opciones: { "0..10Vcc": opt.SimpleSA(), "Todo/Nada": opt.SimpleSD(), }, }),

}

const blocksData = () => ({
    "Condiciones Exteriores": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Exterior": elem.SensorAire(1),
        },
    },
    " ----- Producción -----": null,
    "Gestor de Cascada de Producción": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": elem.SondaTermos(1),
            "Bomba": elem.MotorModul(0),
            "Ventilacion Forzada": elem.MotorModul(1),
            "Electroválvula de Gas": elem.SimpleSD(1),
            "Cambio de regimen externo": elem.SimpleED(0),
            "Válvula Calor / Frío": elem.ValvulaToNa(0),
            "Control Presión": elem.SondaTermos(1),
        },
    },
    "Caldera": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": elem.SondaTermos(1),
            "Marcha-Paro": elem.SimpleSD(0),
            "Estado / Alarma": elem.SimpleED(1),
            "Modulación / Consigna": elem.ModulaCalde(1),
            "Bomba": elem.MotorModul(1),
            "Válvula Aislamiento / Retorno": elem.ValvTNProp(0),
            "Control Humos": elem.SondaTermos(0),
            "Control Presión": elem.SensorPres(0),
        },
    },
    "Aerotermia / Geotermia": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": elem.SondaTermos(1),
            "Marcha-Paro y alarma": elem.MPyEstado(1),
            "Modulación / Consigna": elem.SimpleSA(0),
            "Bomba": elem.MotorModul(1),
            "Cambio de regimen externo": elem.SimpleED(0),
            "Válvula Calor / Frío / ACS": elem.ValvulaToNa(0),
            "Control Presión": elem.SensorPres(0),
        },
    },
    "Solar": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Radiacion Solar": elem.SoloActiva(0),
            "Temperatura Paneles": elem.SondaTermos(1),
            "Temperatura Secundario": elem.SondaTermos(0),
            "Temperatura Depósito": elem.SondaTermos(1),
            "Bomba Primario": elem.MotorModul(1),
            "Bomba Secundario": elem.MotorModul(0),
            "Bomba Transvase": elem.MotorModul(0),
            "Aerotermo": elem.MotorModul(0),
            "Válvula Primario": elem.ValvTNProp(0),
            "Válvula Secundario": elem.ValvTNProp(0),
            "Control Presión": elem.SensorPres(0),
        },
    },
    " ----- Consumo -----": null,
    "Circuito Calefacción/Distribución": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temp Impulsion": elem.SondaTermos(1),
            "Sensor Ambiente": elem.SensorAire(0),
            "Presion Diferencial": elem.SoloActiva(0),
            "Bomba": elem.MotorModul(1),
            "Válvula control": elem.ValvTNProp(1),
            "Cambio de regimen externo": elem.SimpleED(0),
            "Válvula Calor / Frío": elem.ValvulaToNa(0),
            "Demanda a terceros": elem.Demanda(0),
        },
    },
    "ACS": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura Secundario": elem.SondaTermos(0),
            "Temperatura Depósito": elem.SondaTermos(1),
            "Temperatura Consumidores": elem.SondaTermos(1),
            "Bomba Primario": elem.MotorModul(1),
            "Bomba Secundario": elem.MotorModul(0),
            "Bomba Retorno": elem.MotorModul(1),
            "Válvula Primario": elem.ValvTNProp(0),
            "Válvula Consumidores": elem.ValvulaProp(1),
            "Bypass Válvula Consumidores": elem.ValvulaToNa(0),
            "Demanda a terceros": elem.Demanda(0),
        },
    },
    "Climatizador": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Sonda Ambiente / Retorno": elem.SensorAire(1),
            "Sonda Impulsión": elem.SensorAire(1),
            "Sonda Recuperación": elem.SensorAire(0),
            "Sonda toma aire del Exterior": elem.SensorAire(0),
            "Sonda salida aire al Exterior": elem.SensorAire(0),
            "Válvula Batería": elem.ValvTNProp(1),
            "Bomba Batería": elem.MotorModul(0),
            "Presostato filtro sucio": elem.SimpleED(0),
            "Presión Ventilador": elem.SoloActiva(0),
            "Ventilador": elem.MotorModul(1),
            "Humectador": elem.ExterModul(0),
            "Recuperador": elem.Recuperdor(0),
            "Compuertas": elem.ValvTNProp(0),
            "Cambio de regimen externo": elem.SimpleED(0),
            "Demanda a terceros": elem.Demanda(0),
        },
    },
    "Fan Coil": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Sonda Ambiente / Retorno": elem.SensorAire(1),
            "Temperatura Impulsión": elem.SondaTermos(0),
            "Válvula Batería": elem.ValvTNProp(1),
            "Presostato filtro sucio": elem.SimpleED(0),
            "Ventilador": elem.MotorFC(1),
        },
    },
});

// fs.writeFileSync("proyFull.json", JSON.stringify(blocksData(), null, 4));

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
