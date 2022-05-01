"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initThemePlugins = void 0;
const typedoc_1 = require("typedoc");
const theme_1 = require("../theme");
const default_tree_builder_1 = require("./page-tree/default-tree-builder");
const search_1 = require("./search");
__exportStar(require("./page-tree/types"), exports);
const initThemePlugins = (application, plugin) => {
    const theme = application.renderer.theme;
    if (!theme) {
        throw new Error('Missing theme');
    }
    if (!(0, theme_1.isPagesPluginTheme)(theme)) {
        if (theme instanceof typedoc_1.DefaultTheme) {
            new search_1.DefaultPagesJavascriptIndexPlugin(plugin).initialize();
            return new default_tree_builder_1.DefaultTreeBuilder(theme, plugin);
        }
        else {
            throw new Error('Unhandled theme not compatible nor extending the default theme.');
        }
    }
    else {
        throw new Error('Not implemented');
    }
};
exports.initThemePlugins = initThemePlugins;
//# sourceMappingURL=index.js.map