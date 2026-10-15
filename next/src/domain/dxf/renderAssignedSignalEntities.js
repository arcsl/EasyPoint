import { createCircle, createLine, createMText, createPointHatch, createText } from "./primitives.js";

export function renderAssignedSignalEntities(x, y, signal, terminal) {
    if (!signal || !terminal?.assignment?.isAnchor) {
        return [];
    }

    const type = signal.type ?? "";
    const number = Number(signal.number) || 1;
    const drawing = signal.drawing ?? "";
    const suffix = terminal.tipoQ === "8T" || terminal.tipoQ === "8R" ? "R24V" : "";
    const key = `${type}_${number}_${drawing}${suffix}`;
    const line1 = String(signal.line1 ?? "").toUpperCase();
    const line2 = String(signal.line2 ?? "").toUpperCase();
    const tagNumber = String(signal.tagNumber ?? "");
    const desG = Number(terminal.desG) || 0;
    const desG0 = Number(terminal.desG0) || 0;

    const renderer = RENDERERS[key] ?? RENDERERS[`${type}_${number}_${drawing}`];
    if (!renderer) {
        return [];
    }

    const entities = [];
    if (suffix) {
        entities.push(...render24VBaseRelays(x, y, tagNumber, terminal, number));
    }
    entities.push(...renderer(x, y, line1, line2, tagNumber, desG, desG0, terminal));
    return entities;
}

const RENDERERS = {
    EA_1_Pasiva: renderEa1Pasiva,
    EA_1_Externa: renderEa1Externa,
    EA_1_Bus_LTE: renderBusLte,
    EA_1_Activa: renderEa1Activa,
    EA_2_Activa: renderEa2Activa,
    EA_3_Activa: renderEa3Activa,
    ED_1_Externa: renderEd1Externa,
    ED_1_Rele: (x, y, l1, l2, tag, desG, desG0, terminal) => renderEd1RelayLike(x, y, l1, l2, `R${tag}`, "13", "14", 1, desG0, terminal?.digLogo24),
    ED_1_Contactor: (x, y, l1, l2, tag, desG, desG0, terminal) => renderEd1RelayLike(x, y, l1, l2, `KM${tag}`, "13", "14", 1, desG0, terminal?.digLogo24),
    ED_1_Termico: renderEd1Termico,
    ED_1_Bus_LTE: renderBusLte,
    SA_1_Externa: renderSa1Externa,
    SA_1_Actuador: renderSa1Actuador,
    SA_1_Bus_LTE: renderBusLte,
    SD_1_Externa: renderSd1Externa,
    SD_1_Rele: renderSd1Rele,
    SD_1_Contactor: renderSd1Contactor,
    SD_1_Bus_LTE: renderBusLte,
    SD_1_Simple: renderSd1Simple,
    SD_1_Conmutada: renderSd1Conmutada,
    SD_2_Externa: renderSd2Externa,
    SD_2_Actuador: renderSd2Actuador,
    SD_3_Motor3V: renderSd3Motor3V,
    SD_1_ExternaR24V: renderSd1ExternaR24V,
    SD_1_ReleR24V: renderSd1ReleR24V,
    SD_1_SimpleR24V: renderSd1SimpleR24V,
    SD_1_ConmutadaR24V: renderSd1ConmutadaR24V,
    SD_1_ContactorR24V: renderSd1ContactorR24V,
    SD_2_ExternaR24V: renderSd2ExternaR24V,
    SD_2_ActuadorR24V: renderSd2ActuadorR24V,
};

function renderEa1Pasiva(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderXxExterna(x, y, line1, line2, desG0),
        createLine(x - 4, y - 110, x - 4, y - 116),
        createLine(x, y - 110, x, y - 116),
        createLine(x - 4, y - 120, x - 4, y - 122),
        createLine(x - 5, y - 122, x - 3, y - 122),
        createLine(x - 3, y - 122, x - 3, y - 128),
        createLine(x - 3, y - 128, x - 5, y - 128),
        createLine(x - 5, y - 128, x - 5, y - 122),
        createLine(x - 2, y - 123, x - 6, y - 127),
        createLine(x - 4, y - 128, x - 4, y - 130),
        createLine(x - 4, y - 130, x, y - 130),
        createLine(x, y - 130, x, y - 120),
        ...renderDeviceEnvelope(x, y, ["M", "B"]),
    ];
}

