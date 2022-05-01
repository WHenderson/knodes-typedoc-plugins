import { LogLevel, ParameterType } from 'typedoc';
import { OptionGroup } from '@knodes/typedoc-pluginutils';
import type { PagesPlugin } from '../plugin';
import { EInvalidPageLinkHandling, IPluginOptions } from './types';
export declare const buildOptions: (plugin: PagesPlugin) => OptionGroup<IPluginOptions, {
    enablePageLinks: {
        help: string;
        type: ParameterType.Boolean;
        defaultValue: true;
    } & {
        name: "enablePageLinks";
    } & import("typedoc").BooleanDeclarationOption;
    enableSearch: {
        help: string;
        type: ParameterType.Boolean;
        defaultValue: true;
    } & {
        name: "enableSearch";
    } & import("typedoc").BooleanDeclarationOption;
    searchBoost: {
        help: string;
        type: ParameterType.Number;
        defaultValue: number;
    } & {
        name: "searchBoost";
    } & import("typedoc").NumberDeclarationOption;
    invalidPageLinkHandling: {
        help: string;
        type: ParameterType.Map;
        map: typeof EInvalidPageLinkHandling;
        defaultValue: EInvalidPageLinkHandling;
    } & {
        name: "invalidPageLinkHandling";
    } & import("typedoc").MapDeclarationOption<unknown>;
    pages: {
        help: string;
        type: ParameterType.Mixed;
        validate: (v: unknown) => void;
    } & {
        name: "pages";
    } & import("typedoc").MixedDeclarationOption;
    output: {
        help: string;
        type: ParameterType.String;
        defaultValue: string;
    } & {
        name: "output";
    } & import("typedoc").StringDeclarationOption;
    source: {
        help: string;
        type: ParameterType.String;
        defaultValue: string;
    } & {
        name: "source";
    } & import("typedoc").StringDeclarationOption;
    logLevel: {
        help: string;
        type: ParameterType.Map;
        map: typeof LogLevel;
        defaultValue: LogLevel;
    } & {
        name: "logLevel";
    } & import("typedoc").MapDeclarationOption<unknown>;
}>;
//# sourceMappingURL=build.d.ts.map