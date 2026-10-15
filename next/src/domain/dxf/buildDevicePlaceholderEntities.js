import { renderLegacyHash } from "./legacyHashRenderer.js";
import { renderAssignedSignalEntities } from "./renderAssignedSignalEntities.js";
import { createLine, createMText, createText } from "./primitives.js";

export function buildDevicePlaceholderEntities(sheetDrawing) {
    return sheetDrawing.devices.flatMap(device => buildDevicePage(device));
}

function buildDevicePage(device) {
    const x = device.x;
    const y = device.y;
    const width = Number(device.envelopeWidth) || Number(device.width) || 40;
    const page = device.page;
    const terminalMap = new Map((device.terminals ?? []).map(terminal => [terminal.key, terminal]));
    const entities = [];

    if (width > 0) {
        entities.push(...buildEnvelope(x, y, width));
        entities.push(createText(x + 2, y + 21, device.model, { height: 3, align: "ML", style: "Negrita" }));
        if (device.pageCount > 1) {
            entities.push(createLine(x + width - 12, y + 18, x + width - 12, y + 24));
            entities.push(createText(x + width - 6, y + 21, `${device.pageIndex + 1}/${device.pageCount}`, { height: 2.5, align: "MC", style: "Negrita" }));
        }
    }

    if (page?.connectors?.length) {
        entities.push(...buildConnectorRows(page.connectors, x, y, width, device.optionals ?? [], terminalMap));
    }

    return entities;
}

function buildEnvelope(x, y, width) {
    return [
        createLine(x, y, x, y + 24, { lineWeight: 40 }),
        createLine(x, y, x + width, y, { lineWeight: 40 }),
        createLine(x, y + 24, x + width, y + 24, { lineWeight: 40 }),
        createLine(x + width, y, x + width, y + 24, { lineWeight: 40 }),
        createLine(x, y + 18, x + width, y + 18),
        createLine(x, y + 16, x + width, y + 16),
    ];
}

function buildConnectorRows(connectors, x, y, envelopeWidth, optionals, terminalMap) {
    const entities = [];
    let cursorX = x;
    const optionalsByName = new Map(optionals.map(optional => [optional.name, optional]));

    connectors.forEach((connector, connectorIndex) => {
        const slots = connector.numerationSlots ?? [];
        const connectorWidth = (slots.length + 1) * 4;
        entities.push(...renderConnectorBand(connector.tapeSlots ?? [], cursorX, y, "Cinta", connectorWidth));
        entities.push(...renderConnectorBand(connector.subTapeSlots ?? [], cursorX, y, "Subcinta", connectorWidth));
        entities.push(...renderConnectorBand(connector.symbolSlots ?? [], cursorX, y, "Simbolos", connectorWidth));
        entities.push(...renderConnectorBand(connector.fixedSlots ?? [], cursorX, y, "Fijo", connectorWidth));
        entities.push(...renderOptionalBand(connector.optionalSlots ?? [], cursorX, y, optionalsByName));

        slots.forEach((slot, slotIndex) => {
            cursorX += 4;
            entities.push(...renderNumerationSlot(slot, cursorX, y));
            entities.push(...renderAssignedTerminal(slot, cursorX, y, terminalMap));
        });

        cursorX += 4;
        if (!connector.noEnvelope && connectorIndex < connectors.length - 1 && cursorX < x + envelopeWidth + 0.1) {
            entities.push(createLine(cursorX, y, cursorX, y + 18));
        }
    });

    return entities;
}

function renderConnectorBand(slots, startX, y, band, connectorWidth) {
    const entities = [];
    const values = slots.map(slot => slot?.text ?? "");
    const hasContent = values.some(Boolean);
    if (!hasContent) {
        return entities;
    }

    const nonEmptySlots = slots.filter(slot => slot?.text);
    if (nonEmptySlots.length === 1 && slots.length <= 1) {
        entities.push(...renderLegacyHash(startX + connectorWidth / 2, y, nonEmptySlots[0].text, band));
        return entities;
    }

    slots.forEach((slot, index) => {
        const text = slot?.text ?? "";
        if (!text) return;
        const x = startX + 4 + index * 4;
        entities.push(...renderLegacyHash(x, y, text, band));
    });

    return entities;
}

function renderNumerationSlot(slot, x, y) {
    const text = slot?.text ?? "";
    if (!text) {
        return [];
    }

    return renderLegacyHash(x + (slot.offsetX ?? 0), y, text, "Numeracion", {
        widthFactor: slot.narrow ? 0.6 : 0.8,
    });
}

function renderAssignedTerminal(slot, x, y, terminalMap) {
    const terminalKey = slot?.terminalKey ?? "";
    if (!terminalKey) {
        return [];
    }

    const terminal = terminalMap.get(terminalKey);
    if (!terminal?.assignment?.signal || !terminal.assignment.isAnchor) {
        return [];
    }

    return renderAssignedSignalEntities(x, y, terminal.assignment.signal, terminal);
}

function renderOptionalBand(optionalSlots, startX, y, optionalsByName) {
    const entities = [];
    if (!Array.isArray(optionalSlots) || optionalSlots.length === 0) {
        return entities;
    }

    const centerX = startX - ((optionalSlots.length - 1) * 4) / 2;

    optionalSlots.forEach((slot, index) => {
        if (!slot?.name) {
            return;
        }

        const state = optionalsByName.get(slot.name);
        if (!state?.active) {
            return;
        }

        const drawX = startX + 4 + index * 4;
        const drawing = state.drawing || slot.drawing || "";
        const line1 = String(state.line1 ?? slot.line1 ?? "").toUpperCase();
        const line2 = String(state.line2 ?? slot.line2 ?? "").toUpperCase();
        const desX = state.desX ?? slot.desX ?? 0;
        const mirror1 = state.mirror1 ?? slot.mirror1 ?? 0;
        const mirror2 = state.mirror2 ?? slot.mirror2 ?? 0;

        if (drawing) {
            entities.push(...renderLegacyHash(drawX, y, drawing, "Opcional"));
        }

        if (line1 || line2) {
            entities.push(createMText(centerX + desX, y - 190, [line1, line2], { height: 2.5, align: "ML", rotation: 90 }));
        }

        if (mirror1 && line1) {
            entities.push(createText(centerX + desX + mirror1, y - 190, line1, { height: 2.5, align: "ML", rotation: 90 }));
        }

        if (mirror2 && line2) {
            entities.push(createText(centerX + desX + mirror2, y - 190, line2, { height: 2.5, align: "ML", rotation: 90 }));
        }
    });

    return entities;
}
