"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECodeBlockReflectionKind = void 0;
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
// eslint-disable-next-line @typescript-eslint/no-var-requires -- Get name from package
const ns = require('../../package.json').name;
/**
 * Extends the {@link ReflectionKind} to add custom Page, Menu & Any kinds.
 */
var ECodeBlockReflectionKind;
(function (ECodeBlockReflectionKind) {
    ECodeBlockReflectionKind[ECodeBlockReflectionKind["CODE_BLOCK"] = (0, typedoc_pluginutils_1.addReflectionKind)(ns, 'CodeBlock')] = "CODE_BLOCK";
})(ECodeBlockReflectionKind = exports.ECodeBlockReflectionKind || (exports.ECodeBlockReflectionKind = {}));
ECodeBlockReflectionKind;
//# sourceMappingURL=reflection-kind.js.map