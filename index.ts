import { spawn } from 'child_process';
import * as readline from 'readline';
let registeredCallback = null;
let child = null;

module.exports = exports = (givenCallback) => {
  registeredCallback = givenCallback;
};

let mainProcessShutdown = false;

let initChildProcess = () => {
  child = spawn('node', [__dirname + '/' + 'rc522_output.js']);
  let linereader = readline.createInterface(child.stdout, child.stdin);

  linereader.on('line', function (rfidTagSerialNumber) {
    if (registeredCallback instanceof Function) {
      registeredCallback(rfidTagSerialNumber);
    }
  });

  child.on('close', function (code) {
    if (!mainProcessShutdown) {
      initChildProcess();
    }
  });
}

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

// This is a somewhat ugly approach, but it has the advantage of working
// in conjunction with most of what third parties might choose to do with
// uncaughtException listeners, while preserving whatever the exception is.
process.once('uncaughtException', (error) => {
  // If this was the last of the listeners, then shut down the child and rethrow.
  // Our assumption here is that any other code listening for an uncaught
  // exception is going to do the sensible thing and call process.exit().
  if (process.listeners('uncaughtException').length === 0) {
    mainProcessShutdown = true;
    child.kill();
    throw error;
  }
});

initChildProcess();
