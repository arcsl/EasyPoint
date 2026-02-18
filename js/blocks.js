const signalTypes = ["EA", "ED", "SA", "SD"];
const signalTexts = ["Entradas Analógicas", "Entradas Digitales", "Salidas Analógicas", "Salidas Digitales"];
const partesNarrativa = ["Descripción", "Elementos", "Funcionamiento"];

// En el array estan las diferentes opciones de dibujar la señal en el esquema
// El nombre del bloque a llamar será el Tipo + el numero + opcion elejida: ej ED + 1 + "Contactor" = ED_1_Contactor
const esq = {

	// Vacio para añadir señales en listado de señales
	VacioEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Pasiva", "Activa", "Bus_LTE",], }),
	VacioED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Rele", "Contactor", "Termico", "Bus_LTE",], }),
	VacioSA_1: (Nombre = "") => ({ Nombre, Tipo: "SA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Actuador", "Bus_LTE",], }),
	VacioSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Rele", "Contactor", "Bus_LTE",], }),

	//EA
	PasivaEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Pasiva", "Activa"], }),
	SimpleEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	ActivaEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	ActivaEA_2: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 2, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	ActivaEA_3: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 3, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	//ED
	SimpleED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	EntradED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Rele",], }),
	MotorED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Rele", "Contactor", "Termico",], }),
	//SA
	SimpleSA_1: (Nombre = "") => ({ Nombre, Tipo: "SA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	ActuadSA_1: (Nombre = "") => ({ Nombre, Tipo: "SA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 1, Opciones: ["Externa", "Actuador",], }),
	//SD
	SimpleSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	SalidaSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 1, Opciones: ["Externa", "Rele",], }),
	MotorSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 1, Opciones: ["Externa", "Rele", "Contactor",], }),
	MotorSD_3: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 3, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Motor3V",], }),
	ActuadSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 3, Opciones: ["Externa", "Rele", "Simple", "Conmutada",], }),
	ActuadSD_2: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 2, Linea1: "", Linea2: "", tagNumber: "", Opcion: 1, Opciones: ["Externa", "Actuador",], }),
}

const opt = {

	// "Esquema" es un array de objetos y no un objeto con propiedades, por si se necesita duplicar el objeto, 
	// como por ejemplo en el actuador todo/nada con 2 micros, donde la entrada digital esta duplicada

	Vacio: (Nombre) => ({ Nombre, Seniales: {}, Esquema: [], }),

	//Simples
	SimpleEA: (Nombre) => ({ Nombre, Seniales: { "EA": 1, }, Esquema: [esq.SimpleEA_1(),], }),
	SimpleED: (Nombre) => ({ Nombre, Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1(),], }),
	SimpleSA: (Nombre) => ({ Nombre, Seniales: { "SA": 1, }, Esquema: [esq.SimpleSA_1(),], }),
	SimpleSD: (Nombre) => ({ Nombre, Seniales: { "SD": 1, }, Esquema: [esq.SimpleSD_1(),], }),
	//sensor
	SensorPasi: (Nombre) => ({ Nombre, Seniales: { "EA": 1, }, Esquema: [esq.PasivaEA_1(),], }),
	SensorAct1: (Nombre) => ({ Nombre, Seniales: { "EA": 1, }, Esquema: [esq.ActivaEA_1(),], }),
	SensorAct2: (Nombre) => ({ Nombre, Seniales: { "EA": 2, }, Esquema: [esq.ActivaEA_2(),], }),
	SensorAct3: (Nombre) => ({ Nombre, Seniales: { "EA": 3, }, Esquema: [esq.ActivaEA_3(),], }),
	SensorDigi: (Nombre) => ({ Nombre, Seniales: { "ED": 1, }, Esquema: [esq.EntradED_1(),], }),
	//Alarma
	AlamEstTerceros: (Nombre) => ({ Nombre, Seniales: { "ED": 1, }, Esquema: [esq.EntradED_1(),], }),
	//Actuador
	Actuador010V: (Nombre) => ({ Nombre, Seniales: { "SA": 1, }, Esquema: [esq.ActuadSA_1(),], }),
	Actuador3Pun: (Nombre) => ({ Nombre, Seniales: { "SD": 2, }, Esquema: [esq.ActuadSD_2(),], }),
	ActuadorTN0M: (Nombre) => ({ Nombre, Seniales: { "SD": 1, }, Esquema: [esq.ActuadSD_1(),], }),
	ActuadorTN1M: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1("FC Abierto"), esq.ActuadSD_1(),], }),
	ActuadorTN2M: (Nombre) => ({ Nombre, Seniales: { "ED": 2, "SD": 1, }, Esquema: [esq.EntradED_1("FC Abierto"), esq.EntradED_1("FC Cerrado"), esq.ActuadSD_1(),], }),

	// elemento
	SoloMP: (Nombre) => ({ Nombre, Seniales: { "SD": 1, }, Esquema: [esq.SalidaSD_1(),], }),

	//motor
	MPyEstado: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1("Estado"), esq.SalidaSD_1("M/P"),], }),
	MotorToNa: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.MotorED_1("Estado"), esq.MotorSD_1("M/P"),], }),
	MPEst010V: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SA": 1, "SD": 1, }, Esquema: [esq.EntradED_1("Estado"), esq.SimpleSA_1("Modulación"), esq.SalidaSD_1("M/P"),], }),
	Motor010V: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SA": 1, "SD": 1, }, Esquema: [esq.MotorED_1("Estado"), esq.SimpleSA_1("Modulación"), esq.MotorSD_1("M/P"),], }),
	Motor3vel: (Nombre) => ({ Nombre, Seniales: { "SD": 3, }, Esquema: [esq.MotorSD_3(),], }),
}

const elem = {

	Vacio: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Vacio("Vacio"),], }),

	//sencillos
	PasivaEA: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorPasi("Externa"),], }),
	SimpleEA: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleEA("Externa"),], }),
	SimpleED: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleED("Externa"),], }),
	SimpleSA: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("Externa"),], }),
	SimpleSD: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSD("Externa"),], }),

	//sensores 
	SensorAire: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorPasi("Temperatura"), opt.SensorAct2("Temp y Hum"), opt.SensorAct2("Temp y CO2"), opt.SensorAct3("Temp, Hum y CO2"),], }),
	SoloSondaTemp: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorPasi("Temperatura"),], }),
	SondaTermos: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorPasi("Sonda"), opt.SensorDigi("Termostato"),], }),
	SensorPres: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorDigi("Presostato"), opt.SensorAct1("Sonda"),], }),
	SoloActiva: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorAct1("Sonda"),], }),

	//Alarma
	AlamEstTerceros: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.AlamEstTerceros("Externa"),], }),

	// demandas
	DemandaIN: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleED("Todo/Nada"), opt.SimpleEA("0..10Vcc"),], }),
	DemandaOUT: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSD("Todo/Nada"), opt.SimpleSA("0..10Vcc"),], }),

	//valvulas
	ValvulaToNa: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.ActuadorTN1M("1 Micro"), opt.ActuadorTN2M("2 Micros"), opt.ActuadorTN0M("Sin Micros"),], }),
	ValvulaProp: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"),], }),
	ValvFanCoil: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSD("Todo/Nada"), opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"), ], }),
	ValvTNProp: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.ActuadorTN1M("Todo/Nada"), opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"), ], }),
	ValvPropTN: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"), opt.ActuadorTN1M("Todo/Nada"),], }),
	ValvCalef: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Actuador3Pun("3 Puntos"), opt.Actuador010V("0..10Vcc"), opt.ActuadorTN1M("Todo/Nada"),], }),

	//organos de gobierno
	ExterModul: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MPyEstado("M/P y Estado"), opt.MPEst010V("0..10Vcc"),], }),
	MotorModul: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MotorToNa("M/P y Estado"), opt.Motor010V("0..10Vcc"),], }),
	MotorFC: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("1 Velocidad"), opt.Motor3vel("3 Velocidades"),], }),
	Recuperdor: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSD("Bypass"), opt.MotorToNa("M/P y Estado"), opt.Motor010V("0..10Vcc"),], }),

	//productores
	TodoNada: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SoloMP("M/P"),], }),
	ModulaCons: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"),], }),
	ModulaAerot: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0-10 Consigna"), opt.SimpleSD("2 consignas"),], }),
	ModulaCalde: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0-10 Consigna"), opt.SimpleSA("0-10 Potencia"), opt.Actuador3Pun("3 Puntos"), opt.SimpleSD("2ª llama"),], }),
	MPyEstado: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MPyEstado("M/P y Estado"),], }),

}

