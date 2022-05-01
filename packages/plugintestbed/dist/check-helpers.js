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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDocsFile = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const checkDocsFile = (...args) => () => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = (0, path_1.resolve)(args[0], 'docs', ...args.slice(1, -1));
    const content = yield (0, promises_1.readFile)(fullPath, 'utf-8');
    const cb = args[args.length - 1];
    yield cb(content);
});
exports.checkDocsFile = checkDocsFile;
//# sourceMappingURL=check-helpers.js.map