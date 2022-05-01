"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCodeBlockRenderer = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const typedoc_1 = require("typedoc");
const types_1 = require("../types");
const CSS_FILE_NAME = 'assets/code-blocks.css';
class DefaultCodeBlockRenderer {
    constructor(theme, plugin) {
        this.theme = theme;
        this.plugin = plugin;
        this.renderInlineCodeBlock = ({ fileName, markdownCode, mode }) => this._wrapCode(typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
            "From ",
            fileName), this.theme.getRenderContext(new typedoc_1.PageEvent(fileName)).markdown(markdownCode), mode);
        this.renderCodeBlock = ({ asFile, sourceFile, mode, content, url }) => this._wrapCode(typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
            "From ",
            url ? typedoc_1.JSX.createElement("a", { href: url }, asFile) : typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null, asFile)), this.theme.getRenderContext(new typedoc_1.PageEvent(asFile)).markdown(`\`\`\`${(0, path_1.extname)(sourceFile).slice(1)}
${content.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}
\`\`\``), mode);
        this._wrapCode = (header, codeHighlighted, mode) => {
            header = typedoc_1.JSX.createElement("p", null, header);
            const code = typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, { html: codeHighlighted });
            switch (mode) {
                case types_1.EBlockMode.DEFAULT: {
                    return typedoc_1.JSX.createElement("div", { class: "code-block" },
                        header,
                        code);
                }
                case types_1.EBlockMode.FOLDED:
                case types_1.EBlockMode.EXPANDED: {
                    return typedoc_1.JSX.createElement("details", { class: "code-block", open: mode === types_1.EBlockMode.EXPANDED },
                        typedoc_1.JSX.createElement("summary", null, header),
                        code);
                }
                default: {
                    throw new Error('Invalid foldable marker');
                }
            }
        };
        const { renderer } = theme.application;
        // Add stylesheet
        renderer.on(typedoc_1.RendererEvent.END, this._onRenderEnd.bind(this));
        renderer.hooks.on('head.end', context => typedoc_1.JSX.createElement("link", { rel: "stylesheet", href: context.relativeURL(CSS_FILE_NAME) }));
    }
    /**
     * Copy assets to the output directory.
     *
     * @param event - The {@link RendererEvent.END} event.
     */
    _onRenderEnd(event) {
        const dest = (0, path_1.join)(event.outputDirectory, CSS_FILE_NAME);
        const src = this.plugin.resolvePackageFile('static/code-block.css');
        (0, fs_1.copyFileSync)(src, dest);
    }
}
exports.DefaultCodeBlockRenderer = DefaultCodeBlockRenderer;
//# sourceMappingURL=default-code-block-renderer.js.map