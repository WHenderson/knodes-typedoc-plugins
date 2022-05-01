"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodePath = exports.getNodeUrl = exports.getDir = exports.traverseDeep = exports.join = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const a_node_reflection_1 = require("../../reflections/a-node-reflection");
const join = (...segments) => (0, path_1.join)(...segments.filter(lodash_1.isString));
exports.join = join;
const traverseDeep = (reflections, cb) => reflections.forEach(r => traverseSingle(r, cb));
exports.traverseDeep = traverseDeep;
const traverseSingle = (reflection, cb) => {
    cb(reflection);
    reflection.traverse(rr => traverseSingle(rr, cb));
};
const trimExt = (file) => {
    if (!file.match(/\.[^/.]+$/)) {
        throw new Error(`Invalid non-extension filename "${file}"`);
    }
    return file.replace(/\.[^/.]+$/, '');
};
const getDir = (node, kind) => {
    const childKey = `children${kind[0].toUpperCase()}${kind.slice(1)}Dir`;
    const childVal = node[childKey];
    if (childVal) {
        return childVal;
    }
    else if (node.childrenDir) {
        return node.childrenDir;
    }
    else {
        const val = node[kind];
        if (!val) {
            if (kind === 'output') {
                return (0, exports.getDir)(node, 'source');
            }
            return '.';
        }
        return trimExt(val);
    }
};
exports.getDir = getDir;
const getNodeUrl = (node) => {
    if (node.output) {
        if (node.output.endsWith('.html')) {
            return node.output;
        }
        else {
            // TODO: Maybe throw if confix
            return `${node.output}.html`;
        }
    }
    else {
        (0, assert_1.default)(node.source);
        const filenameNoExt = trimExt(node.source);
        if (node.children) {
            return `${filenameNoExt}/index.html`;
        }
        return `${filenameNoExt}.html`;
    }
};
exports.getNodeUrl = getNodeUrl;
const getNodePath = (self, parent) => [parent, self]
    .filter(lodash_1.isObject)
    .flatMap(iterateNodeTitle)
    .map(p => JSON.stringify(p)).join(' ⇥ ');
exports.getNodePath = getNodePath;
const iterateNodeTitle = (node) => {
    if (node instanceof a_node_reflection_1.ANodeReflection) {
        return [...iterateNodeTitle(node.parent), node.name];
    }
    else if (node instanceof typedoc_1.Reflection) {
        return [];
    }
    else if (node) {
        return [node.title];
    }
    else {
        return [];
    }
};
//# sourceMappingURL=utils.js.map