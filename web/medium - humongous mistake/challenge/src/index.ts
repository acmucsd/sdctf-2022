import * as express from "express";
import {Request, Response} from "express";
import * as path from "path";
import * as fs from "fs";
import * as cookie from "cookie-parser";
import rateLimit from "express-rate-limit";
import Database from "./Database";
import { dmUser, checkUserExists } from "./comms";
import CodeGen from "./Code";
import { DATABASE_URL, FLAG, WEBSITES } from "./Config";

const app = express();
const template = fs.readFileSync(path.join(__dirname, "public/template.html")).toString();

const PORT = 1337;
const db = new Database(DATABASE_URL);
const mfa = new CodeGen(3);
const tokenGranter = new CodeGen(64);

// Rate limits requests to 100 per 15 mins
const ratelimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
});

// Make the public directory traversible
app.use(express.static(path.join(__dirname, "public")));

app.use(cookie());

// Probably superfluous, makes sure req.cookies always exists
app.use((req, res, next)=>{
	if (!req.cookies) {
		req.cookies = {}
	}
	next();
});
// Makes sure any token the user has is still valid
app.use(async (req, res, next) => {
	if (req.cookies?.token) {
		if ((req.path === "/2fa" ? false : !(await db.getAccountFromToken(req.cookies.token))) || 
			(req.path === "/2fa" ? !tokenGranter.isCodeValid(req.cookies.token) : false)) {
			res.clearCookie("token");
			delete req.cookies.token;
		}
	}
	next();
});

// Somewhat limit the number of accounts people can create
// During normal use, these limits shouldn't be hit
app.use("/2fa", ratelimit);
app.use("/signup", ratelimit);

// Receive json post requests
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));

// Send main page
app.get("/", (req: Request, res: Response) => {
	respond(res, "index");
});

app.get("/2fa", (req, res) => {
	if (req?.cookies?.token) {
		if (tokenGranter.isCodeValid(req.cookies.token)) {
			respond(res, "twofa");
		} else {
			res.sendStatus(400);
		}
		return;
	}
	res.status(500);
	res.send("Missing Token");
});

app.post("/2fa", async (req, res) => {
	if (typeof req.cookies?.token === "string" && typeof req?.body?.code === "string") {
		// Vuln: doesn't check if the code belongs to the user logging in
		if (mfa.isCodeValid(req.body.code)) {
			mfa.consumeToken(req.body.code);
			if (tokenGranter.isCodeValid(req.cookies.token)) {
				let username = tokenGranter.consumeToken(req.cookies.token);
				await db.addAccountToken(username, req.cookies.token);
				res.redirect("/");
				return;
			} else {
				res.status(400);
				res.send("Invalid Token");
			}
		} else {
			res.status(400);
			res.send("Invalid 2FA code!");
			return;
		}
	}
	res.sendStatus(400);
});
app.get("/buyflagshell", async (req, res) => {
	if (typeof req.cookies?.token === "string") {
		let username = await db.getAccountFromToken(req.cookies.token);
		if (username === "admin") {
			res.contentType("html");
			res.send(`<html><head><title>Receipt</title><link rel="stylesheet" type="text/css" href="css/fonts.css" media="screen"></head><body><h1 style="font-family: 'Solway'; font-size: 4em;">${FLAG}</h1></body></html>`);
		} else {
			res.redirect("/buyshell");
		}
	} else {
		res.redirect("/buyshell");
	}
});
app.get("/buyshell", async (req, res) => {
	if (req.cookies?.token) {
		let username = await db.getAccountFromToken(req.cookies.token);
		if (username === "admin") {
			respond(res, "boughtshell")
		} else {
			respond(res, "buyshell");
		}
	} else {
		res.status(401);
		res.send("You must have an account to buy from us!");
	}
})
app.get("/logout", (req, res) => {
	res.clearCookie("token");
	res.redirect("/");
});
app.get("/addfunds", (req, res) => {
	if (req.cookies?.token) {
		respond(res, "addfunds");
	} else {
		res.sendStatus(401);
	}
})

