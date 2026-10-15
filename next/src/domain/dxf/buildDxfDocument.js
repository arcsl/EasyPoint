import { buildPlanSnapshot } from "./buildPlanSnapshot.js";
import { buildSheetLayout } from "./buildSheetLayout.js";
import { buildDrawingPlan } from "./buildDrawingPlan.js";
import { buildDxfEntities } from "./buildDxfEntities.js";
import { serializeDxf } from "./serializeDxf.js";

export function buildDxfDocument(project, options = {}) {
    const snapshot = buildPlanSnapshot(project);
    const layout = buildSheetLayout(snapshot);
    const drawingPlan = buildDrawingPlan(snapshot, layout);
    const entities = buildDxfEntities(drawingPlan, options);

    return {
        snapshot,
        layout,
        drawingPlan,
        entities,
        dxf: serializeDxf(entities),
    };
}
