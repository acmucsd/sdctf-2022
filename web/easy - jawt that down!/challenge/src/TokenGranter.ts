import * as jwt from "jsonwebtoken";
import * as Nano from "nanotimer";

import { 
	TOKEN_LENGTH,
	JWT_SECRET,
	MS_TOKEN_GRANT_TOLERANCE,
	MS_DELAY,
	getRandomByteString,
	EXPIRE_TIME
} from "./Config";

let promiseQueue: Function[] = [];

const UPPER_BOUND = MS_DELAY + MS_TOKEN_GRANT_TOLERANCE;
const LOWER_BOUND = MS_DELAY - MS_TOKEN_GRANT_TOLERANCE > 0 ? 
	MS_DELAY - MS_TOKEN_GRANT_TOLERANCE :
	0;

export default async function grantToken(username: string): Promise<string> {
	await new Promise((resolve, reject) => {
		promiseQueue.push(resolve);
	});
	let token = jwt.sign({
		username: username,
		token: getRandomByteString(TOKEN_LENGTH),
	}, JWT_SECRET, {expiresIn: EXPIRE_TIME});
	return token;
}

export function validateToken(token: string): boolean {
	try {
		let decoded = jwt.verify(token, JWT_SECRET);
		return true;
	} catch(e: unknown) {
		return false;
	}
}

function resolvePromises() {
	// Only grant tokens at the start of a second
	let ms = parseInt(Date.now().toString().slice(-3));
	if (ms > LOWER_BOUND && ms < UPPER_BOUND) {
		for (let i = 0; i < promiseQueue.length; i++) {
			promiseQueue[i]();
		}
		promiseQueue = [];
	}
}
// Try to resolve promises every millisecond
(new Nano()).setInterval(resolvePromises, "", "1m");