function renderEa1Externa(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderXxExterna(x, y, line1, line2, desG0),
        createText(x - 4, y - 118, "-", { height: 2.5, align: "MC" }),
        createText(x, y - 118, "+", { height: 2.5, align: "MC" }),
    ];
}

function renderEa1Activa(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderPaloDesplazable(x - 8, y, 0, desG),
        ...renderPaloDesplazable(x - 4, y, 0, desG0),
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderDeviceEnvelope(x, y, ["G", "M", "U"]),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderEa2Activa(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderPaloDesplazable(x - 8, y, 0, desG),
        ...renderPaloDesplazable(x - 4, y, 0, desG0),
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x + 4, y, 12, 0),
        ...renderDeviceEnvelope(x + 4, y, ["G", "M", "U1", "U2"]),
        createVerticalLabel(x - 2, y, line1, line2),
    ];
}

function renderEa3Activa(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderPaloDesplazable(x + 4, y, 0, desG),
        ...renderPaloDesplazable(x + 8, y, 0, desG0),
        ...renderPaloDesplazable(x + 12, y, -12, 0),
        ...renderPaloDesplazable(x + 16, y, 0, 0),
        ...renderPaloDesplazable(x + 20, y, 12, 0),
        ...renderDeviceEnvelope(x + 20, y, ["G", "M", "U1", "U2", "U3"]),
        createVerticalLabel(x + 12, y, line1, line2),
    ];
}

function renderEd1Externa(x, y, line1, line2, tagNumber, desG, desG0, terminal) {
    const desComun = desG0 + (terminal?.digLogo24 ? -4 : 0);
    return renderXxExterna(x, y, line1, line2, desComun);
}

function renderEd1RelayLike(x, y, line1, line2, id, c1, c2, widthFactor, desG0, digLogo24) {
    return renderEdRelayBase(x, y, line1, line2, id, c1, c2, widthFactor, desG0, digLogo24);
}

function renderEd1Termico(x, y, line1, line2, tagNumber, desG, desG0, terminal) {
    return [
        ...renderEdRelayBase(x, y, line1, line2, `FKM${tagNumber}`, "97", "98", 0.8, desG0, terminal?.digLogo24),
        createLine(x - 5, y - 44, x - 5.671, y - 44.335),
        createLine(x - 5.671, y - 44.335, x - 6.006, y - 43.665),
        createLine(x - 6.006, y - 43.665, x - 6.677, y - 44),
        createLine(x - 6.342, y - 44.671, x - 6.677, y - 44),
        createLine(x - 6.342, y - 44.671, x - 7.012, y - 45.006),
    ];
}

function renderSa1Externa(x, y, line1, line2, tagNumber, desG, desG0) {
    return [
        ...renderXxExterna(x, y, line1, line2, desG0),
        createText(x - 4, y - 118, "-", { height: 2.5, align: "MC" }),
        createText(x, y - 118, "+", { height: 2.5, align: "MC" }),
    ];
}

