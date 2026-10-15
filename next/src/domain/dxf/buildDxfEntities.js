import { buildTitleBlockEntities } from "./buildTitleBlockEntities.js";
import { buildCommonBarEntities } from "./buildCommonBarEntities.js";
import { buildDevicePlaceholderEntities } from "./buildDevicePlaceholderEntities.js";

export function buildDxfEntities(drawingPlan, options = {}) {
    const dateText = options.dateText ?? new Date().toISOString().split("T")[0];
    const totalSheets = drawingPlan.sheets.length;

    return drawingPlan.sheets.flatMap(sheet => [
        ...buildTitleBlockEntities(sheet, {
            projectName: drawingPlan.project.name,
            sheetInfo: drawingPlan.sheetInfo,
            totalSheets,
            dateText,
        }),
        ...buildDevicePlaceholderEntities(sheet),
        ...buildCommonBarEntities(sheet),
    ]);
}
