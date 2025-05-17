const signalTypes = ["EA", "ED", "SA", "SD"];

const blocksData = {
	"Condiciones Exteriores": {
		"Seniales": {
			"Temperatura": "EA",
		},
	},
	"Maestro Caldera": {
		"Seniales": {
			"Temperatura impulsión": "EA",
			"Bomba calderas": "edsd",
			"Presostato agua": "ED",
			"Ventilacion forzada": "edsd",
			"Electroválvula de Gas": "sd",
		},
	},
	"Caldera": {
		"Seniales": {
			"Temperatura impulsión": "EA",
			"Bomba": {
				"Normal": "EDSD",
				"Modulante": "edsasd",
			},
			"Válvula": {
				"3 Puntos": "SDSD",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Quemador": "SD",
		},
	},
	"Circuito Calefacción": {
		"Seniales": {
			"Temperatura impulsión": "EA",
			"Bomba": {
				"Normal": "EDSD",
				"Modulante": "edsasd",
			},
			"Válvula": {
				"3 Puntos": "SDSD",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
		},
	},
	"ACS": {
		"Seniales": {
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
	},
};