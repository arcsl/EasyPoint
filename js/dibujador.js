/// <reference path="script.js" />
/// <reference path="escuchadores.js" />
/// <reference path="DXFbasicos.js" />

// ================== CONST & UI ==================
const HOJA_TOTAL = 400;
const HOJA_UTIL = 380;
const MARGEN_X = (HOJA_TOTAL - HOJA_UTIL) / 2;
const SEP_CONTROLADOR = 20;

let nModulo = 0;

function writeForm() {
    for (const id in proyectoActual.Info) {
        if (UI[id]) {
            UI[id].value = proyectoActual.Info[id];
            UI[id].addEventListener("change", () => {
                if (id === "Dibu") localStorage.setItem("nombreUsuarioEasyPoint", UI[id].value);
                proyectoActual.Info[id] = UI[id].value;
                proyectoNoGuardado();
            });
        }
    }
}

// ================== CARRILES ==================

function writeCarriles() {
    UI.CarrilesContenedor.innerHTML = "";
    proyectoActual.Asignacion.forEach((carril, idx) => {
        renderCarril(idx, proyectoActual.Asignacion.length, carril);
    });
    updateSelectsSeniales();
}

function moveCarril(index, dir) {

    const j = index + dir;
    if (j < 0 || j >= proyectoActual.Asignacion.length) return;

    // swap
    const tmp = proyectoActual.Asignacion[index];
    proyectoActual.Asignacion[index] = proyectoActual.Asignacion[j];
    proyectoActual.Asignacion[j] = tmp;

    proyectoNoGuardado();
    writeCarriles();
    writeSignals();
}

function renderCarril(index, totalCarriles, carrilData) {

    const carril = document.createElement("div");
    carril.className = "carril-row w3-margin-top";
    carril.dataset.index = index;

    // left buttons
    const colLeft = document.createElement("div");
    colLeft.style.display = "flex";
    colLeft.style.flexDirection = "column";
    colLeft.style.gap = "6px";

    const rowTop = document.createElement("div");
    rowTop.className = "carril-header";

    const btnDel = createBoton("w3-red", "papelera", "Eliminar carril", () => {
        if (!confirm("Esta acción no se puede deshacer.\n¿Desea continuar?")) return;
        proyectoActual.Asignacion.splice(index, 1);
        proyectoNoGuardado();
        writeCarriles();
        writeSignals();
    });

    const btnUp = createBoton("w3-blue", "arrow-up", "Subir", () => moveCarril(index, -1));
    btnUp.classList.add("carril-move-up");
    if (index === 0) btnUp.disabled = true;

    const btnDown = createBoton("w3-blue", "arrow-down", "Bajar", () => moveCarril(index, +1));
    btnDown.classList.add("carril-move-down");
    if (index + 1 === totalCarriles) btnDown.disabled = true;

    rowTop.append(btnDel, btnUp, btnDown);
    colLeft.appendChild(rowTop);

    // right content
    const colRight = document.createElement("div");
    colRight.classList.add("carril-col");

    const btnAddDev = document.createElement("button");
    btnAddDev.classList.add("w3-button", "w3-green", "w3-round", "botonAniadir");
    btnAddDev.innerHTML = "+ Dispositivo";
    btnAddDev.onclick = () => {
        carrilData.push({ tipo: null, _visible: false }); // nuevo dispositivo sin tipo
        proyectoNoGuardado();
        writeCarriles();
        writeSignals();
    };

    const devicesContainer = document.createElement("div");
    devicesContainer.classList.add("devices-container");

    colRight.append(btnAddDev, devicesContainer);

    // pintar dispositivos del carril
    carrilData.forEach((deviceObj, devIndex) => {
        renderDispositivo(devicesContainer, index, devIndex, deviceObj);
    });

    carril.append(colLeft, colRight);
    UI.CarrilesContenedor.appendChild(carril);
}

// ================== DISPOSITIVOS ==================

function addDispositivo(carrilIndex) {
    proyectoActual.Asignacion[carrilIndex].push({ tipo: null, _visible: false });
    proyectoNoGuardado();
    writeCarriles();
    writeSignals();
}

function elimDispositivo(carrilIndex, dispIndex) {
    proyectoActual.Asignacion[carrilIndex].splice(dispIndex, 1);
    proyectoNoGuardado();
    writeCarriles();
    writeSignals();
}

