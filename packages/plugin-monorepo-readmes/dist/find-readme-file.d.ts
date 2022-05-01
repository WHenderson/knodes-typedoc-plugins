import { DeclarationReflection, UrlMapping } from 'typedoc';
/**
 * Try to resoluve the README file in the directory of the module's `package.json`.
 *
 * @param readmeTargets - A list of file names to look up to locate packages root.
 * @param moduleMapping - The module URL mapping.
 * @returns the relative & absolute path of the readme.
 */
export declare const findReadmeFile: (readmeTargets: string[], moduleMapping: UrlMapping<DeclarationReflection>, readme: string[]) => {
    relative: string;
    absolute: string;
} | undefined;
//# sourceMappingURL=find-readme-file.d.ts.map