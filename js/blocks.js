const signalTypes = ["EA", "ED", "SA", "SD"];
const signalTexts = ["Entradas Analógicas", "Entradas Digitales", "Salidas Analógicas", "Salidas Digitales"];
const partesNarrativa = ["Descripcion", "Elementos", "Funcionamiento"];

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

	//valvulas
	ValvulaToNa: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.ActuadorTN1M("1 Micro"), opt.ActuadorTN2M("2 Micros"), opt.ActuadorTN0M("Sin Micros"),], }),
	ValvulaProp: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Actuador010V("0..10Vcc"), opt.Actuador3Pun("3 Puntos"),], }),
	ValvTNProp: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.Actuador3Pun("3 Puntos"), opt.ActuadorTN1M("Todo/Nada"), opt.Actuador010V("0..10Vcc"),], }),

	//organos de gobierno
	ExterModul: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MPyEstado("M/P y Estado"), opt.MPEst010V("0..10Vcc"),], }),
	MotorModul: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MotorToNa("M/P y Estado"), opt.Motor010V("0..10Vcc"),], }),
	MotorFC: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("1veloc"), opt.Motor3vel("3veloc"),], }),
	Recuperdor: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSD("Bypass"), opt.MotorToNa("M/P y Estado"), opt.Motor010V("0..10Vcc"),], }),

	//productores
	TodoNada: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SoloMP("M/P"),], }),
	ModulaCons: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"),], }),
	ModulaAerot: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0-10 Consigna"), opt.SimpleSD("2 consignas"),], }),
	ModulaCalde: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0-10 Consigna"), opt.SimpleSA("0-10 Potencia"), opt.Actuador3Pun("3 Puntos"), opt.SimpleSD("2ª llama"),], }),
	MPyEstado: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.MPyEstado("M/P y Estado"),], }),
	Demanda: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("Todo/Nada"),], }),

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
				elem.SoloSondaTemp("Temp Impulsion", 1, "CircTemp"),
				elem.SensorAire("Sensor Ambiente", 0, "CircAmbi"),
				elem.SoloActiva("Presion Diferencial", 0, "CircDife"),
				elem.MotorModul("Bomba", 1, "CircBomb"),
				elem.ValvTNProp("Válvula", 1, "CircValv"),
				elem.SimpleED("Cambio de regimen externo", 0, "CircInVe"),
				elem.ValvulaToNa("Válvula Calor / Frío", 0, "CircVaCF"),
				elem.Demanda("Demanda a terceros", 0, "CircDema"),
			],
		},
		{
			"Nombre": "ACS",
			"Elementos": [
				elem.SoloSondaTemp("Temperatura Secundario", 0, "ACSTeSe"),
				elem.SoloSondaTemp("Temperatura Depósito", 1, "ACSTeDe"),
				elem.SoloSondaTemp("Temperatura Consumidores", 1, "ACSTeCo"),
				elem.MotorModul("Bomba Primario", 1, "ACSBoPr"),
				elem.MotorModul("Bomba Secundario", 0, "ACSBoSe"),
				elem.MotorModul("Bomba Retorno", 1, "ACSBoRe"),
				elem.ValvTNProp("Válvula Primario", 0, "ACSVaPr"),
				elem.ValvulaProp("Válvula Consumidores", 1, "ACSVaCo"),
				elem.ValvulaToNa("Bypass Válvula Consumidores", 0, "ACSVaBy"),
				elem.Demanda("Demanda a terceros", 0, "ACSDema"),
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
				elem.SondaTermos("Sensor Ambiente / Retorno", 1),
				elem.SensorAire("Temperatura Impulsión", 0),
				elem.ValvTNProp("Válvula Batería", 1),
				elem.SimpleED("Presostato filtro sucio", 0),
				elem.MotorFC("Ventilador", 1),
			],
		},
	];
}

/*



*/


