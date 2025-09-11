const signalTypes = ["EA", "ED", "SA", "SD"];

const blocksData = {
	"Condiciones Exteriores": {
		"Seniales": {
			"Sonda exterior": {
				"Temperatura": "EA",
				"Temp + Hum": "eaea",
				"Temp + Hum + CO²": "eaeaea",
			},
		},
	},
	" ----- Producción -----": null,
	"Gestor de Cascada de Producción": {
		"Seniales": {
			"Temperatura": "EA",
			"Bomba": "edsd",
			"Control Presión": {
				"Sonda": "ea",
				"Presostato": "ED",
			},
			"Ventilacion Forzada": "EDSD",
			"Electroválvula de Gas": "SD",
			"Cambio de regimen externo": "ed",
			"Válvula Calor / Frío": "ededsd",
		},
	},
	"Caldera": {
		"Seniales": {
			"Temperatura": "EA",
			"Marcha-Paro": "SD",
			"Estado / Alarma": "ED",
			"Modulación / Consigna": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "SA",
				"2ª llama": "sd",
			},
			"Bomba": "EDSD",
			"Válvula Aislamiento / Retorno": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Control Humos": {
				"Sonda": "ea",
				"Pirostato": "ed",
			},
			"Control Presión": {
				"Sonda": "ea",
				"Presostato": "ed",
			},
		},
	},
	"Aerotermia / Geotermia": {
		"Seniales": {
			"Temperatura": "EA",
			"Marcha-Paro": "SD",
			"Estado / Alarma": "ED",
			"Cambio de régimen": "SD",
			"Modulación / Consigna": "sa",
			"Bomba": "edsd",
			"Válvula Calor / Frío / ACS": "ededsd",
			"Control Presión": {
				"Sonda": "ea",
				"Presostato": "ed",
			},
		},
	},
	"Solar": {
		"Seniales": {
			"Radiacion Solar": "ea",
			"Temperatura Paneles": "EA",
			"Temperatura Secundario": "ea",
			"Temperatura Depósito": "EA",
			"Bomba Primario": "EDSD",
			"Bomba Secundario": "edsd",
			"Bomba Transvase": "edsd",
			"Válvula Primario": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Válvula Secundario": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Control Presión": {
				"Sonda": "ea",
				"Presostato": "ED",
			},
		},
	},
	" ----- Consumo -----": null,
	"Circuito Calefacción/Distribución": {
		"Seniales": {
			"Temperatura": "EA",
			"Sonda Ambiente": {
				"Temperatura": "ea",
				"Temp + Hum": "eaea",
			},
			"Presion Diferencial": "ea",
			"Bomba": {
				"Normal": "EDSD",
				"Modulante": "edsasd",
			},
			"Válvula control": {
				"3 Puntos": "SDSD",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Válvula cambio C/F": "ededsd",
			"Demanda a terceros": {
				"Todo/Nada": "sd",
				"0..10 Vcc": "sa",
			},
			"Control Presión": {
				"Presostato": "ed",
				"Sonda": "ea",
			},
		},
	},
	"ACS": {
		"Seniales": {
			"Temperatura Secundario": "ea",
			"Temperatura Depósito": "EA",
			"Temperatura Consumidores": "EA",
			"Bomba Primario": "EDSD",
			"Bomba Secundario": "edsd",
			"Bomba Retorno": "EDSD",
			"Válvula Primario": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Válvula Consumidores": "SA",
			"Bypass Válvula Consumidores": "sd",
			"Demanda a terceros": {
				"Todo/Nada": "sd",
				"0..10 Vcc": "sa",
			}
		},
	},
	"Climatizador": {
		"Seniales": {
			"Sonda Ambiente / Retorno": {
				"Temperatura": "ea",
				"Temp + Hum": "EAEA",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Sonda Impulsión": {
				"Temperatura": "EA",
				"Temp + Hum": "eaea",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Sonda Recuperación": {
				"Temperatura": "ea",
				"Temp + Hum": "eaea",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Sonda toma aire del Exterior": {
				"Temperatura": "EA",
				"Temp + Hum": "eaea",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Sonda salida aire al Exterior": {
				"Temperatura": "ea",
				"Temp + Hum": "ea",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Válvula Batería": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "sa",
				"Todo/Nada": "edsd",
			},
			"Bomba Batería": "edsd",
			"Presostato filtro sucio": "ED",
			"Presión Ventilador": "ea",
			"Ventilador": {
				"1 velocidad": "EDSD",
				"3 Velocidades": "sdsdsd",
				"Modulante": "edsasd",
			},
			"Humectador": {
				"Todo/Nada": "edsd",
				"0..10 Vcc": "edsasd",
			},
			"Recuperador": {
				"Estat. + bypass": "sd",
				"Baterías": "edsd",
				"Rotativo": "edsd",
			},
			"Compuertas": {
				"0..10 Vcc": "SA",
				"Todo/Nada": "edsd",
			},
			"Demanda a terceros": {
				"Todo/Nada": "sd",
				"0..10 Vcc": "sa",
			}
		},
	},
	"Fan Coil": {
		"Seniales": {
			"Sonda Ambiente / Retorno": {
				"Temperatura": "ea",
				"Temp + Hum": "EAEA",
				"Temp + CO2": "eaea",
				"Temp + Hum + CO2": "eaeaea",
			},
			"Temperatura Impulsión": "EA",
			"Válvula Batería": {
				"3 Puntos": "sdsd",
				"0..10 Vcc": "SA",
				"Todo/Nada": "edsd",
			},
			"Presostato filtro sucio": "ED",
			"Ventilador": {
				"0..10 Vcc": "sa",
				"3 Velocidades": "SDSDSD",
			},
			"Compuertas": {
				"0..10 Vcc": "SA",
				"Todo/Nada": "sd",
			},
		},
	},

};