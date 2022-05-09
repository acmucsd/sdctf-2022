import {randomBytes} from "crypto";
/**
 * Represents a website and the files that are necessary to render it
 */
export interface Website {
	[key: string]: string;
	// The unique name that identifies the site
	sitename: string;
	// The title that shows up in the tab for the site
	title: string;
	// The bundled React file that is present in the built ./js/* directory
	jsfile: string;
	// The name of the main copied CSS file that is present in ./css/*
	cssfile: string;
}

export const WEBSITES = [{
	sitename: "index",
	title: "Goats of the Realm",
	jsfile: "js/main.js",
	cssfile: "css/styles.css"
},{
	sitename: "login",
	title: "Admin Login",
	jsfile: "js/login.js",
	cssfile: "css/styles.css"
},{
	sitename: "about",
	title: "Attribution",
	jsfile: "js/about.js",
	cssfile: "css/styles.css"
}] as Website[];

export const FLAG = "sdctf{Th3_m0r3_t0k3ns_the_le55_pr0bl3ms_adf3d}";

const FLAG_CHARSET = "[\\w!@#$^&*(){}]";
export const PATH_REGEX = new RegExp(`^(?:\/${FLAG_CHARSET}|\/%[0-9a-fA-F]{2})+(?:\/|)$`);

// The secret is likely impossible to be cracked
export const JWT_SECRET = "63771287322011716411020613180104147215165203321921963169168144203113164251200807207100";

export const PORT = 1337;

// The length of the dummy session token
export const TOKEN_LENGTH = 32;

// The positive difference in milliseconds that tokens will be granted during
export const MS_TOKEN_GRANT_TOLERANCE = 5;

// The amount of milliseconds into a second to wait to grant a token
// Higher delay means users get less time to use their token
export const MS_DELAY = 0;

export const EXPIRE_TIME = 2;

export const NAV_LINKS = {
	LOGGED_IN: ["About", FLAG[0]],
	NOT_LOGGED_IN: ["About"]
}

export const USERNAME = "AzureDiamond";
export const PASSWORD = "hunter2";

/**
 * Gets a random string of hex bytes to an even length of characters
 * @param len the (even) length of the final random string returned
 * @returns the random string
 */
export function getRandomByteString(len: number): string {
	return Array.from(randomBytes(Math.floor(len / 2))).map(n=>n.toString(16)).join("");
}