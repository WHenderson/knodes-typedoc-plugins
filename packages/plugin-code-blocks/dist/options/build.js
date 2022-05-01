"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const types_1 = require("../types");
const types_2 = require("./types");
const buildOptions = (plugin) => typedoc_pluginutils_1.OptionGroup.factory(plugin)
    .add('invalidBlockLinkHandling', {
    help: 'The kind of error to throw in case of an invalid code block reference.',
    type: typedoc_1.ParameterType.Map,
    map: types_2.EInvalidBlockLinkHandling,
    defaultValue: types_2.EInvalidBlockLinkHandling.LOG_ERROR,
})
    .add('defaultBlockMode', {
    help: 'The default code blocks mode.',
    type: typedoc_1.ParameterType.Map,
    map: types_1.EBlockMode,
    defaultValue: types_1.EBlockMode.EXPANDED,
})
    .add('source', {
    help: 'Root directory where all code blocks live.',
    type: typedoc_1.ParameterType.String,
    defaultValue: 'examples',
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