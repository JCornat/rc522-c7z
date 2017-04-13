import * as rc522 from './build/Release/rc522';

rc522((rfidTagSerialNumber) => {
	console.log(rfidTagSerialNumber);
});