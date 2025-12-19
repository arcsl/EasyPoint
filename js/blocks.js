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
	ModulaAerot: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"), opt.SimpleSD("2 consignas"),], }),
	ModulaCalde: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SimpleSA("0..10Vcc"), opt.Actuador3Pun("3 Puntos"), opt.SimpleSD("2ª llama"),], }),
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
			"Nombre": "General Producción",
			"Elementos": [
				elem.SondaTermos("Temperatura", 1, "GestTemp"),
				elem.MotorModul("Bomba", 0, "GestBomb"),
				elem.MotorModul("Ventilacion Forzada", 1, "GestVent"),
				elem.SimpleSD("Electroválvula de Gas", 1, "GestEVGa"),
				elem.SimpleED("Cambio de regimen externo", 0, "GestInVe"),
				elem.ValvulaToNa("Válvula Calor / Frío", 0, "GestVaCF"),
				elem.SensorPres("Presión", 1, "GestPres"),
			],
		},
		{
			"Nombre": "Caldera",
			"Elementos": [
				elem.SondaTermos("Temperatura", 1, "CaldTemp"),
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
				elem.SondaTermos("Temperatura", 1, "AeroTemp"),
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
				elem.SondaTermos("Temp Impulsion", 1, "CircTemp"),
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
				elem.SondaTermos("Temperatura Secundario", 0, "ACSTeSe"),
				elem.SondaTermos("Temperatura Depósito", 1, "ACSTeDe"),
				elem.SondaTermos("Temperatura Consumidores", 1, "ACSTeCo"),
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
				elem.SensorAire("Sonda Ambiente / Retorno", 1),
				elem.SondaTermos("Temperatura Impulsión", 0),
				elem.ValvTNProp("Válvula Batería", 1),
				elem.SimpleED("Presostato filtro sucio", 0),
				elem.MotorFC("Ventilador", 1),
			],
		},
	];
}

