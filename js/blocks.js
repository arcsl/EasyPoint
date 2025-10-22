const signalTypes = ["EA", "ED", "SA", "SD"];
const signalTexts = ["Entradas Analógicas", "Entradas Digitales", "Salidas Analógicas", "Salidas Digitales"];
const partesNarrativa = ["Descripcion", "Elementos", "Funcionamiento"];

// En el array estan las diferentes opciones de dibujar la señal en el esquema
// El nombre del bloque a llamar será el Tipo + el numero + opcion elejida: ej ED + 1 + "Contactor" = ED_1_Contactor
const esq = {

	// Vacio para añadir señales en listado de señales
	VacioEA_1: (Nombre = "") => ({ Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Pasiva", "Activa"], }),
	VacioED_1: (Nombre = "") => ({ Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé", "Contactor", "Térmico",], }),
	VacioSA_1: (Nombre = "") => ({ Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Actuador",], }),
	VacioSD_1: (Nombre = "") => ({ Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé", "Contactor",], }),

	//EA
	PasivaEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Pasiva",], }),
	SimpleEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	ActivaEA_1: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	ActivaEA_2: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 2, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	ActivaEA_3: (Nombre = "") => ({ Nombre, Tipo: "EA", Numero: 3, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Activa",], }),
	//ED
	SimpleED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	EntradED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé",], }),
	MotorED_1: (Nombre = "") => ({ Nombre, Tipo: "ED", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé", "Contactor", "Térmico",], }),
	//SA
	SimpleSA_1: (Nombre = "") => ({ Nombre, Tipo: "SA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	ActuadSA_1: (Nombre = "") => ({ Nombre, Tipo: "SA", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Actuador",], }),
	//SD
	SimpleSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa",], }),
	SalidaSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé",], }),
	MotorSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé", "Contactor",], }),
	MotorSD_3: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 3, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Motor3V",], }),
	ActuadSD_1: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 1, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Relé", "Simple", "Conmutada",], }),
	ActuadSD_2: (Nombre = "") => ({ Nombre, Tipo: "SD", Numero: 2, Linea1: "", Linea2: "", tagNumber: "", Opcion: 0, Opciones: ["Externa", "Actuador",], }),
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
	SensorDigi: (Nombre) => ({ Nombre, Seniales: { "ED": 1, }, Esquema: [esq.SimpleED_1(),], }),
	//Alarma
	AlamEstTerceros: (Nombre) => ({ Nombre, Seniales: { "ED": 1, }, Esquema: [esq.EntradED_1(""),], }),
	//Actuador
	Actuador010V: (Nombre) => ({ Nombre, Seniales: { "SA": 1, }, Esquema: [esq.ActuadSA_1(),], }),
	Actuador3Pun: (Nombre) => ({ Nombre, Seniales: { "SD": 2, }, Esquema: [esq.ActuadSD_2(),], }),
	ActuadorTN0M: (Nombre) => ({ Nombre, Seniales: { "SD": 1, }, Esquema: [esq.ActuadSD_1(),], }),
	ActuadorTN1M: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1("FC Abierto"), esq.ActuadSD_1(),], }),
	ActuadorTN2M: (Nombre) => ({ Nombre, Seniales: { "ED": 2, "SD": 1, }, Esquema: [esq.EntradED_1("FC Abierto"), esq.EntradED_1("FC Cerrado"), esq.ActuadSD_1(),], }),

	//motor
	MPyEstado: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.EntradED_1("Estado"), esq.SalidaSD_1("M/P"),], }),
	MotorToNa: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SD": 1, }, Esquema: [esq.MotorED_1("Estado"), esq.MotorSD_1("M/P"),], }),
	MPEst010V: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SA": 1, "SD": 1, }, Esquema: [esq.EntradED_1("Estado"), esq.SimpleSA_1("Modulación"), esq.SalidaSD_1("M/P"),], }),
	Motor010V: (Nombre) => ({ Nombre, Seniales: { "ED": 1, "SA": 1, "SD": 1, }, Esquema: [esq.MotorED_1("Estado"), esq.SimpleSA_1("Modulación"), esq.MotorSD_1("M/P"),], }),
	Motor3vel: (Nombre) => ({ Nombre, Seniales: { "SD": 3 }, Esquema: [esq.MotorSD_3(),], }),
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
	SondaTermos: (Nombre, Cantidad, Ref = "") => ({ Nombre, Cantidad, Ref, Opciones: [opt.SensorPasi("Temperatura"), opt.SensorDigi("Termostato"),], }),
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
				elem.SensorPres("Control Presión", 1, "GestPres"),
			],
		},
		{
			"Nombre": "Caldera",
			"Elementos": [
				elem.SondaTermos("Temperatura", 1, "CaldTemp"),
				elem.SimpleSD("Marcha-Paro", 0, "CaldMaPa"),
				elem.AlamEstTerceros("Alarma", 1, "CaldEsAl"),
				elem.ModulaCalde("Modulación", 1, "CaldModu"),
				elem.MotorModul("Bomba", 1, "CaldBomb"),
				elem.ValvTNProp("Válvula Retorno", 0, "CaldValv"),
				elem.SondaTermos("Control Humos", 0, "CaldHumo"),
				elem.SensorPres("Control Presión", 0, "CaldPres"),
			],
		},
		{
			"Nombre": "Aerotermia",
			"Elementos": [
				elem.SondaTermos("Temperatura", 1, "AeroTemp"),
				elem.SimpleSD("Marcha-Paro", 1, "AeroMaPa"),
				elem.AlamEstTerceros("Estado / Alarma", 1, "AeroAlar"),
				elem.ModulaAerot("Modulación / Consigna", 0, "AeroModu"),
				elem.MotorModul("Bomba", 0, "AeroBomb"),
				elem.SimpleSD("Cambio de regimen", 1, "AeroCaFr"),
				elem.ValvulaToNa("Válvula Calor / Frío / ACS", 0, "AeroVaCF"),
				elem.SensorPres("Control Presión", 0, "AeroPres"),
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
			"El gestor de producción coordina el funcionamiento conjunto de los distintos productor[/es]{MainBloc} térmicos, regulando su arranque y modulación para optimizar el rendimiento energético del sistema.",
			"Actúa como elemento principal de control de generación térmica, estableciendo las consignas de impulsión y ordenando el encendido o parada de los equipos según la demanda detectada en la instalación.",
			"El sistema está preparado para operar tanto en modo calefacción como en refrigeración, gestionando automáticamente el cambio de régimen cuando procede."
		],

		"Elementos": [
			"{{Sonda de [{Opcion}]{GestTemp} que mide la temperatura de impulsión general del circuito de producción.}}{GestTemp}",
			"{{Bomba principal de impulsión que asegura la circulación del fluido entre los productor[/es]{MainBloc} y el colector general.}}{GestBomb}",
			"{{Ventilación forzada del local técnico, controlada automáticamente por el sistema en función de la demanda térmica o la presencia de equipos en marcha.}}{GestVent}",
			"{{Electroválvula de gas que habilita el suministro de combustible únicamente durante el funcionamiento de los equipos que lo requieren.}}{GestEVGa}",
			"{{Válvula de conmutación calor/frío que establece la dirección del flujo térmico en función del modo operativo activo.}}{GestVaCF}",
			"{{Sensor de presión del circuito de producción, encargado de supervisar el correcto estado hidráulico del sistema.}}{GestPres}",
			"{{Entrada digital de cambio de régimen externo (verano/invierno) para integración con sistemas superiores de control o BMS.}}{GestInVe}"
		],

		"Funcionamiento": [
			"El gestor analiza la demanda térmica procedente de los distintos consumidores y determina el número de productor[/es]{MainBloc} necesarios, activando o deteniendo cada uno según las condiciones de carga y eficiencia.",
			"{{El control de temperatura se realiza a partir de la lectura de la sonda [{Opcion}]{GestTemp}, ajustando la consigna de impulsión en función del modo operativo y las condiciones exteriores.}}{GestTemp}",
			"{{La bomba principal se pondrá en marcha cuando exista demanda activa y se mantendrá en funcionamiento un tiempo de purga tras la finalización de la misma, para asegurar la evacuación térmica.}}{GestBomb}",
			"{{La electroválvula de gas permanecerá abierta únicamente cuando se encuentren operativos equipos que requieran combustible fósil.}}{GestEVGa}",
			"{{La ventilación forzada se activará durante el funcionamiento de los equipos y permanecerá activa un tiempo adicional tras su parada para garantizar la renovación del aire en el local técnico.}}{GestVent}",
			"{{El cambio de régimen externo permite conmutar automáticamente entre calefacción y refrigeración, ajustando la posición de la válvula calor/frío y las consignas de control correspondientes.}}{GestInVe}",
			"{{La válvula de cambio calor/frío modificará su posición conforme al modo operativo activo, asegurando la correcta dirección del flujo térmico.}}{GestVaCF}",
			"{{El sensor de presión supervisará el circuito y generará alarma en caso de valores fuera de los márgenes de funcionamiento establecidos.}}{GestPres}"
		]
	}
	,
	"Caldera": {
		"Descripcion": [
			"El conjunto de caldera[/s]{MainBloc} constituye el elemento principal de producción térmica del sistema, aportando la energía necesaria a los distintos circuitos consumidores.",
		],
		"Elementos": [
			"{{Orden de marcha paro.}}{CaldMaPa}",
			"{{Supervisión de funcionamiento,}}{CaldEsAl}",
			"{{Modulación de [{Opcion}]{CaldModu}.}}{CaldModu}",
			"{{Sonda[/s]{CaldTemp} de temperatura de [impulsión/impulsión y retorno]{CaldTemp}.}}{CaldTemp}",
			"{{Grupo de bombeo externo.}}{CaldBomb}",
			"{{Válvula motorizada en retorno.}}{CaldValv}",
			"{{Supervisión de temperatura de humos.}}{CaldHumo}",
			"{{Supervision de presión del circuito.}}{CaldPres}",
		],
		"Funcionamiento": [
			"El arranque será [por demanda de la instalación|por demanda de la cascada|por horario|por señal externa].",
			"{{Antes de arrancar se debe verificar el funcionamiento correcto de [la bomba / una de las bombas]{CaldBomb}.}}{CaldBomb}",
			"[[El sistema gestionara el funcionamiento de solo una de las bombas en cada momento, rotando automaticamente la bomba que funciona por horas de servicio o por fallo.]]{CaldBomb}",
			"{{La válvula motorizada de [aislamiento cerrará cuando la caldera no este en uso para evitar recirculaciones no deseadas|retorno modulará para mantener una temperatura mínima para evitar condensaciones].}}{CaldValv}",
			"{{Se supervisará la temperatura de [impulsión/impulsión y retorno]{CaldTemp}.}}{CaldTemp}",
			"{{Se ajustará la modulación de [{Opcion}]{CaldModu} para mantener la consigna establecida [por demanda|manualmente por el usuario].}}{CaldModu}",
			"{{Se supervisará [{NombreUsuario}]{CaldEsAl} de la[/s]{MainBloc} [{NombreUsuario}]{MainBloc} y en caso de generarse alarma se detendrá el funcionamiento.}}{CaldEsAl}",
			"{{Se supervisará la temperatura de los humos de la[/s]{MainBloc} [{NombreUsuario}]{MainBloc} y en caso de generarse alarma se detendrá el funcionamiento.}}{CaldHumo}",
			"{{Se supervisará la presion del circuito hidráulico del sistema y en caso de generarse una alarma se detendrá el funcionamiento.}}{CaldPres}",
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
			"Su regulación permite mantener la temperatura del fluido de impulsión dentro de los valores de consigna adecuados, optimizando el confort y la eficiencia energética del conjunto."
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
			"Su función es mantener la temperatura del agua sanitaria dentro de los valores de confort e higiene establecidos, garantizando la disponibilidad continua del servicio."
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
