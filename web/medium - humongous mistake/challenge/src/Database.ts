import * as mongoose from "mongoose";
import { pbkdf2Sync, randomBytes } from "crypto";

const User = mongoose.model("User", new mongoose.Schema({
	username: String,
	password: String,
	discord: String,
	createdAt: {type: Date, expires: "2h", default: Date.now}
}), "users");
const AdminUser = mongoose.model("AdminUser", new mongoose.Schema({
	username: String,
	password: String,
	discord: String
}), "users");
const Token = mongoose.model("Token", new mongoose.Schema({
	username: String,
	token: String,
	createdAt: {type: Date, expires: "2h", default: Date.now}
}));
interface Token {
	username: string;
	token: string;
}
interface Account {
	username: string;
	password: string;
	discord: string;
}

export default class Database {
	private static HASH_ITER = 100000;
	private static HASH_SALT = "you shouldn't use global salts";
	private static KEY_LEN = 128;
	private static TOKEN_LEN = 64;

	constructor(url: string) {
		mongoose.connect(url);
	}
	public async createUser(username: string, password: string, discord: string): Promise<boolean> {
		if (username === "admin") {
			return false;
		}
		let user = await User.findOne({username: username}).lean().exec();
		if (user) {
			return false;
		} else {
			(new User({
				username: username,
				password: this.genHash(password),
				discord: discord
			})).save();
			return true;
		}
	}

    public async hasUser(username: string): Promise<boolean> {
        return await User.count({ username: username }) >= 1;
    }
	
	// Vuln
	public async checkLogin(username: string, password: any): Promise<Account> {
		this.createAdminIfItDoesntExist();
		try {
			let doc = await User.findOne({
				username: username,
				// In retrospect I shouldn't have done password hashing
				password: typeof password === "string" ? 
					this.genHash(password) :
					password
			}).lean().exec() as Account;
			/**
			 * In more real-world vulnerable code, it would look more like this:
			 * User.findOne({username: username, password: password})
			 * with no type checking and no hashing of the password. If the database
			 * used hashing, then it would likely fail when given an object and not
			 * allow an unauthorized login.
			 */
			return doc;
		} catch(e: any) {
			return null;
		}
	}

	public async addAccountToken(username: string, token: string): Promise<void> {
		await (new Token({
			username: username,
			token: token
		})).save();
	}
	public async getAccountFromToken(token: string): Promise<string> {
		let doc = await Token.findOne({token: token}).lean().exec() as Token;
		return doc?.username;
	}

	private genHash(pw: string): string {
		return pbkdf2Sync(pw, Database.HASH_SALT,
			Database.HASH_ITER, Database.KEY_LEN, "sha512").toString("hex");
	}
	private async createAdminIfItDoesntExist() {
		let admin = await User.findOne({username: "admin"}).lean().exec();
		if (!admin) {
			await (new AdminUser({
				username: "admin",
				password: "unguessable",
				discord: "none"
			})).save();
		}
	}
}