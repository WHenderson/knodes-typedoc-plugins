import { DeclarationReflection, ProjectReflection, ReflectionKind } from 'typedoc';
export declare class ANodeReflection extends DeclarationReflection {
    readonly module: ProjectReflection | DeclarationReflection;
    parent: ProjectReflection | DeclarationReflection;
    get depth(): number;
    get isModuleRoot(): boolean;
    constructor(name: string, kind: ReflectionKind, module: ProjectReflection | DeclarationReflection, parent?: ProjectReflection | DeclarationReflection);
}
//# sourceMappingURL=a-node-reflection.d.ts.map