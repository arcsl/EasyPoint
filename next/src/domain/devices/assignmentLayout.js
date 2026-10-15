export function normalizeAssignmentEntry(rawEntry, terminalKey = "") {
    if (!rawEntry) {
        return null;
    }

    if (typeof rawEntry === "string") {
        return {
            signalId: rawEntry,
            anchorTerminalKey: terminalKey,
            offset: 0,
            span: 1,
        };
    }

    if (typeof rawEntry !== "object" || !rawEntry.signalId) {
        return null;
    }

    return {
        signalId: rawEntry.signalId,
        anchorTerminalKey: rawEntry.anchorTerminalKey ?? terminalKey,
        offset: Number(rawEntry.offset) || 0,
        span: Math.max(1, Number(rawEntry.span) || 1),
    };
}

export function getAssignmentEntry(device, terminalKey) {
    return normalizeAssignmentEntry(device?.assignments?.[terminalKey], terminalKey);
}

export function getAssignedSignalId(device, terminalKey) {
    return getAssignmentEntry(device, terminalKey)?.signalId ?? "";
}

export function isReservedTerminal(device, terminalKey) {
    return (getAssignmentEntry(device, terminalKey)?.offset ?? 0) > 0;
}

export function clearSignalAssignmentsFromDevice(device, signalId) {
    if (!device?.assignments) {
        return;
    }

    Object.entries(device.assignments).forEach(([terminalKey, rawEntry]) => {
        const entry = normalizeAssignmentEntry(rawEntry, terminalKey);
        if (entry?.signalId === signalId) {
            delete device.assignments[terminalKey];
        }
    });
}

export function collectAssignedSignalIds(assignment) {
    const signalIds = new Set();

    assignment.rails.forEach(rail => {
        rail.forEach(device => {
            Object.entries(device.assignments || {}).forEach(([terminalKey, rawEntry]) => {
                const entry = normalizeAssignmentEntry(rawEntry, terminalKey);
                if (entry?.signalId) {
                    signalIds.add(entry.signalId);
                }
            });
        });
    });

    return signalIds;
}

export function collectAssignedSignalSlotCounts(assignment) {
    const counts = new Map();

    assignment.rails.forEach(rail => {
        rail.forEach(device => {
            Object.entries(device.assignments || {}).forEach(([terminalKey, rawEntry]) => {
                const entry = normalizeAssignmentEntry(rawEntry, terminalKey);
                if (!entry?.signalId) {
                    return;
                }
                counts.set(entry.signalId, (counts.get(entry.signalId) ?? 0) + 1);
            });
        });
    });

    return counts;
}

export function findTerminalPlacement(deviceDefinition, device, terminalKey, signal, options = {}) {
    const terminals = deviceDefinition?.terminals ?? [];
    const startIndex = terminals.findIndex(terminal => terminal.key === terminalKey);
    const span = Math.max(1, Number(signal?.number) || 1);
    if (startIndex === -1 || !signal?.type) {
        return null;
    }

    const anchorTerminalKey = options.anchorTerminalKey ?? terminalKey;
    const occupiedKeys = [];

    for (let offset = 0; offset < span; offset += 1) {
        const terminal = terminals[startIndex + offset];
        if (!terminal) {
            return null;
        }

        if (!terminal.signalTypes?.includes(signal.type)) {
            return null;
        }

        const existingEntry = getAssignmentEntry(device, terminal.key);
        if (existingEntry) {
            const samePlacement =
                existingEntry.signalId === signal.id &&
                existingEntry.anchorTerminalKey === anchorTerminalKey;

            if (!samePlacement) {
                return null;
            }
        }

        occupiedKeys.push(terminal.key);
    }

    return occupiedKeys;
}
