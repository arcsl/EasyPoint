// ================== CONST & UI ==================
const HOJA_TOTAL = 400;
const HOJA_UTIL = 380;
const MARGEN_X = (HOJA_TOTAL - HOJA_UTIL) / 2;
const SEP_CONTROLADOR = 20;

let nModulo = 0;

const UI = {};
document.querySelectorAll("[id]").forEach(el => UI[el.id] = el);

let estado = {
    form: {},
    carriles: [],
    listado: []
};

UI.btnResetEstado.onclick = () => {
    if (!confirm("❗Esto borrará todo el proyecto guardado.\n\n¿Seguro que quieres continuar?"))
        return;

    localStorage.removeItem("estadoDXF");

    // Reiniciar objeto de estado
    estado = {
        form: {},
        carriles: [],
        listado: []
    };

    guardarEstado();
    location.reload();
};

UI.btnImportarListado.onclick = () => {
    UI.inputImportarListado.click();
};

UI.inputImportarListado.onchange = async function (evt) {

    const file = evt.target.files[0];
    if (!file) return;

    try {

        const text = await file.text();
        const json = JSON.parse(text);

        if (!json.Listado) {
            alert("❌ Archivo inválido (falta propiedad Listado)");
            return;
        }

        estado.listado = structuredClone(json.Listado);
        guardarEstado();

        alert("✅ Listado de señales importado correctamente");

        // TODO: actualizar selectores si ya hay carriles dibujados

    } catch (e) {
        console.error(e);
        alert("❌ Error leyendo archivo JSON");
    }
};

window.onload = () => {

    // si hay info almacenada cargarla
    if (cargarEstado()) {
        escribirFormulario();
        escribirCarriles();
    } else {
        guardarEstado();
    }

    // salvar en caso de cambio de cualquier input o select
    document.querySelectorAll("input,select").forEach(el => {
        el.addEventListener("change", guardarFormulario);
    });

};

// ================== SALVAR/CARGAR PROYECTO EN/DE LOCAL STORAGE ==================

function guardarEstado() {
    localStorage.setItem("estadoDXF", JSON.stringify(estado));
}

function cargarEstado() {
    const data = localStorage.getItem("estadoDXF");
    if (!data) return false;

    try {
        estado = JSON.parse(data);

        // asegurar estructura completa
        if (!estado.form) estado.form = {};
        if (!estado.carriles) estado.carriles = [];
        if (!estado.listado) estado.listado = [];

        return true;
    } catch {
        console.warn("Error leyendo estado, limpiando Storage");
        localStorage.removeItem("estadoDXF");
        return false;
    }
}

function guardarFormulario() {
    const form = {
        Inst: UI.Inst.value,
        Dibu: UI.Dibu.value,
        Fech: UI.Fech.value,
        Revi: UI.Revi.value,
        Esqu: UI.Esqu.value,
        Clie: UI.Clie.value,
        Loca: UI.Loca.value,
        Stye: UI.Stye.value,
        Stdo: UI.Stdo.value,
        Hoja: "-"
    };

    // evitar escribir en LS si no cambia nada
    if (JSON.stringify(estado.form) !== JSON.stringify(form)) {
        estado.form = form;
        guardarEstado();
    }
}

function escribirFormulario() {
    for (const id in estado.form) {
        if (UI[id]) UI[id].value = estado.form[id];
    }
}

// ================== CARRILES ==================

UI.btnAddCarril.onclick = () => {

    // 1) Añadir un carril vacío al estado
    estado.carriles.push([]); // carril sin dispositivos

    // 2) Guardamos
    guardarEstado();

    // 3) Re-pintamos todo
    escribirCarriles();

    // 4) Botones y selects
    //actualizarSelectsSeniales();
};

function escribirCarriles() {

    UI.CarrilesContenedor.innerHTML = "";

    estado.carriles.forEach((carril, idx) => {
        pintarCarril(idx, estado.carriles.length, carril);
    });

    actualizarSelectsSeniales();

}

function moverCarrilEstado(index, dir) {

    const j = index + dir;
    if (j < 0 || j >= estado.carriles.length) return;

    // swap
    const tmp = estado.carriles[index];
    estado.carriles[index] = estado.carriles[j];
    estado.carriles[j] = tmp;

    guardarEstado();
    escribirCarriles();
    // actualizarSelectsSeniales();
}

