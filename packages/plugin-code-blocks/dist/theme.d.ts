import { RenderTemplate, Theme } from 'typedoc';
import { ICodeBlock, IInlineCodeBlock } from './types';
export interface ICodeBlocksPluginThemeMethods {
    renderCodeBlock: RenderTemplate<ICodeBlock>;
    renderInlineCodeBlock: RenderTemplate<IInlineCodeBlock>;
}
export interface ICodeBlocksPluginTheme extends Theme {
    codeBlocksPlugin: ICodeBlocksPluginThemeMethods;
}
export declare const isCodeBlocksPluginTheme: (theme: Theme) => theme is ICodeBlocksPluginTheme;
//# sourceMappingURL=theme.d.ts.map