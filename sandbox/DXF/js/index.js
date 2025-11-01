
const HOJA_TOTAL = 400;       // ancho útil original del cajetín
const HOJA_UTIL = 380;       // tu regla 1.1 (usamos 380 para dejar margen)
const MARGEN_X = (HOJA_TOTAL - HOJA_UTIL) / 2; // 10 a cada lado con 380
const SEP_CONTROLADOR = 20;   // tu regla 1.2 (entre controladores, salvo 1º de hoja)

/* ------------------------- REFERENCIAS AL DOM EN OBJETO UI ------------------------- */
const UI = {};
document.querySelectorAll("[id]").forEach(el => UI[el.id] = el);

(function calcularAnchosPorPagina() {

    const paso = 4;

    Object.keys(controladores).forEach(ctrlName => {
        const ctrl = controladores[ctrlName];
        if (!ctrl.Paginas) return;

        ctrl.Disposicion.AnchoEnHoja = ctrl.Paginas.map(pagina => {

            // cuenta bornes, sean strings u objetos
            const largo = pagina
                .map(conector =>
                    conector.Numeracion
                        .map(n => typeof n === "object" ? 1 : 1) // 1 borne
                        .reduce((a, b) => a + b, 0) + 1 // +1 separador
                )
                .reduce((a, b) => a + b, 0);

            return largo * paso;
        });
    });

})();

UI.btnAddCarril.onclick = function () {

    const cont = UI.CarrilesContenedor;

    // contenedor carril
    const carril = document.createElement("div");
    carril.className = "carril-row w3-margin-bottom";

    // botón eliminar carril
    const btnDel = document.createElement("button");
    btnDel.className = "w3-button w3-red w3-round w3-small";
    btnDel.innerHTML = `<i class="fa fa-trash"></i>`;
    btnDel.onclick = () => {
        const index = [...UI.CarrilesContenedor.querySelectorAll(".carril-row")].indexOf(carril);
        carril.remove();

        // eliminar también el bloque de señales correspondiente
        const signalBlocks = UI.CarrilesSenialesCont.querySelectorAll(".carril-seniales-row");
        if (signalBlocks[index]) signalBlocks[index].remove();

        renumerarCarriles();
    };

    // botón subir
    const btnUp = document.createElement("button");
    btnUp.className = "w3-button w3-blue w3-round w3-small carril-move-up";
    btnUp.innerHTML = `<i class="fa fa-arrow-up"></i>`;
    btnUp.onclick = () => moverCarril(carril, -1);

    // botón bajar
    const btnDown = document.createElement("button");
    btnDown.className = "w3-button w3-blue w3-round w3-small carril-move-down";
    btnDown.innerHTML = `<i class="fa fa-arrow-down"></i>`;
    btnDown.onclick = () => moverCarril(carril, +1);

    // label "Carril X"
    const lbl = document.createElement("label");
    lbl.className = "carril-label w3-margin-left w3-margin-right labelCarril";
    lbl.textContent = "Carril";

    // Div para Selectores 
    const selDiv = document.createElement("div");
    selDiv.className = "divSelectores";

    // primer select
    const sel = crearSelectorEquipo(() => agregarSelector(selDiv), carril);

    carril.appendChild(btnDel);
    carril.appendChild(btnUp);
    carril.appendChild(btnDown);
    carril.appendChild(lbl);
    carril.appendChild(selDiv);
    selDiv.appendChild(sel);

    cont.appendChild(carril);

    // Crear contenedor para señales correspondiente
    const signalsBlock = document.createElement("div");
    signalsBlock.className = "carril-seniales-row w3-card w3-padding w3-white w3-margin-bottom";

    // Título del carril de señales
    const title = document.createElement("h5");
    title.className = "w3-text-indigo";
    title.textContent = `Carril - Señales`;

    signalsBlock.appendChild(title);

    UI.CarrilesSenialesCont.appendChild(signalsBlock);

    renumerarCarriles();
};

function crearSelectorEquipo(onSelect, carril) {

    const sel = document.createElement("select");
    sel.className = "w3-select w3-border w3-round w3-small w3-padding carril-select dispSelect";

    sel.appendChild(new Option("", "")); // vacío

    Object.keys(controladores).forEach(k =>
        sel.appendChild(new Option(k, k))
    );

    sel.onchange = () => {
        if (sel.value === "") return; // si lo deja vacío, no hacemos nada
        // if (sel.nextElementSibling) return; // comprobar si este select es el último del carril
        // onSelect();

        if (!sel.nextElementSibling) onSelect();

        // 👉 Crear bloque de señales para este dispositivo
        const dispositivoKey = sel.value;
        const carrilIndex = [...UI.CarrilesContenedor.querySelectorAll(".carril-row")].indexOf(carril);

        if (carrilIndex >= 0) {
            agregarBloqueSeniales(carrilIndex, dispositivoKey);
        }

    };

    return sel;
}