function pintarCarril(index, totalCarriles, carrilData) {

    const carril = document.createElement("div");
    carril.className = "carril-row w3-margin-bottom";
    carril.dataset.index = index;

    // left buttons
    const colLeft = document.createElement("div");
    colLeft.style.display = "flex";
    colLeft.style.flexDirection = "column";
    colLeft.style.gap = "6px";

    const rowTop = document.createElement("div");
    rowTop.className = "carril-header";

    const btnDel = boton("w3-red", "trash", "Eliminar carril", () => {
        estado.carriles.splice(index, 1);
        guardarEstado();
        escribirCarriles();
        actualizarSelectsSeniales();
    });

    const btnUp = boton("w3-blue", "arrow-up", "Subir", () => moverCarrilEstado(index, -1));
    btnUp.classList.add("carril-move-up");
    if (index === 0) btnUp.disabled = true;

    const btnDown = boton("w3-blue", "arrow-down", "Bajar", () => moverCarrilEstado(index, +1));
    btnDown.classList.add("carril-move-down");
    if (index + 1 === totalCarriles) btnDown.disabled = true;

    rowTop.append(btnDel, btnUp, btnDown);
    colLeft.appendChild(rowTop);

    // right content
    const colRight = document.createElement("div");
    colRight.classList.add("carril-col");

    const btnAddDev = document.createElement("button");
    btnAddDev.classList.add("w3-button", "w3-green", "w3-round", "w3-small", "botonAniadir");
    btnAddDev.innerHTML = `<i class="fa fa-plus"></i> Añadir Dispositivo`;
    btnAddDev.onclick = () => {
        carrilData.push({ tipo: null, _visible: false }); // nuevo dispositivo sin tipo
        guardarEstado();
        escribirCarriles();
    };

    const devicesContainer = document.createElement("div");
    devicesContainer.classList.add("devices-container");

    colRight.append(btnAddDev, devicesContainer);

    // pintar dispositivos del carril
    carrilData.forEach((deviceObj, devIndex) => {
        pintarDispositivo(devicesContainer, index, devIndex, deviceObj);
    });

    carril.append(colLeft, colRight);
    UI.CarrilesContenedor.appendChild(carril);
}


// ================== DISPOSITIVOS ==================

function añadirDispositivoEstado(carrilIndex) {
    estado.carriles[carrilIndex].push({ tipo: null, _visible: false });
    guardarEstado();
    escribirCarriles();
}

function eliminarDispositivoEstado(carrilIndex, dispIndex) {
    estado.carriles[carrilIndex].splice(dispIndex, 1);
    guardarEstado();
    escribirCarriles();
}

function moverDispositivoEstado(carrilIndex, dispIndex, dir) {
    const arr = estado.carriles[carrilIndex];
    const j = dispIndex + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[dispIndex], arr[j]] = [arr[j], arr[dispIndex]];
    guardarEstado();
    escribirCarriles();
}

