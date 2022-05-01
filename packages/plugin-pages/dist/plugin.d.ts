import { Application, LogLevel } from 'typedoc';
import { ABasePlugin } from '@knodes/typedoc-pluginutils';
export declare class PagesPlugin extends ABasePlugin {
    readonly pluginOptions: import("@knodes/typedoc-pluginutils").OptionGroup<import("./options").IPluginOptions, {
        enablePageLinks: {
            help: string;
            type: import("typedoc").ParameterType.Boolean;
            defaultValue: true;
        } & {
            name: "enablePageLinks";
        } & import("typedoc").BooleanDeclarationOption;
        enableSearch: {
            help: string;
            type: import("typedoc").ParameterType.Boolean;
            defaultValue: true;
        } & {
            name: "enableSearch";
        } & import("typedoc").BooleanDeclarationOption;
        searchBoost: {
            help: string;
            type: import("typedoc").ParameterType.Number;
            defaultValue: number;
        } & {
            name: "searchBoost";
        } & import("typedoc").NumberDeclarationOption;
        invalidPageLinkHandling: {
            help: string;
            type: import("typedoc").ParameterType.Map;
            map: typeof import("./options").EInvalidPageLinkHandling;
            defaultValue: import("./options").EInvalidPageLinkHandling;
        } & {
            name: "invalidPageLinkHandling";
        } & import("typedoc").MapDeclarationOption<unknown>;
        pages: {
            help: string;
            type: import("typedoc").ParameterType.Mixed;
            validate: (v: unknown) => void;
        } & {
            name: "pages";
        } & import("typedoc").MixedDeclarationOption;
        output: {
            help: string;
            type: import("typedoc").ParameterType.String;
            defaultValue: string;
        } & {
            name: "output";
        } & import("typedoc").StringDeclarationOption;
        source: {
            help: string;
            type: import("typedoc").ParameterType.String;
            defaultValue: string;
        } & {
            name: "source";
        } & import("typedoc").StringDeclarationOption;
        logLevel: {
            help: string;
            type: import("typedoc").ParameterType.Map;
            map: typeof LogLevel;
            defaultValue: LogLevel;
        } & {
            name: "logLevel";
        } & import("typedoc").MapDeclarationOption<unknown>;
    }>;
    private readonly _pageTreeBuilder;
    private readonly _currentPageMemo;
    private readonly _markdownReplacer;
    private readonly _pathReflectionResolver;
    constructor(application: Application);
    /**
     * This method is called after the plugin has been instanciated.
     */
    initialize(): void;
    /**
     * Generate pages mappings & append {@link NodeReflection} to the project.
     *
     * @param event - The renderer event emitted at {@link RendererEvent.BEGIN}.
     */
    private _addPagesToProject;
    /**
     * Transform the parsed page link.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    private _replacePageLink;
}
//# sourceMappingURL=plugin.d.ts.map