function renderSa1Actuador(x, y, line1, line2) {
    return [
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x - 4, y, 0, 0),
        ...renderPaloDesplazable(x - 8, y, 0, 0),
        ...renderValve(x, y, "G", "G0", "Y"),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd1Externa(x, y, line1, line2) {
    return [
        ...renderPaloDesplazable(x - 4, y, -4, 4),
        ...renderPaloDesplazable(x, y, 0, 0),
        createVerticalLabel(x - 2, y, line1, line2),
    ];
}

function renderSd1Rele(x, y, line1, line2, tagNumber) {
    return [
        createLine(x, y, x, y - 56),
        createLine(x - 4, y - 4, x - 4, y - 56),
        createLine(x - 8, y - 4, x - 8, y),
        createPointHatch(x - 4, y - 4),
        createPointHatch(x - 8, y - 4),
        ...renderSd1ReleBase(x, y, line1, line2),
        createLine(x, y - 60, x, y - 90),
        createText(x - 1, y - 88, `R${tagNumber}`, { height: 2.5, align: "MR" }),
    ];
}

function renderSd1Contactor(x, y, line1, line2, tagNumber) {
    return [
        createLine(x, y, x, y - 56),
        createLine(x - 4, y - 4, x - 4, y - 56),
        createLine(x - 8, y - 4, x - 8, y),
        createPointHatch(x - 4, y - 4),
        createPointHatch(x - 8, y - 4),
        ...renderSd1ReleBase(x, y, line1, line2),
        ...renderSd1Magneto(x, y, tagNumber),
        createText(x - 1, y - 88, `KM${tagNumber}`, { height: 2.5, align: "MR" }),
    ];
}

function renderSd1Simple(x, y, line1, line2) {
    return [
        createLine(x - 8, y, x - 8, y - 4),
        createPointHatch(x - 8, y - 4),
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x - 4, y, 0, 4),
        ...renderPaloDesplazable(x - 8, y, 0, 100),
        ...renderValve(x, y, "N", "Y1", "Y2"),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd1Conmutada(x, y, line1, line2) {
    return [
        createLine(x - 8, y, x - 8, y - 4),
        createPointHatch(x - 8, y - 4),
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x - 4, y, 0, 0),
        ...renderPaloDesplazable(x - 8, y, 0, 100),
        ...renderValve(x, y, "N", "Y1", "Y2"),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd2Externa(x, y, line1, line2) {
    return [
        createLine(x - 8, y, x - 8, y - 4),
        createPointHatch(x - 8, y - 4),
        createLine(x + 8, y, x + 8, y - 4),
        createPointHatch(x + 8, y - 4),
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x + 4, y, 0, 100),
        ...renderPaloDesplazable(x + 8, y, 8, 0),
        createVerticalLabel(x + 4, y, line1, line2),
    ];
}

function renderSd2Actuador(x, y, line1, line2) {
    return [
        ...renderSd2Externa(x, y, line1, line2),
        ...renderValve(x + 8, y, "Y1", "N", "Y2"),
    ];
}

function renderSd3Motor3V(x, y, line1, line2) {
    return [
        createPointHatch(x - 4, y - 100),
        createPointHatch(x - 8, y - 4),
        createLine(x + 4, y - 110, x + 4, y - 116),
        createLine(x, y - 110, x, y - 116),
        createLine(x, y - 104, x, y),
        createLine(x - 4, y - 110, x - 4, y - 116),
        createLine(x - 4, y - 104, x - 4, y - 100),
        createText(x - 4, y - 118, "N", { height: 2.5, align: "MC" }),
        createText(x, y - 118, "1", { height: 2.5, align: "MC" }),
        createText(x + 4, y - 118, "2", { height: 2.5, align: "MC" }),
        createText(x + 2, y - 124, "M", { height: 2.5, align: "MC" }),
        createText(x, y - 127, "1", { height: 2.5, align: "MC" }),
        createText(x + 4, y - 127, "~", { height: 2.5, align: "MC" }),
        createCircle(x + 2, y - 126, 5),
        createLine(x - 4, y - 122, x - 4, y - 120),
        createLine(x - 8, y, x - 8, y - 4),
        createLine(x + 32, y, x + 32, y - 56),
        createLine(x + 8, y - 110, x + 8, y - 116),
        createText(x + 8, y - 118, "3", { height: 2.5, align: "MC" }),
        createLine(x + 8, y - 120, x + 8, y - 122),
        createLine(x + 8, y - 122, x + 6.391, y - 123.609),
        createLine(x + 4, y - 121.417, x + 4, y - 120),
        createLine(x, y - 121.417, x, y - 120),
        createLine(x - 4, y - 122, x - 2.391, y - 123.609),
        createLine(x + 32, y - 56, x + 8, y - 56),
        createLine(x + 4, y - 104, x + 4, y - 52),
        createLine(x + 4, y - 52, x + 16, y - 52),
        createLine(x + 16, y, x + 16, y - 52),
        createLine(x + 8, y - 104, x + 8, y - 56),
        ...renderTerminalBoxRow(x + 6, x + 2, y),
        ...renderTerminalBoxRow(x + 2, x - 2, y),
        ...renderTerminalBoxRow(x - 2, x - 6, y),
        ...renderTerminalBoxRow(x + 10, x + 6, y),
        createLine(x + 10, y - 116, x - 6, y - 116, { lineWeight: 40 }),
        createLine(x + 10, y - 132, x - 6, y - 132, { lineWeight: 40 }),
        createLine(x - 6, y - 116, x - 6, y - 132, { lineWeight: 40 }),
        createLine(x + 10, y - 132, x + 10, y - 116, { lineWeight: 40 }),
        createVerticalLabel(x + 4, y, line1, line2),
    ];
}

function renderSd1ExternaR24V(x, y, line1, line2) {
    return [
        createLine(x + 2, y - 48, x - 1, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createLine(x, y - 46, x, y - 42),
        createLine(x - 4, y - 104, x - 4, y - 42),
        createLine(x, y - 50, x, y - 104),
        createLine(x, y - 42, x - 4, y - 42),
        createText(x - 1, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x, y - 50, x - 2, y - 46),
        createText(x - 1, y - 51, "14", { height: 1, align: "MC" }),
        ...renderTerminalBoxRow(x - 2, x - 6, y),
        ...renderTerminalBoxRow(x + 2, x - 2, y),
        createLine(x, y - 110, x, y - 116),
        createLine(x - 4, y - 110, x - 4, y - 116),
        createVerticalLabel(x - 2, y, line1, line2),
    ];
}

function renderSd1ReleR24V(x, y, line1, line2) {
    return [
        ...renderSd1SelectorBase(x, y),
        createLine(x + 2, y - 48, x - 1, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createLine(x + 4, y - 42, x + 4, y - 104),
        createLine(x, y - 60, x, y - 104),
        createLine(x, y - 56, x, y - 50),
        createLine(x - 4, y - 56, x - 4, y - 42),
        createLine(x, y - 46, x, y - 42),
        createLine(x + 4, y - 42, x - 4, y - 42),
        createPointHatch(x, y - 42),
        createText(x - 1, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x, y - 50, x - 2, y - 46),
        createText(x - 1, y - 51, "14", { height: 1, align: "MC" }),
        ...renderTerminalBoxRow(x + 2, x - 2, y),
        ...renderTerminalBoxRow(x + 6, x + 2, y),
        createLine(x, y - 110, x, y - 116),
        createLine(x + 4, y - 110, x + 4, y - 116),
        createVerticalLabel(x + 2, y, line1, line2),
    ];
}

function renderSd1SimpleR24V(x, y, line1, line2) {
    return [
        createLine(x + 2, y - 48, x - 1, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createPointHatch(x, y - 40),
        createLine(x, y - 46, x, y - 40),
        createText(x - 1, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x, y - 50, x - 2, y - 46),
        createText(x - 1, y - 51, "14", { height: 1, align: "MC" }),
        createLine(x, y - 50, x, y - 104),
        createPointHatch(x - 4, y - 40),
        createLine(x - 4, y - 104, x - 4, y - 40),
        createPointHatch(x - 8, y - 100),
        createLine(x - 8, y - 104, x - 8, y - 100),
        ...renderTerminalBoxRow(x + 2, x - 2, y),
        ...renderTerminalBoxRow(x - 2, x - 6, y),
        ...renderTerminalBoxRow(x - 6, x - 10, y),
        createLine(x, y - 110, x, y - 116),
        createLine(x - 4, y - 110, x - 4, y - 116),
        createLine(x - 8, y - 110, x - 8, y - 116),
        ...renderValve(x, y, "N", "Y1", "Y2"),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd1ConmutadaR24V(x, y, line1, line2) {
    return [
        createLine(x + 2, y - 48, x - 4.55, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createPointHatch(x, y - 40),
        createLine(x, y - 46, x, y - 40),
        createText(x - 1, y - 45, "21", { height: 1, align: "MC" }),
        createLine(x, y - 46, x + 1.5, y - 46),
        createText(x - 1, y - 51, "22", { height: 1, align: "MC" }),
        createLine(x, y - 50, x + 1.1, y - 45.5),
        createLine(x, y - 50, x, y - 104),
        createPointHatch(x - 4, y - 40),
        createLine(x - 4, y - 46, x - 4, y - 40),
        createText(x - 5, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x - 4, y - 50, x - 5, y - 46),
        createText(x - 5, y - 51, "14", { height: 1, align: "MC" }),
        createLine(x - 4, y - 50, x - 4, y - 104),
        createPointHatch(x - 8, y - 100),
        createLine(x - 8, y - 104, x - 8, y - 100),
        ...renderTerminalBoxRow(x + 2, x - 2, y),
        ...renderTerminalBoxRow(x - 2, x - 6, y),
        ...renderTerminalBoxRow(x - 6, x - 10, y),
        createLine(x, y - 110, x, y - 116),
        createLine(x - 4, y - 110, x - 4, y - 116),
        createLine(x - 8, y - 110, x - 8, y - 116),
        ...renderValve(x, y, "N", "Y1", "Y2"),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd1ContactorR24V(x, y, line1, line2, tagNumber) {
    return [
        createLine(x + 2, y - 48, x - 1, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createText(x - 1, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x, y - 50, x - 2, y - 46),
        createText(x - 1, y - 51, "14", { height: 1, align: "MC" }),
        createLine(x, y - 56, x, y - 50),
        createLine(x, y - 46, x, y - 40),
        createLine(x - 4, y - 56, x - 4, y - 40),
        createPointHatch(x - 4, y - 40),
        createPointHatch(x, y - 40),
        ...renderSd1ReleBase(x, y, line1, line2),
        ...renderSd1Magneto(x, y, tagNumber),
        createText(x - 1, y - 88, `KM${tagNumber}`, { height: 2.5, align: "MR" }),
    ];
}

function renderSd2ExternaR24V(x, y, line1, line2) {
    return [
        ...renderTerminalBoxRow(x + 9, x + 5, y),
        ...renderTerminalBoxRow(x + 13, x + 9, y),
        ...renderTerminalBoxRow(x + 17, x + 13, y),
        createLine(x + 7, y - 46, x + 7, y - 40),
        createText(x + 6, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x + 7, y - 50, x + 5, y - 46),
        createText(x + 6, y - 51, "14", { height: 1, align: "MC" }),
        createLine(x + 7, y - 104, x + 7, y - 50),
        createLine(x + 7, y - 110, x + 7, y - 116),
        createLine(x + 11, y - 104, x + 11, y - 100),
        createLine(x + 11, y - 110, x + 11, y - 116),
        createLine(x + 15, y - 46, x + 15, y - 40),
        createText(x + 14, y - 45, "13", { height: 1, align: "MC" }),
        createLine(x + 15, y - 50, x + 13, y - 46),
        createText(x + 14, y - 51, "14", { height: 1, align: "MC" }),
        createLine(x + 15, y - 104, x + 15, y - 50),
        createLine(x + 15, y - 110, x + 15, y - 116),
        createLine(x + 2, y - 28, x + 2, y - 48, { lineType: "DASHED" }),
        createLine(x + 2, y - 48, x + 6, y - 48, { lineType: "DASHED" }),
        createLine(x + 18, y - 48, x + 14, y - 48, { lineType: "DASHED" }),
        createLine(x + 18, y - 28, x + 18, y - 48, { lineType: "DASHED" }),
        createPointHatch(x + 11, y - 100),
        createPointHatch(x + 7, y - 40),
        createPointHatch(x + 15, y - 40),
        createVerticalLabel(x + 11, y, line1, line2),
    ];
}

function renderSd2ActuadorR24V(x, y, line1, line2) {
    return [
        ...renderSd2ExternaR24V(x, y, line1, line2),
        ...renderValve(x + 15, y, "Y1", "N", "Y2"),
    ];
}

function renderXxExterna(x, y, line1, line2, desG0 = 0) {
    return [
        ...renderPaloDesplazable(x, y, 0, 0),
        ...renderPaloDesplazable(x - 4, y, 0, desG0),
        createVerticalLabel(x - 2, y, line1, line2),
    ];
}

function renderPaloDesplazable(x, y, desX = 0, desY = 0) {
    const entities = [
        createLine(x + 2, y - 104, x - 2, y - 104, { lineWeight: 40 }),
        createLine(x + 2, y - 110, x - 2, y - 110, { lineWeight: 40 }),
        createLine(x - 2, y - 104, x - 2, y - 110, { lineWeight: 40 }),
        createLine(x + 2, y - 104, x + 2, y - 110, { lineWeight: 40 }),
        createLine(x, y - 110, x, y - 116),
    ];

    if (desX === 0) {
        entities.push(createLine(x, y - 104, x, y - desY));
        if (desY !== 0) {
            entities.push(createPointHatch(x, y - desY));
        }
        return entities;
    }

    return [
        ...entities,
        createLine(x, y - 104, x, y - 66),
        createLine(x, y - 66, x + desX, y - 66),
        createLine(x + desX, y - 66, x + desX, y),
    ];
}

function renderDeviceEnvelope(x, y, labels) {
    const width = labels.length * 4;
    const entities = [
        createLine(x + 2, y - 116, x + 2 - width, y - 116, { lineWeight: 40 }),
        createLine(x + 2, y - 132, x + 2 - width, y - 132, { lineWeight: 40 }),
        createLine(x + 2 - width, y - 116, x + 2 - width, y - 132, { lineWeight: 40 }),
        createLine(x + 2, y - 132, x + 2, y - 116, { lineWeight: 40 }),
    ];

    labels.forEach((label, index) => {
        entities.push(createText(x - (labels.length - index - 1) * 4, y - 118, label, { height: 2.5, align: "MC", widthFactor: 0.8 }));
    });

    return entities;
}

function renderValve(x, y, a, b, c) {
    return [
        ...renderDeviceEnvelope(x, y, [a, b, c]),
        createText(x - 4, y - 124, "M", { height: 2.5, align: "MC" }),
        createText(x - 6, y - 127, "1", { height: 2.5, align: "MC" }),
        createText(x - 2, y - 127, "~", { height: 2.5, align: "MC" }),
        createLine(x - 8, y - 122, x - 8, y - 120),
        createLine(x - 4, y - 121, x - 4, y - 120),
        createLine(x, y - 122, x, y - 120),
        createLine(x - 8, y - 122, x - 7.536, y - 122.464),
        createLine(x - 0.464, y - 122.464, x, y - 122),
        createCircle(x - 4, y - 126, 5),
    ];
}

function renderEdRelayBase(x, y, line1, line2, id, c1, c2, widthFactor = 1, desG0 = 0, digLogo24 = false) {
    const desComun = desG0 + (digLogo24 ? -4 : 0);
    const desX = widthFactor < 1 ? 1 : 0;

    return [
        createLine(x, y - 58, x - 4, y - 58),
        createLine(x - 4, y - 46, x - 6, y - 42),
        createLine(x - 4, y - 42, x - 4, y - desComun),
        createLine(x - 4, y - 58, x - 4, y - 46),
        createLine(x, y, x, y - 58),
        ...(desComun !== 0 ? [createPointHatch(x - 4, y - desComun)] : []),
        createText(x - 6 - desX, y - 44, id, { height: 2.5, align: "MR", widthFactor }),
        createText(x - 5, y - 40, c1, { height: 1.5, align: "MR" }),
        createText(x - 5, y - 48, c2, { height: 1.5, align: "MR" }),
        createVerticalLabel(x - 2, y, line1, line2),
    ];
}

function renderBusLte(x, y, line1, line2) {
    return [
        createLine(x + 4, y, x + 4, y - 194, { lineType: "DASHED" }),
        createLine(x + 4, y - 194, x - 12, y - 194, { lineType: "DASHED" }),
        createLine(x - 12, y - 194, x - 12, y, { lineType: "DASHED" }),
        createVerticalLabel(x - 4, y, line1, line2),
    ];
}

function renderSd1SelectorBase(x, y) {
    return [
        createText(x - 9.5, y - 55, "1", { height: 1, align: "MC" }),
        createText(x - 8, y - 55, "0", { height: 1, align: "MC" }),
        createText(x - 6.5, y - 55, "2", { height: 1, align: "MC" }),
        createLine(x - 8, y - 60, x - 9.5, y - 56),
        createLine(x - 8, y - 60, x - 8, y - 56, { lineType: "DASHED" }),
        createLine(x - 8, y - 60, x - 6.5, y - 56, { lineType: "DASHED" }),
        createLine(x - 9.5, y - 57, x - 10, y - 57),
        createLine(x - 10, y - 57, x - 10, y - 59),
        createLine(x - 10, y - 59, x - 10.5, y - 59),
        createLine(x - 10, y - 58, x - 0.75, y - 58, { lineType: "DASHED" }),
        createLine(x, y - 60, x - 1.5, y - 56),
        createLine(x - 4, y - 60, x - 5.5, y - 56),
        createLine(x - 4, y - 66, x, y - 66),
        createLine(x - 4, y - 66, x - 4, y - 60),
        createPointHatch(x, y - 66),
    ];
}

function renderSd1ReleBase(x, y, line1, line2) {
    return [
        ...renderSd1SelectorBase(x, y),
        createLine(x - 4, y - 90, x - 4, y - 94),
        createLine(x - 4, y - 94, x + 4, y - 94),
        createLine(x + 4, y - 94, x + 4, y - 90),
        createLine(x + 4, y - 90, x - 4, y - 90),
        createLine(x, y - 94, x, y - 100),
        createPointHatch(x, y - 100),
        createVerticalLabel(x, y, line1, line2),
    ];
}

function renderSd1Magneto(x, y, tagNumber) {
    return [
        createText(x - 2, y - 78, `FKM${tagNumber}`, { height: 2.5, align: "MR" }),
        createText(x - 1, y - 75, "95", { height: 1, align: "MC" }),
        createText(x - 1, y - 81, "96", { height: 1, align: "MC" }),
        createLine(x, y - 80, x + 2.45, y - 75.1),
        createLine(x, y - 76, x + 3, y - 76),
        createLine(x + 1, y - 78, x + 0.25, y - 78),
        createLine(x + 0.25, y - 78, x + 0.25, y - 77.25),
        createLine(x + 0.25, y - 77.25, x - 0.5, y - 77.25),
        createLine(x - 0.5, y - 77.25, x - 0.5, y - 78),
        createLine(x - 0.5, y - 78, x - 1.25, y - 78),
        createLine(x, y - 90, x, y - 80),
        createLine(x, y - 76, x, y - 60),
    ];
}

function render24VBaseRelays(x, y, tagNumber, terminal, count) {
    const entities = [];
    const baseRenderer = terminal.tipoQ === "8T" ? renderSd1Rele8TBase : renderSd1Rele8RBase;

    for (let index = 0; index < count; index += 1) {
        entities.push(...baseRenderer(x + index * 16, y, `${tagNumber}.${index + 1}`));
    }

    return entities;
}

function renderSd1Rele24VBase(x, y, tagNumber) {
    return [
        createText(x - 1, y - 22, `R${tagNumber}`, { height: 2.5, align: "MR", widthFactor: 0.8 }),
        createLine(x, y, x, y - 24),
        createLine(x - 4, y - 24, x - 4, y - 28),
        createLine(x - 4, y - 28, x + 4, y - 28),
        createLine(x + 4, y - 28, x + 4, y - 24),
        createLine(x + 4, y - 24, x - 4, y - 24),
        createLine(x, y - 28, x, y - 32),
        createLine(x, y - 32, x - 8, y - 32),
    ];
}

function renderSd1Rele8TBase(x, y, tagNumber) {
    return [
        ...renderSd1Rele24VBase(x, y, tagNumber),
        createLine(x - 8, y, x - 8, y - 32),
    ];
}

function renderSd1Rele8RBase(x, y, tagNumber) {
    return [
        ...renderSd1Rele24VBase(x, y, tagNumber),
        createLine(x - 8, y - 32, x - 8, y - 16),
        createPointHatch(x - 8, y - 16),
    ];
}

function renderTerminalBoxRow(leftX, rightX, y) {
    return [
        createLine(leftX, y - 104, rightX, y - 104, { lineWeight: 40 }),
        createLine(leftX, y - 110, rightX, y - 110, { lineWeight: 40 }),
        createLine(leftX, y - 104, leftX, y - 110, { lineWeight: 40 }),
        createLine(rightX, y - 104, rightX, y - 110, { lineWeight: 40 }),
    ];
}

function createVerticalLabel(x, y, line1, line2) {
    return createMText(x, y - 190, [line1, line2], { height: 2.5, align: "ML", rotation: 90 });
}