function pintarDispositivo(devicesContainer, carrilIndex, dispIndex, dispData) {

    const block = document.createElement("div");
    block.classList.add("device-block");

    // Cabecera
    const head = document.createElement("div");
    head.classList.add("device-head");

    // Selector de modelo
    const sel = document.createElement("select");
    sel.classList.add("w3-select", "w3-border", "w3-round", "w3-small", "w3-padding", "selectDispositivo");
    sel.appendChild(new Option("", ""));

    Object.keys(dispositivos).forEach(k => sel.appendChild(new Option(k, k)));
    if (dispData?.tipo) sel.value = dispData.tipo;

    // Botones dispositivo
    const btnDel = boton("w3-red", "trash", "Eliminar dispositivo", () =>
        eliminarDispositivoEstado(carrilIndex, dispIndex)
    );

    const btnUp = boton("w3-blue", "arrow-up", "Subir dispositivo", () =>
        moverDispositivoEstado(carrilIndex, dispIndex, -1)
    );
    btnUp.classList.add("dev-move-up");
    if (dispIndex === 0) btnUp.disabled = true;

    const btnDown = boton("w3-blue", "arrow-down", "Bajar dispositivo", () =>
        moverDispositivoEstado(carrilIndex, dispIndex, +1)
    );
    btnDown.classList.add("dev-move-down");
    if (dispIndex === estado.carriles[carrilIndex].length - 1) btnDown.disabled = true;

    // Botón mostrar/ocultar canales
    const btnToggle = boton("w3-gray", "eye-slash", "Mostrar/Ocultar canales", () => {
        const oculto = channels.classList.toggle("w3-hide");
        estado.carriles[carrilIndex][dispIndex]._visible = !oculto;
        guardarEstado();
        btnToggle.innerHTML = oculto
            ? `<i class="fa fa-eye"></i>`
            : `<i class="fa fa-eye-slash"></i>`;

    });
    btnToggle.classList.add("botonCuadrado");


    head.append(btnDel, btnUp, btnDown, sel, btnToggle);
    block.appendChild(head);

    // Canales
    const channels = document.createElement("div");
    channels.classList.add("channels");

    // Aplicar visibilidad guardada
    if (dispData?._visible === false) {
        channels.classList.add("w3-hide");
        btnToggle.innerHTML = `<i class="fa fa-eye"></i>`;
    } else {
        channels.classList.remove("w3-hide");
        btnToggle.innerHTML = `<i class="fa fa-eye-slash"></i>`;
    }

    block.appendChild(channels);

    if (dispData?.tipo) {
        pintarCanalesDesdeEstado(channels, carrilIndex, dispIndex, dispData);
    }

    // Cambio de modelo → actualiza estado y repinta
    sel.onchange = () => {
        const prev = estado.carriles[carrilIndex][dispIndex]?._visible ?? false;
        estado.carriles[carrilIndex][dispIndex] = { tipo: sel.value, _visible: prev };
        guardarEstado();
        escribirCarriles();
        actualizarSelectsSeniales?.();
    };


    devicesContainer.appendChild(block);
}


// ================== SEÑALES ==================

function pintarCanalesDesdeEstado(channelsContainer, carrilIndex, dispIndex, deviceObj) {
    const disp = dispositivos[deviceObj.tipo];
    if (!disp?.Paginas) return;

    disp.Paginas.forEach(pagina => {
        pagina.forEach(conector => {
            (conector.Numeracion || []).forEach(n => {
                if (!(typeof n === "object" && n?.señales?.length)) return;

                const nombreBorne = n.nombre || n.num;

                const row = document.createElement("div");
                row.className = "channel-row";

                const label = document.createElement("label");
                label.classList.add("w3-small", "borne-label");
                label.textContent = nombreBorne;

                const sel = document.createElement("select");
                sel.classList.add("w3-select", "w3-border", "w3-round", "w3-small", "borne-select");

                // Guardar los tipos permitidos para este borne
                sel.dataset.seniales = JSON.stringify(n.señales);

                // insertar opcion vacía
                sel.appendChild(new Option("", ""));

                // poblar opciones desde estado.listado según señales permitidas
                for (const tipo of n.señales) {
                    (estado.listado[tipo] || []).forEach(sig => {
                        const opt = new Option(sig.Linea1, JSON.stringify(sig));
                        if (deviceObj[nombreBorne] === sig.ID) opt.selected = true;
                        sel.appendChild(opt);
                    });
                }

                // manejador de cambio
                sel.addEventListener("change", () => {
                    let uuid = null;

                    if (sel.value) {
                        try {
                            uuid = JSON.parse(sel.value).ID;
                        } catch { }
                    }

                    // ✅ guardamos en estado
                    estado.carriles[carrilIndex][dispIndex][nombreBorne] = uuid;
                    guardarEstado();

                    // ✅ refrescamos selects para bloquear señal en otros
                    actualizarSelectsSeniales();
                });

                row.append(label, sel);
                channelsContainer.appendChild(row);
            });
        });
    });
}

function actualizarSelectsSeniales() {

    // 1) Copia del listado original
    const pool = structuredClone(estado.listado);

    // 2) Quitar señales usadas según estado (no DOM)
    estado.carriles.forEach(carril => {
        carril.forEach(disp => {
            if (!disp || !disp.tipo) return;

            Object.keys(disp).forEach(k => {
                if (k === "tipo") return;

                const uuid = disp[k];
                if (!uuid) return;

                const tipo = encontrarTipoSenial(uuid);
                if (!tipo) return;

                pool[tipo] = pool[tipo].filter(s => s.ID !== uuid);
            });
        });
    });

    // 3) Reconstruir selects DOM
    document.querySelectorAll("select.borne-select").forEach(sel => {
        const permitidas = JSON.parse(sel.dataset.seniales || "[]");

        // Guardar selección para reinsertarla
        let sigActual = null;
        if (sel.value) {
            try { sigActual = JSON.parse(sel.value); } catch { }
        }

        sel.innerHTML = "";
        sel.appendChild(new Option("", ""));

        permitidas.forEach(tipo => {
            (pool[tipo] || []).forEach(sig => {
                sel.appendChild(new Option(sig.Linea1, JSON.stringify(sig)));
            });
        });

        if (sigActual) {
            const opt = new Option(sigActual.Linea1, JSON.stringify(sigActual));
            opt.selected = true;
            sel.appendChild(opt);
        }
    });
}

