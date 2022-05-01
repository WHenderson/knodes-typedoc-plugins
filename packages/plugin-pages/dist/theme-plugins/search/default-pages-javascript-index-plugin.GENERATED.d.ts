import type { PagesPlugin } from '../../plugin';
/**
 * A plugin that exports an index of the project to a javascript file.
 *
 * The resulting javascript file can be used to build a simple search function.
 */
export declare class DefaultPagesJavascriptIndexPlugin {
    private readonly _plugin;
    private readonly _defaultSearch;
    private readonly _groupPlugin;
    constructor(_plugin: PagesPlugin);
    /**
     * Create a new JavascriptIndexPlugin instance.
     */
    initialize(): void;
    /**
     * Convert {@link ANodeReflection} instances to custom declaration reflections with specific properties set.
     *
     * @param reflection - The reflection to convert.
     * @param project - The root project, used to get modules.
     * @returns the new reflection, along with a flag indicating if it is a page.
     */
    private _convertNodeReflection;
    /**
     * Triggered after a document has been rendered, just before it is written to disc.
     *
     * @param event  - An event object describing the current render operation.
     */
    private _onRendererBegin;
}
//# sourceMappingURL=default-pages-javascript-index-plugin.GENERATED.d.ts.map