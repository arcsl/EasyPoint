/* ================== CONST & UI ================== */
const HOJA_TOTAL = 400;
const HOJA_UTIL = 380;
const MARGEN_X = (HOJA_TOTAL - HOJA_UTIL) / 2;
const SEP_CONTROLADOR = 20;

const UI = {};
document.querySelectorAll("[id]").forEach(el => UI[el.id] = el);

/* === Cálculo AnchoEnHoja (soporta Numeracion mixta string/objeto) === */

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

/* ================== CARRILES ================== */

UI.btnAddCarril.onclick = function () {
    const carrilesCont = UI.CarrilesContenedor;

    // Carril wrapper
    const carril = document.createElement("div");
    carril.className = "carril-row w3-margin-bottom";

    // Col izquierda: botones + label
    const colLeft = document.createElement("div");
    colLeft.style.display = "flex";
    colLeft.style.flexDirection = "column";
    colLeft.style.gap = "6px";

    const rowTop = document.createElement("div");
    rowTop.className = "carril-header";

    const btnDel = boton("w3-red", "trash", "Eliminar carril", () => {
        carril.remove();
        renumerarCarriles();
    });

    const btnUp = boton("w3-blue", "arrow-up", "Subir carril", () => moverCarril(carril, -1));
    btnUp.classList.add("carril-move-up", "w-fixed-btn");

    const btnDown = boton("w3-blue", "arrow-down", "Bajar carril", () => moverCarril(carril, +1));
    btnDown.classList.add("carril-move-down", "w-fixed-btn");

    const lbl = document.createElement("label");
    lbl.className = "carril-label w3-margin-left w3-margin-right";
    lbl.textContent = "Carril";

    rowTop.append(btnDel, btnUp, btnDown, lbl);
    colLeft.appendChild(rowTop);

    // Col derecha: contenido del carril
    const colRight = document.createElement("div");
    colRight.className = "carril-col";

    // Botón añadir dispositivo
    const btnAddDev = document.createElement("button");
    btnAddDev.className = "w3-button w3-green w3-round w3-small w3-hover-dark-green";
    btnAddDev.innerHTML = `<i class="fa fa-plus"></i> Añadir dispositivo`;
    btnAddDev.onclick = () => crearBloqueDispositivo(devicesContainer);

    // Contenedor de dispositivos (bloques)
    const devicesContainer = document.createElement("div");
    devicesContainer.className = "devices-container";

    colRight.append(btnAddDev, devicesContainer);
    carril.append(colLeft, colRight);

    carrilesCont.appendChild(carril);
    renumerarCarriles();
};

function boton(color, icon, title, onClick) {
    const b = document.createElement("button");
    b.className = `w3-button ${color} w3-round w3-small`;
    b.title = title;
    b.innerHTML = `<i class="fa fa-${icon}"></i>`;
    b.onclick = onClick;
    return b;
}

function moverCarril(carril, dir) {
    const cont = UI.CarrilesContenedor;
    const carriles = [...cont.querySelectorAll(".carril-row")];
    const i = carriles.indexOf(carril);
    const j = i + dir;
    if (j < 0 || j >= carriles.length) return;
    if (dir > 0) cont.insertBefore(carril, carriles[j].nextSibling);
    else cont.insertBefore(carril, carriles[j]);
    renumerarCarriles();
}

function renumerarCarriles() {
    const carriles = [...UI.CarrilesContenedor.querySelectorAll(".carril-row")];
    carriles.forEach((c, i) => {
        c.querySelector(".carril-label").textContent = `Carril ${i + 1}`;
        const up = c.querySelector(".carril-move-up");
        const dn = c.querySelector(".carril-move-down");
        if (up) up.disabled = (i === 0);
        if (dn) dn.disabled = (i === carriles.length - 1);
        actualizarBotonesDispositivos(c); // deshabilita ↑/↓ en bloques internos
    });
}

