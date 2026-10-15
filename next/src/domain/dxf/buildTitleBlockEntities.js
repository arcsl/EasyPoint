import { renderLogoArc } from "./legacyHashRenderer.js";
import { createLine, createText } from "./primitives.js";

export function buildTitleBlockEntities(sheet, context) {
    const x = sheet.frame.x;
    const y = sheet.frame.y;
    const sheetNumber = `${sheet.index + 1} - ${context.totalSheets}`;
    const projectName = String(context.projectName ?? "").toUpperCase() || "-";

    return [
        ...buildOuterFrame(x, y),
        ...buildBottomTitleArea(x, y),
        ...renderLogoArc(x, y),
        ...buildFixedTexts(x, y),
        ...buildPlaceholderRevisionTexts(x, y),
        ...buildDynamicTexts(x, y, {
            Inst: projectName,
            Dibu: context.sheetInfo.drawnBy || "-",
            Fech: context.dateText,
            Revi: context.sheetInfo.reviewedBy || "-",
            Esqu: context.sheetInfo.scheme || "-",
            Clie: context.sheetInfo.client || "-",
            Loca: context.sheetInfo.location || "-",
            Stye: context.sheetInfo.replaces || "-",
            Stdo: context.sheetInfo.replacedBy || "-",
            Refe: context.sheetInfo.jobNumber || "-",
            Hoja: sheetNumber,
        }),
    ];
}

function buildOuterFrame(x, y) {
    return [
        createLine(x + 0, y + 0, x + 0, y + 280, { lineWeight: 40 }),
        createLine(x + 0, y + 280, x + 400, y + 280, { lineWeight: 40 }),
        createLine(x + 400, y + 280, x + 400, y + 0, { lineWeight: 40 }),
        createLine(x + 400, y + 0, x + 0, y + 0, { lineWeight: 40 }),
    ];
}

function buildBottomTitleArea(x, y) {
    return [
        createLine(x + 200, y + 0, x + 200, y + 40, { lineWeight: 40 }),
        createLine(x + 400, y + 40, x + 200, y + 40, { lineWeight: 40 }),
        createLine(x + 400, y + 36, x + 200, y + 36),
        createLine(x + 400, y + 32, x + 200, y + 32),
        createLine(x + 400, y + 28, x + 200, y + 28),
        createLine(x + 400, y + 16, x + 230, y + 16),
        createLine(x + 382, y + 12, x + 230, y + 12),
        createLine(x + 400, y + 8, x + 230, y + 8),
        createLine(x + 382, y + 4, x + 230, y + 4),
        createLine(x + 230, y + 0, x + 230, y + 40),
        createLine(x + 268, y + 40, x + 268, y + 28),
        createLine(x + 306, y + 40, x + 306, y + 28),
        createLine(x + 268, y + 16, x + 268, y + 0),
        createLine(x + 306, y + 16, x + 306, y + 0),
        createLine(x + 344, y + 16, x + 344, y + 0),
        createLine(x + 382, y + 16, x + 382, y + 0),
    ];
}

function buildFixedTexts(x, y) {
    return [
        createText(x + 201, y + 16, "ARC S.L.", { height: 2, align: "ML" }),
        createText(x + 201, y + 13, "Urazandi", { height: 2, align: "ML" }),
        createText(x + 201, y + 10, "Industrialdea,", { height: 2, align: "ML" }),
        createText(x + 201, y + 7, "Pabellon 6D", { height: 2, align: "ML" }),
        createText(x + 201, y + 4, "Asua-Erandio (Vizcaya)", { height: 2, align: "ML" }),
        createText(x + 201, y + 1, "www.arcsl.com", { height: 2, align: "ML" }),
        createText(x + 249, y + 14, "Dibujado", { height: 2, align: "MC" }),
        createText(x + 249, y + 10, "Fecha", { height: 2, align: "MC" }),
        createText(x + 249, y + 6, "Revisado", { height: 2, align: "MC" }),
        createText(x + 249, y + 2, "Esquema", { height: 2, align: "MC" }),
        createText(x + 325, y + 14, "Cliente", { height: 2, align: "MC" }),
        createText(x + 325, y + 10, "Localidad", { height: 2, align: "MC" }),
        createText(x + 325, y + 6, "Sustituye a", { height: 2, align: "MC" }),
        createText(x + 325, y + 2, "Sustituido por", { height: 2, align: "MC" }),
        createText(x + 391, y + 14, "Hoja", { height: 2, align: "MC" }),
        createText(x + 391, y + 6, "Ref.", { height: 2, align: "MC" }),
    ];
}

function buildPlaceholderRevisionTexts(x, y) {
    return [
        createText(x + 249, y + 38, "-", { height: 2, align: "MC" }),
        createText(x + 249, y + 34, "-", { height: 2, align: "MC" }),
        createText(x + 249, y + 30, "-", { height: 2, align: "MC" }),
        createText(x + 287, y + 38, "-", { height: 2, align: "MC" }),
        createText(x + 287, y + 34, "-", { height: 2, align: "MC" }),
        createText(x + 287, y + 30, "-", { height: 2, align: "MC" }),
        createText(x + 215, y + 30, "Revision 1", { height: 2, align: "MC" }),
        createText(x + 215, y + 34, "Revision 2", { height: 2, align: "MC" }),
        createText(x + 215, y + 38, "Revision 3", { height: 2, align: "MC" }),
        createText(x + 308, y + 30, "-", { height: 2, align: "ML" }),
        createText(x + 308, y + 34, "-", { height: 2, align: "ML" }),
        createText(x + 308, y + 38, "-", { height: 2, align: "ML" }),
    ];
}

function buildDynamicTexts(x, y, values) {
    return [
        createText(x + 315, y + 22, values.Inst, { height: 5, align: "MC" }),
        createText(x + 287, y + 14, values.Dibu, { height: 2, align: "MC" }),
        createText(x + 287, y + 10, values.Fech, { height: 2, align: "MC" }),
        createText(x + 287, y + 6, values.Revi, { height: 2, align: "MC" }),
        createText(x + 287, y + 2, values.Esqu, { height: 2, align: "MC" }),
        createText(x + 363, y + 14, values.Clie, { height: 2, align: "MC" }),
        createText(x + 363, y + 10, values.Loca, { height: 2, align: "MC" }),
        createText(x + 363, y + 6, values.Stye, { height: 2, align: "MC" }),
        createText(x + 363, y + 2, values.Stdo, { height: 2, align: "MC" }),
        createText(x + 391, y + 2, values.Refe, { height: 2, align: "MC" }),
        createText(x + 391, y + 10, values.Hoja, { height: 2, align: "MC" }),
    ];
}
