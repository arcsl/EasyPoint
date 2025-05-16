const signalTypes = ["EA", "ED", "SA", "SD"];

const blocksData = {
	"Condiciones Exteriores": {
		"Temperatura": "EA",
	},
	"Maestro Caldera": {
		"Temperatura impulsión": "EA",
		"Bomba calderas": "edsd",
		"Presostato agua": "ED",
		"Ventilacion forzada": "edsd",
		"Electroválvula de Gas": "sd",
	},
	"Caldera": {
		"Temperatura impulsión": "EA",
		"Bomba": "EDSD",
		"Quemador": "SD",
	},
	"Circuito Calefacción": {
		"Temperatura impulsión": "EA",
		"Bomba": "EDSD",
		"Válvula": "SDSD",
	},
	"ACS": {
		"Temperatura Secundario": "ea",
		"Temperatura Superior Depósito": "EA",
		"Temperatura Inferior Depósito": "ea",
		"Temperatura Consumidores": "EA",
		"Bomba primario": "EDSD",
		"Bomba secundario": "edsd",
		"Bomba retorno": "EDSD",
		"Válvula Primario": "sa",
		"Válvula Consumidores": "sa",
	},
};