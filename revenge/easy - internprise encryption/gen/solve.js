const {encrypt, decrypt} = require("./lib");
const fs = require("fs").promises;
const path = require("path");

(async () => {
	let files = await fs.readdir(path.resolve(__dirname, "..", "public"));
	files.forEach(async file => {
		if (file.match(/\.txt$/)) {
			let f = await fs.readFile(path.resolve(__dirname, "..", "public", file));
			console.log(decrypt(f.toString()));
		}
	})
})();