import * as express from "express";
import {Request, Response} from "express";
import * as path from "path";
import * as fs from "fs";

interface Website {
	[key: string]: string;
	sitename: string;
	title: string;
	description: string;
	jsfile: string;
	cssfile: string;
	themecolor: string;
}

const app = express();
const template = fs.readFileSync(path.join(__dirname, "public/template.html")).toString();
const websites = [{
	sitename: "index",
	title: "Logger Logging",
	description: "The blog of logs",
	jsfile: "js/index.js",
	cssfile: "css/styles.css",
	themecolor: "#26463D"
},{
	sitename: "credits",
	title: "Image Attribution",
	description: "The cred of its",
	jsfile: "js/credits.js",
	cssfile: "css/styles.css",
	themecolor: "#26463D"
}] as Website[];

const PORT = 1337;

// Make the public directory traversible
app.use(express.static(path.join(__dirname, "public")));

// Make cookies easier to access
app.use((req: Request, res: Response, next: any)=>{
	req.cookies = req.headers.cookie;
	next();
});

// Receive json post requests and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Send main page
app.get("/", (req: Request, res: Response) => {
	respond(res, "index");
});
app.get("/credits", (req: Request, res: Response) => {
	respond(res, "credits");
});

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
	let site = websites.find(e=>e.sitename===name);
	let html = template;
	for (let key of Object.keys(site)) {
		html = html.replace(new RegExp("\\$" + key.toUpperCase()), site[key]);
	}
	return html;
}

app.listen(PORT, "0.0.0.0");