/*
----- SENSOR -----

"Descripcion": [
	"{{Se dispone de un sensor de [{Opcion}]{Ref} destinado a la medición de las condiciones correspondientes.}}{Ref}"
]
"Elementos": [
	"{{Sensor de [{Opcion}]{Ref}.}}{Ref}"
]
"Funcionamiento": [
	"{{La señal proporcionada por el sensor se empleará como variable de referencia para la regulación del sistema.}}{Ref}",
	"{{Dicha señal permitirá la compensación de las consignas de impulsión en función de las condiciones exteriores.}}{Ref}",
	"{{Adicionalmente, el valor medido podrá utilizarse para: <+Optimizar estrategias de ventilación.|Gestionar el cambio de régimen de funcionamiento.|Mejorar la eficiencia energética global del sistema.>}}{Ref}"
]


----- BOMBA -----

"Descripcion": [
	"{{La instalación dispone de una bomba de circulación destinada a asegurar el caudal necesario en el circuito correspondiente.}}{BombRef}"
]
"Elementos": [
	"{{Bomba de circulación del circuito.}}{BombRef}"
]
"Funcionamiento": [
	"{{La bomba se pondrá en marcha cuando exista demanda activa del circuito.}}{BombRef}",
	"{{El paro de la bomba se realizará una vez desaparecida la demanda, aplicando un retardo configurable para garantizar la evacuación térmica.}}{BombRef}",
	"{{El control de la bomba se realizará en modo [todo/nada | modulante], en función de las necesidades de la instalación.}}{BombRef}",
	"[[En caso de existir varias bombas, el sistema gestionará su funcionamiento alternado para equilibrar las horas de servicio y aumentar la fiabilidad del sistema.]]{BombRef}"
]



----- VALVULA -----

"Descripcion": [
	"{{La instalación dispone de una válvula motorizada proporcional destinada a la regulación del caudal o de la temperatura del circuito.}}{ValvRef}"
]
"Elementos": [
	"{{Válvula motorizada proporcional para regulación del circuito.}}{ValvRef}"
]
"Funcionamiento": [
	"{{La válvula regulará su posición de apertura de forma proporcional para mantener la consigna de temperatura establecida.}}{ValvRef}",
	"{{La señal de control aplicada a la válvula se calculará en función de la diferencia entre la consigna y el valor medido por la sonda asociada.}}{ValvRef}",
	"{{En ausencia de demanda, la válvula adoptará una posición de seguridad configurable.}}{ValvRef}",
	"{{La válvula podrá operar en modo [mezcla | inyección | bypass], en función de la configuración hidráulica del circuito.}}{ValvRef}"
]


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
			`{{La señal proporcionada por el sensor se utilizará para:	<+Ajustar la consigna de impulsión de los circuitos de distribucion.|Cambiar el regimen de trabajo entre invierno y verano.|Optimizar estrategias de ventilación para enfriamiento y calentamiento gratuitos.|Optimizar estrategias de ventilación por calidad de aire exterior.>}}{CondExte}`
		],
	},
	"General Producción": {
		"Descripcion": [
			"El gestor de producción coordina el funcionamiento conjunto de los distintos productor[/es]{MainBloc} térmicos de la instalación, estableciendo una estrategia común de arranque, paro y modulación.",
			"Su función es adaptar la generación térmica a la demanda real del sistema, mejorando el rendimiento energético y garantizando un funcionamiento estable y seguro.",
			"El control centralizado de producción permite una gestión coherente de los distintos equipos, evitando maniobras innecesarias y asegurando la correcta operación del conjunto."
		],
		"Elementos": [
			"{{Sonda de [{Opcion}]{GestTemp} de temperatura de impulsión general del circuito de producción.}}{GestTemp}",
			"{{Bomba principal de impulsión del circuito de producción.}}{GestBomb}",
			"{{Sistema de ventilación forzada del local técnico.}}{GestVent}",
			"{{Electroválvula de gas común a los equipos de producción.}}{GestEVGa}",
			"{{Válvula de conmutación calor/frío del circuito de producción.}}{GestVaCF}",
			"{{Sensor de presión del circuito de producción.}}{GestPres}",
		],
		"Funcionamiento": [
			"El gestor de producción recibe la demanda térmica del sistema y determina el número de productores necesarios en cada momento, activando o deteniendo los equipos de forma coordinada.",
			"{{La regulación de la producción se basa en la lectura de la sonda de [{Opcion}]{GestTemp} de impulsión general, comparando el valor medido con la consigna establecida para decidir la secuencia de arranque y parada de los productores.}}{GestTemp}",
			"{{La bomba principal de impulsión se pondrá en marcha al habilitarse la producción y se mantendrá operativa mientras existan equipos de generación activos, mas un retardo adicional a la parada.}}{GestBomb}",
			"{{La electroválvula de gas permanecerá habilitada únicamente durante el funcionamiento de los equipos que lo requieran. Se activará unos segundos antes de que lo haga el primer productor y se desactivara unos segundos despues de que se hayan desactivado todos los productores.}}{GestEVGa}",
			"{{La ventilación forzada se activará unos minutos antes del encendido de los productores, garantizando unas condiciones adecuadas de ventilacion. Una vez se hayan desactivado todos los productores, se mantendra encendida unos minutos antes de desactivarse.}}{GestVent}",
			"{{El cambio de régimen externo permitirá conmutar el sistema entre calefacción y refrigeración, adaptando la lógica de control del gestor de producción}}{GestInVe}{{ y la posición de la válvula calor/frío}}{GestInVe&GestVaCF}{{.}}{GestInVe}",
			"{{La válvula de conmutación calor/frío ajustará su posición en función del régimen activo del sistema, asegurando la correcta dirección del flujo térmico.}}{GestVaCF}",
			"{{El sensor de presión supervisará el estado hidráulico del circuito de producción y, en caso de detectarse una condición de fallo, se inhibirá el funcionamiento de los productores y bomba(s) asociadas hidraulicamente.}}{GestPres}"
		],
	},
	"Caldera": {
		"Descripcion": [
			"La caldera constituye uno de los elementos principales de producción térmica del sistema, aportando la energía necesaria para atender las demandas de los distintos circuitos consumidores.",
			"Su funcionamiento se integra dentro de la estrategia general de generación, adaptándose a las condiciones de carga y a las consignas establecidas por el sistema de control."
		],
		"Elementos": [
			"{{[{Opcion}]{CaldTemp}[/s]{CaldTemp} para la temperatura de [impulsión/impulsión y retorno]{CaldTemp}.}}{CaldTemp}",
			"{{[{Opcion}]{CaldHumo} para la temperatura de humos.}}{CaldHumo}",
			"{{[{Opcion}]{CaldPres} para la presión del circuito hidráulico.}}{CaldPres}",
			"{{Bomba[/s]{CaldBomb} asociada[/s]{CaldBomb} a la caldera.}}{CaldBomb}",
			"{{Válvula motorizada [{Opcion}]{CaldValv} en retorno.}}{CaldValv}",
		],
		"Funcionamiento": [
			"La caldera entrará en funcionamiento cuando reciba la orden de habilitación correspondiente, de acuerdo con la estrategia definida para la producción térmica del sistema.",
			"{{Antes del arranque de la caldera se verificará el correcto funcionamiento del circuito hidráulico asociado}}{CaldBomb}{{, asegurando la circulación de fluido a través del intercambiador.}}{CaldBomb}",
			"{{Cuando existan varias bombas asociadas, el sistema gestionará su funcionamiento de forma alternada para equilibrar las horas de servicio y aumentar la fiabilidad del conjunto.}}{CaldBomb}",
			"{{La válvula de retorno regulará su posición para mantener condiciones adecuadas de funcionamiento de la caldera}}{CaldValv}{{, evitando temperaturas de retorno excesivamente bajas y posibles fenómenos de condensación.}}{CaldValv}",
			"{{La temperatura de funcionamiento de la caldera se supervisará mediante la sonda[/s]{CaldTemp} instalada[/s]{CaldTemp}, permitiendo verificar el correcto comportamiento térmico del equipo.}}{CaldTemp}",
			"{{La potencia de la caldera se ajustará mediante el sistema de modulación tipo [{Opcion}]{CaldModu}, adaptando su funcionamiento a la demanda térmica existente.}}{CaldModu}",
			"{{El estado de la caldera y la presencia de posibles alarmas se supervisarán de forma continua}}{CaldEsAl}{{, deteniéndose su funcionamiento en caso de detectarse una condición anómala.}}{CaldEsAl}",
			"{{La temperatura de los humos será supervisada durante el funcionamiento de la caldera}}{CaldHumo}{{, generándose una condición de alarma en caso de superarse los límites admisibles.}}{CaldHumo}",
			"{{La presión del circuito hidráulico se supervisará de forma permanente}}{CaldPres}{{ y, en caso de detectarse una condición de fallo, se inhibirá el funcionamiento de la caldera y de los elementos hidráulicos asociados.}}{CaldPres}"
		],
	},
	"Aerotermia": {
		"Descripcion": [
			"El conjunto de unidad[/es]{MainBloc} de aerotermia constituye el elemento principal de producción térmica del sistema, extrayendo energía del aire exterior para aportar calor o frío a los distintos circuitos consumidores.",
			"El funcionamiento del sistema se adapta a las condiciones exteriores y a las demandas de la instalación, optimizando la eficiencia energética y el rendimiento global del conjunto."
		],
		"Elementos": [
			"{{Orden de marcha-paro.}}{AeroMaPa}",
			"{{Supervisión de funcionamiento y alarmas.}}{AeroAlar}",
			"{{Sonda[/s]{AeroTemp} de temperatura de [impulsión/impulsión y retorno]{AeroTemp}.}}{AeroTemp}",
			"{{Regulación mediante señal de modulación [{Opcion}]{AeroModu}.}}{AeroModu}",
			"{{Bomba[s]{AeroBomb} de circulación del circuito primario.}}{AeroBomb}",
			"{{Cambio de régimen de trabajo (calefacción / refrigeración).}}{AeroCaFr}",
			"{{Válvula motorizada de selección entre modos de trabajo (Calor / Frío / ACS).}}{AeroVaCF}",
			"{{Sensor de presión del circuito hidráulico para supervisión y seguridad.}}{AeroPres}"
		],
		"Funcionamiento": [
			"El arranque de la unidad se producirá [por demanda de la instalación|por horario|por control externo].",
			"{{Antes de la puesta en marcha se verificará el funcionamiento correcto de [la bomba / una de las bombas]{AeroBomb} y las condiciones de presión del circuito.}}{AeroBomb}",
			"[[El sistema gestionará automáticamente la rotación de las bombas instaladas para equilibrar las horas de funcionamiento.]]{AeroBomb}",
			"{{Durante el funcionamiento en modo calefacción o refrigeración, la válvula [{NombreUsuario}]{AeroVaCF} ajustará la posición correspondiente para dirigir el flujo térmico al circuito adecuado.}}{AeroVaCF}",
			"{{El cambio de régimen [{NombreUsuario}]{AeroCaFr} permitirá la conmutación automática entre calefacción y refrigeración según la demanda.}}{AeroCaFr}",
			"{{El control de temperatura se realizará mediante la sonda [{Opcion}]{AeroTemp}, manteniendo la consigna de impulsión definida.}}{AeroTemp}",
			"{{En caso de disponer de señal de modulación, la potencia del compresor se ajustará de forma proporcional a la demanda térmica.}}{AeroModu}",
			"{{Se supervisará el [{NombreUsuario}]{AeroAlar} de la[/s]{MainBloc}, y en caso de generarse alarma se detendrá el funcionamiento del equipo.}}{AeroAlar}",
			"{{Se controlará la presión del circuito mediante el sensor correspondiente, generando una alarma ante valores fuera del rango permitido.}}{AeroPres}"
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
		"El presente documento tiene por objeto describir la estrategia de control y regulación implementada en el sistema de producción y distribución térmica de la instalación, estableciendo las bases funcionales que garantizan un comportamiento eficiente, fiable y adaptable a las condiciones de carga y demanda reales del edificio. El sistema ha sido concebido desde una perspectiva integral, combinando criterios de eficiencia energética, continuidad de servicio, mantenibilidad y seguridad operacional, todo ello en consonancia con las directrices de diseño marcadas por la dirección de proyecto y conforme a la normativa vigente en materia de instalaciones térmicas en los edificios.",
		"El proyecto de automatización térmica que se presenta persigue la integración completa de los subsistemas de producción, distribución y climatización bajo una arquitectura de control unificada. Este planteamiento permite la coordinación global de los equipos y asegura un equilibrio permanente entre confort, eficiencia y seguridad operacional, respetando en todo momento los principios de ingeniería que rigen las instalaciones HVAC modernas.",
		"El sistema ha sido desarrollado con un enfoque modular, de modo que cada bloque funcional dispone de lógica independiente de control, pero se mantiene jerárquicamente coordinado mediante un gestor central que establece consignas, prioridades y estados operativos. Esta organización jerárquica facilita la adaptación del sistema a diferentes configuraciones hidráulicas, manteniendo la coherencia global y garantizando la continuidad de servicio ante eventuales modificaciones o ampliaciones futuras.",
		"La arquitectura de control se apoya en una red de controladores programables lógicos (PLCs) distribuidos por áreas funcionales, que gestionan de forma autónoma los procesos de producción y distribución térmica. Esta estructura descentralizada incrementa la fiabilidad del conjunto, reduce los tiempos de respuesta y simplifica las labores de mantenimiento, asegurando un control preciso y coordinado de la instalación en su totalidad.",
		"El sistema de regulación térmica constituye la base operativa de la instalación, garantizando la gestión eficiente de los recursos energéticos disponibles y la estabilidad de las condiciones ambientales en los espacios servidos. Su diseño responde a criterios de robustez industrial, escalabilidad y facilidad de explotación, con el objetivo de proporcionar una plataforma de control versátil y duradera que sirva de referencia en futuras actuaciones de modernización o ampliación."
	],
	// Estrategias
	[
		"El sistema está orientado a la optimización del rendimiento energético global de la instalación, mediante la aplicación de estrategias avanzadas de modulación y secuenciación de los equipos de producción térmica. El número de productores térmicos en funcionamiento, así como su potencia, se adecúan de forma continua en función de la demanda térmica instantánea y de las condiciones de retorno del circuito. Con ello se mantiene un régimen de trabajo próximo al punto de máxima eficiencia estacional de cada equipo, reduciendo los ciclos de arranque y las pérdidas transitorias.",
		"La lógica de control implementa algoritmos de gestión de carga que analizan las variables de temperatura y presión de los circuitos primarios y secundarios, activando de forma automática los productores y bombas modulantes necesarios para mantener la estabilidad térmica del sistema. Esta regulación dinámica permite responder con precisión a las variaciones de demanda sin comprometer la eficiencia global ni la fiabilidad operativa.",
		"Para una explotación óptima de los recursos de la instalación, se prioriza el funcionamiento equilibrado de los equipos, alternando su orden de arranque con el fin de homogeneizar las horas de servicio y evitar desgastes diferenciales. La secuencia de activación se ajusta automáticamente en función de la carga térmica acumulada, las condiciones de retorno y la disponibilidad de cada productor, garantizando una utilización racional y equitativa de los recursos energéticos.",
		"El sistema dispone de funciones de limitación de potencia máxima demandada y de control horario inteligente, que permiten ajustar las consignas de funcionamiento según las franjas tarifarias y las condiciones de ocupación del edificio. De este modo se consigue una reducción efectiva del consumo energético sin pérdida de confort, optimizando la explotación de los recursos disponibles y favoreciendo una gestión responsable de la energía.",
		"El conjunto de válvulas motorizadas, electroválvulas de seguridad y sensores de caudal se encuentra completamente integrado en la lógica de supervisión. Esta integración permite una lectura precisa del estado de la instalación y una respuesta inmediata ante cualquier desviación térmica o hidráulica, preservando la integridad del sistema y garantizando la continuidad del servicio en todo momento."
	],
	// Comunicaciones
	[
		"El conjunto del sistema se apoya en una red de comunicación interna que permite el intercambio continuo de información entre los distintos controladores, los equipos de campo y la interfaz de supervisión. Los protocolos empleados, basados en estándares abiertos (Modbus, BACnet o equivalentes), garantizan la interoperabilidad con otros sistemas y posibilitan la supervisión remota a través de plataformas SCADA o software BMS.",
		"Se dispone de un sistema de registro histórico que almacena las principales variables de proceso —temperaturas, presiones, estados, consumos y alarmas—, lo que permite analizar el comportamiento de la instalación, identificar tendencias y evaluar la eficiencia energética. Esta información constituye una herramienta fundamental para la mejora continua del rendimiento y la planificación del mantenimiento preventivo.",
		"La infraestructura de comunicaciones ha sido diseñada con criterios de redundancia y seguridad, asegurando la fiabilidad de las transmisiones incluso en entornos con alta interferencia electromagnética. Los equipos de supervisión disponen de mecanismos de diagnóstico que permiten detectar errores de comunicación y garantizar la integridad de los datos intercambiados entre dispositivos.",
		"El sistema de supervisión incorpora una interfaz gráfica de usuario que permite la visualización en tiempo real de las variables de proceso, el estado de los equipos y las tendencias históricas. Esta herramienta facilita la interpretación de los datos por parte del operador y proporciona acceso directo a los principales parámetros de configuración y control, manteniendo la trazabilidad de todas las acciones realizadas.",
		"La arquitectura de comunicaciones está preparada para la integración con sistemas de gestión energética de nivel superior, permitiendo la explotación centralizada de los datos y el seguimiento remoto de las instalaciones. Esta capacidad de integración asegura la compatibilidad futura con plataformas corporativas y facilita la implantación de políticas de optimización energética a escala global."
	],
	// Programacion
	[
		"La arquitectura de control ha sido concebida con criterios de redundancia funcional y seguridad de operación. Los elementos críticos disponen de protecciones independientes, y las maniobras de seguridad se encuentran cableadas a nivel de hardware, de modo que su actuación no dependa exclusivamente de la lógica programable. Los fallos de comunicación o pérdida de señal se tratan mediante rutinas de seguridad que garantizan un estado estable del sistema.",
		"La programación ha sido desarrollada por personal técnico especializado, con amplia experiencia en el diseño y puesta en marcha de sistemas de automatización HVAC. El desarrollo se ha realizado conforme a metodologías estructuradas que aseguran la trazabilidad del código, la facilidad de mantenimiento y la reproducibilidad de las funciones implementadas en futuras expansiones del sistema.",
		"Se ha prestado especial atención a la estandarización de bloques funcionales y a la documentación detallada de cada módulo de programa, lo que permite una rápida identificación de las variables críticas y simplifica las labores de diagnóstico. Esta estructura modular contribuye a la fiabilidad del sistema y a la facilidad de actualización de la lógica de control.",
		"Los controladores programables empleados en la instalación han sido configurados con rutinas específicas de vigilancia interna, watchdogs y gestión de errores, garantizando la estabilidad de la ejecución incluso ante eventos anómalos. La estructura de programa está basada en tareas cíclicas priorizadas, que aseguran una respuesta determinista y un control coherente de los procesos térmicos.",
		"El software de control se acompaña de una interfaz de usuario diseñada para facilitar la explotación por parte del personal de mantenimiento. Todos los parámetros relevantes son accesibles mediante menús jerárquicos y pantallas de supervisión intuitivas, que permiten la modificación controlada de consignas y la monitorización de alarmas en tiempo real, mejorando así la capacidad operativa de los técnicos de explotación."
	],
	// Cierre
	[
		"La estrategia de control descrita responde a una concepción integral de la gestión energética, en la que la interacción coordinada entre producción, distribución y consumo constituye el eje fundamental de la eficiencia global del sistema. La aplicación de algoritmos adaptativos, la integración de funciones de ahorro energético y la supervisión continua de las variables de proceso garantizan un funcionamiento estable, seguro y optimizado.",
		"El resultado final es un sistema de control robusto, escalable y orientado a la sostenibilidad, capaz de adaptarse a las condiciones dinámicas de la instalación y de ofrecer al explotador las herramientas necesarias para una gestión racional y responsable de la energía térmica. Su diseño y programación se han realizado siguiendo criterios de fiabilidad industrial y eficiencia operativa, asegurando una larga vida útil y una explotación eficaz del conjunto.",
		"El conjunto de estrategias implementadas permite alcanzar elevados niveles de eficiencia energética, reduciendo los costes de operación y contribuyendo activamente a los objetivos de sostenibilidad establecidos por la normativa vigente. La arquitectura abierta y modular del sistema facilita su adaptación a nuevas tecnologías y la incorporación de futuras mejoras funcionales sin afectar a la estabilidad del conjunto.",
		"Con la implantación de esta solución de control, la instalación queda dotada de una herramienta avanzada para la gestión térmica integral, que permite optimizar recursos, reducir el impacto ambiental y asegurar el confort de los usuarios. La flexibilidad del sistema posibilita su integración en estrategias globales de gestión energética y mantenimiento predictivo.",
		"En definitiva, la solución desarrollada constituye una plataforma de control moderna, fiable y eficiente, que materializa los principios de sostenibilidad, seguridad y eficiencia energética que rigen el diseño actual de las instalaciones HVAC. Su concepción técnica garantiza un funcionamiento estable, un consumo racional de energía y una gestión inteligente de los recursos disponibles."
	]
]

