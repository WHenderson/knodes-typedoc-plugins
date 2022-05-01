import { ProjectReflection, ReflectionKind, RenderTemplate, RendererEvent, Theme, UrlMapping } from 'typedoc';
import { IPluginOptions } from '../../options';
import type { PagesPlugin } from '../../plugin';
import { NodeReflection, PageReflection, PagesPluginReflectionKind } from '../../reflections';
import { RenderPageLinkProps } from '../../theme';
import { IPageTreeBuilder } from './types';
export declare abstract class APageTreeBuilder implements IPageTreeBuilder {
    protected readonly theme: Theme;
    readonly plugin: PagesPlugin;
    abstract renderPageLink: RenderTemplate<RenderPageLinkProps>;
    private readonly _pathReflectionResolver;
    private _mappings?;
    get mappings(): Array<UrlMapping<PageReflection>>;
    private _project?;
    protected get project(): ProjectReflection;
    constructor(theme: Theme, plugin: PagesPlugin);
    /**
     * Generate mappings (pages) from the given node reflections.
     *
     * @param event - The render event to affect.
     * @param reflections - The list of node reflections (pages & menu).
     * @returns the list of mappings to create.
     */
    protected abstract generateMappings(event: RendererEvent, reflections: NodeReflection[]): Array<UrlMapping<PageReflection>>;
    /**
     * Register the {@link nodeReflection} into the correct reflection (project or module).
     *
     * @param nodeReflection - The node reflection.
     */
    protected abstract addNodeToProjectAsChild(nodeReflection: NodeReflection): void;
    /**
     * Alter the {@link event} to add pages & entries for the pages passed via {@link options}.
     *
     * @param event - The render event to affect.
     * @param options - The plugin options.
     */
    appendToProject(event: RendererEvent, options: IPluginOptions): void;
    /**
     * Map the {@link kind} to a {@link ReflectionKind}. Note that the returned kind may be a custom one defined by the plugin (like {@link PagesPluginReflectionKind.PAGE}
     * or {@link PagesPluginReflectionKind.MENU}).
     * This method might be used to emulate pages as being namespaces, allowing compatibility with the default theme.
     *
     * @param kind - The kind to map.
     * @returns the actual reflection kind.
     */
    protected getReflectionKind(kind: PagesPluginReflectionKind): ReflectionKind;
    /**
     * Get the module with the given {@link name}.
     *
     * @param reflection - The reflection to get the project from.
     * @param name - The name of the module to search.
     * @returns the module declaration reflection, or `undefined`.
     */
    private _getModule;
    /**
     * Map multiple raw page node objects to node reflections.
     *
     * @param nodes - The nodes.
     * @param parent - The parent of this node (project, module or node).
     * @param io - The children base input/output paths
     * @returns the node reflections.
     */
    private _mapPagesToReflections;
    /**
     * Map a single raw page node object to node reflections.
     *
     * @param node - The node.
     * @param parent - The parent of this node (project, module or node).
     * @param io - The children base input/output paths
     * @returns the node reflections.
     */
    private _mapPageToReflection;
    /**
     * Generate a node reflection.
     *
     * @param node - The node.
     * @param parent - The parent of this node (project, module or node).
     * @param io - This node input/output paths.
     * @returns the node reflection.
     */
    private _getNodeReflection;
}
//# sourceMappingURL=a-page-tree-builder.d.ts.map