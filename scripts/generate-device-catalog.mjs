import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, "js", "DXFdispositivos.js");
const outputPath = path.join(repoRoot, "next", "src", "domain", "devices", "deviceCatalog.js");

const source = await fs.readFile(sourcePath, "utf8");
const context = {
    module: { exports: {} },
    exports: {},
    console,
};

vm.createContext(context);
vm.runInContext(`${source}\nmodule.exports = dispositivos;`, context, { filename: sourcePath });

const dispositivos = context.module.exports;
const familiesMap = new Map();

Object.entries(dispositivos).forEach(([model, device]) => {
    const family = device?.Disposicion?.Familia ?? "General";
    const familyDevices = familiesMap.get(family) ?? [];
    familyDevices.push(extractDevice(model, family, device));
    familiesMap.set(family, familyDevices);
});

const catalog = {
    version: 2,
    families: [...familiesMap.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([family, devices]) => ({
            family,
            devices: devices.sort((left, right) => left.model.localeCompare(right.model)),
        })),
};

const output = `export const deviceCatalog = ${JSON.stringify(catalog, null, 4)};\n`;
await fs.writeFile(outputPath, output, "utf8");

function extractDevice(model, family, device) {
    return {
        model,
        family,
        type: device?.Disposicion?.Tipo ?? "controlador",
        width: normalizeNumber(device?.Disposicion?.Ancho),
        height: normalizeNumber(device?.Disposicion?.Alto),
        sheetWidths: Array.isArray(device?.Disposicion?.AnchoEnHoja)
            ? device.Disposicion.AnchoEnHoja.map(normalizeNumber)
            : [],
        tension230: normalizeBoolean(device?.Disposicion?.Tension230, true),
        tension230sec: normalizeBoolean(device?.Disposicion?.Tension230sec, false),
        tension24: normalizeBoolean(device?.Disposicion?.Tension24, true),
        pages: extractPages(device),
        terminals: extractTerminals(device),
        optionals: extractOptionals(device),
    };
}

function extractPages(device) {
    return (device?.Paginas ?? []).map(page => ({
        connectors: page.map(connector => ({
            noEnvelope: Boolean(connector?.noEnv),
            tapeSlots: extractDisplaySlots(connector?.Cinta),
            subTapeSlots: extractDisplaySlots(connector?.Subcinta),
            symbolSlots: extractDisplaySlots(connector?.Simbolos),
            numerationSlots: extractNumerationSlots(connector?.Numeracion),
            fixedSlots: extractDisplaySlots(connector?.Fijo),
            optionalSlots: extractOptionalSlots(connector?.Opcional),
        })),
    }));
}

function extractDisplaySlots(rawValue) {
    if (Array.isArray(rawValue)) {
        return rawValue.map(entry => normalizeDisplaySlot(entry));
    }

    if (typeof rawValue === "string") {
        return [normalizeDisplaySlot(rawValue)];
    }

    return [];
}

function normalizeDisplaySlot(entry) {
    if (typeof entry === "string") {
        return { text: entry };
    }

    if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        return { text: entry.num ?? entry.nombre ?? "" };
    }

    return { text: "" };
}

function extractNumerationSlots(rawNumeration) {
    const numeration = Array.isArray(rawNumeration)
        ? rawNumeration
        : [rawNumeration].filter(value => value !== undefined);

    return numeration.map(entry => {
        if (entry && typeof entry === "object" && !Array.isArray(entry)) {
            return {
                text: entry.num ?? "",
                terminalKey: entry.nombre ?? entry.num ?? "",
                offsetX: normalizeNumber(entry.desX),
                narrow: Boolean(entry.extraEstrecho),
            };
        }

        if (typeof entry === "string") {
            return {
                text: entry,
                terminalKey: "",
                offsetX: null,
                narrow: false,
            };
        }

        return {
            text: "",
            terminalKey: "",
            offsetX: null,
            narrow: false,
        };
    });
}

function extractTerminals(device) {
    const terminals = [];

    (device?.Paginas ?? []).forEach(page => {
        page.forEach(connector => {
            const numeration = Array.isArray(connector?.Numeracion)
                ? connector.Numeracion
                : [connector?.Numeracion].filter(Boolean);

            numeration.forEach(entry => {
                if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
                    return;
                }

                const signalTypes = Array.isArray(entry.señales) ? [...entry.señales] : [];
                if (signalTypes.length === 0) {
                    return;
                }

                terminals.push({
                    key: entry.nombre ?? entry.num ?? crypto.randomUUID(),
                    label: entry.nombre ?? entry.num ?? "",
                    signalTypes,
                    tipoQ: entry.tipoQ ?? "",
                    digLogo24: Boolean(entry.digLogo24),
                    desG: normalizeNumber(entry.desG),
                    desG0: normalizeNumber(entry.desG0),
                    desX: normalizeNumber(entry.desX),
                    extraNarrow: Boolean(entry.extraEstrecho),
                });
            });
        });
    });

    return terminals;
}

function extractOptionals(device) {
    const optionals = [];

    (device?.Paginas ?? []).forEach(page => {
        page.forEach(connector => {
            const rawOptional = connector?.Opcional;
            const optionEntries = Array.isArray(rawOptional)
                ? rawOptional
                : rawOptional && typeof rawOptional === "object"
                    ? [rawOptional]
                    : [];

            optionEntries.forEach(entry => {
                if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
                    return;
                }

                optionals.push({
                    name: entry.nombre ?? "",
                    drawing: entry.dibujo ?? "",
                    line1: entry.Linea1 ?? "",
                    line2: entry.Linea2 ?? "",
                    mirror1: normalizeNumber(entry.Espejo1),
                    mirror2: normalizeNumber(entry.Espejo2),
                    desX: normalizeNumber(entry.desX),
                });
            });
        });
    });

    return optionals;
}

function extractOptionalSlots(rawOptional) {
    const optionEntries = Array.isArray(rawOptional)
        ? rawOptional
        : rawOptional && typeof rawOptional === "object"
            ? [rawOptional]
            : [rawOptional];

    return optionEntries.map(entry => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return {
                name: "",
                drawing: "",
                line1: "",
                line2: "",
                mirror1: null,
                mirror2: null,
                desX: null,
            };
        }

        return {
            name: entry.nombre ?? "",
            drawing: entry.dibujo ?? "",
            line1: entry.Linea1 ?? "",
            line2: entry.Linea2 ?? "",
            mirror1: normalizeNumber(entry.Espejo1),
            mirror2: normalizeNumber(entry.Espejo2),
            desX: normalizeNumber(entry.desX),
        };
    });
}

function normalizeNumber(value) {
    return Number.isFinite(Number(value)) ? Number(value) : null;
}

function normalizeBoolean(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
}
