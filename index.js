"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const readline = require("readline");
const child_process_1 = require("child_process");
let registeredCallback = null;
let child = null;
let mainProcessShutdown = false;
let initChildProcess = () => {
    const tmp = path.join(__dirname, 'rc522_output.js');
    child = child_process_1.spawn('node', [tmp]);
    let linereader = readline.createInterface(child.stdout, child.stdin);
    linereader.on('line', (rfidTagSerialNumber) => {
        if (!(registeredCallback instanceof Function)) {
            return;
        }
        registeredCallback(rfidTagSerialNumber);
    });
    child.on('close', () => {
        if (mainProcessShutdown) {
            return;
        }
        initChildProcess();
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