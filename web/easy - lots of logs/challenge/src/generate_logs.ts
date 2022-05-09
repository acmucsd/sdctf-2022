import * as fs from "fs/promises";
import { resolve } from "path";

const NUM_LOGS = 2000;
const STARTDATE = new Date(Date.now());
const LOG_MIN_LENGTH = 400;
const LOG_VARIATION = 500;

var createdFiles = [];

async function populateAllLogs() {
	let date = STARTDATE;
	await fs.rm(resolve("public/logs/"), {recursive: true, force: true});
	for (let i = 0; i < NUM_LOGS; i++) {
		let start = [(Math.random()*24)|0, (Math.random()*60)|0, (Math.random()*60)|0] as [number, number, number];
		let path = `public/logs/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;
		let filename = `${date.toLocaleString('en-us', {weekday: 'short'})}.log`;
		try {
			await fs.stat(path);	
		} catch(e) {
			await fs.mkdir(path, {recursive: true});
		}
		let text = genRandomLogText(date, start);
		await fs.writeFile(resolve(path, filename), text);
		date.setDate(date.getDate() - 1);
	}
}

function genRandomLogText(date: Date, jankyNums: [number, number, number]): string {
	// It is at this point I realized that the number of logs that can be logged in the
	// given timespan is probaly very unlikely at best. Regardless I don't really want
	// to edit this since the target log file is already made, so I guess there will 
	// just be an deforestation's worth of logs being harvested in mere minutes. Oops!
	let logPrice = new ScrollingAverage(4, 110, 23);
	let logSeller = new ScrollingAverage(3, 50, 5);
	let logProcessor = new ScrollingAverage(3, 30, 5);
	let logMine = new ScrollingAverage(3, 10, 5);
	let logs = 0;
	let processed = 0;
	let money = 0;
	let totalSold = 0;

	let d =(new Date(date));
	d.setHours(...jankyNums);

	let text = `Welcome to LoggerOS 11.02.3 (GNU/Linux 4.7.8-23-generic)\n\njohn@logger:~# ./logger\n\n`;
	text+= genHeader(d, "START") + "************************** STARTING LOGGING **************************\n";

	for (let i = 0; i < LOG_MIN_LENGTH + ((Math.random() * LOG_VARIATION)|0); i++) {
		let validChoice = false;
		while (!validChoice) {
			switch ((Math.random() * 6)|0) {
				case 0:
				case 1:
				case 2:
					text += genHeader(d, "LOG");
					let avg = logMine.average();
					logs += avg;
					text += `${avg} logs logged!\n`;
					validChoice = true;
				break;
				case 3:
				case 4:
					if (!(logs > 0)) {
						break;
					}
					let proc = logProcessor.average();
					if (proc > logs) {
						proc = logs;
					}
					logs -= proc;
					processed += proc;
					text += genHeader(d, "PROC");
					text += `Processing ${proc} logs! ${logs > 0 ?
						`(${logs} logs still need processing)` :
						""}\n`;
					validChoice = true;
				break;
				case 5:
					if (!(processed > 0)) {
						break;
					}
					let sold = logSeller.average();
					if (sold > processed) {
						sold = processed;
					}
					processed -= sold;
					totalSold += sold;
					money += sold * logPrice.average();
					text += genHeader(d, "SELL");
					text += `Sold ${sold} logs for $${logPrice.average()}.00 each! ${processed > 0 ?
						`There are still ${processed} unsold logs!` :
						""}\n`;
					text += genHeader(d, "PROF") + `Profitted $${sold * logPrice.average()}.00! ($${money}.00 total)\n`;
					validChoice = true;
				break;
			}
		}
		logPrice.next();
		logSeller.next();
		logProcessor.next();
		logMine.next();

		// Increment the seconds half of the time
		if (((Math.random() * 2)|0) % 1 === 0) {
			d.setSeconds(d.getSeconds() + 40 + (Math.random() * 20)|0);
			if (d.getDate() !== date.getDate()) {
				d.setDate(date.getDate());
			}
		}
	}
	text += genHeader(d, "STOP") + "************************** STOPPING LOGGING **************************\n"
	text += genHeader(d, "FIN") + `Sold ${totalSold} logs for a total of $${money} profit!`;
	return text;
}

function genHeader(time: Date, type: string) {
	return `${
		time.toLocaleString("default", {weekday: "short"})
	} ${
		pad(time.getMonth() + 1)
	}/${
		pad(time.getDate())
	} ${pad(time.getHours()%12||12)}:${pad(time.getMinutes())}:${pad(time.getSeconds())} ${
		type.padEnd(6, " ")
	}: `;
}

function pad(str: string | number) {
	return (str + "").padStart(2, "0");
}

populateAllLogs();

class ScrollingAverage {
	private arr: number[];
	private insertIndex: number;
	private base: number;
	private range: number;

	constructor(len: number, base: number, range: number) {
		if (len <= 0) {
			len = 1;
		}
		this.arr = [];
		this.insertIndex = 0;
		this.base = base;
		this.range = range;
		for (let i of this.arr) {
			this.next();
		}
	}
	private add(num: number) {
		this.arr[this.insertIndex] = num;
		this.incrementIndex();
	}
	public next() {
		this.add(Math.floor(this.base + (Math.random() * this.range * 2) - this.range));
	}
	private incrementIndex() {
		if (this.insertIndex + 1 >= this.arr.length) {
			this.insertIndex = 0;
		} else {
			this.insertIndex++;
		}
	}
	public average(): number {
		let sum = 0;
		for (let element of this.arr) {
			sum += element;
		}
		return this.arr.length !== 0 ? 
			sum / this.arr.length :
			0;
	}
}