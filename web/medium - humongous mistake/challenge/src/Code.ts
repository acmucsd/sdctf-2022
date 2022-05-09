import { randomBytes } from "crypto";

interface Token {
	value: any;
	consumed: boolean;
	username: string;
}

export default class CyclicTokenGenerator {
	protected codes: Token[];
	protected codeLen: number;
	protected static EXPIRE_MS = 15 * 60 * 1000;

	constructor(codeLen: number) {
		this.codes = [];
		this.codeLen = codeLen;
	}

	protected removeBeginning() {
		this.codes.shift();
	}

	public genCode(username?: string): Token {
		let code = randomBytes(this.codeLen).toString("hex").toUpperCase();
		let token = {
			value: code,
			consumed: false,
			username: username ? username : null
		} as Token;
		this.codes.push(token);
		setTimeout(this.removeBeginning.bind(this), CyclicTokenGenerator.EXPIRE_MS);
		return token;
	}

	public isCodeValid(code: string): boolean {
		let token = this.codes.find(c => c.value === code);
		return !!token && token?.consumed === false;
	}

	public consumeToken(code: string): string {
		let index = this.codes.findIndex(c => c.value === code);
		if (index >= 0) {
			this.codes[index].consumed = true;
		}
		return this.codes[index].username;
	}
}