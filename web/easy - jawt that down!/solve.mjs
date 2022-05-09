import puppeteer from "puppeteer";
import fs from "fs";

const url =  "https://jawt.sdc.tf";

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    let flagSoFar = "";
    page.on("load", async (e)=>{
        console.log(page.url());
        if (page.url().includes("login")) {
            await page.waitForSelector("#username");
            await page.type("#username", "AzureDiamond");
            await page.type("#password", "hunter2");
            await page.click("button[type=\"submit\"]");
        } else if (page.url() === url || page.url() === url+"/") {
            if (flagSoFar.length === 0) {
                page.goto(url+"/s");
                flagSoFar+="/s";
            } else {
                await page.goto(url+flagSoFar);
            }
        } else {
            let nextchar = await page.evaluate(()=>{
                return document.querySelector("pre").innerHTML;
            });
            if (nextchar.includes("End")) {
                console.log("Flag found:", flagSoFar.replace(/\//g,""));
                await browser.close();
                return;
            }
            if (nextchar.includes("Invalid")) {
                await page.goto(url+"/login");
            } else {
                flagSoFar+="/"+nextchar;
                await page.goto(url+flagSoFar);
                console.log(flagSoFar);
            }
        }
    });
    await page.goto(url + '/login');
})();