export function createLine(x1, y1, x2, y2, options = {}) {
    return {
        kind: "LINE",
        x1,
        y1,
        x2,
        y2,
        lineWeight: options.lineWeight ?? -1,
        lineType: options.lineType ?? "",
        color: options.color ?? 0,
    };
}

export function createText(x, y, value, options = {}) {
    return {
        kind: "TEXT",
        x,
        y,
        value: String(value ?? ""),
        height: options.height ?? 2.5,
        align: options.align ?? "ML",
        rotation: options.rotation ?? 0,
        style: options.style ?? "Standard",
        widthFactor: options.widthFactor ?? 1,
        color: options.color ?? 0,
    };
}

export function createMText(x, y, lines, options = {}) {
    return {
        kind: "MTEXT",
        x,
        y,
        lines: [...lines],
        height: options.height ?? 2.5,
        align: options.align ?? "ML",
        rotation: options.rotation ?? 0,
        style: options.style ?? "Standard",
    };
}

export function createSolid(points, options = {}) {
    return {
        kind: "SOLID",
        points: points.map(([x, y]) => [x, y]),
        color: options.color ?? 0,
    };
}

export function createArc(x, y, radius, startAngle, endAngle, options = {}) {
    return {
        kind: "ARC",
        x,
        y,
        radius,
        startAngle,
        endAngle,
        lineWeight: options.lineWeight ?? -1,
        color: options.color ?? 0,
    };
}

export function createCircle(x, y, radius, options = {}) {
    return {
        kind: "CIRCLE",
        x,
        y,
        radius,
        lineWeight: options.lineWeight ?? -1,
        color: options.color ?? 0,
    };
}

export function createEllipse(x, y, axisX, axisY, options = {}) {
    return {
        kind: "ELLIPSE",
        x,
        y,
        axisX,
        axisY,
        lineWeight: options.lineWeight ?? -1,
        lineType: options.lineType ?? "",
        scale: options.scale ?? 1,
        color: options.color ?? 0,
    };
}

export function createPointHatch(x, y, options = {}) {
    return {
        kind: "HATCH_POINT",
        x,
        y,
        color: options.color ?? 0,
    };
}

export function createRawDxf(value) {
    return {
        kind: "RAW",
        value: String(value ?? ""),
    };
}
