{
    "Condiciones Exteriores": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Exterior": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    " ----- Producción -----": null,
    "Gestor de Cascada de Producción": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Ventilacion Forzada": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Electroválvula de Gas": {
                "Cantidad": 1,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Cambio de regimen externo": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Calor / Frío": {
                "Cantidad": 0,
                "Opciones": {
                    "1 Micro": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "2 Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "Sin Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    }
                }
            },
            "Control Presión": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "Caldera": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Marcha-Paro": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Estado / Alarma": {
                "Cantidad": 1,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Modulación / Consigna": {
                "Cantidad": 1,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "2ª llama": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Aislamiento / Retorno": {
                "Cantidad": 0,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Control Humos": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Control Presión": {
                "Cantidad": 0,
                "Opciones": {
                    "Presostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "Aerotermia / Geotermia": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Marcha-Paro y alarma": {
                "Cantidad": 1,
                "Opciones": {
                    "MPyEstado": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            }
                        ]
                    }
                }
            },
            "Modulación / Consigna": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Cambio de regimen externo": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Calor / Frío / ACS": {
                "Cantidad": 0,
                "Opciones": {
                    "1 Micro": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "2 Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "Sin Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    }
                }
            },
            "Control Presión": {
                "Cantidad": 0,
                "Opciones": {
                    "Presostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "Solar": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Radiacion Solar": {
                "Cantidad": 0,
                "Opciones": {
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Paneles": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Secundario": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Depósito": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Primario": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Secundario": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Transvase": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Aerotermo": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Primario": {
                "Cantidad": 0,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Secundario": {
                "Cantidad": 0,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Control Presión": {
                "Cantidad": 0,
                "Opciones": {
                    "Presostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    " ----- Consumo -----": null,
    "Circuito Calefacción/Distribución": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temp Impulsion": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Sensor Ambiente": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Presion Diferencial": {
                "Cantidad": 0,
                "Opciones": {
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula control": {
                "Cantidad": 1,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Cambio de regimen externo": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Calor / Frío": {
                "Cantidad": 0,
                "Opciones": {
                    "1 Micro": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "2 Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "Sin Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    }
                }
            },
            "Demanda a terceros": {
                "Cantidad": 0,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Todo/Nada": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "ACS": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Temperatura Secundario": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Depósito": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Consumidores": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Primario": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Secundario": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Retorno": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Primario": {
                "Cantidad": 0,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Consumidores": {
                "Cantidad": 1,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bypass Válvula Consumidores": {
                "Cantidad": 0,
                "Opciones": {
                    "1 Micro": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "2 Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "Sin Micros": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    }
                }
            },
            "Demanda a terceros": {
                "Cantidad": 0,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Todo/Nada": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "Climatizador": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Sonda Ambiente / Retorno": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Sonda Impulsión": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Sonda Recuperación": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Sonda toma aire del Exterior": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Sonda salida aire al Exterior": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Batería": {
                "Cantidad": 1,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Bomba Batería": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Presostato filtro sucio": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Presión Ventilador": {
                "Cantidad": 0,
                "Opciones": {
                    "Sonda": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Ventilador": {
                "Cantidad": 1,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Humectador": {
                "Cantidad": 0,
                "Opciones": {
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            }
                        ]
                    }
                }
            },
            "Recuperador": {
                "Cantidad": 0,
                "Opciones": {
                    "Bypass": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Simple": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "ED": 1,
                            "SA": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor",
                                    "Termico"
                                ]
                            },
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Contactor"
                                ]
                            }
                        ]
                    }
                }
            },
            "Compuertas": {
                "Cantidad": 0,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Cambio de regimen externo": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Demanda a terceros": {
                "Cantidad": 0,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "Todo/Nada": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    },
    "Fan Coil": {
        "Nombre": "",
        "Cantidad": 1,
        "Seniales": {
            "Sonda Ambiente / Retorno": {
                "Cantidad": 1,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Temp + Hume": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp + CO2": {
                        "Seniales": {
                            "EA": 2
                        },
                        "Esquema": [
                            {
                                "EA_2": [
                                    "Activa"
                                ]
                            }
                        ]
                    },
                    "Temp Hum CO2": {
                        "Seniales": {
                            "EA": 3
                        },
                        "Esquema": [
                            {
                                "EA_3": [
                                    "Activa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Temperatura Impulsión": {
                "Cantidad": 0,
                "Opciones": {
                    "Temperatura": {
                        "Seniales": {
                            "EA": 1
                        },
                        "Esquema": [
                            {
                                "EA_1": [
                                    "Pasiva"
                                ]
                            }
                        ]
                    },
                    "Termostato": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Válvula Batería": {
                "Cantidad": 1,
                "Opciones": {
                    "Todo/Nada": {
                        "Seniales": {
                            "ED": 1,
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa",
                                    "Rele"
                                ]
                            },
                            {
                                "SD_1": [
                                    "Externa",
                                    "Rele",
                                    "Simple",
                                    "Conmutada"
                                ]
                            }
                        ]
                    },
                    "3 Puntos": {
                        "Seniales": {
                            "SD": 2
                        },
                        "Esquema": [
                            {
                                "SD_2": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    },
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa",
                                    "Actuador"
                                ]
                            }
                        ]
                    }
                }
            },
            "Presostato filtro sucio": {
                "Cantidad": 0,
                "Opciones": {
                    "Externa": {
                        "Seniales": {
                            "ED": 1
                        },
                        "Esquema": [
                            {
                                "ED_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    }
                }
            },
            "Ventilador": {
                "Cantidad": 1,
                "Opciones": {
                    "0..10Vcc": {
                        "Seniales": {
                            "SA": 1
                        },
                        "Esquema": [
                            {
                                "SA_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "1veloc": {
                        "Seniales": {
                            "SD": 1
                        },
                        "Esquema": [
                            {
                                "SD_1": [
                                    "Externa"
                                ]
                            }
                        ]
                    },
                    "3veloc": {
                        "Seniales": {
                            "SD": 3
                        },
                        "Esquema": [
                            {
                                "SD_3": [
                                    "Motor3V"
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
}