app.post("/signup", async (req, res) => {
	if (isValidBody(req.body)) {
        let discordUserExists = checkUserExists(req.body.tag);
        if (!discordUserExists) {
            res.status(500);
            res.send(`The user ${req.body.discord} can't be contacted! Are you in the SDCTF server and is your discord tag spelled correctly?`);
            return;
        }
		let hasUser = await db.hasUser(req.body.username);
		if (!hasUser) {
			let messageSuccess = await dmUser(req.body.discord, `Your two-factor authentication code is: \`${mfa.genCode().value}\``);
			if (messageSuccess) {
                let userSuccess = await db.createUser(req.body.username, req.body.password, req.body.discord);
				if (userSuccess) {
					res.cookie("token", tokenGranter.genCode(req.body.username).value);
					res.redirect("/2fa");
				} else {
					res.status(400);
					res.send(`Can't create user!`);
				}
			} else {
				res.status(500);
				res.send(`Cannot send ${req.body.discord} a message! Is your Discord tag correct, are you a member of the SDCTF Discord server, and do you allow DMs from users who share a server with you?`);
			}
		} else {
			res.status(400);
			res.send(`A user with name ${req.body.username} already exists!`);
		}
	} else {
		res.status(400);
		res.send("Malformed Request Body");
	}
});

app.post("/login", async (req, res) => {
	// Password's type is deliberately not checked here
	if (typeof req?.body?.username === "string" && req?.body?.password) {
		if (!req.body?.password?.length) {
			res.status(404);
			res.send("Malformed string. Invalid length!");
			return;
		} else {
			if (typeof req.body.password !== "string") {
				// feels disingenuous but whatever
				delete req.body.password.length;
			}
		}
		let account = await db.checkLogin(req.body.username, req.body.password);
		if (account) {
			if (account.discord === "none") {
				res.cookie("token", tokenGranter.genCode(req.body.username).value);
				res.redirect("/2fa");
			} else {
				let messageSuccess = await dmUser(account.discord, `Your two-factor authentication code is: \`${mfa.genCode().value}\``);
				if (messageSuccess) {
					res.cookie("token", tokenGranter.genCode(req.body.username).value);
					res.redirect("/2fa");
				} else {
					res.status(500);
					res.send(`Cannot send ${req.body.discord} a message! Is your Discord tag correct and are you a member of the SDCTF Discord server? If so, please contact the SDCTF staff.`);
				}
			}
		} else {
			res.status(401);
			res.send(`Invalid Username or Password!`);
		}
	}
});

app.get("/boughtshell", (req, res) => {
	res.send(":)");
})

app.get("/:siteName", (req: Request, res: Response) => {
	let site = WEBSITES.find(e => e.sitename === req.params.siteName);
	if (site?.sitename) {
		respond(res, site.sitename);
	} else {
		res.sendStatus(404);
	}
});

function isValidBody(body: any) {
	if (typeof body?.username === "string" &&
			typeof body?.password === "string" && 
			typeof body?.discord === "string") {
		if (body.discord.length <= 120 &&
				body.password.length <= 40 &&
				body.username.length <= 40) {
			if (body.discord.match(/^[^#]+#\d{4}$/) !== null) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Utility functions for above methods
 */
function respond(res: any, filename: string) {
	res.set({
		"Content-Type": "text/html"
	});
	res.send(generatePage(filename));
}

function generatePage(name: string): string {
	let site = WEBSITES.find(e=>e.sitename===name);
	let html = template;
	for (let key of Object.keys(site)) {
		html = html.replace(new RegExp("\\$" + key.toUpperCase()), site[key]);
	}
	return html;
}

process.on('unhandledRejection', function(err, promise) {
    console.error('THIS IS FINE (promise: ', promise, ', reason: ', err, ').');
});

app.listen(PORT, "0.0.0.0");