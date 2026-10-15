import {
    CONTROLLER_SEPARATOR,
    SHEET_MARGIN_X,
    SHEET_STEP_X,
    SHEET_STEP_Y,
    SHEET_USABLE_WIDTH,
} from "./layoutConstants.js";

export function buildSheetLayout(planSnapshot) {
    const sheets = packRailSheets(planSnapshot.rails ?? []);
    centerSheetItems(sheets);

    const matrix = calculateSheetMatrix(sheets.length);
    sheets.forEach((sheet, index) => {
        const column = index % matrix.columns;
        const rowFromTop = Math.floor(index / matrix.columns);
        sheet.index = index;
        sheet.frame = {
            column,
            row: rowFromTop,
            x: column * SHEET_STEP_X,
            y: (matrix.rows - 1 - rowFromTop) * SHEET_STEP_Y,
        };
    });

    return {
        matrix,
        sheets,
    };
}

function packRailSheets(rails) {
    const sheets = [];
    const createSheet = rail => ({
        railIndex: rail.index,
        items: [],
        commonBars: [...(rail.commonBars ?? [])],
    });

    rails.forEach(rail => {
        if (sheets.length === 0) {
            sheets.push(createSheet(rail));
        } else if (sheets[sheets.length - 1].items.length > 0) {
            sheets.push(createSheet(rail));
        } else {
            sheets[sheets.length - 1].railIndex = rail.index;
            sheets[sheets.length - 1].commonBars = [...(rail.commonBars ?? [])];
        }

        let currentSheet = sheets[sheets.length - 1];
        const items = rail.sheetItems ?? [];

        for (let index = 0; index < items.length; index += 1) {
            const item = structuredClone(items[index]);

            if (item.pageCount > 1) {
                if (currentSheet.items.length > 0) {
                    currentSheet = createAndPushSheet(sheets, rail);
                }

                currentSheet.items.push(item);

                const hasNextSameDevice =
                    index < items.length - 1 &&
                    items[index + 1].model === item.model &&
                    items[index + 1].deviceIndex === item.deviceIndex;

                if (hasNextSameDevice) {
                    currentSheet = createAndPushSheet(sheets, rail);
                }
                continue;
            }

            if (item.family === "General") {
                if (currentSheet.items.length > 0) {
                    currentSheet = createAndPushSheet(sheets, rail);
                }

                currentSheet.items.push(item);

                if (index < items.length - 1) {
                    currentSheet = createAndPushSheet(sheets, rail);
                }
                continue;
            }

            const occupiedWidth = measureOccupiedWidth(currentSheet.items);
            const separator = currentSheet.items.length > 0 && item.type === "controlador"
                ? CONTROLLER_SEPARATOR
                : 0;

            if (occupiedWidth + separator + item.width > SHEET_USABLE_WIDTH) {
                currentSheet = createAndPushSheet(sheets, rail);
            }

            currentSheet.items.push(item);
        }

        currentSheet = createAndPushSheet(sheets, rail);
    });

    while (sheets.length > 0 && sheets[sheets.length - 1].items.length === 0) {
        sheets.pop();
    }

    return sheets;
}

function createAndPushSheet(sheets, rail) {
    const sheet = {
        railIndex: rail.index,
        items: [],
        commonBars: [...(rail.commonBars ?? [])],
    };
    sheets.push(sheet);
    return sheet;
}

function measureOccupiedWidth(items) {
    return items.reduce((total, item, index) => {
        const separator = index === 0 ? 0 : (item.type === "controlador" ? CONTROLLER_SEPARATOR : 0);
        return total + separator + item.width;
    }, 0);
}

function centerSheetItems(sheets) {
    sheets.forEach(sheet => {
        if (sheet.items.length === 0) {
            return;
        }

        const totalWidth = measureOccupiedWidth(sheet.items);
        const offset = (SHEET_USABLE_WIDTH - totalWidth) / 2;
        let cursor = SHEET_MARGIN_X + offset;

        sheet.items.forEach((item, index) => {
            const separator = index === 0 ? 0 : (item.type === "controlador" ? CONTROLLER_SEPARATOR : 0);
            cursor += separator;
            item.x = cursor;
            cursor += item.width;
        });
    });
}

function calculateSheetMatrix(sheetCount) {
    let columns = 0;
    while ((columns * (columns - 1)) < sheetCount) {
        columns += 1;
    }

    return {
        rows: Math.ceil(sheetCount / columns),
        columns,
    };
}