function blocks() {

	// Separadores identificados con "Seniales: null"
	return [
		{
			"Nombre": "Exterior",
			"Elementos": [
				elem.SensorAire("Temperatura", 1, "CondExte"),
			],
		},
		{
			"Nombre": " ----- Producción -----",
			"Elementos": null,
		},
		{
			"Nombre": "Cascada Producción",
			"Elementos": [
				elem.SoloSondaTemp("Temperatura", 1, "GestTemp"),
				elem.MotorModul("Bomba", 0, "GestBomb"),
				elem.ModulaCons("Consigna", 0, "GestModu"),
				elem.MotorModul("Ventilacion Forzada", 1, "GestVent"),
				elem.SimpleSD("Electroválvula de Gas", 1, "GestEVGa"),
				elem.SimpleED("Cambio de regimen externo", 0, "GestInVe"),
				elem.ValvulaToNa("Válvulas Calor / Frío", 0, "GestVaCF"),
				elem.SensorPres("Presión", 1, "GestPres"),
			],
		},
		{
			"Nombre": "Caldera",
			"Elementos": [
				elem.SoloSondaTemp("Temperatura", 1, "CaldTemp"),
				elem.TodoNada("Marcha-Paro", 0, "CaldMaPa"),
				elem.AlamEstTerceros("Estado / Alarma", 1, "CaldEsAl"),
				elem.ModulaCalde("Modulación / Consigna", 1, "CaldModu"),
				elem.MotorModul("Bomba", 1, "CaldBomb"),
				elem.ValvTNProp("Válvula Retorno", 0, "CaldValv"),
				elem.SondaTermos("Temperatura Humos", 0, "CaldHumo"),
				elem.SensorPres("Presión", 0, "CaldPres"),
			],
		},
		{
			"Nombre": "Aerotermia",
			"Elementos": [
				elem.SoloSondaTemp("Temperatura", 1, "AeroTemp"),
				elem.TodoNada("Marcha-Paro", 1, "AeroMaPa"),
				elem.AlamEstTerceros("Estado / Alarma", 1, "AeroAlar"),
				elem.ModulaAerot("Modulación / Consigna", 0, "AeroModu"),
				elem.MotorModul("Bomba", 0, "AeroBomb"),
				elem.TodoNada("Cambio de regimen", 1, "AeroCaFr"),
				elem.ValvulaToNa("Válvula Calor / Frío / ACS", 0, "AeroVaCF"),
				elem.SensorPres("Presión", 0, "AeroPres"),
			],
		},
		{
			"Nombre": "Solar",
			"Elementos": [
				elem.SoloActiva("Radiacion Solar", 0),
				elem.SoloSondaTemp("Temperatura Paneles", 1),
				elem.SoloSondaTemp("Temperatura Secundario", 0),
				elem.SoloSondaTemp("Temperatura Depósito", 1),
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
				elem.SoloSondaTemp("Temperatura impulsion", 1, "CircTemp"),
				elem.SensorAire("Sensor Ambiente", 0, "CircAmbi"),
				elem.ValvCalef("Válvula", 1, "CircValv"),
				elem.MotorModul("Bomba", 1, "CircBomb"),
				elem.SoloActiva("Presion Diferencial", 0, "CircDife"),
				elem.ValvulaProp("Válvula bypass", 0, "CircVaBy"),
				elem.SimpleED("Cambio de regimen externo", 0, "CircInVe"),
				elem.ValvulaToNa("Válvula calor / frío", 0, "CircVaCF"),
				elem.DemandaIN("Demanda de terceros", 0, "CircExMP"),
				elem.DemandaOUT("Demanda a terceros", 0, "CircDema"),
			],
		},
		{
			"Nombre": "ACS",
			"Elementos": [
				elem.SoloSondaTemp("Temperatura primario", 0, "ACSTePr"),
				elem.SoloSondaTemp("Temperatura secundario", 0, "ACSTeSe"),
				elem.SoloSondaTemp("Temperatura depósito", 1, "ACSTeDe"),
				elem.SoloSondaTemp("Temperatura ida consumo", 1, "ACSTeIC"),
				elem.SoloSondaTemp("Temperatura retorno consumo", 1, "ACSTeRC"),
				elem.MotorModul("Bomba Primario", 1, "ACSBoPr"),
				elem.MotorModul("Bomba Secundario", 0, "ACSBoSe"),
				elem.MotorModul("Bomba Retorno", 1, "ACSBoRe"),
				elem.ValvTNProp("Válvula Primario", 0, "ACSVaPr"),
				elem.ValvulaProp("Válvula Consumidores", 1, "ACSVaCo"),
				elem.ValvulaToNa("Bypass Válvula Consumidores", 0, "ACSVaBy"),
				elem.ValvulaToNa("Válvula Retorno Consumidores", 0, "ACSVaRe"),
			],
		},
		{
			"Nombre": "Climatizador",
			"Elementos": [
				elem.SensorAire("Sonda Ambiente / Retorno", 1, "CliAmb"),
				elem.SensorAire("Sonda Impulsión", 1, "CliImp"),
				elem.SensorAire("Sonda Recuperación", 0, "CliReco"),
				elem.SensorAire("Sonda toma aire del Exterior", 0, "CliExt"),
				elem.SensorAire("Sonda salida aire al Exterior", 0, "CliSal"),
				elem.ValvPropTN("Válvula Batería", 1, "CliVaBat"),
				elem.MotorModul("Bomba Batería", 0, "CliBoBat"),
				elem.SimpleED("Presostato filtro sucio", 0, "CliFil"),
				elem.SoloActiva("Presión Ventilador", 0, "CliPres"),
				elem.MotorModul("Ventilador", 1, "CliVent"),
				elem.ExterModul("Humectador", 0, "CliHum"),
				elem.Recuperdor("Recuperador", 0, "CliRecup"),
				elem.ValvPropTN("Compuertas", 0, "CliComp"),
				elem.SimpleED("Cambio de regimen externo", 0, "CliInVe"),
			],
		},
		{
			"Nombre": "Fan Coil",
			"Elementos": [
				elem.SensorAire("Sonda ambiente / retorno", 1, "FCAm"),
				elem.SoloSondaTemp("Temperatura impulsión", 0, "FCImp"),
				elem.SimpleED("Presostato filtro sucio", 0, "FCFil"),
				elem.SimpleED("Contacto tarjetero / ventana", 0, "FCCont"),
				elem.ValvFanCoil("Válvula batería", 1, "FCVaBat"),
				elem.ValvTNProp("Compuerta renovación aire", 0, "FCComp"),				
				elem.MotorFC("Ventilador", 1, "FCVent"),
				elem.SimpleED("Cambio de regimen externo", 0, "FCInVe"),
			],
		},
	];
}

/*
	Herramientas para narrativa

	Logicas:
	Nombre          |            Sintaxis           | Descripción                                  
	----------------|-------------------------------|----------------------------------------------------------------------------------
	Ref activa      |         {{ ... }}{Ref}        | Se muestra el texto si la referencia esta checked
	Opcion elegida  |   {{ ... }}{Ref.is('..A..')}  | Se muestra el texto si la opcion elegida de la referencia es la A
	Cantidad        |    {{ ... }}{Ref.qty('>2')}   | Se muestra el texto si la cantidad de la referencia cumple la condicion expresada (en este caso ser mayor que 2) Se puede usar >, >=, <, <= y ==
	OR              |       {{ ... }}{Ref|Ref}      | Se muestra el texto si se cumple una de las dos Ref, que puede ser cualquiera de las 3 primeras de esta tabla de arriba
	AND             |       {{ ... }}{Ref&Ref}      | Se muestra el texto si se cumplen las dos Ref, que puede ser cualquiera de las 3 primeras de esta tabla de arriba
	NOT             |         {{ ... }}{!Ref}       | Se muestra el texto si no se cumple la Ref, que puede ser cualquiera de las 3 primeras de esta tabla de arriba (En este caso se muestra el texto si la referencia NO esta checked)

	Estilisticas:
	Nombre          |            Sintaxis           | Descripción                                  
	----------------|-------------------------------|----------------------------------------------------------------------------------
	multicheck      |  < ..A.. | +..B.. | +..C.. >  | Muestra varias opciones que el usuario puede marcar simultaneamente. Las que empiezan por "+" aparecen seleccionadas por defecto (en este caso la B y la C)
	selector        |   [ ..A.. | ..B.. | ..C.. ]   | Muestra un selector para que el usuario elija una sola opcion
	singular/plural |      [ ..A../..B..]{Ref}      | Muestra el texto A si la cantidad de la referencia es 1 o el texto B si es mayor que 1
	texto usuario   |     [{NombreUsuario}]{Ref}    | Muestra el texto que el usuario haya introducido para esa referencia
	cantidad        |        [{Cantidad}]{Ref}      | Muestra la cantidad numerica de la referencia
	opcion elegida  |         [{Opcion}]{Ref}       | Muestra el texto de la opcion elegida de la referencia
	

	Referenciales:
	Nombre          |            Sintaxis           | Descripción                                  
	----------------|-------------------------------|----------------------------------------------------------------------------------
	Ref al bloque   |          ...{MainBloc}        | Realiza la accion que sea con respecto al bloque actual. (nombre del bloque o si hay mas de 1 o lo que corresponda)

*/


