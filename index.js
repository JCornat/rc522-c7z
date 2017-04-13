"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const readline = require("readline");
let registeredCallback = null;
let child = null;
module.exports = exports = (givenCallback) => {
    registeredCallback = givenCallback;
};
let mainProcessShutdown = false;
let initChildProcess = () => {
    child = child_process_1.spawn('node', [__dirname + '/' + 'rc522_output.js']);
    let linereader = readline.createInterface(child.stdout, child.stdin);
    linereader.on('line', (rfidTagSerialNumber) => {
        if (registeredCallback instanceof Function) {
            registeredCallback(rfidTagSerialNumber);
        }
    });
    child.on('close', () => {
        if (!mainProcessShutdown) {
            initChildProcess();
        }
    });
};
// SIGTERM AND SIGINT will trigger the exit event.
process.once('SIGTERM', () => {
    process.exit(0);
});
process.once('SIGINT', () => {
    process.exit(0);
});
// And the exit event shuts down the child.
process.once('exit', () => {
    mainProcessShutdown = true;
    child.kill();
});
process.once('uncaughtException', (error) => {
    if (process.listeners('uncaughtException').length === 0) {
        mainProcessShutdown = true;
        child.kill();
        throw error;
    }
});
initChildProcess();
//# sourceMappingURL=index.js.map