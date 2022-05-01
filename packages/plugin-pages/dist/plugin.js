"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesPlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const options_1 = require("./options");
const theme_plugins_1 = require("./theme-plugins");
const EXTRACT_PAGE_LINK_REGEX = /page\s+(\S+?\w+?)(?:\s+([^}]+?))?\s*/g;
class PagesPlugin extends typedoc_pluginutils_1.ABasePlugin {
    constructor(application) {
        super(application, __filename);
        this.pluginOptions = (0, options_1.buildOptions)(this);
        this._pageTreeBuilder = (0, lodash_1.once)(() => (0, theme_plugins_1.initThemePlugins)(this.application, this));
        this._currentPageMemo = typedoc_pluginutils_1.CurrentPageMemo.for(this);
        this._markdownReplacer = new typedoc_pluginutils_1.MarkdownReplacer(this);
        this._pathReflectionResolver = new typedoc_pluginutils_1.PathReflectionResolver(this);
    }
    /**
     * This method is called after the plugin has been instanciated.
     */
    initialize() {
        const opts = this.pluginOptions.getValue();
        this.logger.level = opts.logLevel;
        this._currentPageMemo.initialize();
        this.application.renderer.on(typedoc_1.RendererEvent.BEGIN, this._addPagesToProject.bind(this));
        typedoc_pluginutils_1.EventsExtra.for(this.application)
            .beforeOptionsFreeze(() => {
            if (this.pluginOptions.getValue().enablePageLinks) {
                this._markdownReplacer.bindTag(EXTRACT_PAGE_LINK_REGEX, this._replacePageLink.bind(this), '{@page}');
            }
        })
            .onThemeReady(this._pageTreeBuilder.bind(this))
            .onSetOption(`${this.optionsPrefix}:logLevel`, v => {
            this.logger.level = v;
        });
    }
    /**
     * Generate pages mappings & append {@link NodeReflection} to the project.
     *
     * @param event - The renderer event emitted at {@link RendererEvent.BEGIN}.
     */
    _addPagesToProject(event) {
        const opts = this.pluginOptions.getValue();
        this._pageTreeBuilder().appendToProject(event, opts);
        this.application.logger.info(`Generating ${this._pageTreeBuilder().mappings.length} pages`);
    }
    /**
     * Transform the parsed page link.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    _replacePageLink({ captures, fullMatch }, sourceHint) {
        const [page, label] = captures;
        (0, assert_1.default)((0, lodash_1.isString)(page));
        const resolvedFile = this._pathReflectionResolver.resolveNamedPath(this._currentPageMemo.currentReflection.project, page, {
            currentReflection: this._currentPageMemo.currentReflection,
            containerFolder: this.pluginOptions.getValue().source,
        });
        if (!resolvedFile) {
            this.logger.error(() => `In "${sourceHint()}", could not resolve page "${page}" from reflection ${this._currentPageMemo.currentReflection.name}`);
            return fullMatch;
        }
        const builder = this._pageTreeBuilder();
        const { mappings } = builder;
        const mapping = mappings.find(m => m.model.sourceFilePath === resolvedFile);
        if (!mapping) {
            this.logger.error(() => `In "${sourceHint()}", could not find a page for "${page}" (resolved as "${this.relativeToRoot(resolvedFile)}"). Known pages are ${JSON.stringify(mappings
                .map(m => this.relativeToRoot(m.model.sourceFilePath)))}`);
            return fullMatch;
        }
        else {
            this.logger.verbose(() => `Created a link from "${sourceHint()}" to "${mapping.model.name}" (resolved as "${this.relativeToRoot(resolvedFile)}")`);
        }
        const link = builder.renderPageLink({ label: label !== null && label !== void 0 ? label : undefined, mapping });
        if (typeof link === 'string') {
            return link;
        }
        else {
            return typedoc_1.JSX.renderElement(link);
        }
    }
}
exports.PagesPlugin = PagesPlugin;
({});
//# sourceMappingURL=plugin.js.map