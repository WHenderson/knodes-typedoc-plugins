"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMockPageMemo = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const capture_event_1 = require("./capture-event");
const setupMockPageMemo = () => {
    const capture = (0, capture_event_1.setupCaptureEvent)(typedoc_1.Renderer, typedoc_1.Renderer.EVENT_BEGIN_PAGE);
    return {
        captureEventRegistration: capture.captureEventRegistration,
        setCurrentPage: (url, source, model, template = () => '', project = new typedoc_1.ProjectReflection('Fake'), listenerIndex) => {
            var _a;
            const listeners = capture.getListeners();
            (0, assert_1.default)(listeners.length >= 1, `Invalid listeners count for event ${typedoc_1.Renderer.EVENT_BEGIN_PAGE}`);
            const pageEvent = new typedoc_1.PageEvent(typedoc_1.PageEvent.BEGIN);
            pageEvent.project = project;
            pageEvent.url = url;
            pageEvent.model = model;
            pageEvent.template = template !== null && template !== void 0 ? template : (() => '');
            pageEvent.filename = url;
            Object.defineProperty(model, 'project', { value: project });
            model.sources = [
                ...((_a = model.sources) !== null && _a !== void 0 ? _a : []),
                { fileName: source, character: 1, line: 1, file: new typedoc_1.SourceFile(source) },
            ];
            const listenersToTrigger = (0, lodash_1.isNil)(listenerIndex) ? listeners : [listeners[listenerIndex]];
            listenersToTrigger.forEach(l => l(pageEvent));
        },
    };
};
exports.setupMockPageMemo = setupMockPageMemo;
//# sourceMappingURL=mock-page-memo.js.map