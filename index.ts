import { spawn } from 'child_process';
import * as path from 'path';
import * as readline from 'readline';

let registeredCallback = null;
let child = null;
let mainProcessShutdown = false;

let initChildProcess = () => {
  const tmp = path.join(__dirname, 'rc522_output.js');
  child = spawn('node', [tmp]);

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

export function listen(callback) {
  registeredCallback = callback;
}
