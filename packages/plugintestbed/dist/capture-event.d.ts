import { Class } from 'type-fest';
import { EventDispatcher } from 'typedoc';
export declare const setupCaptureEvent: <T extends EventDispatcher>(cls: Class<T, any[]>, eventName: string) => {
    captureEventRegistration: () => void;
    getListeners: () => CallableFunction[];
};
//# sourceMappingURL=capture-event.d.ts.map