function encontrarTipoSenial(id) {
    for (const tipo in estado.listado) {
        if (estado.listado[tipo].some(s => s.ID === id)) return tipo;
    }
    return null;
}

// ================== AUXILIARES ==================

function boton(color, icon, title, onClick) {
    const b = document.createElement("button");
    b.classList.add("w3-button", color, "w3-round", "w3-small", "botonCuadrado");
    b.title = title;
    b.innerHTML = `<i class="fa fa-${icon}"></i>`;
    b.onclick = onClick;
    return b;
}


// ================== CREAR DXF ==================

(function calcularAnchosPorPagina() {
    const paso = 4;
    Object.keys(dispositivos).forEach(ctrlName => {
        const ctrl = dispositivos[ctrlName];
        if (!ctrl?.Paginas) return;
        ctrl.Disposicion = ctrl.Disposicion || {};
        ctrl.Disposicion.AnchoEnHoja = ctrl.Paginas.map(pagina => {
            const largo = pagina
                .map(con => (con.Numeracion?.length || 0) + 1) // +1 separador por conector
                .reduce((a, b) => a + b, 0);
            return largo * paso;
        });
    });
})();

function descargarDXF() {

    nModulo = 0;
    const entities = [];

    // Construir layout de hojas desde el ESTADO (no desde el DOM)
    const layout = generarLayoutHojasDesdeEstado(estado);

    // Insertar hoja de vista general al principio
    const primeraHojaItems = []; // hoja sin items de detalle, solo plano
    layout.unshift({ items: primeraHojaItems });


    // Centrar horizontalmente los items en cada hoja
    centrarItemsEnHojas(layout);

    // Matriz de cajetines (disposición visual de las hojas)
    const numHojas = layout.length;
    const { filas, columnas } = calcularMatrizCajetines(numHojas);

    // Dibujar dispositivos y señales
    for (let idx = 0; idx < numHojas; idx++) {

        const hoja = layout[idx];

        const CajetinX = (idx % columnas) * 420;
        const CajetinY = (filas - 1 - Math.floor(idx / columnas)) * 300;

        // datos del formulario con instalacion en mayuscula y numero de hoja
        const campos = structuredClone(estado.form);
        campos.Inst = UI.Inst.value.toUpperCase();
        campos.Hoja = `${idx + 1} - ${numHojas}`;

        // Cajetín con datos del formulario (estado.form)
        entities.push(...cajetin(CajetinX, CajetinY, campos));

        // Hoja 0 = plano general
        if (idx === 0) {
            entities.push(
                ...dibujarPlanoGeneralDispositivos(CajetinX, CajetinY, estado, dispositivos)
            );
            continue; // saltar a la siguiente hoja
        }

        // Resto de hojas = tu lógica actual
        hoja.items.forEach(it => {
            const disp = dispositivos[it.key];
            entities.push(
                ...dibujarPaginaDeDispositivo(
                    CajetinX, CajetinY,
                    disp,
                    it.pageIndex,
                    it.x,
                    it.carrilIndex,
                    it.dispIndex
                )
            );
        });

        // Barras comunes L/G/G0/N a lo ancho de los módulos dibujados
        entities.push(...dibujarBarrasComunes(CajetinX, CajetinY, hoja.items));
    }

    // 5) Cerrar y descargar
    let dxfContent = wrapDXF(entities);
    dxfContent = quitarCaracteresNoASCII(dxfContent);

    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generado.dxf';
    a.click();
    URL.revokeObjectURL(url);
}

