"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageReflection = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const a_node_reflection_1 = require("./a-node-reflection");
class PageReflection extends a_node_reflection_1.ANodeReflection {
    constructor(name, kind, module, parent, sourceFilePath, url) {
        super(name, kind, module, parent);
        this.sourceFilePath = sourceFilePath;
        this.url = url;
        this.content = (0, typedoc_pluginutils_1.catchWrap)(() => (0, fs_1.readFileSync)(sourceFilePath, 'utf-8'), `Could not read ${(0, path_1.relative)(process.cwd(), sourceFilePath)}`);
        this.sources = [
            { character: 0, fileName: sourceFilePath, line: 1, url, file: new typedoc_1.SourceFile(sourceFilePath) },
        ];
        this.comment = new typedoc_1.Comment(undefined, this.content);
    }
}
exports.PageReflection = PageReflection;
//# sourceMappingURL=page-reflection.js.map