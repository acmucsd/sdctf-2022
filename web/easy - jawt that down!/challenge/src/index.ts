import * as express from "express";
import {Request, Response} from "express";
import * as path from "path";
import * as fs from "fs";

import * as Config from "./Config";
import grantToken, {validateToken} from "./TokenGranter";

const app = express();
// Load the template HTML file
const template = fs.readFileSync(path.join(__dirname, "public/template.html")).toString();

// Make the public directory traversible
app.use(express.static(path.join(__dirname, "public")));

// More secure cookie parser middleware
app.use((req: Request, res: Response, next: any)=>{
	req.cookies = {};
	if (!req.headers.cookie) {
		next();
		return;
	}
	req.headers.cookie.split(/; */).forEach(cookie => {
		let c = cookie.split("=");
		if (c.length >= 2) {
			if (!(c[0] in req.cookies)) {
				req.cookies[c[0]] = c.slice(1).join("=");
			}
		}
	});
	next();
});

// Receive json post requests and urlencoded requests
app.use(express.json({limit:"5kb"}));
app.use(express.urlencoded({extended: true, limit:"5kb"}));

// Send main page
app.get("/", (req: Request, res: Response) => {
	respond(res, "index");
});
app.get("/login", (req: Request, res: Response) => {
	respond(res, "login");
});
app.get("/about", (req: Request, res: Response) => {
	respond(res, "about");
});
app.post("/login", async (req: Request, res: Response) => {
	if (!(typeof req.body?.username === "string" && typeof req.body?.password === "string")) {
		res.sendStatus(403);
		return;
	}
	if (Config.USERNAME === req.body.username && Config.PASSWORD === req.body.password) {
		// Grants a JWT with a short expiry on correct login
		let token = await grantToken(req.body.username);
		res.cookie("jwt", token);
		res.redirect("/");
		return;
	}
	res.status(403);
	res.send("Invalid Username or Password!")
});

app.post("/links", (req: Request, res: Response) => {
	res.contentType("application/json");
	if (req.cookies.jwt) {
		if (validateToken(req.cookies.jwt)) {
			res.send(Config.NAV_LINKS.LOGGED_IN);
			return;
		}
	}
	res.send(Config.NAV_LINKS.NOT_LOGGED_IN);
});

// Matches a path in the form /a/b/c/.../h where each segment is an alphanumeric/symbol character
app.get(Config.PATH_REGEX, (req: Request, res: Response) => {
	if (req.cookies.jwt) {
		if (validateToken(req.cookies.jwt)) {
			let partialFlag;
			try {
				partialFlag = decodeURIComponent(req.path).replace(/\//g, "");
			} catch(e) {
				if (e) {
					res.sendStatus(500);
					return;
				}
			}
			if (partialFlag?.length) {
				if (Config.FLAG.slice(0,partialFlag.length) === partialFlag) {
					let char = nextCharOf(decodeURIComponent(req.path));
					if (char === "end") {
						res.end("End of message");
						return;
					} else if (char) {
						res.end(char);
						return;
					}
				} else {
					res.sendStatus(404);
					return;
				}
			} else {
				res.sendStatus(500);
				return;
			}
		} else {
			res.status(403);
			res.end("Invalid Token: Access Denied");
			return;
		}
	}
	res.status(403);
	res.end("No Token: Access Denied");	
});

/**
 * Gets the next character of the flag with a given path
 * @param path the path spelling out the current known characters of the flag
 * @returns the next missing character of the flag
 */
function nextCharOf(path: string): string {
	if (path) {
		let partialFlag = path.replace(/\//g, "");
		for (let i = 0; i < Config.FLAG.length; i++) {
			if (Config.FLAG[i] !== partialFlag[i] && partialFlag.length === i) {
				return Config.FLAG[i];
			}
		}
		if (partialFlag.length === Config.FLAG.length) {
			return "end";
		}
	}
	return null;
}

/**
 * Responds to a request for a specified page in the websites array
 * @param res the Express response object to respond to
 * @param sitename the unique sitename that should be used to generate the page
 */
function respond(res: any, sitename: string): void {
	res.set({
		"Content-Type": "text/html"
	});
	res.send(generatePage(sitename));
}

/**
 * At some point one has to consider using templating libraries...
 * I haven't hit that point yet
 * @param name the sitename identifier of the website
 * @returns the html string that should be sent as the webpage
 */
function generatePage(name: string): string {
	let site = Config.WEBSITES.find(e=>e.sitename===name);
	let html = template;
	for (let key of Object.keys(site)) {
		html = html.replace(new RegExp("\\$" + key.toUpperCase()), site[key]);
	}
	return html;
}

app.listen(Config.PORT, "0.0.0.0");