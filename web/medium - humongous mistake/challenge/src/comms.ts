import * as phin from "phin";
import { DISCORD_ENDPOINT } from "./Config";

export async function dmUser(tag: string, msg: string): Promise<boolean> {
	let res = await phin({url: DISCORD_ENDPOINT + "sendMessage", data: {
		tag: tag,
		message: msg
	}, method: "POST"});
	return res.body.toString() !== "false";
}
export async function checkUserExists(tag: string): Promise<boolean> {
	let res = await phin({url: DISCORD_ENDPOINT + "userExists", data: {
		tag: tag
	}, method: "POST"});
	return res.body.toString() !== "false";
}