// ================== CONST & UI ==================
const HOJA_TOTAL = 400;
const HOJA_UTIL = 380;
const MARGEN_X = (HOJA_TOTAL - HOJA_UTIL) / 2;
const SEP_CONTROLADOR = 20;

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
        Stdo: UI.Stdo.value
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
    btnAddDev.classList.add("w3-button", "w3-green", "w3-round", "w3-small");
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
    console.log(estado.carriles);
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
    sel.classList.add("w3-select", "w3-border", "w3-round", "w3-small", "w3-padding", "botonAniadir");
    sel.appendChild(new Option("", ""));

    Object.keys(controladores).forEach(k => sel.appendChild(new Option(k, k)));
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

function pintarCanalesDesdeEstado(channelsContainer, carrilIndex, dispIndex, deviceObj) {
    const disp = controladores[deviceObj.tipo];
    if (!disp?.Paginas) return;

    disp.Paginas.forEach(pagina => {
        pagina.forEach(conector => {
            (conector.Numeracion || []).forEach(n => {
                if (!(typeof n === "object" && n?.señales?.length)) return;

                const nombreBorne = n.nombre || n.num;

                const row = document.createElement("div");
                row.className = "channel-row";

                const label = document.createElement("label");
                label.textContent = nombreBorne;

                const sel = document.createElement("select");
                sel.classList.add("w3-select", "w3-border", "w3-round", "w3-small", "borne-select");
                sel.style.width = "220px";

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



// ================== SEÑALES ==================

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
    Object.keys(controladores).forEach(ctrlName => {
        const ctrl = controladores[ctrlName];
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

function leerCarrilesDesdeUI() {
    const carriles = [];
    const carrilRows = UI.CarrilesContenedor.querySelectorAll(".carril-row");

    carrilRows.forEach(row => {
        const devicesContainer = row.querySelector(".devices-container");
        if (!devicesContainer) return;

        const deviceBlocks = devicesContainer.querySelectorAll(".device-block");
        const equipos = [];
        deviceBlocks.forEach(block => {
            const sel = block.querySelector("select");
            if (sel && sel.value) equipos.push(sel.value);
        });

        if (equipos.length > 0) carriles.push(equipos);
    });

    return carriles;  // Array<Array<string>>
}

function expandirCarrilAItems(listaEquipos) {
    // -> [{ key, tipo, pageIndex, pages, width }]
    const items = [];
    for (const key of listaEquipos) {
        const disp = controladores[key];
        if (!disp) continue;

        const tipo = disp?.Disposicion?.Tipo || "controlador";
        const anchos = disp?.Disposicion?.AnchoEnHoja || [disp?.Disposicion?.Ancho || HOJA_UTIL];
        const pages = anchos.length;

        for (let i = 0; i < pages; i++) {
            items.push({
                key,
                tipo,         // "controlador" | "modulo" | ...
                pageIndex: i, // índice de página dentro del dispositivo
                pages,        // total de páginas de ese dispositivo
                width: anchos[i]
            });
        }
    }
    return items;
}

function generarLayoutHojasDesdeCarriles(carriles) {
    // -> Array<{ items: Array<{key, pageIndex, tipo, width}> }>
    const hojas = [];

    const nuevaHoja = () => hojas.push({ items: [] });
    if (hojas.length === 0) nuevaHoja();

    for (const carril of carriles) {
        const items = expandirCarrilAItems(carril);

        // cada carril empieza SIEMPRE en hoja nueva
        if (hojas[hojas.length - 1].items.length > 0) nuevaHoja();

        let hojaActual = hojas[hojas.length - 1];

        for (let idx = 0; idx < items.length; idx++) {
            const it = items[idx];

            // Caso multipágina: cada página en hoja distinta (consecutivas)
            if (it.pages > 1) {
                // si la hoja actual no está vacía, salto a hoja nueva
                if (hojaActual.items.length > 0) {
                    nuevaHoja();
                    hojaActual = hojas[hojas.length - 1];
                }
                hojaActual.items.push({ key: it.key, pageIndex: it.pageIndex, tipo: it.tipo, width: it.width });

                // para la siguiente página, saltamos de hoja
                if (idx < items.length - 1 && items[idx + 1].key === it.key) {
                    nuevaHoja();
                    hojaActual = hojas[hojas.length - 1];
                }
                continue;
            }

            // No multipágina: empaquetar en la hoja con separaciones
            const itemsHoja = hojaActual.items;
            const isFirst = itemsHoja.length === 0;
            const sep = (!isFirst && it.tipo === "controlador") ? SEP_CONTROLADOR : 0;

            // calcular anchura ocupada actual
            let ocupado = 0;
            itemsHoja.forEach((hitem, i) => {
                const sepThis = (i === 0) ? 0 : (hitem.tipo === "controlador" ? SEP_CONTROLADOR : 0);
                ocupado += sepThis + hitem.width;
            });

            // ¿cabe el nuevo?
            if (ocupado + sep + it.width > HOJA_UTIL) {
                // nueva hoja
                nuevaHoja();
                hojaActual = hojas[hojas.length - 1];
            }

            hojaActual.items.push({ key: it.key, pageIndex: it.pageIndex, tipo: it.tipo, width: it.width });
        }

        // al terminar el carril, preparamos hoja nueva para el siguiente carril
        nuevaHoja();
    }

    // eliminar posibles hojas vacías al final
    while (hojas.length && hojas[hojas.length - 1].items.length === 0) {
        hojas.pop();
    }

    return hojas;
}

function centrarItemsEnHojas(layout) {
    layout.forEach(hoja => {
        if (!hoja.items.length) return;

        // suma total (anchos + separaciones)
        let total = 0;
        hoja.items.forEach((it, i) => {
            const sep = (i === 0) ? 0 : (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);
            total += sep + it.width;
        });

        const offset = (HOJA_UTIL - total) / 2;
        let cursor = MARGEN_X + offset;

        hoja.items.forEach((it, i) => {
            const sep = (i === 0) ? 0 : (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);
            cursor += sep;
            it.x = cursor;         // 👈 ya con x
            cursor += it.width;
        });
    });
}

function dibujarBarrasComunes(CajetinX, CajetinY, hojaItems) {
    const entidades = [];
    const paso = 4;

    // coordenadas de Y relativas a la lógica existente
    const despYtransv = { L: paso * 1, G: paso * 3, G0: paso * 4, N: paso * 25 };

    if (!hojaItems.length) return entidades;

    // calcular extremo izquierdo y derecho de la hoja (según tu layout)
    const xInicio = Math.min(...hojaItems.map(it => it.x)) + CajetinX;
    const xFin = Math.max(...hojaItems.map(it => it.x + it.width)) + CajetinX;

    Object.entries(despYtransv).forEach(([key, value]) => {
        const y = CajetinY + 236 - value;

        entidades.push(
            // Texto izquierda
            textoDXF(xInicio - 2, y, key, 2.5, 'MR'),
            // Línea horizontal
            lineaDXF(xInicio, y, xFin, y),
            // Texto derecha
            textoDXF(xFin + 2, y, key, 2.5, 'ML'),
        );
    });

    return entidades;
}

// function limpiarHojasVacias(layout) {
//     while (layout.length && layout[layout.length - 1].items.length === 0) {
//         layout.pop();
//     }
// }

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

function descargarDXF() {
    const entities = [];

    // cajetin data
    const test = {
        Inst: UI.Inst.value || "-",
        Dibu: UI.Dibu.value || "-",
        Fech: UI.Fech.value || "-",
        Revi: UI.Revi.value || "-",
        Esqu: UI.Esqu.value || "-",
        Clie: UI.Clie.value || "-",
        Loca: UI.Loca.value || "-",
        Stye: UI.Stye.value || "-",
        Stdo: UI.Stdo.value || "-",
        Refe: "-",
        Hoja: "-",
    };

    // 1) Carriles desde UI
    const carriles = leerCarrilesDesdeUI();

    // 2) Layout de hojas (raw)
    let layout = generarLayoutHojasDesdeCarriles(carriles);

    // 3) Eliminar última hoja si está vacía
    // limpiarHojasVacias(layout);

    // 4) Centrar los elementos horizontalmente
    centrarItemsEnHojas(layout);

    const numHojas = layout.length;
    const { filas, columnas } = calcularMatrizCajetines(numHojas);

    // 5) Dibujo DXF
    for (let idx = 0; idx < numHojas; idx++) {
        const hoja = layout[idx];
        const CajetinX = (idx % columnas) * 420;
        const CajetinY = (filas - 1 - Math.floor(idx / columnas)) * 300;

        test.Hoja = `${idx + 1} - ${numHojas}`;
        entities.push(...cajetin(CajetinX, CajetinY, test));

        hoja.items.forEach(it => {
            const disp = controladores[it.key];
            entities.push(
                ...dibujarPaginaDeDispositivo(CajetinX, CajetinY, disp, it.pageIndex, it.x)
            );
        });

        entities.push(...dibujarBarrasComunes(CajetinX, CajetinY, hoja.items));

    }

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

function quitarCaracteresNoASCII(texto) {
    return texto
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, '');
}

function dibujarPaginaDeDispositivo(hojaX, hojaY, dispositivo, pageIndex, startX) {
    const entidades = [];

    const paso = 4;
    const franjas = ["Cinta", "Subcinta", "Simbolos", "Numeracion", "Opcional", "Etiqueta", "Fijo"];
    const despYtransv = { L: paso * 1, G: paso * 3, G0: paso * 4, N: paso * 25 };

    const pagina = dispositivo.Paginas[pageIndex];
    const largura = dispositivo?.Disposicion?.AnchoEnHoja?.[pageIndex] ??
        (pagina.map(c => (c.Numeracion.length + 1)).reduce((a, b) => a + b, 0) * paso);

    let inX = hojaX + startX; // 👈 empezamos donde nos diga el layout
    let inY = hojaY + 236;

    // envolvente
    entidades.push(...hashEnv(inX, inY, largura));

    // nombre del dispositivo
    entidades.push(textoDXF(inX + 2, inY + 21, dispositivo.Nombre, 3, 'ML', 0, "Negrita"));

    // número de módulo si aplica
    const { Familia, Tipo } = dispositivo.Disposicion;
    if (Familia === "PX" && Tipo === "modulo") {
        entidades.push(
            textoDXF(inX + largura - 5, inY + 21, "#", 3, 'MC', 0, "Negrita"),
            lineaDXF(inX + largura - 10, inY + 18, inX + largura - 10, inY + 24),
        );
    }

    // rellenar envolvente
    pagina.forEach((conector, idx) => {
        // strings centradas en su bloque
        franjas.forEach(franja => {
            if (typeof conector[franja] === "string") {
                const largoConector = ((conector.Numeracion?.length || 0) + 1) * paso;
                const posXFranjaCentrada = inX + largoConector / 2;
                entidades.push(...hasheador(posXFranjaCentrada, inY, conector[franja], franja));
            }
        });

        for (let i = 0; i < (conector.Numeracion?.length || 0); i++) {
            inX += paso;

            // Obtener valor numérico del borne y señales
            const { num, seniales } = normalizarBorne(conector.Numeracion[i]);

            // Dibujar símbolos de cada franja
            franjas.forEach(franja => {
                if (Array.isArray(conector[franja])) {

                    // Valor original (puede ser string u objeto)
                    let valor = conector[franja][i];

                    // 🔧 Normalizar: si es objeto {num,señales} → usar valor.num
                    if (typeof valor === "object" && valor !== null) {
                        valor = valor.num;
                    }

                    entidades.push(...hasheador(inX, inY, valor, franja));
                }
            });


        }

        inX += paso;

        if (idx + 1 < pagina.length) entidades.push(...hasheador(inX, inY, "#Sep"));
    });

    return entidades;
}

function normalizarBorne(borne) {
    if (borne && typeof borne === "object") {
        return {
            num: borne.num ?? null,
            seniales: borne.señales ?? [],
        };
    }
    return { num: borne ?? null, seniales: [] };
}