function agregarSelector(selDiv) {
    const carril = selDiv.parentNode; // obtenemos el div carril
    const nuevoSel = crearSelectorEquipo(() => agregarSelector(selDiv), carril);
    selDiv.appendChild(nuevoSel);
}

function moverCarril(carril, dir) {
    const cont = UI.CarrilesContenedor;
    const senCont = UI.CarrilesSenialesCont;

    const carriles = [...cont.querySelectorAll(".carril-row")];
    const senRows = [...senCont.querySelectorAll(".carril-seniales-row")];

    const i = carriles.indexOf(carril);
    const newIndex = i + dir;

    if (newIndex < 0 || newIndex >= carriles.length) return;

    // Mover carril visual
    if (dir > 0) cont.insertBefore(carril, carriles[newIndex].nextSibling);
    else cont.insertBefore(carril, carriles[newIndex]);

    // Mover bloque de señales asociado
    const senRow = senRows[i];
    if (dir > 0) senCont.insertBefore(senRow, senRows[newIndex].nextSibling);
    else senCont.insertBefore(senRow, senRows[newIndex]);

    renumerarCarriles();
}


function renumerarCarriles() {

    const carriles = [...UI.CarrilesContenedor.querySelectorAll(".carril-row")];

    carriles.forEach((c, i) => {
        c.querySelector(".carril-label").textContent = `Carril ${i + 1}`;

        const btnUp = c.querySelector(".carril-move-up");
        const btnDown = c.querySelector(".carril-move-down");

        btnUp.disabled = (i === 0);
        btnDown.disabled = (i === carriles.length - 1);
    });

    const signalBlocks = [...UI.CarrilesSenialesCont.querySelectorAll(".carril-seniales-row")];

    signalBlocks.forEach((b, i) => {
        const title = b.querySelector("h5");
        if (title) title.textContent = `Carril ${i + 1} – Señales`;
    });

}

function agregarBloqueSeniales(carrilIndex, dispositivoKey) {

    const container = UI.CarrilesSenialesCont.querySelectorAll(".carril-seniales-row")[carrilIndex];
    const dispositivo = controladores[dispositivoKey];
    if (!dispositivo) return;

    // Crear bloque del dispositivo
    const dispBlock = document.createElement("div");
    dispBlock.className = "w3-margin-left w3-padding-small w3-border-left w3-border-blue";

    const title = document.createElement("div");
    title.className = "w3-text-blue w3-small w3-margin-bottom";
    title.textContent = dispositivoKey;
    dispBlock.appendChild(title);

    // recolectar bornes con señales
    const bornes = [];

    dispositivo.Paginas.forEach(pagina => {
        pagina.forEach(conector => {
            if (Array.isArray(conector.Numeracion)) {
                conector.Numeracion.forEach(n => {
                    if (typeof n === "object" && n.señales) {
                        bornes.push(n);
                    }
                });
            }
        });
    });

    // crear fila por cada borne
    bornes.forEach(borne => {
        const row = document.createElement("div");
        row.className = "w3-row w3-margin-bottom";

        const lbl = document.createElement("span");
        lbl.className = "w3-col s6 w3-small";
        lbl.textContent = borne.nombre || borne.num;

        const sel = document.createElement("select");
        sel.className = "w3-select w3-border w3-round w3-small w3-col s6";

        sel.appendChild(new Option("", "")); // vacío todavía

        // Guardamos señales para posteriormente rellenar opciones
        sel.dataset.seniales = JSON.stringify(borne.señales);

        row.appendChild(lbl);
        row.appendChild(sel);
        dispBlock.appendChild(row);
    });

    container.appendChild(dispBlock);
}



function leerCarrilesDesdeUI() {
    const carriles = [];
    const rows = UI.CarrilesContenedor.querySelectorAll(".carril-row");
    rows.forEach(row => {
        const sels = [...row.querySelectorAll("select.carril-select")];
        const equipos = sels.map(s => s.value).filter(Boolean);
        if (equipos.length > 0) carriles.push(equipos);
    });
    return carriles;  // Array<Array<string>>
}

