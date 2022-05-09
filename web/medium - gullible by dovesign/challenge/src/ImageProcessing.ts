import exifr from "exifr";
import * as Database from "better-sqlite3";
import {resolve} from "path";

const db = new Database(resolve(__dirname, "./challenge.db"), {readonly: true, fileMustExist: true});

export async function parseExif(buf: Buffer) {
	let exif;
	try {
		exif = await exifr.parse(buf, true);
	} catch(e:any) {
		return null;
	}
	if (!exif?.description?.value) {
		return false;
	} else {
		try {
			let docs = db.prepare(`SELECT * FROM birds WHERE species='${exif.description.value}'`).all();
			return docs;
		} catch(e) {
			return "SQLITE ERROR";
		}
	}
}