function dibujarPlanoGeneralDispositivos(CajetinX, CajetinY, estado, dispositivos) {
	const entidades = [];

	// === Flags cota ===
	const FLECHAS = true;  // flechas en extremos de cotas
	const LINEAS  = true;  // lineas cortas en extremos de cotas

	// === Config fuentes ===
	const FONT_NAME = 5;
	const FONT_DIM = 2.5;
	const FONT_DIM_COTA = 3;

	// === Config separaciones / cotas ===
	const SEP_CONTROLADOR = 20;
	const SEP_VERTICAL = 30;

	const COTA_VERT_OFFSET_X = 10;
	const COTA_VERT_TEXT_OFFSET_X = 5;

	const COTA_HORZ_OFFSET_Y = 10;
	const COTA_HORZ_TEXT_OFFSET_Y = 5;

	// === Área util en la HOJA 0 ===
	const Y_MIN = CajetinY + 40;
	const Y_MAX = CajetinY + 300;
	const usableHeight = Y_MAX - Y_MIN;

	const HOJA_ANCHO = 420;
	const MARGEN = 10;

	const areaX = CajetinX + MARGEN;
	const areaY = Y_MAX - MARGEN;
	const usableWidth = HOJA_ANCHO - MARGEN * 2;

	// === Escala fija ===
	const scale = 0.5;

	// === Carriles ===
	const carriles = (estado.carriles || []).map(carril =>
		carril.map(d => dispositivos[d.tipo]).filter(Boolean)
	);

	const dims = carriles.map(carril => carril.map(d => ({
		ancho: d.Disposicion?.Ancho || 40,
		alto: d.Disposicion?.Alto || 60,
		nombre: d.Nombre,
		tipo: d.Disposicion?.Tipo || "modulo"
	})));

	const carrilAlturas = dims.map(carril =>
		Math.max(...carril.map(d => d.alto))
	);

	const carrilAnchos = dims.map(carril =>
		carril.reduce((acc, d, idx) => {
			const sep = (idx > 0 && d.tipo === "controlador") ? SEP_CONTROLADOR : 0;
			return acc + sep + d.ancho;
		}, 0)
	);

	const totalAltura = carrilAlturas.reduce(
		(acc, h, i) => acc + h + (i > 0 ? SEP_VERTICAL : 0),
		0
	);

	const maxAncho = Math.max(...carrilAnchos);

	const offsetX = (usableWidth - maxAncho * scale) / 2;
	const offsetY = (usableHeight - totalAltura * scale) / 2;

	let cursorY = (Y_MAX - MARGEN) - offsetY;

	// === Tick helpers ===
	function tickVert(x, y, len = 2) {
		// vertical tick → para cotas horizontales
		return lineaDXF(x, y - 2*len, x, y + len, 5);
	}
	function tickHoriz(x, y, len = 2) {
		// horizontal tick → para cotas verticales
		return lineaDXF(x - len, y, x + 2*len, y, 5);
	}

	// === Flechas (reutilizando SOLID) ===
	function flecha(x, y, dir) {
		const arrowLen = 3;
		const arrowWidth = arrowLen / 4;

		if (dir === "up")    return solidDXF([[x, y],[x - arrowWidth, y - arrowLen],[x + arrowWidth, y - arrowLen]]);
		if (dir === "down")  return solidDXF([[x, y],[x - arrowWidth, y + arrowLen],[x + arrowWidth, y + arrowLen]]);
		if (dir === "left")  return solidDXF([[x, y],[x + arrowLen, y - arrowWidth],[x + arrowLen, y + arrowWidth]]);
		if (dir === "right") return solidDXF([[x, y],[x - arrowLen, y - arrowWidth],[x - arrowLen, y + arrowWidth]]);
		return "";
	}

	// === Dibujo ===
	dims.forEach((carril, carrilIndex) => {
		const carrilAltoReal = carrilAlturas[carrilIndex];
		let cursorX = areaX + offsetX;

		const tallest = carrilAltoReal * scale;
		const carrilTop = cursorY;
		const carrilBottom = cursorY - tallest;

		const tramos = [];
		let tramoInicioX = cursorX;
		let tramoAnchoAcum = 0;

		carril.forEach((d, i) => {

			// ruptura de tramo por controlador
			if (i > 0 && d.tipo === "controlador") {
				tramos.push([tramoInicioX, cursorX, tramoAnchoAcum]);
				tramoInicioX = cursorX + SEP_CONTROLADOR * scale;
				tramoAnchoAcum = 0;

				cursorX += SEP_CONTROLADOR * scale;
			}

			const w = d.ancho * scale;
			const h = d.alto * scale;

			const y1 = cursorY - (tallest - h) / 2;
			const x1 = cursorX;
			const x2 = cursorX + w;
			const y2 = y1 - h;

			// Rectángulo
			entidades.push(
				lineaDXF(x1, y1, x2, y1, 20),
				lineaDXF(x2, y1, x2, y2, 20),
				lineaDXF(x2, y2, x1, y2, 20),
				lineaDXF(x1, y2, x1, y1, 20)
			);

			// Rotación por proporción
			let rot = 0, des_cx = 0, des_cy = 0;
			if (d.alto > d.ancho * 2) { rot = 90; des_cx = 2.5; des_cy = 2.5; }
			else if (d.alto > d.ancho) { rot = 45; des_cx = 1.75; des_cy = 0.75; }

			const cx = (x1 + x2) / 2;
			const cy = (y1 + y2) / 2;

			entidades.push(
				textoDXF(cx - des_cx, cy + 2.5 - des_cy, d.nombre, FONT_NAME, 'MC', rot, "Negrita")
			);

			const dimText = `${d.ancho} x ${d.alto} mm`;
			entidades.push(
				textoDXF(cx + des_cx, cy - 2.5 + des_cy, dimText, FONT_DIM, 'MC', rot)
			);

			tramoAnchoAcum += d.ancho;
			cursorX += w;
		});

		tramos.push([tramoInicioX, cursorX, tramoAnchoAcum]);

		// === COTA VERTICAL ===
		const cotaX = areaX + offsetX - COTA_VERT_OFFSET_X * scale;
		const cotaTextX = cotaX - COTA_VERT_TEXT_OFFSET_X * scale;
		const textY = (carrilTop + carrilBottom) / 2;

		entidades.push(
			lineaDXF(cotaX, carrilTop, cotaX, carrilBottom, 5)
		);

		if (FLECHAS) {
			entidades.push(flecha(cotaX, carrilTop, "up"));
			entidades.push(flecha(cotaX, carrilBottom, "down"));
		}
		if (LINEAS) {
			entidades.push(tickHoriz(cotaX, carrilTop));
			entidades.push(tickHoriz(cotaX, carrilBottom));
		}

		const textCota = `${carrilAltoReal} mm`;
		entidades.push(
			textoDXF(cotaTextX, textY, textCota, FONT_DIM_COTA, 'MC', 90)
		);

		// === COTAS HORIZONTALES ===
		tramos.forEach(([xStart, xEnd, realWidth]) => {
			const yCota = carrilTop + COTA_HORZ_OFFSET_Y * scale;
			const yText = yCota + COTA_HORZ_TEXT_OFFSET_Y * scale;

			entidades.push(
				lineaDXF(xStart, yCota, xEnd, yCota, 5)
			);

			if (FLECHAS) {
				entidades.push(flecha(xStart, yCota, "left"));
				entidades.push(flecha(xEnd, yCota, "right"));
			}
			if (LINEAS) {
				entidades.push(tickVert(xStart, yCota));
				entidades.push(tickVert(xEnd, yCota));
			}

			const cx = (xStart + xEnd) / 2;
			const txt = `${realWidth} mm`;

			entidades.push(
				textoDXF(cx, yText, txt, FONT_DIM_COTA, 'MC', 0)
			);
		});

		cursorY -= (carrilAltoReal * scale + SEP_VERTICAL * scale);
	});

	return entidades;
}

