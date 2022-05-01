"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockReflection = void 0;
const typedoc_1 = require("typedoc");
const reflection_kind_1 = require("./reflection-kind");
class CodeBlockReflection extends typedoc_1.DeclarationReflection {
    constructor(name, file, code, startLine, endLine) {
        super(name, reflection_kind_1.ECodeBlockReflectionKind.CODE_BLOCK);
        this.file = file;
        this.code = code;
        this.startLine = startLine;
        this.endLine = endLine;
    }
}
exports.CodeBlockReflection = CodeBlockReflection;
//# sourceMappingURL=code-block-reflection.js.map