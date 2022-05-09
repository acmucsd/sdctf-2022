import * as express from "express";
import {Request, Response} from "express";
import * as path from "path";
import * as fs from "fs";
import * as efu from "express-fileupload";
import {parseExif} from "./ImageProcessing";

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
	title: "The Bird Database",
	description: "A website for collecting bird photos",
	jsfile: "js/index.js",
	cssfile: "css/styles.css",
	themecolor: "orange"
},{
	sitename: "about",
	title: "Attribution",
	description: "Credit for photos used on the site",
	jsfile: "js/about.js",
	cssfile: "css/styles.css",
	themecolor: "orange"
},{
	sitename: "upload",
	title: "Upload a Bird",
	description: "",
	jsfile: "js/upload.js",
	cssfile: "css/styles.css",
	themecolor: "orange"
}] as Website[];

const PORT = 1337;

// Make the public directory traversible
app.use(express.static(path.join(__dirname, "public")));

// Make cookies easier to access
app.use((req: Request, res: Response, next: any)=>{
	req.cookies = req.headers.cookie;
	next();
});
app.use(efu({
	limits: {
		files: 1,
		fileSize: 5e6 // Max 5mb file size
	}
}))

// Receive json post requests and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Send main page
app.get("/", (req: Request, res: Response) => {
	respond(res, "index");
});
app.get("/about", (req: Request, res: Response) => {
	respond(res, "about");
});
app.get("/upload", (req: Request, res: Response) => {
	respond(res, "upload");
});
app.post("/upload", async (req: Request, res: Response) => {
	let data = (req?.files?.bird as efu.UploadedFile)?.data;
	if (data) {
		let documents = await parseExif(data);
		if (documents === null) {
			res.status(400);
			res.send("This file is not an image! We only accept bird images!");
		} else if (typeof documents === "string") {
            res.contentType("html");
            res.end(`Thank you for uploading a bird to the <em>${documents}</em> family! Your support helps us grow!`);
        } else if (documents === false) {
            res.end("We cannot determine whether this image is a bird or not. Sorry!");
        } else if (documents.length == 0) {
			res.status(400);
			res.end(`The image ${(req?.files?.bird as efu.UploadedFile)?.name} does not seem to be a bird.`);
		} else {
			res.contentType("html");
			res.end(`Thank you for uploading a bird to the <em>${documents[0].family}</em> family! Your support helps us grow!`);
		}
	} else {
		res.status(400);
		res.end("Malformed request");
	}
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