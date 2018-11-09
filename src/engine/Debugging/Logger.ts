interface LoggerIn {
    startTime: Date
    logs: string[]

    init: Function

    log: Function
    warning: Function
    error: Function
    info: Function

    dump: Function
}

export const Logger: LoggerIn = {
    startTime: new Date(),
    logs: [],

    init: function () {
        let consoleLogFunction = console.log;
        let consoleWarningFunction = console.warn;
        let consoleErrorFunction = console.error;
        let consoleInfoFunction = console.info;

        console.log = function(...strings) {
            this.log(...strings);
            consoleLogFunction(...strings);
        }
        console.warn = function(...strings) {
            this.warn(...strings);
            consoleWarningFunction(...strings);
        }
        console.error = function(...strings) {
            this.error(...strings);
            consoleErrorFunction(...strings);
        }
        console.info = function(...strings) {
            this.info(...strings);
            consoleInfoFunction(...strings);
        }
    },

    log: function (...strings: string[]) {
        let logTime = new Date();
        this.logs.push(`[ ${logTime.getTime() - this.startTime.getTime()} LOG ${strings.join()} ]`);
    },
    warning: function (...strings: string[]) {
        let logTime = new Date();
        this.logs.push(`[ ${logTime.getTime() - this.startTime.getTime()} WARNING ${strings.join()} ]`);
    },
    error: function (...strings: string[]) {
        let logTime = new Date();
        this.logs.push(`[ ${logTime.getTime() - this.startTime.getTime()} ERROR ${strings.join()} ]`);
    },
    info: function (...strings: string[]) {
        let logTime = new Date();
        this.logs.push(`[ ${logTime.getTime() - this.startTime.getTime()} INFO ${strings.join()} ]`);
    },
}
