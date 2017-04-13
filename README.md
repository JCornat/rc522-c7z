#rc522-c7z
Node.js package for Rapsberry Pi & RC522 RFID Reader combo, with TypeScript support.

Package entirely based on [ocsacesar](https://github.com/ocsacesar/rc522) and [sbrinkmann](https://github.com/sbrinkmann/rc522-rfid)'s works.

## Requirements
- The RFID reader is plugged onto the raspberry pi like it is described over here http://geraintw.blogspot.de/2014/01/rfid-and-raspberry-pi.html


## Installation
- Plug RFID Reader to Raspberry Pi according to this table :
```
 RFID Reader Pin  <->  Raspberry Pi Pin 
     1 (3.3V)      |         1           
     2 (RST)       |         22          
     3 (GND)       |         25          
     5 (MISO)      |         21          
     6 (MOSI)      |         19          
     7 (SCK)       |         23          
     8 (SDA)       |         24          
```

- Install GCC compiler 
```
sudo apt-get update
sudo apt-get install build-essential
```

- Install Node.js 
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
```

- Install node-gyp 
```
npm install -g node-gyp
```

- Install Broadcom BCM 2835 library
```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.35.tar.gz
tar -zxf bcm2835-1.35.tar.gz
cd bcm2835-1.35
./configure
sudo make install
```

- Inside your project, install this module
```
npm install --save rc522-c7z
```

## How to use 
### For JavaScript
```
var rc522 = require('rc522-c7z');

rc522((serial) => {
	console.log(serial);
});
```

## For TypeScript
```
import * as rc522 from 'rc522-c7z';

rc522((serial) => {
	console.log(serial);
});
```