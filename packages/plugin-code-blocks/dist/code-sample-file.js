"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCodeSample = exports.DEFAULT_BLOCK_NAME = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
exports.DEFAULT_BLOCK_NAME = '__DEFAULT__';
const REGION_REGEX = /^[\t ]*\/\/[\t ]*#((?:end)?region)(?:[\t ]+(.*?))?$/gm;
const parseRegionMarker = (fileContent) => (match) => {
    (0, assert_1.default)(typeof match.index === 'number', new Error('Missing index'));
    const type = match[1].toLocaleLowerCase() === 'region' ? 'start' : 'end';
    const name = match[2];
    (0, assert_1.default)(type !== 'start' || name, new Error('Missing name of start `#region`'));
    const location = typedoc_pluginutils_1.textUtils.getCoordinates(fileContent, match.index);
    return Object.assign(Object.assign({}, location), { type, name, fullMatch: match[0] });
};
const assembleStartEndMarkers = (prevMarkers, marker) => {
    if (marker.type === 'start') {
        (0, assert_1.default)(!prevMarkers.find(r => r.name === marker.name), new Error(`Region ${marker.name} already exists`));
        prevMarkers.push({
            open: marker,
            name: marker.name,
        });
    }
    else { // End marker
        if (marker.name) {
            const openRegion = prevMarkers.find(r => r.name === marker.name);
            (0, assert_1.default)(openRegion, new Error(`Missing region ${marker.name} explicitly closed`));
            (0, assert_1.default)(!openRegion.close, new Error(`Region ${marker.name} already closed`));
            openRegion.close = marker;
        }
        else {
            const lastNotClosed = prevMarkers.concat().reverse().find(r => !r.close);
            (0, assert_1.default)(lastNotClosed, new Error('Missing implicitly closed region'));
            (0, assert_1.default)(!lastNotClosed.close, new Error(`Region ${lastNotClosed.name} already closed`));
            lastNotClosed.close = marker;
        }
    }
    return prevMarkers;
};
const addRegionInSet = (file, contentLines) => (regionsMap, { open, close, name }) => {
    const code = contentLines.slice(open.line, close.line).filter(l => !l.match(REGION_REGEX)).join('\n');
    regionsMap.set(name, {
        file,
        region: name,
        endLine: close.line,
        startLine: open.line,
        code,
    });
    return regionsMap;
};
const readCodeSample = (file) => {
    const content = (0, fs_1.readFileSync)(file, 'utf-8');
    const lines = content.split('\n');
    const regionMarkers = [...content.matchAll(REGION_REGEX)];
    if (regionMarkers.length === 0) {
        return new Map([
            [exports.DEFAULT_BLOCK_NAME, {
                    file,
                    region: exports.DEFAULT_BLOCK_NAME,
                    code: content,
                    endLine: lines.length,
                    startLine: 1,
                }],
        ]);
    }
    return regionMarkers
        .map(parseRegionMarker(content))
        .reduce(assembleStartEndMarkers, [])
        // Check validity of regions
        .map(r => {
        (0, assert_1.default)(r.open && r.close, new SyntaxError(`Region ${r.name} is not properly opened & closed`));
        (0, assert_1.default)(r.open.line < r.close.line, new SyntaxError(`Region ${r.name} is closed before being opened. Opened at line ${r.open.line}, closed at line ${r.close.line}`));
        return r;
    })
        .reduce(addRegionInSet(file, lines), new Map());
};
exports.readCodeSample = readCodeSample;
//# sourceMappingURL=code-sample-file.js.map