function generarLayoutHojasDesdeEstado(estado) {
    const hojas = [];
    const nuevaHoja = () => hojas.push({ items: [] });

    // Garantiza al menos 1
    if (hojas.length === 0) nuevaHoja();

    (estado.carriles || []).forEach((carril, carrilIndex) => {
        // Carril nuevo → hoja nueva si la actual no está vacía
        if (hojas[hojas.length - 1].items.length > 0) nuevaHoja();
        let hojaActual = hojas[hojas.length - 1];

        // Expandir dispositivos a items de impresión (una entrada por página)
        const items = [];
        carril.forEach((dispObj, dispIndex) => {
            const key = dispObj?.tipo;
            if (!key) return;

            const disp = dispositivos[key];
            if (!disp) return;

            const tipo = disp?.Disposicion?.Tipo || "controlador";
            const anchos = disp?.Disposicion?.AnchoEnHoja || [disp?.Disposicion?.Ancho || HOJA_UTIL];
            const pages = anchos.length;

            for (let p = 0; p < pages; p++) {
                items.push({
                    key,
                    tipo,               // "controlador" | "modulo" | ...
                    pageIndex: p,       // índice de página
                    pages,              // total de páginas
                    width: anchos[p],
                    carrilIndex,        // indices para volver al estado
                    dispIndex
                });
            }
        });

        // Empaquetado por hojas
        for (let i = 0; i < items.length; i++) {
            const it = items[i];

            // Multipágina → cada página en hoja nueva, consecutiva
            if (it.pages > 1) {
                if (hojaActual.items.length > 0) {
                    nuevaHoja();
                    hojaActual = hojas[hojas.length - 1];
                }
                hojaActual.items.push(it);

                // Fuerza salto para la siguiente página del mismo dispositivo
                if (i < items.length - 1 && items[i + 1].key === it.key) {
                    nuevaHoja();
                    hojaActual = hojas[hojas.length - 1];
                }
                continue;
            }

            // No multipágina → compactar con separaciones
            const itemsHoja = hojaActual.items;
            const isFirst = itemsHoja.length === 0;
            const sep = (!isFirst && it.tipo === "controlador") ? SEP_CONTROLADOR : 0;

            let ocupado = 0;
            itemsHoja.forEach((hItem, idx) => {
                const s = (idx === 0) ? 0 : (hItem.tipo === "controlador" ? SEP_CONTROLADOR : 0);
                ocupado += s + hItem.width;
            });

            if (ocupado + sep + it.width > HOJA_UTIL) {
                nuevaHoja();
                hojaActual = hojas[hojas.length - 1];
            }

            hojaActual.items.push(it);
        }

        // preparar hoja nueva para el siguiente carril
        nuevaHoja();
    });

    // Quitar hojas vacías del final (si las hubiera)
    while (hojas.length && hojas[hojas.length - 1].items.length === 0) {
        hojas.pop();
    }

    return hojas;
}

