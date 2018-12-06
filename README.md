# rc522-c7z
Node.js package for Rapsberry Pi & RC522 RFID Reader combo, with TypeScript support.

Package based on [ocsacesar](https://github.com/ocsacesar/rc522) and [sbrinkmann](https://github.com/sbrinkmann/rc522-rfid)'s work.

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

- Enable SPI in raspi-config (Interfacing Options > SPI)
```
sudo raspi-config
sudo shutdown -r now
```

- Install Node.js
```
wget https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-armv6l.ta
tar -xzf node-v8.9.0-linux-armv6l.tar.gz
cd node-v8.9.0-linux-armv6l/
sudo cp -r * /usr/local
```

- Install node-gyp 
```
npm install -g node-gyp
```

- Install Broadcom BCM 2835 library
```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.52.tar.gz
tar -zxf bcm2835-1.52.tar.gz
cd bcm2835-1.52
./configure
make
sudo make check
sudo make install
sudo modprobe spi_bcm2835
```

- Inside your project, install this module
```
npm install --save rc522-c7z
```

## How to use 
### For JavaScript
```
var rc522 = require('rc522-c7z');

rc522.listen(serial => {
  console.log(serial);
});
```

### For TypeScript
```
import rc522 from 'rc522-c7z';

rc522.listen(serial => {
  console.log(serial);
});
```