function moveDispositivo(carrilIndex, dispIndex, dir) {
    const carrilActual = proyectoActual.Asignacion[carrilIndex];

    const nuevoIndex = dispIndex + dir;
    if (nuevoIndex < 0) {
        // no deberia ser posible que ocurra pero si es el primer carril salir sin hacer nada
        if (carrilIndex === 0) return;

        //pasar al final del carril anterior
        const carrilDestino = proyectoActual.Asignacion[carrilIndex + dir];
        const first = carrilActual.shift(); // saca el primer elemento
        carrilDestino.push(first); // lo agrega al final

    } else if (nuevoIndex >= carrilActual.length) {
        // no deberia ser posible que ocurra pero si es el ultimo carril salir sin hacer nada
        if (carrilIndex === proyectoActual.Asignacion.length - 1) return;

        // pasar al principio del carril siguiente
        const carrilDestino = proyectoActual.Asignacion[carrilIndex + dir];
        const last = carrilActual.pop(); // saca el último elemento
        carrilDestino.unshift(last);     // lo agrega como primer elemento

    } else {
        // mover dentro del carril
        [carrilActual[dispIndex], carrilActual[nuevoIndex]] = [carrilActual[nuevoIndex], carrilActual[dispIndex]];
    }
    proyectoNoGuardado();
    writeCarriles();
    writeSignals();
}

function renderDispositivo(devicesContainer, carrilIndex, dispIndex, dispData) {

    const block = document.createElement("div");
    block.classList.add("device-block");

    // === Cabecera ===
    const head = document.createElement("div");
    head.classList.add("device-head");

    // === Selector de modelo ===
    const sel = document.createElement("select");
    sel.classList.add("w3-select", "w3-border", "w3-round", "w3-padding", "selectDispositivo");
    sel.appendChild(new Option("", ""));

    // Dispositivo actualmente seleccionado (por si pertenece a una familia oculta)
    const tipoActual = dispData?.tipo || null;
    const famActual = tipoActual
        ? (dispositivos[tipoActual]?.Disposicion?.Familia || dispositivos[tipoActual]?.Disposicion?.familia)
        : null;

    // === Poblar select ===
    Object.keys(dispositivos).forEach(k => {
        const disp = dispositivos[k];
        const fam = disp?.Disposicion?.Familia || disp?.Disposicion?.familia || "";

        // Mostrar si:
        // - la familia es visible según los checkboxes (familiaVisible)
        // - o el modelo actual pertenece a una familia oculta pero está seleccionado
        if (familiaVisible(fam) || k === tipoActual) {
            sel.appendChild(new Option(k, k));
        }
    });

    // Seleccionar el tipo actual si lo hay
    if (tipoActual) sel.value = tipoActual;

    // === Botones dispositivo ===
    const btnDel = createBoton("w3-red", "papelera", "Eliminar dispositivo", () => {
        if (!confirm("Esta acción no se puede deshacer.\n¿Desea continuar?")) return;
        elimDispositivo(carrilIndex, dispIndex)
    });

    const btnUp = createBoton("w3-blue", "arrow-up", "Subir dispositivo", () =>
        moveDispositivo(carrilIndex, dispIndex, -1)
    );
    btnUp.classList.add("dev-move-up");
    if (carrilIndex === 0 && dispIndex === 0) btnUp.disabled = true;

    const btnDown = createBoton("w3-blue", "arrow-down", "Bajar dispositivo", () =>
        moveDispositivo(carrilIndex, dispIndex, 1)
    );
    btnDown.classList.add("dev-move-down");
    const ultimoCarril = carrilIndex === proyectoActual.Asignacion.length - 1;
    const ultimoDispositivo = dispIndex === proyectoActual.Asignacion[carrilIndex].length - 1;
    if (ultimoCarril && ultimoDispositivo) btnDown.disabled = true;

    // === Botón mostrar/ocultar canales ===
    const btnToggle = createBoton("w3-gray", "eye-slash", "Mostrar/Ocultar canales", () => {
        const oculto = channels.classList.toggle("w3-hide");
        proyectoActual.Asignacion[carrilIndex][dispIndex]._visible = !oculto;
        proyectoNoGuardado();
        if (oculto) {
            btnToggle.innerHTML = '<img src="./images/eye.svg" alt="ver">';
            btnToggle.title = "Mostrar canales.";
        } else {
            btnToggle.innerHTML = '<img src="./images/eye-slash.svg" alt="ocultar">';
            btnToggle.title = "Ocultar canales.";
        }
    });
    btnToggle.classList.add("botonCuadrado");

    head.append(btnDel, btnUp, btnDown, sel, btnToggle);
    block.appendChild(head);

    // === Canales ===
    const channels = document.createElement("div");
    channels.classList.add("channels");

    // Aplicar visibilidad guardada
    if (dispData?._visible === false) {
        channels.classList.add("w3-hide");
        btnToggle.innerHTML = `<img src="./images/eye.svg" alt="ver">`;
        btnToggle.title = "Mostrar canales.";
    } else {
        channels.classList.remove("w3-hide");
        btnToggle.innerHTML = `<img src="./images/eye-slash.svg" alt="ocultar">`;
        btnToggle.title = "Ocultar canales.";
    }

    block.appendChild(channels);

    if (dispData?.tipo) {
        renderCanales(channels, carrilIndex, dispIndex, dispData);
    }

    // === Cambio de modelo ===
    sel.onchange = () => {
        const prev = proyectoActual.Asignacion[carrilIndex][dispIndex]?._visible ?? false;
        proyectoActual.Asignacion[carrilIndex][dispIndex] = { tipo: sel.value, _visible: prev };
        proyectoNoGuardado();
        writeCarriles();
        writeSignals();
    };

    devicesContainer.appendChild(block);
}

