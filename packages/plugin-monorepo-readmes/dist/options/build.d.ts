import { LogLevel, ParameterType } from 'typedoc';
import { OptionGroup } from '@knodes/typedoc-pluginutils';
import type { MonorepoReadmePlugin } from '../plugin';
import { IPluginOptions } from './types';
export declare const buildOptions: (plugin: MonorepoReadmePlugin) => OptionGroup<IPluginOptions, {
    rootFiles: {
        help: string;
        type: ParameterType.Array;
        defaultValue: string[];
    } & {
        name: "rootFiles";
    } & import("typedoc").ArrayDeclarationOption;
    logLevel: {
        help: string;
        type: ParameterType.Map;
        map: typeof LogLevel;
        defaultValue: LogLevel;
    } & {
        name: "logLevel";
    } & import("typedoc").MapDeclarationOption<unknown>;
    readme: {
        help: string;
        type: ParameterType.Array;
        defaultValue: never[];
    } & {
        name: "readme";
    } & import("typedoc").ArrayDeclarationOption;
}>;
//# sourceMappingURL=build.d.ts.map