"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findReadmeFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const find_up_1 = require("find-up");
const getModuleReflectionSource = (reflection) => {
    var _a, _b;
    for (const source of (_a = reflection.sources) !== null && _a !== void 0 ? _a : []) {
        if (source.file) {
            return (_b = source.file) === null || _b === void 0 ? void 0 : _b.fullFileName;
        }
    }
    return undefined;
};
/**
 * Try to resoluve the README file in the directory of the module's `package.json`.
 *
 * @param readmeTargets - A list of file names to look up to locate packages root.
 * @param moduleMapping - The module URL mapping.
 * @returns the relative & absolute path of the readme.
 */
const findReadmeFile = (readmeTargets, moduleMapping) => {
    const src = getModuleReflectionSource(moduleMapping.model);
    if (!src) {
        return;
    }
    let targetFile;
    for (const target of readmeTargets) {
        targetFile = (0, find_up_1.sync)(target, { cwd: (0, path_1.dirname)(src) });
        if (!targetFile) {
            continue;
        }
        const pkgDir = (0, path_1.dirname)(targetFile);
        const readmeFile = (0, fs_1.readdirSync)(pkgDir).find(f => f.toLowerCase() === 'readme.md');
        if (readmeFile) {
            const absReadmeFile = (0, path_1.resolve)(pkgDir, readmeFile);
            return {
                relative: readmeFile,
                absolute: absReadmeFile,
            };
        }
    }
};
exports.findReadmeFile = findReadmeFile;
//# sourceMappingURL=find-readme-file.js.map