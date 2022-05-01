"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const typedoc_1 = require("typedoc");
const typedoc_pluginutils_1 = require("@knodes/typedoc-pluginutils");
const buildOptions = (plugin) => typedoc_pluginutils_1.OptionGroup.factory(plugin)
    .add('rootFiles', {
    help: 'A list of file names used to infer packages root.',
    type: typedoc_1.ParameterType.Array,
    defaultValue: ['package.json'],
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