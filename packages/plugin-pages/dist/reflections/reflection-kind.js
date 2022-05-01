"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesPluginReflectionKind = void 0;
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
// eslint-disable-next-line @typescript-eslint/no-var-requires -- Get name from package
const ns = require('../../package.json').name;
/**
 * Extends the {@link ReflectionKind} to add custom Page, Menu & Any kinds.
 */
var PagesPluginReflectionKind;
(function (PagesPluginReflectionKind) {
    PagesPluginReflectionKind[PagesPluginReflectionKind["PAGE"] = (0, typedoc_pluginutils_1.addReflectionKind)(ns, 'Page')] = "PAGE";
    PagesPluginReflectionKind[PagesPluginReflectionKind["MENU"] = (0, typedoc_pluginutils_1.addReflectionKind)(ns, 'Menu')] = "MENU";
    // eslint-disable-next-line no-bitwise -- expected.
    PagesPluginReflectionKind[PagesPluginReflectionKind["ANY"] = (0, typedoc_pluginutils_1.addReflectionKind)(ns, 'Any', PagesPluginReflectionKind.PAGE | PagesPluginReflectionKind.MENU)] = "ANY";
})(PagesPluginReflectionKind = exports.PagesPluginReflectionKind || (exports.PagesPluginReflectionKind = {}));
PagesPluginReflectionKind;
//# sourceMappingURL=reflection-kind.js.map