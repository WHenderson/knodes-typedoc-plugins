"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const assert_1 = __importStar(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const types_1 = require("./types");
const pageKeys = ['children', 'childrenDir', 'childrenOutputDir', 'childrenSourceDir', 'output', 'source', 'title'];
const wrapPageError = (path, index) => (err) => {
    if (err instanceof assert_1.AssertionError) {
        const pathStr = path.length > 0 ? ` in ${path.map(p => JSON.stringify(p)).join(' ⇒ ')}` : '';
        return `Invalid page${pathStr} @ index ${index}`;
    }
    else {
        return err;
    }
};
const checkPage = (page, path) => {
    (0, assert_1.default)(page && (0, lodash_1.isObject)(page), 'Page should be an object');
    const _page = page;
    (0, assert_1.default)('title' in _page && (0, lodash_1.isString)(_page.title), 'Page should have a title');
    const extraProps = (0, lodash_1.difference)(Object.keys(_page), pageKeys);
    (0, assert_1.default)(extraProps.length === 0, `Page should not have extra props ${JSON.stringify(extraProps)}`);
    if ('children' in _page && !(0, lodash_1.isNil)(_page.children)) {
        (0, assert_1.default)((0, lodash_1.isArray)(_page.children), 'Page children should be an array');
        const thisPath = [...path, _page.title];
        _page.children.forEach((c, i) => (0, typedoc_pluginutils_1.catchWrap)(() => checkPage(c, thisPath), wrapPageError(thisPath, i)));
    }
};
const buildOptions = (plugin) => typedoc_pluginutils_1.OptionGroup.factory(plugin)
    .add('enablePageLinks', {
    help: 'Whether or not @page and @pagelink tags should be parsed.',
    type: typedoc_1.ParameterType.Boolean,
    defaultValue: true,
})
    .add('enableSearch', {
    help: 'Whether or not the pages should be added to the search index.',
    type: typedoc_1.ParameterType.Boolean,
    defaultValue: true,
})
    .add('searchBoost', {
    help: 'The score multiplier for pages in search.',
    type: typedoc_1.ParameterType.Number,
    defaultValue: 10,
})
    .add('invalidPageLinkHandling', {
    help: 'The kind of error to throw in case of an invalid page link.',
    type: typedoc_1.ParameterType.Map,
    map: types_1.EInvalidPageLinkHandling,
    defaultValue: types_1.EInvalidPageLinkHandling.LOG_ERROR,
})
    .add('pages', {
    help: 'Actual pages definitions.',
    type: typedoc_1.ParameterType.Mixed,
    validate: v => {
        if (v) {
            (0, assert_1.default)((0, lodash_1.isArray)(v), 'Pages should be an array');
            v.forEach((p, i) => (0, typedoc_pluginutils_1.catchWrap)(() => checkPage(p, []), wrapPageError([], i)));
        }
    },
}, v => {
    v = v !== null && v !== void 0 ? v : [];
    // TODO: Better checks
    return v;
})
    .add('output', {
    help: 'Output directory where your pages will be rendered. This must be a relative path.',
    type: typedoc_1.ParameterType.String,
    defaultValue: 'pages',
}, v => plugin.relativeToRoot(v))
    .add('source', {
    help: 'Root directory where all page source files live.',
    type: typedoc_1.ParameterType.String,
    defaultValue: 'pages',
})
    .add('logLevel', {
    help: 'The plugin log level.',
    type: typedoc_1.ParameterType.Map,
    map: typedoc_1.LogLevel,
    defaultValue: plugin.application.logger.level,
})
    .build();
exports.buildOptions = buildOptions;
//# sourceMappingURL=build.js.map