function familiaVisible(fam) {

    const familiasConRadio = new Set(["General", "PX", "Synco", "RLU", "Logo", "KNX", "Contaje", "Modbus"]);

    // Si la familia NO está en ninguna categoria de los radios, se muestra esi esta seleccionada la categoria "General".
    if (!familiasConRadio.has(fam)) return UI.General.checked;

    // Obtener la familia seleccionada en los radios
    const checked = document.querySelector('input[name="familiaFiltro"]:checked');
    const familiaSeleccionada = checked ? checked.value : null;

    // Solo visible si su familia coincide con la seleccionada
    return fam === familiaSeleccionada;

}

// ================== SEÑALES ==================

function renderCanales(channelsContainer, carrilIndex, dispIndex, deviceObj) {
    const disp = dispositivos[deviceObj.tipo];
    if (!disp?.Paginas) return;

    disp.Paginas.forEach(pagina => {
        pagina.forEach(conector => {

            // === FRANJA NUMERACION ===
            (conector.Numeracion || []).forEach(n => {
                if (!(typeof n === "object" && n?.señales?.length)) return;

                const nombreBorne = n.nombre || n.num;

                const row = document.createElement("div");
                row.className = "channel-row";

                const label = document.createElement("label");
                label.classList.add("borne-label");
                label.textContent = nombreBorne;

                const sel = document.createElement("select");
                sel.classList.add("w3-select", "w3-border", "w3-round", "borne-select");

                // Guardar los tipos permitidos para este borne
                sel.dataset.seniales = JSON.stringify(n.señales);

                // insertar opcion vacía
                sel.appendChild(new Option("", ""));

                // poblar opciones desde proyectoActual.Listado según señales permitidas
                for (const tipo of n.señales) {
                    (proyectoActual.Listado[tipo] || []).forEach(sig => {
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

                    proyectoActual.Asignacion[carrilIndex][dispIndex][nombreBorne] = uuid;
                    proyectoNoGuardado();
                    updateSelectsSeniales();
                    writeSignals();
                });

                row.append(label, sel);
                channelsContainer.appendChild(row);
            });

            // === FRANJA OPCIONAL ===
            const opcArr = Array.isArray(conector.Opcional)
                ? conector.Opcional
                : (typeof conector.Opcional === "object" && conector.Opcional !== null
                    ? [conector.Opcional]
                    : []);

            opcArr.forEach(opt => {
                if (!opt || typeof opt !== "object") return;

                const nombreOpt = opt.nombre || opt.num || "(sin nombre)";

                const row = document.createElement("div");
                row.classList.add("channel-row");

                const check = document.createElement("input");
                check.type = "checkbox";
                check.classList.add("borne-check");

                const label = document.createElement("label");
                label.classList.add("borne-checklabel");
                label.textContent = nombreOpt;

                const input1 = document.createElement("input");
                input1.type = "text";
                input1.classList.add("w3-input", "w3-border", "w3-round", "borne-input");
                input1.placeholder = opt.Linea1 || "Texto linea 1";

                const input2 = document.createElement("input");
                input2.type = "text";
                input2.classList.add("w3-input", "w3-border", "w3-round", "borne-input");
                input2.placeholder = opt.Linea2 || "Texto linea 2";

                // Lectura del estado almacenado si existe
                const dispEstado = proyectoActual.Asignacion[carrilIndex][dispIndex];
                dispEstado._opcional = dispEstado._opcional || {};
                const opcion = dispEstado._opcional[nombreOpt];

                const initLinea1 = (opcion && typeof opcion.Linea1 === "string") ? opcion.Linea1 : (opt.Linea1 || "");
                const initLinea2 = (opcion && typeof opcion.Linea2 === "string") ? opcion.Linea2 : (opt.Linea2 || "");
                const initActivo = (opcion && typeof opcion.activo === "boolean") ? opcion.activo : false;

                check.checked = initActivo;
                input1.value = initLinea1;
                input2.value = initLinea2;
                input1.disabled = !initActivo;
                input2.disabled = !initActivo;

                // Asegurar que el estado queda inicializado con lo que se está mostrando
                dispEstado._opcional[nombreOpt] = {
                    activo: initActivo,
                    Linea1: initLinea1,
                    Linea2: initLinea2
                };

                check.addEventListener("change", () => {
                    const habilitado = check.checked;
                    input1.disabled = !habilitado;
                    input2.disabled = !habilitado;

                    dispEstado._opcional[nombreOpt].activo = check.checked;
                    proyectoNoGuardado();
                });

                input1.addEventListener("input", () => {
                    dispEstado._opcional[nombreOpt].Linea1 = input1.value;
                    proyectoNoGuardado();
                });

                input2.addEventListener("input", () => {
                    dispEstado._opcional[nombreOpt].Linea2 = input2.value;
                    proyectoNoGuardado();
                });

                row.append(check, label, input1, input2);
                channelsContainer.appendChild(row);
            });
        });
    });
}

function updateSelectsSeniales() {

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    let canalesExtraOcupados = 0;

    // 1) Copia del listado original
    const pool = structuredClone(proyectoActual.Listado);

    // 2) Quitar señales ya usadas
    proyectoActual.Asignacion.forEach(carril => {
        carril.forEach(disp => {
            if (!disp || !disp.tipo) return;

            Object.keys(disp).forEach(k => {
                if (k === "tipo") return;

                const uuid = disp[k];
                if (!uuid || !uuidRegex.test(uuid)) return; // solo UUID válidos

                const tipo = findTipoSenial(uuid);
                if (!tipo) return;

                pool[tipo] = pool[tipo].filter(s => s.ID !== uuid);
            });
        });
    });

    // 3) Reconstruir selects DOM
    const selectores = Array.from(document.querySelectorAll("select.borne-select"));
    for (let i = 0; i < selectores.length; i++) {

        const sel = selectores[i];
        const permitidas = JSON.parse(sel.dataset.seniales || "[]");

        // Guardar la selección actual (si es UUID válido)
        let sigActual = null;
        if (sel.value) {
            try {
                const parsed = JSON.parse(sel.value);
                const esUUID = uuidRegex.test(parsed.ID);
                if (parsed?.ID && esUUID) sigActual = parsed;
            } catch { }
        }

        sel.innerHTML = "";

        if (canalesExtraOcupados > 0) {
            sel.disabled = true;
            canalesExtraOcupados--;
        } else {
            sel.disabled = false;
            if (sigActual) canalesExtraOcupados = sigActual.Numero - 1;

            sel.appendChild(new Option("", "")); // opción vacía

            // Poblar solo con señales que tengan ID válido
            permitidas.forEach(tipo => {
                (pool[tipo] || [])
                    .filter(sig => sig && sig.ID && uuidRegex.test(sig.ID))
                    .forEach(sig => {

                        // Si la señal ocupa más de un canal, comprobar que haya
                        // suficientes selects siguientes que permitan el mismo tipo
                        // y que además estén vacíos (sin selección).
                        const numero = Number(sig.Numero) || 1;
                        let puedeOcupar = true;
                        if (numero > 1) {
                            // comprobar existencia de los siguientes numero-1 selects
                            for (let offset = 1; offset < numero; offset++) {
                                const idx = i + offset;
                                const selSiguiente = selectores[idx];

                                // si no existe el select siguiente -> no se puede usar
                                if (!selSiguiente) {
                                    puedeOcupar = false;
                                    break;
                                }

                                // comprobar que el siguiente admite el mismo tipo
                                const permitidasSgte = JSON.parse(selSiguiente.dataset.seniales || "[]");
                                if (!Array.isArray(permitidasSgte) || !permitidasSgte.includes(tipo)) {
                                    puedeOcupar = false;
                                    break;
                                }

                                // comprobar que el siguiente no tenga seleccionado nada
                                // (consideramos "vacío" si .value es falsy o JSON parse no contiene ID válido)
                                const val = selSiguiente.value;
                                if (val) {
                                    try {
                                        const parsed = JSON.parse(val);
                                        if (parsed && parsed.ID && uuidRegex.test(parsed.ID)) {
                                            // ya tiene selección -> no puede ocupar
                                            puedeOcupar = false;
                                            break;
                                        }
                                    } catch {
                                        // si el valor no es JSON, tratamos como ocupado por seguridad
                                        puedeOcupar = false;
                                        break;
                                    }
                                }
                            }
                        }

                        if (!puedeOcupar) return; // saltar esta señal si no cumple condiciones

                        sel.appendChild(new Option(sig.Linea1, JSON.stringify(sig)));
                    });
            });

            // Reinsertar selección actual si sigue siendo válida
            if (sigActual) {

                // Verificar si la ID está en Asignacion
                const encontrada = proyectoActual.Asignacion
                    .flat()
                    .some(obj => Object.values(obj).includes(sigActual.ID));

                // Si es asi, buscar la uuid dentro de Listado para actualizar Linea 1
                if (encontrada) {
                    for (const grupo of Object.values(proyectoActual.Listado)) {
                        const item = grupo.find(e => e.ID === sigActual.ID);
                        if (item) sigActual = item;
                    }
                }

                const opt = new Option(sigActual.Linea1, JSON.stringify(sigActual));
                opt.selected = true;
                sel.add(opt, 1); // la inserta como segunda opción ( 2ª = index 1 ) para dejar la opcion vacia la primera
            }
        }
    }
}

function findTipoSenial(id) {
    for (const tipo in proyectoActual.Listado) {
        if (proyectoActual.Listado[tipo].some(s => s.ID === id)) return tipo;
    }
    return null;
}

// ================== AUXILIARES ==================

function createBoton(color, icon, title, onClick) {
    const b = document.createElement("button");
    b.classList.add("w3-button", color, "w3-round", "botonCuadDib");
    b.title = title;
    if (icon) b.innerHTML = `<img src="./images/${icon}.svg" alt="${icon}">`;
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
    const layout = generarLayoutHojas();

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
        proyectoActual.Info.Fech = new Date().toISOString().split("T")[0];
        const campos = structuredClone(proyectoActual.Info);
        campos.Inst = nombreProyectoActual.toUpperCase();
        campos.Hoja = `${idx + 1} - ${numHojas}`;

        // Cajetín con datos del formulario (proyectoActual.Info)
        entities.push(...cajetin(CajetinX, CajetinY, campos));

        // Hoja 0 = plano general
        if (idx === 0) {
            entities.push(
                ...dibujarPlanoGeneralDispositivos(CajetinX, CajetinY, dispositivos)
            );
            continue; // saltar a la siguiente hoja
        }

        // Resto de hojas
        let barrasComunes = false;
        hoja.items.forEach(it => {
            const disp = dispositivos[it.key];
            if (disp.Disposicion.Familia !== "General") barrasComunes = true;
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
        if (barrasComunes) entities.push(...dibujarBarrasComunes(CajetinX, CajetinY, hoja.items));
    }

    // 5) Cerrar y descargar
    let dxfContent = wrapDXF(entities);
    dxfContent = quitarCaracteresNoASCII(dxfContent);

    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nombreProyectoActual || "Proyecto"} - Esquemas de control.dxf`;
    a.click();
    URL.revokeObjectURL(url);
}

function dibujarPlanoGeneralDispositivos(CajetinX, CajetinY, dispositivos) {
    const entidades = [];

    // === Flags cota ===
    const FLECHAS = true;  // flechas en extremos de cotas
    const LINEAS = true;  // lineas cortas en extremos de cotas

    // === Config fuentes ===
    const FONT_NAME = 5;
    const FONT_DIM = 2;
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

    // === Carriles (filtrando dispositivos con dimensiones válidas) ===
    const carriles = (proyectoActual.Asignacion || []).map(carril => carril
        .map(d => dispositivos[d.tipo])
        .filter(d => d && (d.Disposicion?.Ancho > 0) && (d.Disposicion?.Alto > 0))
    ).filter(carril => carril.length > 0);

    // === Dimensiones base ===
    const dims = carriles.map(carril => carril.map(d => ({
        ancho: d.Disposicion?.Ancho || 40,
        alto: d.Disposicion?.Alto || 60,
        nombre: d.Nombre,
        tipo: d.Disposicion?.Tipo || "modulo",
        familia: d.Disposicion?.Familia || "General",
    })));

    if (dims.length === 0) return entidades; // No hay nada que dibujar

    // === Cálculo de alturas y anchos por carril ===
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
        return lineaDXF(x, y - 2 * len, x, y + len, 5, "Continuous", 1, 5);
    }
    function tickHoriz(x, y, len = 2) {
        // horizontal tick → para cotas verticales
        return lineaDXF(x - len, y, x + 2 * len, y, 5, "Continuous", 1, 5);
    }

    // === Flechas (reutilizando SOLID) ===
    function flecha(x, y, dir) {
        const arrowLen = 3;
        const arrowWidth = arrowLen / 4;

        if (dir === "up") return solidDXF([[x, y], [x - arrowWidth, y - arrowLen], [x + arrowWidth, y - arrowLen]], 5);
        if (dir === "down") return solidDXF([[x, y], [x - arrowWidth, y + arrowLen], [x + arrowWidth, y + arrowLen]], 5);
        if (dir === "left") return solidDXF([[x, y], [x + arrowLen, y - arrowWidth], [x + arrowLen, y + arrowWidth]], 5);
        if (dir === "right") return solidDXF([[x, y], [x - arrowLen, y - arrowWidth], [x - arrowLen, y + arrowWidth]], 5);
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
            let compensaX = 0; // compensar la X cuando giramos 45º para que quede mejor centrado
            let rot = 0, des_cx = 0, des_cy = 0;
            if (d.alto > d.ancho * 1.75) {
                rot = 90; des_cx = 2.5;
                des_cy = 2.5;
            }
            else if (d.alto > d.ancho) {
                rot = 45;
                des_cx = 1.75;
                des_cy = 0.75;
                compensaX = 2
            }

            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;

            // los textos del logo suelen ser demasiado largos para lo que ocupa su caja de dimensiones
            let multAncho = d.familia.toUpperCase().startsWith("LOGO") ? 0.7 : 1;

            entidades.push(
                textoDXF(cx - des_cx + compensaX, cy + 2.5 - des_cy, d.nombre, FONT_NAME, 'MC', rot, "Negrita", multAncho)
            );

            const dimText = `${d.ancho} x ${d.alto} mm`;
            entidades.push(
                textoDXF(cx + des_cx + compensaX, cy - 2.5 + des_cy, dimText, FONT_DIM, 'MC', rot)
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
            lineaDXF(cotaX, carrilTop, cotaX, carrilBottom, 5, "Continuous", 1, 5)
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
            textoDXF(cotaTextX, textY, textCota, FONT_DIM_COTA, 'MC', 90, "Standard", 1, 5)
        );

        // === COTAS HORIZONTALES ===
        tramos.forEach(([xStart, xEnd, realWidth]) => {
            const yCota = carrilTop + COTA_HORZ_OFFSET_Y * scale;
            const yText = yCota + COTA_HORZ_TEXT_OFFSET_Y * scale;

            entidades.push(
                lineaDXF(xStart, yCota, xEnd, yCota, 5, "Continuous", 1, 5)
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
                textoDXF(cx, yText, txt, FONT_DIM_COTA, 'MC', 0, "Standard", 1, 5)
            );
        });

        cursorY -= (carrilAltoReal * scale + SEP_VERTICAL * scale);
    });

    return entidades;
}

function generarLayoutHojas() {
    const hojas = [];
    const nuevaHoja = () => hojas.push({ items: [] });

    // Garantiza al menos 1
    if (hojas.length === 0) nuevaHoja();

    (proyectoActual.Asignacion || []).forEach((carril, carrilIndex) => {
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
            const familia = disp?.Disposicion?.Familia || "Synco";
            const tension230 = disp?.Disposicion?.Tension230 ?? true;
            const tension24 = disp?.Disposicion?.Tension24 ?? true;
            const anchos = disp?.Disposicion?.AnchoEnHoja || [disp?.Disposicion?.Ancho || HOJA_UTIL];
            const pages = anchos.length;

            for (let p = 0; p < pages; p++) {
                items.push({
                    key,
                    tipo,               // "controlador" | "modulo" | ...
                    familia,            // PX, Synco,General,....
                    tension230,         // true/false
                    tension24,          // true/false
                    pageIndex: p,       // índice de página
                    pages,              // total de páginas
                    width: anchos[p],   // el ancho de esta pagina
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

            // Si el item es de familia General → ponerlo solo en una hoja
            if (it.familia === "General") {
                if (hojaActual.items.length > 0) {
                    nuevaHoja();
                    hojaActual = hojas[hojas.length - 1];
                }

                hojaActual.items.push(it);

                // Solo crear una hoja nueva si hay más items después
                const hayMasItems = i < items.length - 1;
                if (hayMasItems) {
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

    // largura en vase a la longitud de "numeracion" de todos los conectores
    const largura = dispositivo?.Disposicion?.AnchoEnHoja?.[pageIndex] ??
        (pagina.map(c => ((c.Numeracion?.length || 0) + 1)).reduce((a, b) => a + b, 0) * paso);

    // idem excluyendo a los conectores marcados con noEnv
    const larguraNoEnv = pagina
        .map(c => c.noEnv ? 0 : ((c.Numeracion?.length || 0) + 1))
        .reduce((a, b) => a + b, 0) * paso;

    let inX = hojaX + startX;
    let inY = hojaY + 236;

    // Envolvente + título (solo si existe la propiedad alto y ancho o y son mayores que 0)
    if (dispositivo.Disposicion.Alto && dispositivo.Disposicion.Ancho) {
        entidades.push(...hashEnv(inX, inY, larguraNoEnv));
        entidades.push(textoDXF(inX + 2, inY + 21, dispositivo.Nombre, 3, 'ML', 0, "Negrita"));
    }

    // Marca de módulo PX (si aplica)
    const { Familia, Tipo, Alto } = dispositivo.Disposicion || {};
    if (Familia === "PX" && Tipo === "modulo") {
        nModulo++;
        entidades.push(
            textoDXF(inX + larguraNoEnv - 5, inY + 21, `${nModulo}`, 3, 'MC', 0, "Negrita"),
            lineaDXF(inX + larguraNoEnv - 10, inY + 18, inX + larguraNoEnv - 10, inY + 24),
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
            const { num, seniales, nombre, desG, desG0, digLogo24, multSeñales } = normalizarBorne(borneObj);

            // nombre del borne (para mapear en estado)
            const nombreBorne = nombre || num || null;
            if (nombreBorne) {
                const dispEstado = proyectoActual.Asignacion?.[carrilIndex]?.[dispIndex];
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
                                ...fn(inX, inY, L1Mayus, L2Mayus, sig.tagNumber, desG, desG0, digLogo24)
                            );
                        } else {
                            console.warn(`⚠️ Falta función símbolo DXF: ${funcionNombre}(x,y,Linea1,Linea2,tag)`);
                        }
                    }
                }
            }

            // 2) Dibujar resto de franjas
            franjas.forEach(franja => {

                if (Array.isArray(conector[franja])) {

                    let valor = conector[franja][i];

                    if (franja === "Numeracion" && valor && typeof valor === "object") {
                        // extraestrecho y desX aparecen cuando el texto no entra y hay que hacerlo mas estrecho
                        // vease los textos de los contactos conmutados del synco
                        const { extraEstrecho = false, desX = 0, num = "-" } = valor;
                        if (!conector.noEnv) entidades.push(...hasheador(inX + desX, inY, num, franja, extraEstrecho));
                    } else if (franja === "Opcional" && valor && typeof valor === "object") {

                        const nombreOpt = valor.nombre || valor.num || "(sin nombre)";
                        const estadoDisp = proyectoActual.Asignacion?.[carrilIndex]?.[dispIndex];
                        const optEstado = estadoDisp?._opcional?.[nombreOpt];
                        const activo = optEstado?.activo ?? true;
                        const desX = valor.desX ?? 0;
                        const dibujo = optEstado?.dibujo || valor.dibujo || "";
                        const linea1 = (optEstado?.Linea1 ?? valor.Linea1 ?? "").toUpperCase();
                        const linea2 = (optEstado?.Linea2 ?? valor.Linea2 ?? "").toUpperCase();
                        const espejo1 = optEstado?.Espejo1 ?? valor.Espejo1 ?? 0;
                        const espejo2 = optEstado?.Espejo2 ?? valor.Espejo2 ?? 0;

                        const Xtexto = inX - (conector[franja].length - 1) * paso / 2;

                        if (activo) {
                            entidades.push(...hasheador(inX, inY, dibujo, franja));
                            if (linea1 !== "" || linea2 !== "") {
                                entidades.push(textoMultiDXF(Xtexto + desX, inY - 190, [linea1, linea2], 2.5, 'ML', 90));
                            }
                            if (espejo1 && linea1 !== "") {
                                entidades.push(textoDXF(Xtexto + desX + espejo1, inY - 190, linea1, 2.5, 'ML', 90));
                            }
                            if (espejo2 && linea2 !== "") {
                                entidades.push(textoDXF(Xtexto + desX + espejo2, inY - 190, linea2, 2.5, 'ML', 90));
                            }

                        }

                    } else {
                        if (!conector.noEnv) entidades.push(...hasheador(inX, inY, valor, franja));
                    }
                }
            });
        }

        inX += paso;
        if (Alto && idxCon + 1 < (pagina.length || 0)) {
            if (!conector.noEnv) entidades.push(...hasheador(inX, inY, "#Sep"));
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
            desG: borne.desG ?? 0,
            desG0: borne.desG0 ?? 0,
            digLogo24: borne.digLogo24 ?? false,
        };
    }
    return { num: borne ?? null, seniales: [], nombre: null, desG: 0, desG0: 0, digLogo24: false };
}

function obtenerSenialPorUUID(uuid) {
    const lst = proyectoActual.Listado || {};
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
    const despY = { "S0": paso * 1, "G": paso * 3, "G0": paso * 4, "CE+": paso * 6, "CE-": paso * 7, "N0": paso * 25 };

    if (!hojaItems.length) return entidades;

    let KNX = false;
    let Logo = false;
    let dostreinta = false;
    let veinticuatro = false;


    // determinar si hay que dibujar el bus knx transversal
    hojaItems.forEach(item => {
        if (item.familia.toUpperCase() === "SYNCO") {
            KNX = true;
        } else if (item.familia.toUpperCase() === "LOGO") {
            Logo = true;
        }
        if (item.tension230) dostreinta = true;
        if (item.tension24) veinticuatro = true;
    });

    const xInicio = Math.min(...hojaItems.map(it => it.x)) + CajetinX;
    const xFin = Math.max(...hojaItems.map(it => it.x + it.width)) + CajetinX;

    Object.entries(despY).forEach(([key, value]) => {

        const y = CajetinY + 236 - value;

        if (KNX && (key === "CE+" || key === "CE-")) {
            const colorLinea = key === "CE+" ? 96 : 1;
            entidades.push(
                textoDXF(xInicio - 2, y, key, 2.5, 'MR'),
                lineaDXF(xInicio, y, xFin, y, -1, "Continuous", 1, colorLinea),
                textoDXF(xFin + 2, y, key, 2.5, 'ML'),
            );
        }

        if (dostreinta && (key === "S0" || key === "N0")) {
            entidades.push(
                textoDXF(xInicio - 2, y, key, 2.5, 'MR'),
                lineaDXF(xInicio, y, xFin, y),
                textoDXF(xFin + 2, y, key, 2.5, 'ML'),
            );
        }

        if (veinticuatro && (key === "G" || key === "G0")) {

            // cambiar G y G0 por L+ y M para Logo
            let etiqueta = key;
            if (!KNX && Logo && key === "G") etiqueta = "L+";
            if (!KNX && Logo && key === "G0") etiqueta = "M";

            entidades.push(
                textoDXF(xInicio - 2, y, etiqueta, 2.5, 'MR'),
                lineaDXF(xInicio, y, xFin, y),
                textoDXF(xFin + 2, y, etiqueta, 2.5, 'ML'),
            );
        }
    });

    return entidades;
}

function quitarCaracteresNoASCII(texto) {
    return texto
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, '');
}
