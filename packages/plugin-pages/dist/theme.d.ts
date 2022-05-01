import { PageEvent, RenderTemplate, Theme, UrlMapping } from 'typedoc';
import { PageReflection } from './reflections';
export declare type RenderPageLinkProps = {
    mapping: UrlMapping<PageReflection>;
    label?: string;
};
export interface IPagesPluginThemeMethods {
    renderPage: RenderTemplate<PageEvent<PageReflection>>;
    renderPageLink: RenderTemplate<RenderPageLinkProps>;
}
export interface IPagesPluginTheme extends Theme {
    pagesPlugin: IPagesPluginThemeMethods;
}
export declare const isPagesPluginTheme: (theme: Theme) => theme is IPagesPluginTheme;
//# sourceMappingURL=theme.d.ts.map