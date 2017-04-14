"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const child_process_1 = require("child_process");
let registeredCallback = null;
let child = null;
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
process.once('SIGTERM', () => {
    process.exit(0);
});
process.once('SIGINT', () => {
    process.exit(0);
});
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
function default_1(callback) {
    registeredCallback = callback;
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map