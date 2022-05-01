"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeBlockRenderer = void 0;
const typedoc_1 = require("typedoc");
const theme_1 = require("../theme");
const default_code_block_renderer_1 = require("./default-code-block-renderer");
const getCodeBlockRenderer = (application, plugin) => {
    const theme = application.renderer.theme;
    if (!theme) {
        throw new Error('Missing theme');
    }
    if (!(0, theme_1.isCodeBlocksPluginTheme)(theme)) {
        if (theme instanceof typedoc_1.DefaultTheme) {
            return new default_code_block_renderer_1.DefaultCodeBlockRenderer(theme, plugin);
        }
        else {
            throw new Error('Unhandled theme not compatible nor extending the default theme.');
        }
    }
    else {
        throw new Error('Not implemented');
    }
};
exports.getCodeBlockRenderer = getCodeBlockRenderer;
//# sourceMappingURL=index.js.map