import puppeteer from "puppeteer";
import ss from "string-similarity";

let startURL = "https://logs.sdc.tf/logs";
// Start with an offset of 120000000000ms because I know where the general log area is >:)
let date = new Date(Date.now()-120000000000);
(async()=>{
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	var prevpage = "";
	var thispage = "";
	page.on("load", async ()=>{
		prevpage = thispage;
		thispage = await page.evaluate(_=>document.querySelector("pre").innerHTML);
		// This is kind of a bad solution. What you would want to do for n logs is make a script
		// that diffs line-by-line and checks for any line that is out of the ordinary from the
		// regular format of the log file for each log file in the directory. 
		if (ss.compareTwoStrings(prevpage, thispage) < 0.7) {
			console.log("significant result", prevpage);
		}
		date.setDate(date.getDate() - 1);
		await page.goto(`${startURL}${date.getFullYear()}/${date.getMonth() + 1}/${
			date.getDate()}/${date.toLocaleString('en-us', {weekday: 'short'})}.log`);
	});
	await page.goto(startURL);
})();