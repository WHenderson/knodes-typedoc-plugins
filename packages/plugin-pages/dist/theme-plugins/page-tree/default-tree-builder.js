"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTreeBuilder = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const path_1 = require("path");
const typedoc_1 = require("typedoc");
const reflections_1 = require("../../reflections");
const a_page_tree_builder_1 = require("./a-page-tree-builder");
const utils_1 = require("./utils");
const CSS_FILE_NAME = 'assets/pages.css';
class DefaultTreeBuilder extends a_page_tree_builder_1.APageTreeBuilder {
    constructor(theme, plugin) {
        super(theme, plugin);
        this.theme = theme;
        this.renderPageLink = ({ mapping, label }) => typedoc_1.JSX.createElement("a", { href: this.theme.markedPlugin.getRelativeUrl(mapping.url) }, label !== null && label !== void 0 ? label : mapping.model.originalName);
        this._renderPage = props => {
            props.model.readme = props.model.content;
            return this.theme.indexTemplate(props);
        };
        const { renderer } = theme.application;
        // Add stylesheet
        renderer.on(typedoc_1.RendererEvent.END, this._onRenderEnd.bind(this));
        renderer.hooks.on('head.end', context => typedoc_1.JSX.createElement("link", { rel: "stylesheet", href: context.relativeURL(CSS_FILE_NAME) }));
    }
    /**
     * In fallback mode, all page nodes are identified as {@link ReflectionKind.Namespace}.
     *
     * @returns the namespace reflection kind.
     */
    getReflectionKind() {
        return typedoc_1.ReflectionKind.Namespace;
    }
    /**
     * Generate mappings (pages) from the given node reflections.
     *
     * @param event - The render event to affect.
     * @param reflections - The list of node reflections (pages & menu).
     * @returns the list of mappings to create.
     */
    generateMappings(event, reflections) {
        const modulePagesReflections = [];
        const moduleNodeReflections = [];
        const pagesReflections = [];
        const nodeReflections = [];
        const harvestReflection = (reflection) => {
            if (reflection instanceof reflections_1.ANodeReflection && !(reflection.module instanceof typedoc_1.ProjectReflection) && reflection.isModuleRoot) {
                if (reflection instanceof reflections_1.PageReflection) {
                    modulePagesReflections.push(reflection);
                    moduleNodeReflections.push(reflection);
                }
                else if (reflection instanceof reflections_1.MenuReflection) {
                    moduleNodeReflections.push(reflection);
                }
                return;
            }
            if (reflection instanceof reflections_1.PageReflection) {
                pagesReflections.push(reflection);
                nodeReflections.push(reflection);
            }
            else if (reflection instanceof reflections_1.MenuReflection) {
                nodeReflections.push(reflection);
            }
        };
        (0, utils_1.traverseDeep)(reflections, r => harvestReflection(r));
        moduleNodeReflections.forEach(r => event.project.removeReflection(r));
        (0, utils_1.traverseDeep)(nodeReflections, r => event.project.registerReflection(r));
        nodeReflections.concat(moduleNodeReflections).forEach(r => delete r.children);
        modulePagesReflections.forEach(mpr => {
            var _a, _b;
            // Remove self from tree
            (0, assert_1.default)(mpr.parent.parent instanceof typedoc_1.ProjectReflection || mpr.parent.parent instanceof typedoc_1.DeclarationReflection);
            (_a = mpr.children) === null || _a === void 0 ? void 0 : _a.forEach(c => c.parent = mpr.parent);
            // Get mapping to modify
            const moduleMapping = (_b = event.urls) === null || _b === void 0 ? void 0 : _b.find(u => u.model === mpr.module);
            (0, assert_1.default)(moduleMapping);
            mpr.url = moduleMapping.url;
            // Prepend page to module index
            const baseTemplate = moduleMapping.template;
            moduleMapping.template = props => {
                const fakeProject = new typedoc_1.ProjectReflection(props.name);
                fakeProject.readme = mpr.content;
                fakeProject.sources = mpr.sources;
                const fakePageEvent = new typedoc_1.PageEvent(props.name);
                fakePageEvent.filename = props.filename;
                fakePageEvent.project = props.project;
                fakePageEvent.url = props.url;
                fakePageEvent.model = fakeProject;
                const readme = this.theme.indexTemplate(fakePageEvent);
                const base = baseTemplate(props);
                return typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null, ...[
                    readme,
                    typedoc_1.JSX.createElement('hr', null),
                    base,
                ]);
            };
        });
        return pagesReflections.map(pr => {
            this.plugin.logger.verbose(`Adding page ${(0, utils_1.getNodePath)(pr)} as URL ${pr.url}`);
            return new typedoc_1.UrlMapping(pr.url, pr, this._renderPage);
        });
    }
    /**
     * Register the {@link nodeReflection} into the correct reflection (project or module).
     *
     * @param nodeReflection - The node reflection.
     */
    addNodeToProjectAsChild(nodeReflection) {
        var _a, _b, _c;
        nodeReflection.cssClasses = [
            'pages-entry',
            nodeReflection instanceof reflections_1.PageReflection ? 'pages-entry-page' : 'pages-entry-menu',
            `pages-entry-depth-${nodeReflection.depth}`,
            ...((_b = (_a = nodeReflection.cssClasses) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : []),
        ].join(' ');
        const moduleChildren = (_c = nodeReflection.module.children) !== null && _c !== void 0 ? _c : [];
        if (nodeReflection.module === nodeReflection.project) {
            const lastPageIndexRev = moduleChildren.slice().reverse().findIndex(r => r instanceof reflections_1.ANodeReflection);
            const lastPageIndex = lastPageIndexRev === -1 ? 0 : moduleChildren.length - lastPageIndexRev;
            nodeReflection.module.children = [
                ...moduleChildren.slice(0, lastPageIndex),
                nodeReflection,
                ...moduleChildren.slice(lastPageIndex),
            ];
        }
        else {
            nodeReflection.module.children = [
                ...moduleChildren,
                nodeReflection,
            ];
        }
    }
    /**
     * Copy assets to the output directory.
     *
     * @param event - The {@link RendererEvent.END} event.
     */
    _onRenderEnd(event) {
        const dest = (0, path_1.join)(event.outputDirectory, CSS_FILE_NAME);
        const src = this.plugin.resolvePackageFile('static/pages.css');
        (0, fs_1.copyFileSync)(src, dest);
    }
}
exports.DefaultTreeBuilder = DefaultTreeBuilder;
//# sourceMappingURL=default-tree-builder.js.map