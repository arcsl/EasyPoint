const COMMON_BAR_Y_OFFSETS = {
    S0: 4,
    G: 12,
    G0: 16,
    "CE+": 24,
    "CE-": 28,
    S0sec: 40,
    N0: 100,
};

const DEVICE_BASELINE_Y = 236;

export function buildDrawingPlan(planSnapshot, sheetLayout) {
    const deviceLookup = buildDeviceLookup(planSnapshot);

    return {
        project: planSnapshot.project,
        sheetInfo: planSnapshot.sheetInfo,
        sheets: sheetLayout.sheets.map(sheet => buildSheetDrawing(sheet, deviceLookup)),
    };
}

function buildSheetDrawing(sheet, deviceLookup) {
    const frameX = sheet.frame?.x ?? 0;
    const frameY = sheet.frame?.y ?? 0;
    const positionedStartValues = sheet.items.map(item => item.x);
    const positionedEndValues = sheet.items.map(item => item.x + (item.envelopeWidth ?? item.width));
    const xStart = (positionedStartValues.length > 0 ? Math.min(...positionedStartValues) : 0) + frameX;
    const xEnd = (positionedEndValues.length > 0 ? Math.max(...positionedEndValues) : 0) + frameX;

    return {
        index: sheet.index,
        railIndex: sheet.railIndex,
        frame: { ...sheet.frame },
        devices: sheet.items.map(item => buildDeviceDrawing(item, frameX, frameY, deviceLookup)),
        commonBars: sheet.commonBars.map(bar => ({
            key: bar.key,
            label: bar.label,
            xStart,
            xEnd,
            y: frameY + DEVICE_BASELINE_Y - (COMMON_BAR_Y_OFFSETS[bar.key] ?? 0),
        })),
    };
}

function buildDeviceDrawing(item, frameX, frameY, deviceLookup) {
    const snapshot = deviceLookup.get(getDeviceLookupKey(item.railIndex, item.deviceIndex));

    return {
        railIndex: item.railIndex,
        deviceIndex: item.deviceIndex,
        model: item.model,
        family: item.family,
        type: item.type,
        pageIndex: item.pageIndex,
        pageCount: item.pageCount,
        width: item.width,
        envelopeWidth: item.envelopeWidth ?? item.width,
        page: item.page,
        terminals: snapshot?.terminals ?? [],
        optionals: snapshot?.optionals ?? [],
        x: frameX + item.x,
        y: frameY + DEVICE_BASELINE_Y,
    };
}

function buildDeviceLookup(planSnapshot) {
    const lookup = new Map();

    planSnapshot.rails.forEach(rail => {
        rail.devices.forEach(device => {
            lookup.set(getDeviceLookupKey(device.railIndex, device.deviceIndex), device);
        });
    });

    return lookup;
}

function getDeviceLookupKey(railIndex, deviceIndex) {
    return `${railIndex}:${deviceIndex}`;
}