function expandirCarrilAItems(listaEquipos) {
    // devuelve un array de items: {key, tipo, pageIndex, width}
    const items = [];
    for (const key of listaEquipos) {
        const disp = controladores[key];
        if (!disp) continue;
        const tipo = disp?.Disposicion?.Tipo || "controlador";
        const anchos = disp?.Disposicion?.AnchoEnHoja || [disp?.Disposicion?.Ancho || HOJA_UTIL];

        // cada página del dispositivo será un item independiente
        for (let i = 0; i < anchos.length; i++) {
            items.push({
                key,
                tipo,           // "controlador" | "modulo" | ...
                pageIndex: i,   // índice de página dentro del dispositivo
                width: anchos[i]
            });
        }
    }
    return items;
}



function generarLayoutHojasDesdeCarriles(carriles) {
    // devuelve: Array< { items: Array<{key, pageIndex, tipo, x, width}> } >
    const hojas = [];

    function nuevaHoja() {
        hojas.push({ items: [] });
    }

    // aseguramos al menos 1
    if (hojas.length === 0) nuevaHoja();

    let x = MARGEN_X;

    for (const carril of carriles) {
        const items = expandirCarrilAItems(carril);

        // detectar si algún dispositivo del carril es multipágina:
        // (necesitamos saberlo por grupo/dispositivo, no por item suelto)
        // Creamos un mapa key -> numPaginas
        const numPagPorKey = {};
        carril.forEach(k => {
            numPagPorKey[k] = controladores[k]?.Disposicion?.AnchoEnHoja?.length || 1;
        });

        for (let i = 0; i < items.length; i++) {
            const it = items[i];
            const esMultipagina = (numPagPorKey[it.key] || 1) > 1;

            // ¿estamos al inicio de hoja?
            const hojaActual = hojas[hojas.length - 1];
            const esPrimeroDeHoja = hojaActual.items.length === 0;

            // regla 1.3: si es multipágina, cada página debe ir en hoja distinta
            // - si NO es primero de hoja, forzamos salto antes de colocarlo
            // - y para la siguiente página también forzaremos salto
            if (esMultipagina) {
                if (!esPrimeroDeHoja) {
                    // salto de hoja
                    nuevaHoja();
                }
                // ahora estamos al inicio de hoja sí o sí
                x = MARGEN_X;
                hojas[hojas.length - 1].items.push({ ...it, x });
                // tras colocar esta página, forzamos salto para la próxima página
                if (i < items.length - 1 && items[i + 1].key === it.key) {
                    nuevaHoja();
                    x = MARGEN_X;
                }
                continue;
            }

            // para items NO multipágina:
            // separación según tipo (si no es primero de hoja)
            let sep = 0;
            if (!esPrimeroDeHoja) {
                sep = (it.tipo === "controlador") ? SEP_CONTROLADOR : 0;
            }

            // ¿cabe?
            if ((x - MARGEN_X) + sep + it.width > HOJA_UTIL) {
                // saltar de hoja
                nuevaHoja();
                x = MARGEN_X;
                // primer item de hoja: sin separación
                sep = 0;
            } else {
                x += sep;
            }

            hojas[hojas.length - 1].items.push({ ...it, x });
            x += it.width;
        }

        // al terminar un carril, dejamos como está;
        // el siguiente carril continúa llenando la hoja actual
        // (si prefieres que cada carril empiece SIEMPRE en hoja nueva,
        //  descomenta estas 3 líneas:)
        nuevaHoja();
        x = MARGEN_X;
    }

    return hojas;
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
            let borne = conector.Numeracion[i];
            let num = (typeof borne === "object") ? borne.num : borne;
            let señales = (typeof borne === "object") ? (borne.señales || []) : [];

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
    limpiarHojasVacias(layout);

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

function centrarItemsEnHojas(layout) {
    layout.forEach(hoja => {
        if (!hoja.items.length) return;

        // calcular ancho total en la hoja incluyendo separaciones
        let total = 0;
        hoja.items.forEach((it, idx) => {
            const sep = (idx === 0) ? 0 :
                (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);
            total += sep + it.width;
        });

        const offset = (HOJA_UTIL - total) / 2;
        let cursor = MARGEN_X + offset;

        hoja.items.forEach((it, idx) => {
            const sep = (idx === 0) ? 0 :
                (it.tipo === "controlador" ? SEP_CONTROLADOR : 0);

            cursor += sep;
            it.x = cursor;
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


function limpiarHojasVacias(layout) {
    while (layout.length && layout[layout.length - 1].items.length === 0) {
        layout.pop();
    }
}


function quitarCaracteresNoASCII(texto) {
    return texto
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, '');
}
