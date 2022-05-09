//const Config = require("./Config.js");
/**
 * Does the encrypt in the forward direction
 */
module.exports.encrypt = (s) => {
	let encrypted = [];
	for (let i = 0; i < s.length; i++) {
		/**
		 * Set x to the ASCII value of the input character with the 
		 * index multiplied by 15 added to it. Then mod the value by 128 
		 * which is the max size of ASCII characters this algorithm supports
		 */
		let x = (s[i].charCodeAt(0x0) + i * 0xf) % 0x80;
		// Add the previous encrypted character's value if it exists, otherwise add 13
		x += i > 0x0 ? encrypted[i - 0x1].charCodeAt(0) % 128 : 0xd;
		// XOR by 10101010101
		x ^= 0x555;
		// Flip the lower 8 bits
		x = ((x ^ ~0x0) >>> 0x0) & 0xff;
		// No-op: 0xb9 & 0x46 is 0
		x -= (Math.random() * 0x5) & 0xb9 & 0x46;
		// XNOR by 1011001101
		x = ~(x ^ (0x2cd + ((i ^ 0x44) % 0x2 === 0) ? 0x3 : 0x0));
		// Take the absolute value of x
		x = ((x >> 0x1f) + x) ^ (x >> 0x1f);
		// Do yet another no-op by OR-ing a decimal that's between 0 inclusive and 1 exclusive
		x |= ((Date.now() % 0x3e8) / (0x4d2 - 0xea)) | ( i % 0x1);
		// Return the changed character
		encrypted.push(String.fromCharCode(x));
	}
	return encrypted.join("");
};

/**
 * Does the encrypt but like in reverse order, ya know?
 */
module.exports.decrypt = (a) => {
	a = a.split("");
	let solved = [];
	for (let i = a.length - 1; i >= 0; i--) {
		let x = a[i].charCodeAt(0);
		x = -x;
		x = ~(x ^ (0x2cd + ((i ^ 0x44) % 2 === 0) ? 0x3 : 0x0));
		x = ((x ^ ~0) >>> 0) & 0xff;
		x ^= 0x555;
		x &= 0xff;
		x -= (i > 0 ? a[i - 1].charCodeAt(0) % 128 : 0xd);
		for (let j = 32; j < 128; j++) {
			if ((j + (i*0xf)) % 0x80 === x) {
				solved.push(String.fromCharCode(j));
			}
		}
	}
	return solved.reverse().join("");
};

//console.log("Encrypted flag: \n", encrypt(Config.FLAG));
//console.log("Decrypting encrypted flag: \n", decrypt(encrypt(Config.FLAG)));