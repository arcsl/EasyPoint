import { findDeviceByModel } from "../devices/index.js";
import { getAssignmentEntry } from "../devices/assignmentLayout.js";
import { SHEET_USABLE_WIDTH } from "./layoutConstants.js";

export function buildPlanSnapshot(project) {
    const signalIndex = createSignalIndex(project.signalList);
    const rails = project.assignment.rails.map((rail, railIndex) => buildRailSnapshot(rail, railIndex, signalIndex));

    return {
        project: {
            name: project.meta.name,
            updatedAt: project.meta.updatedAt,
        },
        sheetInfo: { ...project.assignment.sheetInfo },
        rails,
    };
}

function buildRailSnapshot(rail, railIndex, signalIndex) {
    const devices = rail.map((device, deviceIndex) => buildDeviceSnapshot(device, railIndex, deviceIndex, signalIndex));

    return {
        index: railIndex,
        devices,
        sheetItems: expandSheetItems(devices),
        commonBars: deriveCommonBars(devices),
    };
}

function buildDeviceSnapshot(device, railIndex, deviceIndex, signalIndex) {
    const definition = device.model ? findDeviceByModel(device.model) : null;

    return {
        railIndex,
        deviceIndex,
        model: device.model ?? "",
        family: definition?.family ?? "",
        type: definition?.type ?? "",
        width: definition?.width ?? null,
        height: definition?.height ?? null,
        sheetWidths: [...(definition?.sheetWidths ?? [])],
        tension230: definition?.tension230 ?? true,
        tension230sec: definition?.tension230sec ?? false,
        tension24: definition?.tension24 ?? true,
        pages: [...(definition?.pages ?? [])],
        expanded: device.expanded !== false,
        terminals: (definition?.terminals ?? []).map(terminal => buildTerminalSnapshot(device, terminal, signalIndex)),
        optionals: (definition?.optionals ?? []).map(optional => buildOptionalSnapshot(device, optional)),
    };
}

function buildTerminalSnapshot(device, terminal, signalIndex) {
    const entry = getAssignmentEntry(device, terminal.key);
    const signal = entry?.signalId ? signalIndex.get(entry.signalId) ?? null : null;

    return {
        key: terminal.key,
        label: terminal.label,
        signalTypes: [...(terminal.signalTypes ?? [])],
        tipoQ: terminal.tipoQ ?? "",
        digLogo24: Boolean(terminal.digLogo24),
        desG: terminal.desG ?? null,
        desG0: terminal.desG0 ?? null,
        desX: terminal.desX ?? null,
        extraNarrow: Boolean(terminal.extraNarrow),
        assignment: entry
            ? {
                signalId: entry.signalId,
                anchorTerminalKey: entry.anchorTerminalKey,
                offset: entry.offset,
                span: entry.span,
                isAnchor: entry.offset === 0,
                signal,
            }
            : null,
    };
}

function buildOptionalSnapshot(device, optional) {
    const state = device.optionals?.[optional.name] ?? null;

    return {
        name: optional.name ?? "",
        drawing: optional.drawing ?? "",
        defaultLine1: optional.line1 ?? "",
        defaultLine2: optional.line2 ?? "",
        mirror1: optional.mirror1 ?? null,
        mirror2: optional.mirror2 ?? null,
        desX: optional.desX ?? null,
        active: Boolean(state?.active),
        line1: state?.line1 ?? optional.line1 ?? "",
        line2: state?.line2 ?? optional.line2 ?? "",
    };
}

function createSignalIndex(signalList) {
    const index = new Map();

    Object.values(signalList).forEach(signals => {
        signals.forEach(signal => {
            index.set(signal.id, {
                id: signal.id,
                type: signal.type,
                number: signal.number,
                line1: signal.line1,
                line2: signal.line2,
                drawing: signal.drawingOptions?.[signal.selectedDrawing ?? 0] ?? "",
                drawingIndex: signal.selectedDrawing ?? 0,
                drawingOptions: [...(signal.drawingOptions ?? [])],
                tagNumber: signal.tagNumber ?? "",
            });
        });
    });

    return index;
}

function expandSheetItems(devices) {
    return devices.flatMap(device => {
        const widths = device.sheetWidths.length > 0
            ? device.sheetWidths
            : (device.pages.length > 0
                ? device.pages.map(page => computeEnvelopeWidth(page, device.width ?? SHEET_USABLE_WIDTH))
                : [device.width ?? SHEET_USABLE_WIDTH]);
        const pageCount = widths.length;

        return widths.map((width, pageIndex) => ({
            railIndex: device.railIndex,
            deviceIndex: device.deviceIndex,
            model: device.model,
            family: device.family,
            type: device.type,
            pageIndex,
            pageCount,
            width,
            page: device.pages[pageIndex] ?? null,
            envelopeWidth: computeEnvelopeWidth(device.pages[pageIndex], width),
            tension230: device.tension230,
            tension230sec: device.tension230sec,
            tension24: device.tension24,
        }));
    });
}

function computeEnvelopeWidth(page, fallbackWidth) {
    const connectors = page?.connectors ?? [];
    const widthFromConnectors = connectors
        .map(connector => connector.noEnvelope ? 0 : ((connector.numerationSlots?.length ?? 0) + 1))
        .reduce((total, widthUnits) => total + widthUnits, 0) * 4;

    return widthFromConnectors > 0 ? widthFromConnectors : fallbackWidth;
}

function deriveCommonBars(devices) {
    const families = new Set(devices.map(device => String(device.family || "").toUpperCase()));
    const hasKnxStyleBus = families.has("SYNCO") || families.has("KNX");
    const hasLogoOnly = !hasKnxStyleBus && families.has("LOGO");
    const has230 = devices.some(device => device.tension230);
    const has230Secondary = devices.some(device => device.tension230sec);
    const has24 = devices.some(device => device.tension24);

    const bars = [];
    if (hasKnxStyleBus) {
        bars.push({ key: "CE+", label: "CE+" });
        bars.push({ key: "CE-", label: "CE-" });
    }
    if (has230) {
        bars.push({ key: "S0", label: "S0" });
    }
    if (has230Secondary) {
        bars.push({ key: "S0sec", label: "S0" });
    }
    if (has230 || has230Secondary) {
        bars.push({ key: "N0", label: "N0" });
    }
    if (has24) {
        bars.push({ key: "G", label: hasLogoOnly ? "L+" : "G" });
        bars.push({ key: "G0", label: hasLogoOnly ? "M" : "G0" });
    }

    return bars;
}