function centrarItemsEnHojas(layout) {
    layout.forEach(hoja => {
        if (!hoja.items.length) return;

        let total = 0;
        hoja.items.forEach((it, idx) => {
            const sep = (idx === 0) ? 0 : (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);
            total += sep + it.width;
        });

        const offset = (HOJA_UTIL - total) / 2;
        let cursor = MARGEN_X + offset;

        hoja.items.forEach((it, idx) => {
            const sep = (idx === 0) ? 0 : (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);
            cursor += sep;
            it.x = cursor;        // posición X absoluta dentro de la hoja (relativa al cajetín)
            cursor += it.width;
        });
    });
}

function calcularMatrizCajetines(numHojas) {
    let determinado = false;
    let columnas = 0;
    while (!determinado) {
        columnas++;
        if ((columnas * (columnas - 1)) >= numHojas) determinado = true;
    }
    const filas = Math.ceil(numHojas / columnas);
    return { filas, columnas };
}

function dibujarPaginaDeDispositivo(hojaX, hojaY, dispositivo, pageIndex, startX, carrilIndex, dispIndex) {

    const entidades = [];

    const paso = 4;
    const franjas = ["Cinta", "Subcinta", "Simbolos", "Numeracion", "Opcional", "Etiqueta", "Fijo"];

    const pagina = dispositivo.Paginas[pageIndex];
    const largura = dispositivo?.Disposicion?.AnchoEnHoja?.[pageIndex] ??
        (pagina.map(c => ((c.Numeracion?.length || 0) + 1)).reduce((a, b) => a + b, 0) * paso);

    let inX = hojaX + startX;
    let inY = hojaY + 236;

    // Envolvente + título
    entidades.push(...hashEnv(inX, inY, largura));
    entidades.push(textoDXF(inX + 2, inY + 21, dispositivo.Nombre, 3, 'ML', 0, "Negrita"));

    // Marca de módulo PX (si aplica)
    const { Familia, Tipo } = dispositivo.Disposicion || {};
    if (Familia === "PX" && Tipo === "modulo") {
        nModulo++;
        entidades.push(
            textoDXF(inX + largura - 5, inY + 21, `${nModulo}`, 3, 'MC', 0, "Negrita"),
            lineaDXF(inX + largura - 10, inY + 18, inX + largura - 10, inY + 24),
        );
    }

    // Relleno por conectores
    pagina.forEach((conector, idxCon) => {

        // Strings centradas en su bloque
        franjas.forEach(franja => {
            if (typeof conector[franja] === "string") {
                const largoConector = (((conector.Numeracion?.length) || 0) + 1) * paso;
                const posXCent = inX + largoConector / 2;
                entidades.push(...hasheador(posXCent, inY, conector[franja], franja));
            }
        });

        // Columnas del conector
        const nCols = conector.Numeracion?.length || 0;
        for (let i = 0; i < nCols; i++) {
            inX += paso;

            // 1) Si el borne tiene SEÑAL asignada en EL ESTADO → dibujar símbolo correspondiente
            const borneObj = conector.Numeracion[i];
            const { num, seniales, nombre, desG0 } = normalizarBorne(borneObj);
            console.log({ num, seniales, nombre, desG0 });
            // nombre del borne (para mapear en estado)
            const nombreBorne = nombre || num || null;
            if (nombreBorne) {
                const dispEstado = estado.carriles?.[carrilIndex]?.[dispIndex];
                const uuid = dispEstado?.[nombreBorne] || null;

                if (uuid) {
                    const info = obtenerSenialPorUUID(uuid);
                    if (info) {
                        const { tipo, sig } = info; // tipo = EA | ED | SA | SD
                        const numero = sig.Numero;
                        const opcionTexto = (sig.Opciones?.[sig.Opcion]) || "";

                        // Construcción del nombre de función JS
                        const funcionNombre = `${tipo}_${numero}_${opcionTexto}`; // Debes tenerla definida en window
                        const fn = window[funcionNombre];

                        // console.log ({fn});

                        if (typeof fn === "function") {
                            const L1Mayus = sig.Linea1.toUpperCase();
                            const L2Mayus = sig.Linea2.toUpperCase();

                            entidades.push(
                                ...fn(inX, inY, L1Mayus, L2Mayus, sig.tagNumber, desG0)
                            );
                        } else {
                            console.warn(`⚠️ Falta función símbolo DXF: ${funcionNombre}(x,y,Linea1,Linea2,tag)`);
                        }
                    }
                }
            }

            // 2) Dibujar resto de franjas (normalizando objetos {num,...} a su .num)
            franjas.forEach(franja => {
                if (Array.isArray(conector[franja])) {
                    let valor = conector[franja][i];
                    if (valor && typeof valor === "object") valor = valor.num; // normaliza si hace falta
                    entidades.push(...hasheador(inX, inY, valor, franja));
                }
            });
        }

        inX += paso;
        if (idxCon + 1 < (pagina.length || 0)) {
            entidades.push(...hasheador(inX, inY, "#Sep"));
        }
    });

    return entidades;
}

