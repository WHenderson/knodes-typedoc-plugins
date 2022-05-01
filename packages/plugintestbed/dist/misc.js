"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHtml = void 0;
const js_beautify_1 = require("js-beautify");
const formatHtml = (v) => (0, js_beautify_1.html)(v, { indent_with_tabs: true });
exports.formatHtml = formatHtml;
//# sourceMappingURL=misc.js.map