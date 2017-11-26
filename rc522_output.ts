let rc522 = require('./build/Release/rc522.node');

rc522((serial) => {
  console.log(serial);
});
