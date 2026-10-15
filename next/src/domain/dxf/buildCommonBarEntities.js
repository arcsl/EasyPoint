import { createLine, createText } from "./primitives.js";

export function buildCommonBarEntities(sheetDrawing) {
    return sheetDrawing.commonBars.flatMap(bar => [
        createText(bar.xStart - 2, bar.y, bar.label, { height: 2.5, align: "MR" }),
        createLine(bar.xStart, bar.y, bar.xEnd, bar.y, {
            color: bar.key === "CE+" ? 1 : bar.key === "CE-" ? 96 : 0,
        }),
        createText(bar.xEnd + 2, bar.y, bar.label, { height: 2.5, align: "ML" }),
    ]);
}
