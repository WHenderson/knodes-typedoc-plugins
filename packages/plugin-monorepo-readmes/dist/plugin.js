"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonorepoReadmePlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const find_readme_file_1 = require("./find-readme-file");
const options_1 = require("./options");
class MonorepoReadmePlugin extends typedoc_pluginutils_1.ABasePlugin {
    constructor(application) {
        super(application, __filename);
        this.pluginOptions = (0, options_1.buildOptions)(this);
    }
    /**
     * This method is called after the plugin has been instanciated.
     *
     * @see {@link import('@knodes/typedoc-pluginutils').autoload}.
     */
    initialize() {
        this.application.renderer.on(typedoc_1.RendererEvent.BEGIN, (event) => {
            (0, assert_1.default)(this.application.renderer.theme);
            (0, assert_1.default)(this.application.renderer.theme instanceof typedoc_1.DefaultTheme);
            const theme = this.application.renderer.theme;
            (0, assert_1.default)(event.urls);
            const modulesUrls = event.urls.filter((u) => u.model instanceof typedoc_1.DeclarationReflection && u.model.kindOf(typedoc_1.ReflectionKind.Module));
            modulesUrls.forEach(u => this._modifyModuleIndexPage(theme, u));
        }, null, -1000); // priority is set to be ran before @knodes/typedoc-plugin-pages
        typedoc_pluginutils_1.EventsExtra.for(this.application)
            .onSetOption(`${this.optionsPrefix}:logLevel`, v => {
            this.logger.level = v;
        });
    }
    /**
     * Modify the template of the module to prepend the README.
     *
     * @param theme - The theme used.
     * @param moduleMapping - The module URL mapping to modify
     */
    _modifyModuleIndexPage(theme, moduleMapping) {
        var _a;
        const readme = (0, find_readme_file_1.findReadmeFile)(this.pluginOptions.getValue().rootFiles, moduleMapping, this.pluginOptions.getValue().readme);
        if (!readme) {
            return;
        }
        const { absolute: absReadme, relative: relReadme } = readme;
        const source = { character: 1, line: 1, fileName: relReadme, file: new typedoc_1.SourceFile(absReadme) };
        moduleMapping.model.sources = [
            ...((_a = moduleMapping.model.sources) !== null && _a !== void 0 ? _a : []),
            source,
        ];
        this.logger.info(`Setting readme of ${moduleMapping.model.name} as ${this.relativeToRoot(absReadme)}`);
        const baseTemplate = moduleMapping.template;
        moduleMapping.template = props => {
            const fakeProject = new typedoc_1.ProjectReflection(props.name);
            fakeProject.readme = (0, fs_1.readFileSync)(absReadme, 'utf-8');
            fakeProject.sources = [
                source,
            ];
            const fakePageEvent = new typedoc_1.PageEvent(props.name);
            fakePageEvent.filename = props.filename;
            fakePageEvent.project = props.project;
            fakePageEvent.url = props.url;
            fakePageEvent.model = fakeProject;
            const readmeTpl = theme.indexTemplate(fakePageEvent);
            const base = baseTemplate(props);
            return typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null, ...[
                readmeTpl,
                typedoc_1.JSX.createElement('hr', null),
                base,
            ]);
        };
    }
}
exports.MonorepoReadmePlugin = MonorepoReadmePlugin;
//# sourceMappingURL=plugin.js.map