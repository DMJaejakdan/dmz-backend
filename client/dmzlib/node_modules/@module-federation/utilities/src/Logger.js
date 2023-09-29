"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static getLogger() {
        return this.loggerInstance;
    }
    static setLogger(logger) {
        this.loggerInstance = logger || console;
        return logger;
    }
}
exports.Logger = Logger;
Logger.loggerInstance = console;
//# sourceMappingURL=Logger.js.map