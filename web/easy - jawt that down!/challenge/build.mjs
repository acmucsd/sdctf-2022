const isWindows = process.platform === "win32";
const isUnix = process.platform === "darwin" || process.platform === "linux";

import {exec} from "child_process";
import * as fs from "fs";

(()=>{
	if (isWindows) {
		exec("build.bat").stdout.on("data", (msg)=>{
			console.log(msg);
		}).once("close", ()=>{
			// I hate dropbox and also webpack
			if (fs.existsSync("./.dropbox.device")) {
				fs.rm("./.dropbox.device",()=>{});
			}
		});
	} else if (isUnix) {
		exec("build.sh").stdout.on("data", (msg)=>{
			console.log(msg);
		});
	}
})();