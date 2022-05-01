import { DefaultTheme, JSX } from 'typedoc';
import type { CodeBlockPlugin } from '../plugin';
import { ICodeBlocksPluginThemeMethods } from '../theme';
import { ICodeBlock, IInlineCodeBlock } from '../types';
export declare class DefaultCodeBlockRenderer implements ICodeBlocksPluginThemeMethods {
    protected readonly theme: DefaultTheme;
    readonly plugin: CodeBlockPlugin;
    constructor(theme: DefaultTheme, plugin: CodeBlockPlugin);
    readonly renderInlineCodeBlock: ({ fileName, markdownCode, mode }: IInlineCodeBlock) => JSX.Element;
    readonly renderCodeBlock: ({ asFile, sourceFile, mode, content, url }: ICodeBlock) => JSX.Element;
    private readonly _wrapCode;
    /**
     * Copy assets to the output directory.
     *
     * @param event - The {@link RendererEvent.END} event.
     */
    private _onRenderEnd;
}
//# sourceMappingURL=default-code-block-renderer.d.ts.map