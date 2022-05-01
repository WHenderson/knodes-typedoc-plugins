"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANodeReflection = void 0;
const typedoc_1 = require("typedoc");
class ANodeReflection extends typedoc_1.DeclarationReflection {
    constructor(name, kind, module, parent = module) {
        super(name, kind, parent);
        this.module = module;
        this.parent = parent;
    }
    get depth() {
        return this.parent instanceof ANodeReflection ? this.parent.depth + 1 : 0;
    }
    get isModuleRoot() {
        return this.module === this.parent;
    }
}
exports.ANodeReflection = ANodeReflection;
//# sourceMappingURL=a-node-reflection.js.map