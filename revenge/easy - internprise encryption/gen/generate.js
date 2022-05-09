const encrypt = require("./lib").encrypt;
const fs = require("fs").promises;
const path = require("path");

(async ()=>{let files = await fs.readdir(path.resolve(__dirname, "unencrypted"));
files.forEach(async file=>{
	let f = await fs.readFile(path.resolve(__dirname, "unencrypted", file));
	fs.writeFile(path.resolve(__dirname, "..", "public", file), encrypt(f.toString()));
})
})();