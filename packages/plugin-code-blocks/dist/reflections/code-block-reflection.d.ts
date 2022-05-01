import { DeclarationReflection } from 'typedoc';
export declare class CodeBlockReflection extends DeclarationReflection {
    private readonly file;
    private readonly code;
    private readonly startLine;
    private readonly endLine;
    constructor(name: string, file: string, code: string, startLine: number, endLine: number);
}
//# sourceMappingURL=code-block-reflection.d.ts.map