"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockPlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const code_blocks_1 = require("./code-blocks");
const code_sample_file_1 = require("./code-sample-file");
const options_1 = require("./options");
const reflections_1 = require("./reflections");
const types_1 = require("./types");
const EXTRACT_CODE_BLOCKS_REGEX = /codeblock\s+(\S+?\w+?)(?:#(.+?))?(?:\s+(\w+))?(?:\s*\|\s*(.*?))?\s*/g;
const EXTRACT_INLINE_CODE_BLOCKS_REGEX = /\{\\?@inline-codeblock\s+(\S+?\w+?)(?:\s+(\w+))?\s*}\n(\s*)(```.*?```)/gs;
/**
 * Pages plugin for integrating your own pages into documentation output
 */
class CodeBlockPlugin extends typedoc_pluginutils_1.ABasePlugin {
    constructor(application) {
        super(application, __filename);
        this.pluginOptions = (0, options_1.buildOptions)(this);
        this._codeBlockRenderer = (0, lodash_1.once)(() => (0, code_blocks_1.getCodeBlockRenderer)(this.application, this));
        this._currentPageMemo = typedoc_pluginutils_1.CurrentPageMemo.for(this);
        this._markdownReplacer = new typedoc_pluginutils_1.MarkdownReplacer(this);
        this._pathReflectionResolver = new typedoc_pluginutils_1.PathReflectionResolver(this);
        this._fileSamples = new Map();
    }
    /**
     * This method is called after the plugin has been instanciated.
     *
     * @see {@link import('@knodes/typedoc-pluginutils').autoload}.
     */
    initialize() {
        // Hook over each markdown events to replace code blocks
        this._markdownReplacer.bindTag(EXTRACT_CODE_BLOCKS_REGEX, this._replaceCodeBlock.bind(this), '{@codeblock}');
        this._markdownReplacer.bindReplace(EXTRACT_INLINE_CODE_BLOCKS_REGEX, this._replaceInlineCodeBlock.bind(this), '{@inline-codeblock}');
        this._currentPageMemo.initialize();
        typedoc_pluginutils_1.EventsExtra.for(this.application)
            .onThemeReady(this._codeBlockRenderer.bind(this))
            .onSetOption(`${this.optionsPrefix}:logLevel`, v => {
            this.logger.level = v;
        });
    }
    /**
     * Transform the parsed inline code block.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    _replaceInlineCodeBlock({ captures, fullMatch }, sourceHint) {
        // Support escaped tags
        if (fullMatch.startsWith('{\\@')) {
            this.logger.verbose(() => `Found an escaped tag "${fullMatch}" in "${sourceHint()}"`);
            return fullMatch.replace('{\\@', '{@');
        }
        // Extract informations
        const [fileName, blockModeStr, blockIndent, markdownCodeSource] = captures;
        assert_1.default.ok(fileName);
        assert_1.default.ok(markdownCodeSource);
        assert_1.default.ok((0, lodash_1.isString)(blockIndent));
        const markdownCode = markdownCodeSource.replace(new RegExp(`^${(0, lodash_1.escapeRegExp)(blockIndent)}`, 'gm'), '');
        // Render
        const rendered = this._codeBlockRenderer().renderInlineCodeBlock({
            fileName,
            markdownCode,
            mode: this._getBlockMode(blockModeStr),
        });
        if (typeof rendered === 'string') {
            return rendered;
        }
        else {
            return typedoc_1.JSX.renderElement(rendered);
        }
    }
    /**
     * Transform the parsed code block.
     *
     * @param capture - The captured infos.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the replaced content.
     */
    _replaceCodeBlock({ captures, fullMatch }, sourceHint) {
        // Avoid recursion in code blocks
        if (this._currentPageMemo.currentReflection instanceof reflections_1.CodeBlockReflection) {
            return `{@${fullMatch}}`;
        }
        // Extract informations
        const [file, block, blockModeStr, fakedFileName] = captures;
        assert_1.default.ok(file);
        const codeSampleInfos = this._getCodeSampleInfos(file, block, sourceHint);
        if (codeSampleInfos === null) {
            return fullMatch;
        }
        const { codeSample, resolvedFile } = codeSampleInfos;
        // Render
        const headerFileName = fakedFileName !== null && fakedFileName !== void 0 ? fakedFileName : `./${(0, path_1.relative)(this.rootDir, resolvedFile)}${codeSample.region === code_sample_file_1.DEFAULT_BLOCK_NAME ? '' : `#${codeSample.startLine}~${codeSample.endLine}`}`;
        const url = this._resolveCodeSampleUrl(resolvedFile, codeSample.region === code_sample_file_1.DEFAULT_BLOCK_NAME ? null : codeSample);
        return this._currentPageMemo.fakeWrapPage(codeSample.file, new reflections_1.CodeBlockReflection(codeSample.region, codeSample.file, codeSample.code, codeSample.startLine, codeSample.endLine), () => {
            const rendered = this._codeBlockRenderer().renderCodeBlock({
                asFile: headerFileName,
                content: codeSample.code,
                mode: this._getBlockMode(blockModeStr),
                sourceFile: resolvedFile,
                url,
            });
            if (typeof rendered === 'string') {
                return rendered;
            }
            else {
                return typedoc_1.JSX.renderElement(rendered);
            }
        });
    }
    /**
     * Find the {@link block} in the {@link file}, and returns the sample along with search resolution infos.
     *
     * @param file - The file to look for {@link block}.
     * @param block - The name of the block in the {@link file}.
     * @param sourceHint - The best guess to the source of the match,
     * @returns the code sample & its path if found, null if the file is not found.
     */
    _getCodeSampleInfos(file, block, sourceHint) {
        const defaultedBlock = block !== null && block !== void 0 ? block : code_sample_file_1.DEFAULT_BLOCK_NAME; // TODO: Use ??= once on node>14
        const resolvedFile = this._pathReflectionResolver.resolveNamedPath(this._currentPageMemo.currentReflection.project, file, {
            currentReflection: this._currentPageMemo.currentReflection,
            containerFolder: this.pluginOptions.getValue().source,
        });
        if (!resolvedFile) {
            this.logger.error(() => `In "${sourceHint()}", could not resolve file "${file}" from ${this._currentPageMemo.currentReflection.name}`);
            return null;
        }
        else {
            this.logger.verbose(() => `Created a code block to ${this.relativeToRoot(resolvedFile)} from "${sourceHint()}"`);
        }
        // Get the actual code sample
        if (!this._fileSamples.has(resolvedFile)) {
            this._fileSamples.set(resolvedFile, (0, code_sample_file_1.readCodeSample)(resolvedFile));
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Set above
        const fileSample = this._fileSamples.get(resolvedFile);
        const codeSample = fileSample === null || fileSample === void 0 ? void 0 : fileSample.get(defaultedBlock);
        (0, assert_1.default)(codeSample, new Error(`Missing block ${defaultedBlock} in ${resolvedFile}`));
        return { codeSample, resolvedFile };
    }
    /**
     * Parse the mode string to a valid enum member {@link EBlockMode}. If the mode string is null, empty or undefined, returns the default block mode.
     *
     * @param modeStr - The raw input block mode.
     * @returns the {@link EBlockMode} infered from input.
     */
    _getBlockMode(modeStr) {
        var _a, _b;
        return modeStr ?
            (_a = types_1.EBlockMode[modeStr.toUpperCase()]) !== null && _a !== void 0 ? _a : assert_1.default.fail(`Invalid block mode "${modeStr}".`) :
            (_b = this.pluginOptions.getValue().defaultBlockMode) !== null && _b !== void 0 ? _b : types_1.EBlockMode.EXPANDED;
    }
    /**
     * Try to get the URL to the given {@link file}, optionally ranging the {@link codeSample}.
     *
     * @param file - The file to resolve.
     * @param codeSample - The code sample containing the lines range to select.
     * @returns the URL, or `null`.
     */
    _resolveCodeSampleUrl(file, codeSample) {
        var _a;
        const gitHubComponent = this.application.converter.getComponent('git-hub');
        if (!gitHubComponent) {
            return undefined;
        }
        const url = (_a = gitHubComponent === null || gitHubComponent === void 0 ? void 0 : gitHubComponent.getRepository(file)) === null || _a === void 0 ? void 0 : _a.getGitHubURL(file);
        if (!url) {
            return undefined;
        }
        if (!codeSample) {
            return url;
        }
        return `${url}#L${codeSample.startLine}-L${codeSample.endLine}`;
    }
}
exports.CodeBlockPlugin = CodeBlockPlugin;
//# sourceMappingURL=plugin.js.map