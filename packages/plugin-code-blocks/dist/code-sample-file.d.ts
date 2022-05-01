export declare const DEFAULT_BLOCK_NAME = "__DEFAULT__";
export interface ICodeSample {
    region: string;
    file: string;
    code: string;
    startLine: number;
    endLine: number;
}
export declare const readCodeSample: (file: string) => Map<string, ICodeSample>;
//# sourceMappingURL=code-sample-file.d.ts.map