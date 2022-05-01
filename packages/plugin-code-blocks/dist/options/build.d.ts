import { LogLevel, ParameterType } from 'typedoc';
import { OptionGroup } from '@knodes/typedoc-pluginutils';
import type { CodeBlockPlugin } from '../plugin';
import { EBlockMode } from '../types';
import { EInvalidBlockLinkHandling, IPluginOptions } from './types';
export declare const buildOptions: (plugin: CodeBlockPlugin) => OptionGroup<IPluginOptions, {
    invalidBlockLinkHandling: {
        help: string;
        type: ParameterType.Map;
        map: typeof EInvalidBlockLinkHandling;
        defaultValue: EInvalidBlockLinkHandling;
    } & {
        name: "invalidBlockLinkHandling";
    } & import("typedoc").MapDeclarationOption<unknown>;
    defaultBlockMode: {
        help: string;
        type: ParameterType.Map;
        map: typeof EBlockMode;
        defaultValue: EBlockMode;
    } & {
        name: "defaultBlockMode";
    } & import("typedoc").MapDeclarationOption<unknown>;
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