function normalizarBorne(borne) {
    if (borne && typeof borne === "object") {
        return {
            num: borne.num ?? null,
            seniales: borne.señales ?? [],
            nombre: borne.nombre ?? null,
            desG0: borne.desG0 ?? null,
        };
    }
    return { num: borne ?? null, seniales: [], nombre: null, desG0: null };
}

function obtenerSenialPorUUID(uuid) {
    const lst = estado.listado || {};
    for (const tipo in lst) {
        const arr = lst[tipo];
        if (!Array.isArray(arr)) continue;
        const sig = arr.find(s => s.ID === uuid);
        if (sig) return { tipo, sig };
    }
    return null;
}

function dibujarBarrasComunes(CajetinX, CajetinY, hojaItems) {
    const entidades = [];
    const paso = 4;
    const despY = { L: paso * 1, G: paso * 3, G0: paso * 4, N: paso * 25 };

    if (!hojaItems.length) return entidades;

    const xInicio = Math.min(...hojaItems.map(it => it.x)) + CajetinX;
    const xFin = Math.max(...hojaItems.map(it => it.x + it.width)) + CajetinX;

    Object.entries(despY).forEach(([key, value]) => {
        const y = CajetinY + 236 - value;
        entidades.push(
            textoDXF(xInicio - 2, y, key, 2.5, 'MR'),
            lineaDXF(xInicio, y, xFin, y),
            textoDXF(xFin + 2, y, key, 2.5, 'ML'),
        );
    });

    return entidades;
}

function quitarCaracteresNoASCII(texto) {
    return texto
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, '');
}
