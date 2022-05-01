import { Application, LogLevel } from 'typedoc';
import { ABasePlugin } from '@knodes/typedoc-pluginutils';
export declare class MonorepoReadmePlugin extends ABasePlugin {
    readonly pluginOptions: import("@knodes/typedoc-pluginutils").OptionGroup<import("./options").IPluginOptions, {
        rootFiles: {
            help: string;
            type: import("typedoc").ParameterType.Array;
            defaultValue: string[];
        } & {
            name: "rootFiles";
        } & import("typedoc").ArrayDeclarationOption;
        logLevel: {
            help: string;
            type: import("typedoc").ParameterType.Map;
            map: typeof LogLevel;
            defaultValue: LogLevel;
        } & {
            name: "logLevel";
        } & import("typedoc").MapDeclarationOption<unknown>;
        readme: {
            help: string;
            type: import("typedoc").ParameterType.Array;
            defaultValue: never[];
        } & {
            name: "readme";
        } & import("typedoc").ArrayDeclarationOption;
    }>;
    constructor(application: Application);
    /**
     * This method is called after the plugin has been instanciated.
     *
     * @see {@link import('@knodes/typedoc-pluginutils').autoload}.
     */
    initialize(): void;
    /**
     * Modify the template of the module to prepend the README.
     *
     * @param theme - The theme used.
     * @param moduleMapping - The module URL mapping to modify
     */
    private _modifyModuleIndexPage;
}
//# sourceMappingURL=plugin.d.ts.map