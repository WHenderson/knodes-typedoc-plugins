"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPagesJavascriptIndexPlugin = void 0;
// Edit of <~/typedoc/src/lib/output/plugins/JavascriptIndexPlugin.ts>
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = require("lodash");
const lunr_1 = require("lunr");
const typedoc_1 = require("typedoc");
const reflections_1 = require("../../reflections");
/**
 * A plugin that exports an index of the project to a javascript file.
 *
 * The resulting javascript file can be used to build a simple search function.
 */
class DefaultPagesJavascriptIndexPlugin {
    constructor(_plugin) {
        this._plugin = _plugin;
        this._groupPlugin = this._plugin.application.converter.getComponent('group');
        this._defaultSearch = this._plugin.application.renderer.getComponent('javascript-index');
    }
    /**
     * Create a new JavascriptIndexPlugin instance.
     */
    initialize() {
        // eslint-disable-next-line @typescript-eslint/dot-notation -- Private property
        const fn = this._defaultSearch['onRendererBegin'];
        (0, assert_1.default)(fn);
        this._plugin.application.renderer.off(typedoc_1.RendererEvent.BEGIN, fn);
        this._plugin.application.renderer.on(typedoc_1.RendererEvent.BEGIN, this._onRendererBegin.bind(this));
    }
    /**
     * Convert {@link ANodeReflection} instances to custom declaration reflections with specific properties set.
     *
     * @param reflection - The reflection to convert.
     * @param project - The root project, used to get modules.
     * @returns the new reflection, along with a flag indicating if it is a page.
     */
    _convertNodeReflection(reflection, project) {
        if (!(reflection instanceof reflections_1.ANodeReflection)) {
            return { reflection, isPage: false };
        }
        if (!this._plugin.pluginOptions.getValue().enableSearch || reflection instanceof reflections_1.MenuReflection) {
            return { reflection: null, isPage: false };
        }
        const name = [
            'Page:',
            reflection.module !== project ? `${reflection.module.name} ⇒` : undefined,
            reflection.name,
        ].filter(lodash_1.isString).join(' ');
        const dec = new typedoc_1.DeclarationReflection(name, typedoc_1.ReflectionKind.Method);
        dec.comment = reflection.comment;
        dec.url = reflection.url;
        dec.cssClasses = 'tsd-kind-method tsd-parent-kind-interface tsd-is-inherited tsd-is-external pages-entry';
        return { reflection: dec, isPage: true };
    }
    /**
     * Triggered after a document has been rendered, just before it is written to disc.
     *
     * @param event  - An event object describing the current render operation.
     */
    _onRendererBegin(event) {
        if (event.isDefaultPrevented) {
            return;
        }
        this._plugin.logger.verbose(`${this._plugin.pluginOptions.getValue().enableSearch ? 'Enabling' : 'Disabling'} search for pages`);
        const rows = [];
        const kinds = {};
        const reflections = event.project.getReflectionsByKind(typedoc_1.ReflectionKind.All)
            .map(r => this._convertNodeReflection(r, event.project));
        const pagesCount = reflections.filter(r => r.isPage).length;
        this._plugin.logger.verbose(`Adding ${pagesCount} pages to the search index`);
        for (const { reflection, isPage } of reflections) {
            if (!(reflection instanceof typedoc_1.DeclarationReflection)) {
                continue;
            }
            if (!reflection.url ||
                !reflection.name ||
                reflection.flags.isExternal ||
                reflection.name === '') {
                continue;
            }
            let parent = reflection.parent;
            if (parent instanceof typedoc_1.ProjectReflection) {
                parent = undefined;
            }
            const row = {
                id: rows.length,
                kind: reflection.kind,
                name: reflection.name,
                url: reflection.url,
                classes: reflection.cssClasses,
                isPage,
            };
            if (parent) {
                row.parent = parent.getFullName();
            }
            if (!kinds[reflection.kind]) {
                kinds[reflection.kind] = this._groupPlugin.constructor.getKindSingular(reflection.kind);
            }
            rows.push(row);
        }
        const builder = new lunr_1.Builder();
        builder.pipeline.add(lunr_1.trimmer);
        builder.ref('id');
        builder.field('name', { boost: 10 });
        builder.field('parent');
        rows.forEach(row => { var _a; return builder.add((0, lodash_1.omit)(row, 'isPage'), { boost: row.isPage ? (_a = this._plugin.pluginOptions.getValue().searchBoost) !== null && _a !== void 0 ? _a : 10 : 1 }); });
        const index = builder.build();
        const jsonFileName = (0, path_1.join)(event.outputDirectory, 'assets', 'search.js');
        const jsonData = JSON.stringify({
            kinds,
            rows,
            index,
        });
        (0, fs_1.mkdirSync)((0, path_1.dirname)(jsonFileName), { recursive: true });
        (0, fs_1.writeFileSync)(jsonFileName, `window.searchData = JSON.parse(${JSON.stringify(jsonData)});`);
    }
}
exports.DefaultPagesJavascriptIndexPlugin = DefaultPagesJavascriptIndexPlugin;
//# sourceMappingURL=default-pages-javascript-index-plugin.GENERATED.js.map