const Narrativa = {
	"Exterior": {
		"Descripcion": [
			"{{La medicion de condiciones exteriores permite compensar la respuesta térmica de la instalación, mejorando el confort y la eficiencia energética.}}{CondExte}"
		],
		"Elementos": [
			"{{Sensor de [{Opcion}]{CondExte} exterior.}}{CondExte}"
		],
		"Funcionamiento": [
			`{{La señal proporcionada por el sensor se utilizará para: <+Ajustar la consigna de impulsión de los circuitos de distribucion.|Cambiar el regimen de trabajo entre invierno y verano.|Optimizar estrategias de ventilación para enfriamiento y calentamiento gratuitos.|Optimizar estrategias de ventilación por calidad de aire exterior.>}}{CondExte}`
		],
	},
	"Cascada Producción": {
		"Descripcion": [
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
			"{{Lectura de presión del circuito hidráulico por [{Opcion}]{AeroPres}.}}{GestPres}",
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
		"Descripcion": [
			"La caldera constituye uno de los elementos principales de producción térmica del sistema, aportando la energía necesaria para atender las demandas de los distintos circuitos consumidores.",
			"Su funcionamiento se integra dentro de la estrategia general de generación, adaptándose a las condiciones de carga y a las consignas establecidas por el sistema de control."
		],
		"Elementos": [
			"{{Temperatura[/s]{CaldTemp} de [impulsión/impulsión y retorno]{CaldTemp} general[/es]{CaldTemp}.}}{CaldTemp}",
			"{{[{Opcion}]{CaldHumo} para la temperatura de humos.}}{CaldHumo}",
			"{{Lectura de la presión estática del circuito hidráulico por [{Opcion}]{AeroPres}.}}{CaldPres}",
			"{{Bomba[/s]{CaldBomb} asociada[/s]{CaldBomb} a la caldera.}}{CaldBomb}",
			"{{Válvula motorizada [{Opcion}]{CaldValv} en retorno.}}{CaldValv}",
		],
		"Funcionamiento": [
			"La caldera entra en funcionamiento cuando recibe la orden de habilitación correspondiente, de acuerdo con la estrategia definida para la producción térmica del sistema.",

			"El arranque de la caldera se produce [por demanda de la instalación|por horario|por control externo].",
			"{{Antes del arranque de la caldera se verifica el correcto funcionamiento de la[/s]{CaldBomb} bomba[/s]{CaldBomb} asociada[/s]{CaldBomb}, para garantizar que existe circulación de fluido.}}{CaldBomb}",
			"{{El sistema gestiona el funcionamiento de las bombas asociadas de forma alternada, realizando la rotación de la bomba en funcionamiento en función de las horas de servicio o en caso de fallo de la otra bomba, de modo que se mantenga la disponibilidad de la caldera.}}{CaldBomb.qty('>1')}",
			"{{El bombeo se mantiene encendido una cantidad de tiempo configurable tras el apagado de la caldera para aprovechar el calor remanente y los disparos por inercia termica.}}{CaldBomb}",
			"{{Se supervisa continuamente la temperatura de impulsión de caldera, para verificar el correcto funcionamiento.}}{CaldTemp}",
			"{{Se supervisa continuamente la temperatura de retorno de caldera, y en caso de temperaturas de retorno excesivamente bajas, se regula la válvula de retorno para evitar la condensación de los humos.}}{CaldValv.is('0..10Vcc')|CaldValv.is('3 Puntos')}",
			"{{La válvula de aislamiento se mantiene cerrada cuando la caldera se encuentre parada o en condición de fallo y se abre unicamente cuando es necerario arrancar la caldera. Asi se evitan recirculaciones no deseadas a traves de la caldera cuando esta está apagada.}}{CaldValv.is('Todo/Nada')}",
			"{{Para permitir el arranque de la caldera se supervisará el estado del final de carrera de válvula abierta, para garantizar el paso de fluido.}}{CaldValv.is('Todo/Nada')}",
			"{{Por seguridad, en el caso de que la temperatura de caldera alcance un límite (configurable), ésta se deshabilita manteniendo las condiciones de circulacion de fluido y se habilita nuevamente cuando la temperatura descienda por debajo de dicho límite menos una histéresis (configurable). Por lo tanto la consigna maxima de funcionamiento de la caldera se establece siempre por debajo de este umbral de seguridad.}}{CaldTemp}",
			"{{El sistema envia a la caldera una señal analógica de consigna de temperatura, siendo el control interno del equipo el encargado de modular la potencia necesaria para alcanzar dicho valor.}}{CaldModu.is('0-10 Consigna')}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante modulación 0..10Vcc, incrementando o reduciendo el aporte térmico para mantener la temperatura de caldera en torno al valor de consigna.}}{CaldModu.is('0-10 Potencia')}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante modulación a tres puntos, incrementando o reduciendo el aporte térmico para mantener la temperatura de caldera en torno al valor de consigna.}}{CaldModu.is('3 Puntos')}",
			"{{Una vez en marcha, la potencia de la caldera se ajusta mediante la activación o no de una segunda etapa para mantener la temperatura de caldera alrededor del valor de consigna establecido.}}{CaldModu.is('2ª llama')}",
			"{{La temperatura de  humos se supervisa durante el funcionamiento de la caldera para emitir una larma en caso de superar un valor umbral (configurable) y detener el funcionamiento de la caldera.}}{CaldHumo}",
			"{{En caso de detectar una caida de presión en el circuito hidráulico, se inhibe el funcionamiento de la caldera}}{CaldPres}{{ y la[/s]{CaldBomb} bomba[/s]{CaldBomb}}}{CaldBomb}{{.}}{CaldPres}"
		],
	},
	"Aerotermia": {
		"Descripcion": [
			"La unidad de aerotermia es un elemento principal de producción térmica del sistema, intercambiando energía termica con el aire exterior para aportar calor o frío a los distintos consumidores.",
		],
		"Elementos": [
			"{{Temperatura[/s]{AeroTemp} de [impulsión/impulsión y retorno]{AeroTemp} general[/es]{AeroTemp}.}}{AeroTemp}",
			"{{Lectura de la presión estática del circuito hidráulico por [{Opcion}]{AeroPres}.}}{AeroPres}",
			"{{Bomba[/s]{AeroBomb} asociada[/s]{AeroBomb} a la aerotermia.}}{AeroBomb}",
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
			"{{El bombeo se mantiene encendido una cantidad de tiempo configurable tras el apagado de la aerotermia para aprovechar la energia termica remanente.}}{AeroBomb}",

			// Camio de modo
			// TODO
			"{{Mediante el [{NombreUsuario}]{AeroCaFr} se estpermitirá la conmutación automática entre calefacción y refrigeración según la demanda.}}{AeroCaFr}",


			"{{Al cambiar de modo de funcionamiento de la aerotermia, tambien cambia la posición de la [{NombreUsuario}]{AeroVaCF} para dirigir el fluido al circuito adecuado.}}{AeroVaCF}",
			"{{Se supervisa continuamente la temperatura de impulsión [a modo informativo|y para generar alarma en caso de desviacion prolongada].}}{AeroTemp}",

			// Generales
			"{{En caso de detectar una caida de presión en el circuito hidráulico, se inhibe el funcionamiento de la caldera}}{AeroPres}{{ y la[/s]{AeroBomb} bomba[/s]{AeroBomb}}}{AeroBomb}{{.}}{AeroPres}"

		]
	},
	"Circuito Calefacción/Distribución": {
		"Descripcion": [
			"El circuito de [calefacción | refrigeración | mixto (calor/frío) | suelo radiante | fancoils | climatizadores]{MainBloc} se encarga de distribuir la energía térmica generada por el sistema de producción hacia los distintos elementos terminales o zonas de consumo.",
			"Su regulación permite mantener la temperatura del fluido de impulsión dentro de los valores de consigna adecuados, optimizando el confort y la eficiencia energética del conjunto.",
			"Las consignas de impulsión se determinan dinámicamente en función de las condiciones exteriores, aplicando curvas de compensación climática configurables que permiten ajustar la temperatura de suministro a las necesidades reales del edificio. Esta regulación proporcional-adaptativa, basada en el principio de control compensado, contribuye a reducir el consumo energético sin comprometer el confort térmico de los usuarios.",
			"Se han implementado distintos modos de funcionamiento (ECO Día, ECO Noche, Reducción por Ausencia, etc.) que adaptan automáticamente las consignas de temperatura y los tiempos de operación a las condiciones de ocupación y horarios de uso previstos. La transición entre modos se realiza de forma gradual, aplicando rampas de consigna y retardos configurables que evitan oscilaciones térmicas y preservan la estabilidad hidráulica del sistema.",
			"La distribución hidráulica se gestiona mediante un conjunto de bombas modulantes controladas por variadores de frecuencia, que ajustan su velocidad en función de la presión diferencial medida y de las válvulas de control de los circuitos secundarios. Esta regulación proporcional mantiene la presión del sistema dentro de los valores de diseño, optimizando el consumo eléctrico y asegurando un reparto homogéneo del caudal en los distintos ramales.",
		],

		"Elementos": [
			"{{Sonda de temperatura de impulsión del circuito.}}{CircTemp}",
			"{{Sonda de ambiente para control o limitación de temperatura interior.}}{CircAmbi}",
			"{{Sensor de presión diferencial para modulación o control de caudal.}}{CircDife}",
			"{{Bomba de circulación, con regulación [todo/nada | modulante | control diferencial]{CircBomb}.}}{CircBomb}",
			"{{Válvula de control proporcional o de dos/tres puntos para regulación de temperatura de impulsión.}}{CircValv}",
			"{{Cambio de régimen externo (calor / frío).}}{CircInVe}",
			"{{Válvula de selección de modo (Calor / Frío / ACS).}}{CircVaCF}",
			"{{Señal de demanda externa o habilitación desde otros equipos o sistemas.}}{CircDema}"
		],

		"Funcionamiento": [
			"El circuito se activará [por demanda de zona | por horario | por señal externa]{CircDema}, habilitando la bomba y la válvula de control asociadas.",
			"{{La válvula [{NombreUsuario}]{CircValv} regulará la temperatura de impulsión del circuito en función de la consigna establecida, manteniendo un equilibrio térmico adecuado.}}{CircValv}",
			"{{La bomba [{NombreUsuario}]{CircBomb} ajustará su velocidad de funcionamiento en función de <+presión diferencial | +salto térmico | control externo>, garantizando el caudal necesario en cada momento.}}{CircBomb}",
			"{{Cuando exista sonda de ambiente, esta limitará la temperatura máxima de impulsión para evitar sobrecalentamientos o sobreenfriamientos del recinto.}}{CircAmbi}",
			"{{Si la sonda de ambiente mide además humedad relativa, se calculará el punto de rocío y el control limitará la impulsión para mantener el fluido por encima del mismo, evitando condensaciones en modo refrescante.}}{CircAmbi}",
			"{{El sensor de presión diferencial permitirá la regulación del caudal del circuito, ajustando la bomba modulante para compensar variaciones de carga hidráulica.}}{CircDife}",
			"{{En modo de funcionamiento combinado (calor/frío), la válvula [{NombreUsuario}]{CircVaCF} seleccionará automáticamente el circuito correspondiente en función del régimen activo del sistema.}}{CircVaCF}",
			"{{Cuando exista una señal de habilitación externa, el circuito permanecerá a la espera hasta recibir la orden de demanda, momento en el cual iniciará su secuencia de arranque.}}{CircDema}"
		]
	},
	"ACS": {
		"Descripcion": [
			"El sistema de producción de agua caliente sanitaria (ACS) está constituido por el conjunto de intercambio térmico, depósito acumulador y circuitos hidráulicos de carga, consumo y retorno.",
			"Su función es mantener la temperatura del agua sanitaria dentro de los valores de confort e higiene establecidos, garantizando la disponibilidad continua del servicio.",
			"La producción de Agua Caliente Sanitaria (ACS) se gestiona mediante un subsistema específico que controla la temperatura de acumulación, el régimen de carga y las maniobras asociadas al circuito de recirculación. El sistema prioriza la demanda de ACS frente a la de climatización cuando se detectan condiciones de uso intensivo, activando la producción mediante el productor térmico más eficiente disponible.",
			"La regulación de la temperatura de acumulación se realiza mediante consignas adaptativas que tienen en cuenta tanto la demanda instantánea como el perfil horario de consumo. La recirculación se controla en función de la temperatura de retorno y del horario de servicio, asegurando un tiempo de espera mínimo en los puntos de consumo y evitando pérdidas térmicas innecesarias durante los periodos de baja utilización.",
			"Para garantizar la calidad sanitaria del agua, el sistema dispone de una función de choque térmico antilegionella que se ejecuta de forma periódica, elevando la temperatura del acumulador por encima del umbral de desinfección durante un tiempo definido. Este proceso se gestiona de forma totalmente automática y con registro de eventos, de modo que pueda verificarse su cumplimiento durante las labores de mantenimiento preventivo.",
			"El control de la producción de ACS se encuentra completamente integrado en la lógica general del sistema, compartiendo variables de estado, consignas y prioridades con el gestor principal. De este modo, se evitan conflictos entre demandas simultáneas y se garantiza una utilización racional de los recursos energéticos disponibles.",


		],
		"Elementos": [
			"{{Sonda de temperatura en el secundario de intercambio para control de producción.}}{ACSTeSe}",
			"{{Sonda de temperatura en el depósito acumulador para regulación de carga.}}{ACSTeDe}",
			"{{Sonda de temperatura en el retorno de consumidores para supervisión y compensación térmica.}}{ACSTeCo}",
			"{{Bomba de primario encargada del caudal de energía térmica desde el sistema de producción.}}{ACSBoPr}",
			"{{Bomba de secundario para recirculación dentro del propio intercambiador.}}{ACSBoSe}",
			"{{Bomba de retorno encargada de mantener la red de ACS en temperatura, evitando enfriamientos.}}{ACSBoRe}",
			"{{Válvula de control del circuito primario, modulante o de dos/tres puntos, para regular el aporte de energía térmica.}}{ACSVaPr}",
			"{{Válvula de consumidores encargada de la distribución del ACS hacia la red de consumo.}}{ACSVaCo}",
			"{{Bypass de la válvula de consumidores para equilibrado hidráulico o mantenimiento de temperatura.}}{ACSVaBy}",
			"{{Señal de demanda a terceros para solicitar producción de calor cuando el sistema no gestiona directamente la fuente térmica.}}{ACSDema}"
		],
		"Funcionamiento": [
			"El control de la producción de ACS se realiza a partir de la lectura de las sondas de temperatura de depósito y secundario, regulando el caudal de energía térmica a través de la válvula de control del primario.",
			"{{La válvula [{NombreUsuario}]{ACSVaPr} ajustará la aportación térmica al intercambiador para mantener la temperatura de acumulación dentro de los límites de consigna.}}{ACSVaPr}",
			"{{La bomba de primario [{NombreUsuario}]{ACSBoPr} se activará junto con la válvula de control, asegurando el caudal necesario durante el proceso de carga del depósito.}}{ACSBoPr}",
			"{{Cuando exista bomba de secundario, esta permitirá la recirculación interna para estabilizar la temperatura en el intercambiador y mejorar la transferencia térmica.}}{ACSBoSe}",
			"{{La bomba de retorno [{NombreUsuario}]{ACSBoRe} mantendrá la temperatura del circuito de distribución, evitando enfriamientos en los puntos de consumo y reduciendo el tiempo de espera del usuario.}}{ACSBoRe}",
			"{{En caso de disponer de válvula de consumidores, esta regulará el caudal hacia la red de ACS en función de la demanda y las condiciones de temperatura.}}{ACSVaCo}",
			"{{Cuando exista válvula de bypass, esta permitirá un flujo mínimo de recirculación para garantizar la homogeneidad térmica o el equilibrado hidráulico del sistema.}}{ACSVaBy}",
			"{{Si el sistema no gestiona directamente los productores de calor, se generará una señal de [{NombreUsuario}]{ACSDema} hacia el sistema externo para solicitar la carga del depósito cuando la temperatura descienda por debajo del umbral establecido.}}{ACSDema}",
			"{{El control supervisará continuamente la temperatura de consumo [{NombreUsuario}]{ACSTeCo}, corrigiendo las desviaciones mediante la modulación de válvulas y bombas asociadas.}}{ACSTeCo}"
		]
	}
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
