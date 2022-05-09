export const DISCORD_ENDPOINT = "http://localhost:3345/";
export const DATABASE_URL = "mongodb://localhost:27017/users";

interface Website {
	[key: string]: string;
	sitename: string;
	title: string;
	description: string;
	jsfile: string;
	cssfile: string;
	themecolor: string;
}

export const WEBSITES = [{
	sitename: "index",
	title: "The Beachfront",
	description: "Buy some shells!",
	jsfile: "js/index.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "shop",
	title: "The Beachfront Shop",
	description: "Buy some shells!",
	jsfile: "js/shop.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "login",
	title: "Login",
	description: "Do the logging into the website",
	jsfile: "js/login.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "about",
	title: "How to Pay",
	description: "Invest in this new form of currency!",
	jsfile: "js/about.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "credits",
	title: "Asset Credit",
	description: "Thanks to these people for their icons and images",
	jsfile: "js/credits.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "twofa",
	title: "Two-Factor Authentication",
	description: "Two factor your authenticate",
	jsfile: "js/twofa.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "addfunds",
	title: "Add Funds to your Beachfront Account",
	description: "We swear this isn't a scam",
	jsfile: "js/addfunds.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "buyshell",
	title: "Insufficient Funds",
	description: "Put more money in your account",
	jsfile: "js/buyshell.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
},{
	sitename: "boughtshell",
	title: "Purchased!",
	description: "Now give us more money",
	jsfile: "js/boughtshell.js",
	cssfile: "css/styles.css",
	themecolor: "#4281A4"
}] as Website[];

export const FLAG = "sdctf{th1s_ch4ll3nge_1snt_g3tt1ng_a_SQL_ad45bd}";