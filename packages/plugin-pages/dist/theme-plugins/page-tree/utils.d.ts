import { Reflection } from 'typedoc';
import { IPageNode } from '../../options';
export declare const join: (...segments: Array<string | undefined>) => string;
export declare const traverseDeep: (reflections: readonly Reflection[], cb: (reflection: Reflection) => void | boolean) => void;
export declare const getDir: (node: IPageNode, kind: 'output' | 'source') => string;
export declare const getNodeUrl: (node: IPageNode) => string;
declare type NodeOrRef = IPageNode | Reflection;
export declare const getNodePath: (self?: NodeOrRef | undefined, parent?: NodeOrRef | undefined) => string;
export {};
//# sourceMappingURL=utils.d.ts.map