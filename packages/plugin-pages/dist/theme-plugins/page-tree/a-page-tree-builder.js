"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APageTreeBuilder = void 0;
const assert_1 = __importDefault(require("assert"));
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const reflections_1 = require("../../reflections");
const a_node_reflection_1 = require("../../reflections/a-node-reflection");
const utils_1 = require("./utils");
class APageTreeBuilder {
    constructor(theme, plugin) {
        this.theme = theme;
        this.plugin = plugin;
        this._pathReflectionResolver = new typedoc_pluginutils_1.PathReflectionResolver(this.plugin);
    }
    get mappings() {
        (0, assert_1.default)(this._mappings);
        return this._mappings;
    }
    get project() {
        (0, assert_1.default)(this._project);
        return this._project;
    }
    /**
     * Alter the {@link event} to add pages & entries for the pages passed via {@link options}.
     *
     * @param event - The render event to affect.
     * @param options - The plugin options.
     */
    appendToProject(event, options) {
        if (this._mappings) {
            this.plugin.logger.warn('Generating mappings multiple times. This is probably a bug, and may result in duplicate pages.');
        }
        this._project = event.project;
        if (!options.pages || options.pages.length === 0) {
            this._mappings = [];
        }
        else {
            const reflections = this._mapPagesToReflections(options.pages, this.project, { input: options.source, output: options.output });
            this._mappings = this.generateMappings(event, reflections);
        }
        if (!event.urls) {
            event.urls = [];
        }
        event.urls.push(...this._mappings);
    }
    /**
     * Map the {@link kind} to a {@link ReflectionKind}. Note that the returned kind may be a custom one defined by the plugin (like {@link PagesPluginReflectionKind.PAGE}
     * or {@link PagesPluginReflectionKind.MENU}).
     * This method might be used to emulate pages as being namespaces, allowing compatibility with the default theme.
     *
     * @param kind - The kind to map.
     * @returns the actual reflection kind.
     */
    getReflectionKind(kind) {
        return kind;
    }
    /**
     * Get the module with the given {@link name}.
     *
     * @param reflection - The reflection to get the project from.
     * @param name - The name of the module to search.
     * @returns the module declaration reflection, or `undefined`.
     */
    _getModule(reflection, name) {
        const modules = this._pathReflectionResolver.getWorkspaces(reflection.project).slice(1);
        const modulesWithName = modules.filter(m => m.name === name);
        (0, assert_1.default)(modulesWithName.length <= 1);
        return modulesWithName[0];
    }
    /**
     * Map multiple raw page node objects to node reflections.
     *
     * @param nodes - The nodes.
     * @param parent - The parent of this node (project, module or node).
     * @param io - The children base input/output paths
     * @returns the node reflections.
     */
    _mapPagesToReflections(nodes, parent, io) {
        return nodes
            .map(n => this._mapPageToReflection(n, parent, io))
            .flat(1);
    }
    /**
     * Map a single raw page node object to node reflections.
     *
     * @param node - The node.
     * @param parent - The parent of this node (project, module or node).
     * @param io - The children base input/output paths
     * @returns the node reflections.
     */
    _mapPageToReflection(node, parent, io) {
        var _a;
        const childrenIO = Object.assign(Object.assign({}, io), { input: (0, utils_1.join)(io.input, (0, utils_1.getDir)(node, 'source')), output: (0, utils_1.join)(io.output, (0, utils_1.getDir)(node, 'output')) });
        if (node.title === 'VIRTUAL') {
            return node.children ?
                this._mapPagesToReflections(node.children, parent, childrenIO) :
                [];
        }
        // Strip empty menu items
        if (!node.source && (!node.children || node.children.length === 0)) {
            this.plugin.logger.warn(`Stripping menu item ${(0, utils_1.getNodePath)(node, parent)} because it has no children.`);
            return [];
        }
        const nodeReflection = this._getNodeReflection(node, parent, io);
        if (!(nodeReflection.module instanceof typedoc_1.ProjectReflection) && nodeReflection.isModuleRoot) {
            // If the node is attached to a new module, skip changes in the input tree (stay at root of `pages` in module)
            childrenIO.input = io.input;
            // Output is now like `pkg-a/pages/...`
            childrenIO.output = `${nodeReflection.name.replace(/[^a-z0-9]/gi, '_')}/${(_a = io.output) !== null && _a !== void 0 ? _a : ''}`;
        }
        this.project.registerReflection(nodeReflection);
        this.addNodeToProjectAsChild(nodeReflection);
        const children = node.children ?
            this._mapPagesToReflections(node.children, nodeReflection, childrenIO) :
            [];
        nodeReflection.children = children;
        return [nodeReflection];
    }
    /**
     * Generate a node reflection.
     *
     * @param node - The node.
     * @param parent - The parent of this node (project, module or node).
     * @param io - This node input/output paths.
     * @returns the node reflection.
     */
    _getNodeReflection(node, parent, io) {
        var _a;
        const module = parent instanceof typedoc_1.ProjectReflection ? // If module is project (the default for root), see if workspace is overriden.
            (_a = (0, typedoc_pluginutils_1.catchWrap)(() => this._getModule(parent, node.title), `Invalid node workspace override ${(0, utils_1.getNodePath)(node, parent)}`)) !== null && _a !== void 0 ? _a : parent : // Otherwise, we are either in a child page, or in a module.
            parent instanceof a_node_reflection_1.ANodeReflection ? // If child page, inherit module
                parent.module : // Otherwise, use module as parent
                parent;
        if ((parent instanceof a_node_reflection_1.ANodeReflection && module !== parent.module) ||
            (!(parent instanceof a_node_reflection_1.ANodeReflection) && module !== parent)) {
            parent = module;
        }
        if (node.source) {
            const filename = this._pathReflectionResolver.resolveNamedPath(parent.project, (0, utils_1.join)(io.input, node.source), { currentReflection: module });
            if (!filename) {
                throw new Error(`Could not locate page for ${(0, utils_1.getNodePath)(node, parent)}`);
            }
            return (0, typedoc_pluginutils_1.catchWrap)(() => new reflections_1.PageReflection(node.title, this.getReflectionKind(reflections_1.PagesPluginReflectionKind.PAGE), module, parent, filename, (0, utils_1.join)(io.output, (0, utils_1.getNodeUrl)(node))), `Could not generate a page reflection for ${(0, utils_1.getNodePath)(node, parent)}`);
        }
        return new reflections_1.MenuReflection(node.title, this.getReflectionKind(reflections_1.PagesPluginReflectionKind.MENU), module, parent);
    }
}
exports.APageTreeBuilder = APageTreeBuilder;
//# sourceMappingURL=a-page-tree-builder.js.map