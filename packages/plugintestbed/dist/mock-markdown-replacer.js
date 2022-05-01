"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMockMarkdownReplacer = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const capture_event_1 = require("./capture-event");
const setupMockMarkdownReplacer = () => {
    const capture = (0, capture_event_1.setupCaptureEvent)(typedoc_1.Renderer, typedoc_1.MarkdownEvent.PARSE);
    return {
        captureEventRegistration: capture.captureEventRegistration,
        runMarkdownReplace: (text, listenerIndex) => {
            const listeners = capture.getListeners();
            const markdownEvent = new typedoc_1.MarkdownEvent(typedoc_1.MarkdownEvent.PARSE, text, text);
            (0, assert_1.default)(listeners.length >= 1, `Invalid listeners count for event ${typedoc_1.MarkdownEvent.PARSE}`);
            const listenersToTrigger = (0, lodash_1.isNil)(listenerIndex) ? listeners : [listeners[listenerIndex]];
            listenersToTrigger.forEach(l => l(markdownEvent));
            return markdownEvent.parsedText;
        },
    };
};
exports.setupMockMarkdownReplacer = setupMockMarkdownReplacer;
//# sourceMappingURL=mock-markdown-replacer.js.map