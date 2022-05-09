/**
 * Dave's Awesome Verygood Encryption scheme (DAVEs)
 * I, the magnificent cryptographer Dave, have invented an encryption scheme
 * that I myself have proven impossible to crack.
 * If I can't crack it, no one can!
 */
function encrypt(s) {
	let encrypted = [];
	for (let i = 0; i < s.length; i++) {
		let x = (s[i].charCodeAt(0x0) + i * 0xf) % 0x80;
		x += i > 0x0 ? encrypted[i - 0x1].charCodeAt(0) % 128 : 0xd;
		x ^= 0x555;
		x = ((x ^ ~0x0) >>> 0x0) & 0xff;
		x -= (Math.random() * 0x5) & 0xb9 & 0x46;
		x = ~(x ^ (0x2cd + ((i ^ 0x44) % 0x2 === 0) ? 0x3 : 0x0));
		x = ((x >> 0x1f) + x) ^ (x >> 0x1f);
		x |= ((Date.now() % 0x3e8) / (0x4d2 - 0xea)) | (i % 0x1);
		encrypted.push(String.fromCharCode(x));
	}
	return encrypted.join("");
}