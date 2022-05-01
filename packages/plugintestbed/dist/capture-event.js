"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCaptureEvent = void 0;
const lodash_1 = require("lodash");
const __isCapture = Symbol.for('__isCapture');
const setupCaptureEvent = (cls, eventName) => {
    let listenerToTest = [];
    let baseOn;
    function registerEvent(nameOrMap, callback) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- By signature, `callback` always exists.
        const objEvent = (0, lodash_1.isString)(nameOrMap) ? { [nameOrMap]: callback } : nameOrMap;
        const handlers = [objEvent[eventName], objEvent.all].filter(lodash_1.isFunction);
        listenerToTest.push(...handlers);
        if (baseOn[__isCapture]) {
            // eslint-disable-next-line prefer-rest-params -- Pass all args
            return baseOn.apply(this, arguments);
        }
        return this;
    }
    registerEvent[__isCapture] = true;
    afterEach(() => {
        if (baseOn && !baseOn[__isCapture]) {
            cls.prototype.on = baseOn;
        }
        listenerToTest = [];
    });
    return {
        captureEventRegistration: () => {
            baseOn = cls.prototype.on;
            cls.prototype.on = registerEvent;
        },
        getListeners: () => listenerToTest,
    };
};
exports.setupCaptureEvent = setupCaptureEvent;
//# sourceMappingURL=capture-event.js.map