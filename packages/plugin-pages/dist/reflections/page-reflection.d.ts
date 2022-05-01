import { DeclarationReflection, ProjectReflection, ReflectionKind } from 'typedoc';
import { ANodeReflection } from './a-node-reflection';
export declare class PageReflection extends ANodeReflection {
    readonly sourceFilePath: string;
    url: string;
    readonly content: string;
    constructor(name: string, kind: ReflectionKind, module: ProjectReflection | DeclarationReflection, parent: ProjectReflection | DeclarationReflection | undefined, sourceFilePath: string, url: string);
}
//# sourceMappingURL=page-reflection.d.ts.map