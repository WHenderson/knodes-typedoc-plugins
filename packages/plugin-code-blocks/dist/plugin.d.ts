import { Application, LogLevel } from 'typedoc';
import { ABasePlugin } from '@knodes/typedoc-pluginutils';
import { EBlockMode } from './types';
/**
 * Pages plugin for integrating your own pages into documentation output
 */
export declare class CodeBlockPlugin extends ABasePlugin {
    readonly pluginOptions: import("@knodes/typedoc-pluginutils").OptionGroup<import("./options").IPluginOptions, {
        invalidBlockLinkHandling: {
            help: string;
            type: import("typedoc").ParameterType.Map;
            map: typeof import("./options").EInvalidBlockLinkHandling;
            defaultValue: import("./options").EInvalidBlockLinkHandling;
        } & {
            name: "invalidBlockLinkHandling";
        } & import("typedoc").MapDeclarationOption<unknown>;
        defaultBlockMode: {
            help: string;
            type: import("typedoc").ParameterType.Map;
            map: typeof EBlockMode;
            defaultValue: EBlockMode;
        } & {
            name: "defaultBlockMode";
        } & import("typedoc").MapDeclarationOption<unknown>;
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
    private readonly _codeBlockRenderer;
    private readonly _currentPageMemo;
    private readonly _markdownReplacer;
    private readonly _pathReflectionResolver;
    private readonly _fileSamples;
    constructor(application: Application);
    /**
     * This method is called after the plugin has been instanciated.
     *
     * @see {@link import('@knodes/typedoc-pluginutils').autoload}.
     */
    initialize(): void;
    /**
     * Transform the parsed inline code block.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    private _replaceInlineCodeBlock;
    /**
     * Transform the parsed code block.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    private _replaceCodeBlock;
    /**
     * Find the {@link block} in the {@link file}, and returns the sample along with search resolution infos.
     *
     * @param file - The file to look for {@link block}.
     * @param block - The name of the block in the {@link file}.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the code sample & its path if found, null if the file is not found.
     */
    private _getCodeSampleInfos;
    /**
     * Parse the mode string to a valid enum member {@link EBlockMode}. If the mode string is null, empty or undefined, returns the default block mode.
     *
     * @param modeStr - The raw input block mode.
     * @returns the {@link EBlockMode} infered from input.
     */
    private _getBlockMode;
    /**
     * Try to get the URL to the given {@link file}, optionally ranging the {@link codeSample}.
     *
     * @param file - The file to resolve.
     * @param codeSample - The code sample containing the lines range to select.
     * @returns the URL, or `null`.
     */
    private _resolveCodeSampleUrl;
}
//# sourceMappingURL=plugin.d.ts.map