/* ================== DISPOSITIVOS (bloques dentro del carril) ================== */
function crearBloqueDispositivo(devicesContainer) {
    const block = document.createElement("div");
    block.className = "device-block w3-white";

    // Cabecera del bloque
    const head = document.createElement("div");
    head.className = "device-head";

    // Select de equipo
    const sel = document.createElement("select");
    sel.className = "w3-select w3-border w3-round w3-small w3-padding";
    sel.style.width = "220px";
    sel.appendChild(new Option("", ""));
    Object.keys(controladores).forEach(k => sel.appendChild(new Option(k, k)));

    // Botones del bloque
    const btnDel = boton("w3-red", "trash", "Eliminar dispositivo", () => {
        block.remove();
        actualizarBotonesDispositivos(devicesContainer.closest(".carril-row"));
    });
    const btnUp = boton("w3-blue", "arrow-up", "Subir dispositivo", () => moverDispositivo(block, -1));
    btnUp.classList.add("dev-move-up", "w-fixed-btn");
    const btnDown = boton("w3-blue", "arrow-down", "Bajar dispositivo", () => moverDispositivo(block, +1));
    btnDown.classList.add("dev-move-down", "w-fixed-btn");

    head.append(sel, btnDel, btnUp, btnDown);
    block.appendChild(head);

    // Contenedor de canales (aparece al seleccionar)
    const channels = document.createElement("div");
    channels.className = "channels";
    block.appendChild(channels);

    // onChange: rellenar canales del equipo
    sel.onchange = () => {
        channels.innerHTML = "";
        const key = sel.value;
        if (!key) return;
        pintarCanales(channels, key);
    };

    devicesContainer.appendChild(block);
    actualizarBotonesDispositivos(devicesContainer.closest(".carril-row"));
}

function moverDispositivo(block, dir) {
    const cont = block.parentElement; // devicesContainer
    const blocks = [...cont.querySelectorAll(".device-block")];
    const i = blocks.indexOf(block);
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    if (dir > 0) cont.insertBefore(block, blocks[j].nextSibling);
    else cont.insertBefore(block, blocks[j]);
    actualizarBotonesDispositivos(cont.closest(".carril-row"));
}

function actualizarBotonesDispositivos(carrilRow) {
    const blocks = [...carrilRow.querySelectorAll(".device-block")];
    blocks.forEach((b, i) => {
        const up = b.querySelector(".dev-move-up");
        const dn = b.querySelector(".dev-move-down");
        if (up) up.disabled = (i === 0);
        if (dn) dn.disabled = (i === blocks.length - 1);
    });
}

/* ================== CANALES (bornes con señales) ================== */

function pintarCanales(channelsContainer, deviceKey) {
    const disp = controladores[deviceKey];
    if (!disp?.Paginas) return;

    // título del dispositivo (opcional)
    const h = document.createElement("div");
    h.className = "w3-text-indigo w3-small w3-margin-bottom";
    h.textContent = deviceKey;
    channelsContainer.appendChild(h);

    const bornes = [];
    disp.Paginas.forEach(pagina => {
        pagina.forEach(conector => {
            (conector.Numeracion || []).forEach(n => {
                if (typeof n === "object" && n?.señales?.length) bornes.push(n);
            });
        });
    });

    bornes.forEach(b => {
        const row = document.createElement("div");
        row.className = "channel-row";

        const name = document.createElement("span");
        name.className = "w3-small";
        name.textContent = b.nombre || b.num;

        const sel = document.createElement("select");
        sel.className = "w3-select w3-border w3-round w3-small";
        sel.style.width = "220px";
        sel.appendChild(new Option("", ""));
        // 👇 aún NO poblamos opciones; solo guardamos qué admite
        sel.dataset.seniales = JSON.stringify(b.señales);

        row.append(name, sel);
        channelsContainer.appendChild(row);
    });
}





/* ================== CREAR DXF ================== */

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