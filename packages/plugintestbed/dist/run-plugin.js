"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPluginBeforeAll = exports.runPlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const runPlugin = (testDir, pluginPaths, { options, output = (0, path_1.resolve)(testDir, './docs') } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const app = new typedoc_1.Application();
    app.options.addReader(new typedoc_1.ArgumentsReader(0, []));
    app.options.addReader(new typedoc_1.TypeDocReader());
    app.options.addReader(new typedoc_1.TSConfigReader());
    const baseOptions = {
        treatWarningsAsErrors: true,
        plugin: (0, lodash_1.castArray)(pluginPaths),
        gitRemote: 'http://example.com',
        gitRevision: 'test',
    };
    app.bootstrap(Object.assign(Object.assign({}, options), baseOptions));
    const project = app.convert();
    expect(project).toBeTruthy();
    (0, assert_1.default)(project);
    app.validate(project);
    yield app.generateDocs(project, output);
});
exports.runPlugin = runPlugin;
const runPluginBeforeAll = (testDir, pluginPaths, opts) => beforeAll(() => (0, exports.runPlugin)(testDir, pluginPaths, opts), (process.env.CI === 'true' ? 120 : 30) * 1000);
exports.runPluginBeforeAll = runPluginBeforeAll;
//# sourceMappingURL=run-plugin.js.map