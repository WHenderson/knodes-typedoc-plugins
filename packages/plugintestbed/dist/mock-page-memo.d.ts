import { PageEvent, ProjectReflection, Reflection, RenderTemplate } from 'typedoc';
export declare const setupMockPageMemo: () => {
    captureEventRegistration: () => void;
    setCurrentPage: <T extends Reflection>(url: string, source: string, model: T, template?: RenderTemplate<PageEvent<T>>, project?: ProjectReflection, listenerIndex?: number | undefined) => void;
};
//# sourceMappingURL=mock-page-memo.d.ts.map