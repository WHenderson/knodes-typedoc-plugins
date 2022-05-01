import { Many } from 'lodash';
export declare const runPlugin: (testDir: string, pluginPaths: Many<string>, { options, output }?: {
    options?: Record<string, any> | undefined;
    output?: string | undefined;
}) => Promise<void>;
export declare const runPluginBeforeAll: (testDir: string, pluginPaths: Many<string>, opts?: {
    options?: Record<string, any> | undefined;
    output?: string | undefined;
} | undefined) => any;
//# sourceMappingURL=run-plugin.d.ts.map