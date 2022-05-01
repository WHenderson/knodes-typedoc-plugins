import { DefaultTheme, ReflectionKind, RenderTemplate, RendererEvent, UrlMapping } from 'typedoc';
import type { PagesPlugin } from '../../plugin';
import { NodeReflection, PageReflection } from '../../reflections';
import { RenderPageLinkProps } from '../../theme';
import { APageTreeBuilder } from './a-page-tree-builder';
export declare class DefaultTreeBuilder extends APageTreeBuilder {
    protected readonly theme: DefaultTheme;
    constructor(theme: DefaultTheme, plugin: PagesPlugin);
    renderPageLink: RenderTemplate<RenderPageLinkProps>;
    /**
     * In fallback mode, all page nodes are identified as {@link ReflectionKind.Namespace}.
     *
     * @returns the namespace reflection kind.
     */
    protected getReflectionKind(): ReflectionKind;
    /**
     * Generate mappings (pages) from the given node reflections.
     *
     * @param event - The render event to affect.
     * @param reflections - The list of node reflections (pages & menu).
     * @returns the list of mappings to create.
     */
    protected generateMappings(event: RendererEvent, reflections: readonly NodeReflection[]): Array<UrlMapping<PageReflection>>;
    /**
     * Register the {@link nodeReflection} into the correct reflection (project or module).
     *
     * @param nodeReflection - The node reflection.
     */
    protected addNodeToProjectAsChild(nodeReflection: NodeReflection): void;
    private readonly _renderPage;
    /**
     * Copy assets to the output directory.
     *
     * @param event - The {@link RendererEvent.END} event.
     */
    private _onRenderEnd;
}
//# sourceMappingURL=default-tree-builder.d.ts.map