const Narrativa = {
	"Exterior": {
		"Descripción": [
			"{{La medicion de condiciones exteriores permite compensar la respuesta térmica de la instalación, mejorando el confort y la eficiencia energética.}}{CondExte}"
		],
		"Elementos": [
			"{{Sensor de [{Opcion}]{CondExte} [{NombreUsuario}]{MainBloc}.}}{CondExte}"
		],
		"Funcionamiento": [
			"{{La señal proporcionada por el sensor se utilizará para: <+Ajustar la consigna de impulsión de los circuitos de distribucion.|Cambiar el regimen de trabajo entre invierno y verano.|Optimizar estrategias de ventilación para enfriamiento y calentamiento gratuitos.|Optimizar estrategias de ventilación por calidad de aire exterior.>}}{CondExte}"
		],
	},
	"Cascada Producción": {
		"Descripción": [
			"El gestor de cascada de producción, coordina el funcionamiento de un conjunto de productores térmicos, estableciendo una estrategia común de arranque, paro y modulación.",
			"Su función es adaptar la generación térmica a la demanda real del sistema, mejorando el rendimiento energético y garantizando un funcionamiento estable y seguro.",
			"El control centralizado de producción permite una gestión coherente de los distintos equipos, evitando maniobras innecesarias y asegurando la correcta operación del conjunto."
		],
		"Elementos": [
			"{{Temperatura[/s]{GestTemp} de [impulsión/impulsión y retorno]{GestTemp} general[/es]{GestTemp}.}}{GestTemp}",
			"{{Bomba[/s]{GestBomb} general[/es]{GestBomb} de circulación.}}{GestBomb}",
			"{{Sistema de ventilación forzada.}}{GestVent}",
			"{{Electroválvula de gas.}}{GestEVGa}",
			"{{Válvulas de conmutación calor/frío.}}{GestVaCF}",
			"{{Sonda de presión estática del circuito hidráulico.}}{GestPres.is(\"Sonda\")}",
			"{{Presostato de seguridad por [mínima/máxima] en el circuito hidráulico.}}{GestPres.is(\"Presostato\")}",
		],
		"Funcionamiento": [
			"El gestor de producción recibe la demanda térmica del sistema y determina el número de productores necesarios en cada momento, activando o deteniendo los equipos de forma coordinada.",
			"{{El gestor de cascada compara el valor medido de temperatura de impulsión general con la demanda mas exigente para decidir la secuencia de arranque y parada de los productores.}}{GestTemp&!GestModu}",
			"{{El gestor de cascada compara el valor medido de temperatura de impulsión general con la demanda mas exigente para decidir la secuencia de arranque y parada de los productores.}}{GestTemp&!GestModu}",
			"{{Con la demanda mas exigente se genera una consigna que se transmitirá, mediante una salida analógica, a un sistema externo de gestión de cascada.}}{GestModu}",
			"{{La[/s]{GestBomb} bomba[/s]{GestBomb} principal[/es]{GestBomb} de impulsión se pondrá[/n]{GestBomb} en marcha al habilitarse la producción y se mantendrá[/n]{GestBomb} operativa[/s]{GestBomb} mientras existan equipos de generación activos, mas un retardo adicional a la parada.}}{GestBomb}",
			"{{La electroválvula de gas permanecerá habilitada únicamente durante el funcionamiento de los equipos que lo requieran. Se activará unos segundos antes de que lo haga el primer productor y se desactivara unos segundos después de que se hayan desactivado todos los productores.}}{GestEVGa}",
			"{{La ventilación forzada se activará unos minutos antes del encendido de los productores y se mantendrá encendida hasta unos minutos despues de que se hayan desactivado todos los productores, según normativa.}}{GestVent}",
			"{{La conmutacion del sistema entre calefacción y refrigeración, se realizará mediante orden externa, adaptando la lógica de control de la producción}}{GestInVe}{{ y la[/s]{GestVaCF} posición[/es]{GestVaCF} de la[/s]{GestVaCF} válvula[/s]{GestVaCF} de conmutación calor/frío}}{GestInVe&GestVaCF}{{.}}{GestInVe}",
			"{{La[/s]{GestVaCF} válvula[/s]{GestVaCF} de conmutación calor/frío, ajustará[/n]{GestVaCF} su posición en función del régimen activo del sistema, asegurando la correcta dirección del flujo térmico.}}{GestVaCF}",
			"{{En caso de detectar una caida de presión en el circuito hidráulico, se inhibe el funcionamiento de los elementos asociados hidraulicamente.}}{GestPres}"
		],
	},
	"Caldera": {
		"Descripción": [
			"La caldera constituye uno de los elementos principales de producción térmica del sistema, aportando la energía necesaria para atender las demandas de los distintos circuitos consumidores.",
			"Su funcionamiento se integra dentro de la estrategia general de generación, adaptándose a las condiciones de carga y a las consignas establecidas por el sistema de control."
		],
		"Elementos": [
			"{{Temperatura[/s]{CaldTemp} de [impulsión/impulsión y retorno]{CaldTemp}.}}{CaldTemp}",
			"{{[{Opcion}]{CaldHumo} de temperatura de humos.}}{CaldHumo}",
			"{{Sonda de temperatura de humos.}}{CaldHumo.is(\"Sonda\")}",
			"{{Pirostato de limitacion máxima de temperatura de humos.}}{CaldHumo.is(\"Termostato\")}",			
			"{{Sonda de presión estática del circuito hidráulico.}}{CaldPres.is(\"Sonda\")}",
			"{{Presostato de seguridad por [mínima/máxima] en el circuito hidráulico.}}{CaldPres.is(\"Presostato\")}",
			"{{Bomba[/s]{CaldBomb} de recirculacion en caldera.}}{CaldBomb}",
			"{{Válvula de aislamiento.}}{CaldValv.is(\"Todo/Nada\")}",
			"{{Válvula modulante [{Opcion}]{CaldValv} en retorno.}}{!CaldValv.is(\"Todo/Nada\")}",
		],
		"Funcionamiento": [
			"El arranque de la caldera se produce [por demanda de la instalación|por horario|por control externo].",
			"{{Antes del arranque de la caldera se verifica el correcto funcionamiento de la[/s]{CaldBomb} bomba[/s]{CaldBomb} asociada[/s]{CaldBomb}, para garantizar que existe circulación de fluido.}}{CaldBomb}",
			"{{El sistema gestiona el funcionamiento de las bombas asociadas de forma alternada, realizando la rotación de la bomba en funcionamiento en función de las horas de servicio o en caso de fallo de la otra bomba, de modo que se mantenga la disponibilidad de la caldera.}}{CaldBomb.qty(\">1\")}",
			"{{El bombeo se mantiene encendido una cantidad de tiempo configurable tras el apagado de la caldera para aprovechar el calor remanente y los disparos por inercia térmica.}}{CaldBomb}",
			"{{Se supervisa continuamente la temperatura de impulsión de caldera, para verificar el correcto funcionamiento.}}{CaldTemp}",
			"{{Se supervisa continuamente la temperatura de retorno de caldera, y en caso de temperaturas de retorno excesivamente bajas, se regula la válvula de retorno para evitar la condensación de los humos.}}{CaldValv.is(\"0..10Vcc\")|CaldValv.is(\"3 Puntos\")}",
			"{{La válvula de aislamiento se mantiene cerrada cuando la caldera se encuentre parada o en condición de fallo y se abre unicamente cuando es necerario arrancar la caldera. Asi se evitan recirculaciones no deseadas a traves de la caldera cuando esta está apagada.}}{CaldValv.is(\"Todo/Nada\")}",
			"{{Para permitir el arranque de la caldera se supervisará el estado del final de carrera de válvula abierta, para garantizar el paso de fluido.}}{CaldValv.is(\"Todo/Nada\")}",
			"{{Por seguridad, en el caso de que la temperatura de caldera alcance un límite (configurable), ésta se deshabilita manteniendo las condiciones de circulacion de fluido y se habilita nuevamente cuando la temperatura descienda por debajo de dicho límite menos una histéresis (configurable). Por lo tanto la consigna maxima de funcionamiento de la caldera se establece siempre por debajo de este umbral de seguridad.}}{CaldTemp}",
			"{{El sistema envia a la caldera una señal analógica de consigna de temperatura, siendo el control interno del equipo el encargado de modular la potencia necesaria para alcanzar dicho valor.}}{CaldModu.is(\"0-10 Consigna\")}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante modulación 0..10Vcc, incrementando o reduciendo el aporte térmico para mantener la temperatura de caldera en torno al valor de consigna.}}{CaldModu.is(\"0-10 Potencia\")}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante modulación a tres puntos, incrementando o reduciendo el aporte térmico para mantener la temperatura de caldera en torno al valor de consigna.}}{CaldModu.is(\"3 Puntos\")}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante la activación o no de una segunda etapa para mantener la temperatura de caldera alrededor del valor de consigna establecido.}}{CaldModu.is(\"2ª llama\")}",
			"{{La temperatura de  humos se supervisa durante el funcionamiento de la caldera para emitir una larma en caso de superar un valor umbral (configurable) y detener el funcionamiento de la caldera.}}{CaldHumo}",
			"{{En caso de detectar una caida de presión en el circuito hidráulico, se inhibe el funcionamiento de la caldera}}{CaldPres}{{ y la[/s]{CaldBomb} bomba[/s]{CaldBomb}}}{CaldBomb}{{.}}{CaldPres}"
		],
	},
	"Aerotermia": {
		"Descripción": [
			"La[/s]{MainBloc} unidad[/es]{MainBloc} de aerotermia [es/son]{MainBloc} el elemento principal de producción térmica del sistema, intercambiando energía térmica con el aire exterior para aportar calor o frío a los distintos consumidores.",
		],
		"Elementos": [
			"{{Temperatura[/s]{AeroTemp} de impulsión[/ y retorno]{AeroTemp}[/de cada aerotermia]{MainBloc}.}}{AeroTemp}",
			"{{Sonda de presión estática del circuito hidráulico.}}{AeroPres.is(\"Sonda\")}",
			"{{Presostato de seguridad por [mínima/máxima] en el circuito hidráulico.}}{AeroPres.is(\"Presostato\")}",
			"{{Bomba[/s]{AeroBomb} de circulación.}}{AeroBomb}",
			"{{Válvula motorizada para conmutación entre modos de trabajo.}}{AeroVaCF}",
		],
		"Funcionamiento": [

			// MP, alarma/estado y consigna
			"{{El arranque de la [{NombreUsuario}]{MainBloc} se produce [por demanda de la instalación|por horario|por control externo].}}{AeroMaPa}",
			"{{Se supervisará el [{NombreUsuario}]{AeroAlar} del equipo para deshabilitarlo en caso de anomalía.}}{AeroAlar}",
			"{{El sistema envia a la [{NombreUsuario}]{MainBloc} una señal analógica de consigna, siendo el control interno del equipo el encargado de modular la potencia necesaria para alcanzar dicho valor.}}{AeroModu.is('0-10 Consigna')}",
			"{{El sistema envia a la [{NombreUsuario}]{MainBloc} una señal digital para el cambio de consigna, siendo el control interno del equipo el encargado de modular la potencia necesaria para alcanzar los valores previamente definidos en dicho control.}}{AeroModu.is('2 consignas')}",

			// Bombas
			"{{Antes del arranque se verifica el correcto funcionamiento de la[/s]{AeroBomb} bomba[/s]{AeroBomb} asociada[/s]{AeroBomb}, para garantizar que existe circulación de fluido.}}{AeroBomb}",
			"{{El sistema gestiona el funcionamiento de las bombas asociadas de forma alternada, realizando la rotación de la bomba en funcionamiento en función de las horas de servicio o en caso de fallo de la otra bomba, de modo que se mantenga la disponibilidad de la aerotermia.}}{AeroBomb.qty('>1')}",
			"{{El bombeo se mantiene encendido una cantidad de tiempo configurable tras el apagado de la aerotermia para aprovechar la energía térmica remanente.}}{AeroBomb}",

			// Camio de modo
			"{{La señal externa [{NombreUsuario}]{AeroCaFr} provoca el cambio de modo de funcionamiento conmutando los elementos automáticaticamente.}}{AeroCaFr}",
			"{{Al cambiar de modo de funcionamiento de la [{NombreUsuario}]{MainBloc}, tambien cambia la posición de la [{NombreUsuario}]{AeroVaCF}.}}{AeroVaCF}",

			// Generales
			"{{Se supervisa continuamente la temperatura de impulsión [a modo informativo|y se genera una alarma en caso de desviacion prolongada].}}{AeroTemp}",
			"{{En caso de detectar una caida de presión en el circuito hidráulico, se inhibe el funcionamiento de la caldera}}{AeroPres}{{ y la[/s]{AeroBomb} bomba[/s]{AeroBomb}}}{AeroBomb}{{.}}{AeroPres}"

		]
	},
	"Solar": {
		"Descripción": [
			"El sistema solar térmico tiene como finalidad el aprovechamiento de la energía solar para la producción o apoyo de energía térmica en la instalación.",
			"La instalación se compone de un circuito primario de captación y, opcionalmente, de circuitos secundarios de acumulación o transferencia, integrados con el resto de sistemas térmicos."
		],
		"Elementos": [
			"{{Sonda de radiación solar.}}{SolRad}",
			"{{Sonda de temperatura en los paneles solares.}}{SolTePa}",
			"{{Sonda de temperatura en el circuito secundario.}}{SolTeSe}",
			"{{Sonda de temperatura en el depósito solar.}}{SolTeDe}",
			"{{Bomba de circulación del circuito primario solar.}}{SolBoPr}",
			"{{Bomba de circulación del circuito secundario solar.}}{SolBoSe}",
			"{{Bomba de transvase entre depositos.}}{SolBoTr}",
			"{{Aerotermo de disipación de excedentes térmicos.}}{SolAero}",
			"{{Válvula de control del circuito primario.}}{SolVaPr}",
			"{{Válvula de control del circuito secundario.}}{SolVaSe}",
			"{{Sonda de presión estática del circuito hidráulico.}}{SolPres.is(\"Sonda\")}",
			"{{Presostato de seguridad por [mínima/máxima] en el circuito hidráulico.}}{SolPres.is(\"Presostato\")}",
		],
		"Funcionamiento": [
			"{{}}{SolRad}",
			"{{}}{SolTePa}",
			"{{}}{SolTeDe}",
			"{{}}{SolBoPr}",
			"{{}}{SolBoSe}",
			"{{}}{SolBoTr}",
			"{{}}{SolAero}",
			"{{}}{SolVaPr}",
			"{{}}{SolVaSe}",
			"{{}}{SolPres}"
		]
	},
	"Circuito Calefacción/Distribución": {

		"Descripción": [
			"El [{NombreUsuario}]{MainBloc} se encarga de distribuir la energía térmica hasta las zonas de consumo.",
			"Su regulación permite mantener la temperatura del fluido circulado en el valor de consigna establecido, optimizando el confort y la eficiencia energética.",
		],

		"Elementos": [

			"{{Sonda[/s]{CircTemp} de temperatura de impulsión[/ y retorno]{CircTemp} del circuito.}}{CircTemp}",
			"{{Sonda de ambiente para supervisión o limitación de la temperatura interior.}}{CircAmbi}",
			"{{Bomba[/s]{CircBomb} para la circulación del fluido.}}{CircBomb}",
			"{{Sensor de presión diferencial}}{CircDife}{{ para regulación del bombeo}}{CircBomb}{{.}}{CircDife}",
			"{{Válvula de bypass entre ida y retorno.}}{CircVaBy}",
			"{{Válvula de corte para permitir o no la circulacion de fluido.}}{CircValv.is(\"Todo/Nada\")}",
			"{{Válvula de control para la regulación de la temperatura.}}{CircValv.is(\"0..10Vcc\")|CircValv.is(\"3 Puntos\")}",
			"{{Válvula de cambio de régimen calor / frío.}}{CircVaCF}"
		],

		"Funcionamiento": [

			// MP	
			"{{El [{NombreUsuario}]{MainBloc} se activa por señal de demanda externa.}}{CircExMP.is(\"Todo/Nada\")}",
			"{{El [{NombreUsuario}]{MainBloc} se activa cuando la señal de demanda externa interpretada en ºC [sea superior a un valor configurable|sea superior o inferior a un valor configurable en modo calor o frio respectivamente].}}{CircExMP.is(\"0..10Vcc\")}",
			"{{El [{NombreUsuario}]{MainBloc} se activa [por horario y condiciones exteriores|por horario|por demanda de las zonas].}}{!CircExMP}",

			// Temperatura, consigna, valvula
			"La consigna de trabajo [se calcula por curva de compensación por temperatura exterior|se establece según la máxima demanda de consumidores|se preconfigura a punto fijo].",
			"En funcion a la consigna establecida, se añade un diferencial configurable para emitir una demanda hacia los productores térmicos.",
			"{{Se supervisa la temperatura de impulsión para verificar que sea acorde a la consigna establecida.}}{CircTemp}",
			"{{La válvula de control regulará la temperatura de impulsión del circuito de forma proporcional para adecuarse a la consigna establecida.}}{CircValv.is(\"0..10Vcc\")|CircValv.is(\"3 Puntos\")}",
			"{{La válvula todo/nada, abre para permitir el paso de fluido cuando se active el circuito.}}{CircValv.is(\"Todo/Nada\")}",
			"{{La sonda de temperatura ambiente, se utiliza para }}{CircAmbi}{{limitar la temperatura de impulsión del circuito}}{CircValv.is(\"0..10Vcc\")|CircValv.is(\"3 Puntos\")&CircAmbi}{{cerrar la válvula todo/nada}}{CircValv.is(\"Todo/Nada\")&CircAmbi}{{parar el circuito}}{!CircValv&CircAmbi}{{ para evitar <+sobrecalentamiento|sobreenfriamiento> del ambiente.}}{CircAmbi}",
			"{{El sensor de presión diferencial se usa solamente como lectura.}}{!CircBomb|CircBomb.is(\"M/P y Estado\")&!CircVaBy&CircDife}",
			"{{El sensor de presión diferencial se usa para modular la válvula de bypass y mantener una presion diferencial fija configurable.}}{CircVaBy&CircDife}",

			// Bombas
			"{{Durante el funcionamiento se verifica el correcto funcionamiento de la[/s]{CircBomb} bomba[/s]{CircBomb}, para garantizar que existe circulación de fluido.}}{CircBomb}",
			"{{El sistema gestiona el funcionamiento de las bombas de forma alterna, realizando la rotación de la bomba en funcionamiento en función de las horas de servicio o en caso de fallo de la otra bomba, de modo que se mantenga la disponibilidad del circuito.}}{CircBomb.qty('>1')}",
			"{{El bombeo se modula para mantener una lectura de presion diferencial fija configurable, para compensar variaciones de carga hidráulica, garantizando el caudal necesario en cada momento.}}{CircDife&CircBomb.is(\"0..10Vcc\")}",
			"{{El bombeo se modula para mantener un salto termico constante configurable, para compensar variaciones de carga hidráulica, garantizando el caudal necesario en cada momento.}}{!CircDife&CircBomb.is(\"0..10Vcc\")&CircTemp.qty(\">1\")}",
			"{{El bombeo se modula a una velocidad fija configurable para mantener el caudal nominal de diseño del circuito.}}{!CircDife&CircBomb.is(\"0..10Vcc\")&!CircTemp.qty(\">1\")}",
			"{{El bombeo se mantiene encendido una cantidad de tiempo configurable tras el apagado del circuito para aprovechar la energía térmica remanente.}}{CircBomb}",

			// calor frio
			"{{En en modo refrigeración, con la lectura de temperatura y humedad ambiente se hace el cálculo de punto de rocio.}}{CircAmbi.is(\"Temp y Hum\")|CircAmbi.is(\"Temp, Hum y CO2\")}",
			"{{Con ese cálculo de temperatura mas un diferencial se establece el limite mínimo de temperatura de impulsión para evitar el riesgo de condensación.}}{CircAmbi.is(\"Temp y Hum\")|CircAmbi.is(\"Temp, Hum y CO2\")&!CircValv.is(\"Todo/Nada\")}",
			"{{Si la temperatura de impulsión alcanza ese cálculo de temperatura, se cierra la la válvula todo/nada para evitar el riesgo de condensación.}}{CircAmbi.is(\"Temp y Hum\")|CircAmbi.is(\"Temp, Hum y CO2\")&CircValv.is(\"Todo/Nada\")}",
			"{{La[/s]{CircVaCF} válvula[/s]{CircVaCF} de cambio de régimen, seleccionará[/n]{CircVaCF} automáticamente el circuito correspondiente en función del régimen activo del sistema.}}{CircVaCF}",

			// demanda a terceros			
			"{{Una vez el circuito esta en marcha, la señal de demanda hacia terceros, se modula conforme a la consigna establecida mas un direfencial configurable, para solicitar el arranque de la producción térmica.}}{CircDema.is(\"0..10Vcc\")}",
			"{{Una vez el circuito esta en marcha, se activa la señal de demanda hacia terceros para solicitar el arranque de la producción térmica.}}{CircDema.is(\"Todo/Nada\")}",

		],
	},
	"ACS": {
		"Descripción": [
			"El sistema de Agua Caliente Sanitaria (ACS) es el encargado de la producción, acumulación y distribución de agua caliente destinada al consumo.",
			"Su diseño garantiza la disponibilidad del servicio, manteniendo las condiciones de temperatura necesarias para el confort de los usuarios y el cumplimiento de la normativa vigente en materia de higiene y seguridad sanitaria."
		],
		"Elementos": [
			"{{Sonda de temperatura en el primario de producción de ACS.}}{ACSTePr}",
			"{{Sonda de temperatura en el secundario del intercambiador de ACS.}}{ACSTeSe}",
			"{{Sonda[/s]{ACSTeDe} de temperatura }}{ACSTeDe}{{[superior e inferior del depósito acumulador |en depósito caliente y frío ]}}{ACSTeDe.qty(\">1\")}{{en el depósito acumulador}}{ACSTeDe.qty(\"==1\")}{{.}}{ACSTeDe}",
			"{{Sonda de temperatura en la impulsión hacia los consumidores.}}{ACSTeIC}",
			"{{Sonda de temperatura en el retorno de consumo.}}{ACSTeRC}",
			"{{Bomba[/s]{ACSBoRe} de primario de ACS.}}{ACSBoPr}",
			"{{Bomba[/s]{ACSBoRe} de secundario de ACS.}}{ACSBoSe}",
			"{{Bomba[/s]{ACSBoRe} de recirculacion de consumo.}}{ACSBoRe}",
			"{{Válvula de mezcla en el primario de ACS.}}{ACSVaPr}",
			"{{Válvula de mezcla en la impulsión hacia consumidores.}}{ACSVaCo}",
			"{{Bypass de la válvula de consumo.}}{ACSVaBy}",
			"{{Válvula en retorno de consumo.}}{ACSVaRe}",

		],
		"Funcionamiento": [
			// PRODUCCIÓN
			"Se dispone de un horario para el funcionamiento del ACS que permite cambiar de nivel ( normal / reducido / parado), modificando en cada nivel las consignas y limitaciones de funcionamiento.",
			"De este modo durante periodos programados de baja ocupación, el sistema puede operar ajustando consignas y caudales para minimizar el consumo energético.",
			"Cuando la demanda de ACS está activa, se puede configurar su prioridad frente a otros servicios térmicos, garantizando una recuperación rápida de la temperatura de servicio.",

			// PRIMARIO
			"{{-- PRIMARIO --}}{ACSVaPr|ACSBoPr}",
			"{{La [{NombreUsuario}]{ACSVaPr} regula la aportación de energía térmica para mantener la [{NombreUsuario}]{ACSTeSe} en el valor de consigna de acumulación más un diferencial configurable.}}{ACSVaPr.is(\"0..10Vcc\")|ACSVaPr.is(\"3 Puntos\")&ACSTeSe&ACSTeDe}",
			"{{La [{NombreUsuario}]{ACSVaPr} regula la aportación de energía térmica para elevar la [{NombreUsuario}]{ACSTeDe} hasta el valor de consigna de acumulación.}}{ACSVaPr.is(\"0..10Vcc\")|ACSVaPr.is(\"3 Puntos\")&!ACSTeSe&ACSTeDe}",
			"{{La [{NombreUsuario}]{ACSVaPr} regula la aportación de energía térmica para mantener la [{NombreUsuario}]{ACSTeIC} en el valor de consigna de impulsión a consumidores.}}{ACSVaPr.is(\"0..10Vcc\")|ACSVaPr.is(\"3 Puntos\")&!ACSTeDe}",
			"{{Durante el funcionamiento de la producción se verifica el correcto estado de la[/s]{ACSBoPr} bomba[/s]{ACSBoPr}, garantizando la circulación de fluido.}}{ACSBoPr}",
			"{{El sistema gestiona el funcionamiento alternado de las bombas de primario, realizando la rotación en función de las horas de servicio o ante el fallo de una de ellas.}}{ACSBoPr.qty('>1')}",

			// SECUNDARIO Y ACUMULACION
			"{{-- SECUNDARIO --}}{ACSTeSe|ACSBoSe}",
			"{{Durante el funcionamiento de la producción se verifica el correcto estado de la[/s]{ACSBoSe} bomba[/s]{ACSBoSe}, garantizando la circulación de fluido.}}{ACSBoSe}",
			"{{Cuando la temperatura del acumulador es superior a la temperatura disponible en el primario, la[/s]{ACSBoSe} bomba[/s]{ACSBoSe} de secundario se detiene[/n]{ACSBoSe} para evitar la cesión de energía del depósito hacia el sistema de producción, actuando como protección frente a descargas térmicas.}}{ACSBoSe&ACSTeDe}",
			"{{El sistema gestiona el funcionamiento alternado de las bombas, realizando la rotación en función de las horas de servicio o ante el fallo de una de ellas.}}{ACSBoSe.qty('>1')}",
			"{{Tras la parada de la producción, el bombeo de secundario se mantiene activo durante un tiempo configurable para aprovechar la energía térmica remanente.}}{ACSBoSe}",

			// ACUMULACION
			"{{-- ACUMULACION --}}{ACSTeDe}",
			"{{Se establece una consigna de temperatura de acumulación y un diferencial asociado, ambos configurables.}}{ACSTeDe}",
			"{{El arranque y la parada de la producción se realizan comparando la temperatura de acumulación con la consigna y su diferencial.}}{ACSTeDe}",

			// CONSUMO Y RECIRCULACIÓN
			"{{-- CONSUMO Y RECIRCULACIÓN --}}{ACSTeIC|ACSTeRC|ACSBoRe|ACSVaRe}",
			"{{Se define un horario de recirculación y consumo independiente al de producción.}}{ACSBoRe&ACSTeRC}",
			"{{Dentro del horario establecido, la producción funciona de forma continua y se regula en función de la temperatura de impulsión a consumidores, operando como producción instantánea.}}{ACSTeIC&!ACSTeDe}",
			"{{Se establece una consigna configurable de temperatura de impulsión a consumidores.}}{ACSTeIC}",
			"{{La válvula de consumo regula la mezcla de ACS hacia los consumidores para mantener la consigna de temperatura prefijada.}}{ACSTeIC&ACSVaCo}",
			"{{La[/s]{ACSBoRe} bomba[/s]{ACSBoRe} de retorno mantiene la red de ACS en temperatura, reduciendo el tiempo de espera en los puntos de consumo.}}{ACSBoRe}",
			"{{El sistema gestiona el funcionamiento alternado de las bombas de retorno, realizando la rotación en función de las horas de servicio o ante el fallo de una de ellas.}}{ACSBoRe.qty('>1')}",
			"{{El tratamiento antilegionella por choque térmico, se puede anular o configurar con una periodicidad diaria o semanal con una consigna de calentamiento independiente.}}{ACSTeDe|ACSTeIC}",
			"{{Durante el tratamiento antilegionella por choque térmico, la válvula de bypass permanece abierta para permitir que el agua alcance la máxima temperatura disponible en toda la red.}}{ACSVaBy}",
			"{{La temperatura de retorno de consumidores se supervisa y registra para consulta posterior.}}{ACSTeRC&!ACSVaRe}",
			"{{La temperatura de retorno de consumidores se compara con la temperatura de un segundo acumulador que se calienta un un sistema de apoyo (solar/aerotermia/...). Cuando la temperatura del segundo acumulador es superior a la del retorno, la válvula conmuta para que el flujo de retorno pase por ese segundo acumulador.}}{ACSTeRC&ACSVaRe}",
			"{{La válvula de retorno conmuta [por horario|por selector manual|...].}}{!ACSTeRC&ACSVaRe}",
		]

	},
	"Climatizador": {
		"Descripción": [
			"El [{NombreUsuario}]{MainBloc} es el equipo encargado del tratamiento y acondicionamiento del aire impulsado a los espacios servidos u otros equipos de tratamiento final del aire.",
			"Integra funciones de ventilación, calefacción, refrigeración y control de calidad del aire interior."
		],
		"Elementos": [
			"{{[{NombreUsuario}]{CliAmb}}}{CliAmb}",
			"{{[{NombreUsuario}]{CliImp}}}{CliImp}",
			"{{[{NombreUsuario}]{CliReco}}}{CliReco}",
			"{{[{NombreUsuario}]{CliExt}}}{CliExt}",
			"{{[{NombreUsuario}]{CliSal}}}{CliSal}",
			"{{[{NombreUsuario}]{CliVaBat}}}{CliVaBat}",
			"{{[{NombreUsuario}]{CliBoBat}}}{CliBoBat}",
			"{{[{NombreUsuario}]{CliFil}}}{CliFil}",
			"{{[{NombreUsuario}]{CliPres}}}{CliPres}",
			"{{[{NombreUsuario}]{CliVent}}}{CliVent}",
			"{{[{NombreUsuario}]{CliHum}}}{CliHum}",
			"{{[{NombreUsuario}]{CliRecup}}}{CliRecup}",
			"{{[{NombreUsuario}]{CliComp}}}{CliComp}",
		],
		"Funcionamiento": [

			// MODOS Y HABILITACIÓN GENERAL
			"Se dispone de un horario para el funcionamiento del climatizador que permite cambiar de nivel confort / economico / parado, modificando las consignas y limitaciones de funcionamiento. De este modo durante periodos programados de baja ocupación, el sistema puede operar ajustando consignas y caudales para minimizar el consumo energético.",
			"{{El cambio invierno/verano del climatizador se realiza automáticamente, según el régimen actual de la instalacion, adaptando su funcionamiento y demandas en consecuencia.}}{!CliInVe&CliVaBat.qty(\"==1\")}",
			"{{El cambio invierno/verano del climatizador se realiza mediante una señal digital externa, adaptando su funcionamiento y demandas en consecuencia.}}{CliInVe}",

			// SONDA IMPULSION / AMBIENTE / RETORNO
			"{{-- AMBIENTE --}}{CliAmb&!CliImp}",
			"{{-- IMPULSION --}}{CliImp&!CliAmb}",
			"{{-- CASCADA --}}{CliImp&CliAmb}",
			"{{La [{NombreUsuario}]{CliAmb} se utiliza como referencia principal para el control del aire tratado. En función de la temperatura medida, el sistema calcula la demanda térmica necesaria para mantener la consigna establecida.}}{CliAmb}",
			"{{Se supervisa la temperatura de impulsión [para mantenerla entre los limites consignados|para regularla a la consigna establecida].}}{CliImp}",
			"{{Se aplica una estrategia en cascada, de modo que la consigna de impulsión se ajusta dinámicamente en función de la desviación detectada en la temperatura ambiente.}}{CliImp&CliAmb}",

			// BATERIAS
			"{{-- BATERIA[/S]{CliVaBat} --}}{CliVaBat}",
			"{{La [{NombreUsuario}]{CliVaBat} regula[/n]{CliVaBat} la aportación de energía térmica en la[/s]{CliVaBat} batería[/s]{CliVaBat} para alcanzar la consigna}}{CliVaBat}{{de impulsión}}{CliImp&CliVaBat}{{de ambiente}}{!CliImp&CliVaBat}{{.}}{CliVaBat}",
			"{{La regulación de la válvula se realiza de forma proporcional o escalonada, en función del tipo de actuador configurado.}}{CliVaBat}",

			// BOMBAS
			"{{-- BOMBA[/S]{CliBoBat} --}}{CliBoBat}",
			"{{Cuando existe bomba asociada a la batería, esta se activa conjuntamente con la demanda térmica para garantizar la circulación de fluido.}}{CliBoBat}",
			"{{Durante el funcionamiento se supervisa el estado de la[/s]{CliBoBat} bomba[/s]{CliBoBat} para asegurar la correcta transferencia de energía.}}{CliBoBat}",
			"{{El sistema gestiona el funcionamiento alternado de las bombas, realizando la rotación en función de las horas de servicio o ante el fallo de una de ellas.}}{CliBoBat.qty('>1')}",

			// ANTIHIELO
			"{{-- ANTIHIELO --}}{CliVaBat|CliBoBat}",
			"{{Se utiliza la lectura de temperatura exterior para protección antihielo. En situacion de riesgo:<Se detiene[/n]{CliVent} [el/los]{CliVent} ventilador[/es]{CliVent}|+Se abre[/n]{CliVaBat} la válvula[/s]{CliVaBat} al 75%|Se arranca[/n]{CliBoBat} la[/s]{CliBoBat} bomba[/s]{CliBoBat} que recircula[/n]{CliBoBat} sobre la[/s]{CliVaBat} bateria[/s]{CliVaBat}|+Se establece una demanda mínima a los productores de calor>}}{CliVaBat|CliBoBat}",

			// VENTILACIÓN
			"{{-- VENTILADOR[/ES]{CliVent} --}}{CliVent}",
			"{{[El/Los]{CliVent} ventilador[/es]{CliVent} garantiza[/n]{CliVent} la circulación del aire tratado en los espacios servidos, funcionando según el modo activo del climatizador.}}{CliVent}",
			"{{Durante el funcionamiento se supervisa el estado del ventilador para asegurar la correcta la circulación del aire.}}{CliVent}",
			"{{El ventilador modula la velocidad en funcion a la sonda de presión, para optimizar el confort y el consumo energético.}}{CliVent.is(\"0..10Vcc\")&CliPres}",
			"{{El ventilador modula la velocidad [a punto fijo configurable|en funcion a la desviaciorn de la consigna de temperatura], para optimizar el confort y el consumo energético.}}{CliVent.is(\"0..10Vcc\")&!CliPres}",
			"{{Ante la detección de un fallo de ventilación, el sistema detiene el funcionamiento del resto de elementos, la demanda producción térmica y genera la señal de alarma correspondiente.}}{CliVent}",

			// FILTROS
			"{{-- FILTRO[/S]{CliFil} --}}{CliFil}",
			"{{[El/Los]{CliFil} presostato[/s]{CliFil} de filtro[/s]{CliFil} supervisa[/n]{CliFil} el estado de ensuciamiento, detectando pérdidas de carga excesivas.}}{CliFil}",
			"{{Cuando se detecta un filtro sucio, el sistema genera una señal de aviso sin interrumpir el funcionamiento del climatizador.}}{CliFil}",

			// AIRE EXTERIOR Y COMPUERTAS
			"{{-- COMPUERTA[/S]{CliComp} --}}{CliComp}",
			"{{Las compuertas de aire regulan la proporción de aire exterior, retorno y expulsión, garantizando la ventilación higiénica mínima.}}{CliComp}",
			"{{En modos de ahorro energético o recirculación, las compuertas se posicionan para minimizar las pérdidas térmicas.}}{CliComp}",
			"{{En función de las condiciones exteriores respecto a las interiores, el sistema puede incrementar la aportación de aire exterior para aprovechar el enfriamiento gratuito.}}{CliComp&CliExt}",
			"{{Si la calidad del aire interior es mala, el sistema fuerza la apertura de compuertas aunque las condiciones exteriores no sean favorables, en aras de la salubridad.}}{CliAmb.is(\"Temp y CO2\")&CliComp|CliAmb.is(\"Temp, Hum y CO2\")&CliComp}",
			"En condiciones favorables, el climatizador puede activar estrategias de refrigeración nocturna (fuera de horario) mediante aire exterior.",

			// RECUPERACIÓN DE CALOR
			"{{-- RECUPERADOR --}}{CliRecup}",
			"{{El sistema de recuperación de calor aprovecha la energía del aire extraído para precalentar o preenfriar el aire de impulsión.}}{CliRecup}",
			"{{La recuperación se regula automáticamente para maximizar la eficiencia energética sin comprometer el confort.}}{CliRecup}",
			"{{La recuperación puede inhibirse cuando las condiciones exteriores resultan más favorables que el aire de retorno.}}{CliRecup&CliExt}",

			// HUMECTACIÓN / DESHUMECTACION
			"{{-- HUMECTACIÓN --}}{CliHum}",
			"{{El sistema de humectación permite ajustar la humedad del aire impulsado cuando las condiciones lo requieren.}}{CliHum}",
			"{{La humectación se habilita únicamente dentro de los límites de seguridad definidos para evitar condensaciones o sobrehumectación.}}{CliHum}",

		],
	},
	"Fan Coil": {
		"Descripción": [
			"[El/Los]{MainBloc} [{NombreUsuario}]{MainBloc} [es/son]{MainBloc} una[/s]{MainBloc} unidad[/es]{MainBloc} terminal[/es]{MainBloc} destinada[/s]{MainBloc} a la climatización de zonas individuales mediante la impulsión de aire tratado.",
			"Permite al usuario el control del ambiente a su conveniencia, en cada espacio servido."
		],
		"Elementos": [
			"{{[{NombreUsuario}]{FCAm}}}{FCAm}",
			"{{[{NombreUsuario}]{FCImp}}}{FCImp}",
			"{{[{NombreUsuario}]{FCVaBat}}}{FCVaBat}",
			"{{[{NombreUsuario}]{FCFil}}}{FCFil}",
			"{{[{NombreUsuario}]{FCComp}}}{FCComp}",
			"{{[{NombreUsuario}]{FCVent}}}{FCVent}",
		],
		"Funcionamiento": [

			// MODOS Y HABILITACIÓN GENERAL
			"Se dispone de un [horario|selector] para el funcionamiento del fan coil que permite cambiar de nivel confort / economico / parado, modificando las consignas y limitaciones de funcionamiento. De este modo durante periodos de baja ocupación, el sistema puede operar ajustando consignas y caudales para minimizar el consumo energético.",
			"{{El cambio invierno/verano del fan coil se realiza automáticamente, según el régimen actual de la instalacion, adaptando su funcionamiento y demandas en consecuencia.}}{!CliInVe&CliVaBat.qty(\"==1\")}",
			"{{El cambio invierno/verano del fan coil se realiza mediante una señal digital externa, adaptando su funcionamiento y demandas en consecuencia.}}{CliInVe}",

			// Sensores y demanda
			"-- TEMPERATURA --",
			"{{La [{NombreUsuario}]{FCAm} se utiliza como referencia principal para la regulación.}}{FCAm}",
			"{{La temperatura de impulsión se utiliza como referencia principal para la regulación.}}{FCImp&!FCAm}",
			"{{La temperatura de impulsión se limita entre dos valores configurables para evitar sensación de disconfort por parte del usuario.}}{FCImp&FCAm}",
			"{{Cuando la temperatura se desvía de la consigna configurada mas un diferencial, se genera una demanda térmica a productores.}}{FCAm|FCImp}",
			"{{La regulación de la[/s]{FCVaBat} válvula[/s]{FCVaBat} se realiza de forma proporcional por lazo PI.}}{FCVaBat.is(\"0..10Vcc\")|FCVaBat.is(\"3 Puntos\")}",
			"{{La regulación de la[/s]{FCVaBat} válvula[/s]{FCVaBat} se activando y desactivando la valvula. Se establece una banda muerta configurable en torno a la consigna, de modo que la válvula se activa o desactiva la llegar la temperatura de referencia a los extremos de dicha banda.}}{FCVaBat.is(\"Todo/Nada\")}",
			
			// Control del ventilador
			"-- VENTILADOR --",
			"{{El ventilador del fan coil se activa [por horario|cuando hay demanda térmica] y condiciones adecuadas en la batería.}}{FCVent}",
			"{{El ventilador conmutara entre las velocidades automaticamente, acelerando mas en la medida en la que el ambiente esté desviado de la consigna.}}{FCVent.is(\"3 Velocidades\")}",
			"{{Una vez se llega a la consigna, se retarda un tiempo configurable la parada del ventilador para aprovechar la inercia térmica de la batería.}}{FCVent}",

			// TODO
			"{{El ventilador se activa [por horario|cuando hay demanda térmica y con un retarto respecto de la válvula de calor para evitar sensacón de estar impulsando aire frio.}}{FCVent}",
			"{{El sistema coordina la apertura de la válvula y el funcionamiento del ventilador para evitar impulsión de aire sin aporte térmico efectivo.}}{FCVaBat&FCVent}",

			"-- EXTRAS --",
			"{{La temperatura de impulsión se utiliza como señal de supervisión para proteger el funcionamiento del fan coil y mejorar el confort térmico.}}{FCImp}",
			"{{La detección de filtro sucio genera un aviso de mantenimiento para garantizar el correcto caudal de aire y la eficiencia del sistema.}}{FCFil}",
			"{{En ausencia prolongada de demanda térmica, el sistema mantiene el fan coil en estado de reposo, conservando únicamente las funciones de supervisión.}}{FCAm}",
			"{{El fan coil reanuda automáticamente su funcionamiento cuando se detecta una nueva demanda térmica.}}{FCAm}"
		]

	},
}

