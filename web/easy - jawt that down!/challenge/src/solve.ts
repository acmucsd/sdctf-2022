import {USERNAME, PASSWORD} from "./Config";
import * as phin from "phin";

let flag = "s";
let host = "http://localhost:8080/"
let flagpath = host + flag;

async function findFlag() {
	let exit = false;
	process.stdout.write("Finding flag characters: "+flag);
	while (!exit) {
		let res = await phin({url: host + "login", method: "POST", headers: {"Content-Type": "application/json"}, data: `{"username": "${USERNAME}", "password": "${PASSWORD}"}`});
		let cookie = res.headers['set-cookie'];
		let nextchar = await phin({url: flagpath, method: "GET", headers: {"Cookie": cookie}});
		if (nextchar.body.toString().length === 1) {
			flagpath += "/" + nextchar.body.toString();
			flag += nextchar.body.toString();
			process.stdout.write(nextchar.body);
		} else {
			exit = true;
		}
	}
}
findFlag();