const Intro = [
	// Presentacion
	[
		"El presente documento describe la estrategia de control y regulación de la instalación térmica, integrando los sistemas de producción y distribución bajo una arquitectura de control unificada y jerárquica. El diseño se ha concebido con un enfoque modular que combina control distribuido y coordinación centralizada, con el objetivo de garantizar un funcionamiento eficiente, fiable y adaptable a las condiciones reales de demanda, en cumplimiento de la normativa vigente.",
		"El proyecto define una solución de automatización térmica basada en la integración coordinada de los subsistemas de producción y distribución mediante una arquitectura de control unificada. La estructura modular y jerárquica del sistema permite asegurar eficiencia energética, continuidad de servicio y facilidad de mantenimiento, manteniendo la coherencia funcional ante futuras modificaciones de la instalación.",
		"La estrategia de control implementada integra los distintos sistemas térmicos de la instalación a través de una arquitectura modular y coordinada, diseñada para responder de forma eficiente y fiable a las condiciones reales de funcionamiento. El sistema combina control distribuido y gestión centralizada, priorizando la eficiencia energética y la estabilidad operativa.",
		"La instalación se ha desarrollado bajo una arquitectura de control integral que coordina los sistemas de producción y distribución térmica de forma jerárquica. Este enfoque modular permite optimizar el rendimiento energético, garantizar la fiabilidad del sistema y facilitar su adaptación a distintas configuraciones hidráulicas y ampliaciones futuras.",
		"El sistema de regulación térmica constituye una solución integral que coordina la producción y distribución de energía mediante una arquitectura de control unificada y modular. Su diseño prioriza la eficiencia energética, la fiabilidad operativa y la facilidad de explotación, proporcionando una base sólida y escalable para la gestión térmica de la instalación."
	],

	// Estrategias
	[
		"El sistema aplica estrategias de control orientadas a optimizar el rendimiento energético global de la instalación, ajustando de forma dinámica la operación de los equipos de producción térmica en función de la demanda real. La modulación y secuenciación de los equipos permiten mantener condiciones de funcionamiento eficientes y estables, reduciendo pérdidas energéticas y ciclos innecesarios.",
		"La lógica de control implementa estrategias de gestión de carga que adaptan el funcionamiento de los equipos a las condiciones térmicas del sistema, activando únicamente los recursos necesarios en cada momento. Este enfoque dinámico permite responder con precisión a las variaciones de demanda sin comprometer la eficiencia ni la fiabilidad operativa.",
		"Para una explotación eficiente de la instalación, el sistema prioriza el reparto equilibrado de horas de funcionamiento entre los equipos disponibles, ajustando automáticamente su secuencia de activación. Esta estrategia contribuye a mejorar la eficiencia energética, reducir el desgaste de los equipos y garantizar una operación homogénea del sistema.",
		"El control incorpora funciones de optimización energética y gestión temporal que permiten adaptar las consignas de funcionamiento a los perfiles de uso y a las condiciones de explotación de la instalación. Estas estrategias facilitan una reducción efectiva del consumo energético manteniendo los niveles de confort requeridos.",
		"El conjunto de estrategias implementadas permite una gestión coordinada de válvulas, bombas y equipos de producción, asegurando una respuesta rápida ante variaciones térmicas o hidráulicas. Esta integración funcional garantiza la estabilidad del sistema y la continuidad del servicio en todo momento."
	],

	// Comunicaciones
	[
		"El sistema se apoya en una infraestructura de comunicaciones que permite el intercambio continuo de información entre controladores, equipos de campo y sistemas de supervisión. El uso de protocolos abiertos garantiza la interoperabilidad con otros sistemas y facilita la integración con plataformas SCADA o BMS.",
		"La arquitectura de comunicaciones permite la supervisión centralizada de la instalación, proporcionando acceso en tiempo real a las principales variables de proceso y estados de funcionamiento. Esta conectividad facilita la monitorización remota y la explotación eficiente del sistema.",
		"El sistema dispone de mecanismos de registro y transmisión de datos que permiten analizar el comportamiento de la instalación a lo largo del tiempo. La información recopilada constituye una herramienta clave para la optimización energética y el mantenimiento preventivo.",
		"La red de comunicaciones ha sido diseñada con criterios de fiabilidad y seguridad, garantizando la integridad de los datos intercambiados incluso en entornos industriales exigentes. Los sistemas de diagnóstico permiten detectar y gestionar incidencias de comunicación de forma eficaz.",
		"La solución de comunicaciones está preparada para su integración con sistemas de gestión energética de nivel superior, facilitando la explotación centralizada de datos y la aplicación de estrategias avanzadas de optimización y supervisión."
	],

	// Programacion
	[
		"La programación del sistema de control se ha desarrollado siguiendo criterios de seguridad operativa y robustez funcional, incorporando protecciones independientes y rutinas de seguridad que garantizan un estado estable ante fallos de señal o comunicación.",
		"El software de control ha sido diseñado por personal técnico especializado, aplicando metodologías estructuradas que aseguran la claridad del código, la facilidad de mantenimiento y la reutilización de funciones en futuras ampliaciones de la instalación.",
		"La estructura del programa se basa en bloques funcionales estandarizados y claramente documentados, lo que facilita la identificación de variables críticas y simplifica las tareas de diagnóstico y mantenimiento del sistema.",
		"Los controladores programables incorporan mecanismos de supervisión interna y gestión de errores que garantizan una ejecución estable y determinista del control, incluso ante condiciones anómalas de funcionamiento.",
		"La programación se complementa con una interfaz de usuario orientada a la explotación y el mantenimiento, que permite la visualización clara del estado del sistema, la gestión de alarmas y la modificación controlada de parámetros operativos."
	],

	// Cierre
	[
		"La solución de control descrita responde a una concepción integral de la gestión energética, en la que la coordinación entre producción, distribución y consumo permite alcanzar elevados niveles de eficiencia y estabilidad operativa.",
		"El resultado es un sistema de control robusto y escalable, capaz de adaptarse a las condiciones dinámicas de la instalación y de facilitar una gestión eficiente y responsable de la energía térmica.",
		"Las estrategias implementadas permiten optimizar el consumo energético y reducir los costes de operación, contribuyendo al cumplimiento de los objetivos de sostenibilidad y eficiencia establecidos para la instalación.",
		"La implantación de esta solución dota a la instalación de una herramienta avanzada para la gestión térmica, mejorando el confort de los usuarios y facilitando la integración con sistemas de supervisión y mantenimiento predictivo.",
		"En conjunto, la arquitectura de control desarrollada constituye una plataforma moderna y fiable para la gestión de instalaciones HVAC, garantizando un funcionamiento estable, eficiente y preparado para futuras evoluciones."
	]
];
