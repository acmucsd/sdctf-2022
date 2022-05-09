import { Client, Intents } from "discord.js";
import "dotenv/config";
import * as express from "express";

const app = express();

app.use(express.json());

app.post("/sendMessage", async (req, res) => {
	if (req?.body?.tag && req?.body?.message) {
		let success = await sendMessage(req.body.tag, req.body.message);
		res.end(success + "");
		return;
	}
	res.sendStatus(401);
});

app.post("/userExists", async (req, res) => {
	if (req?.body?.tag) {
		let success = getUserFromTag(req.body.tag) !== null;
		res.end(success + "");
		return;
	}
	res.sendStatus(401);
});

// Begin discord.js stuff

// This client intends to do everything
const client = new Client({intents:[Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS],});

client.on("ready", async ()=>{
    await refreshMembers();
	setInterval(refreshMembers, 10 * 60 * 1000);
});

function getUserFromTag(tag: string) {
	let user = client.users.cache.find(u => u.tag == tag);
	return user ? user : null;
}

async function sendMessage(usertag: string, message: string) {
	let user = getUserFromTag(usertag);
	if (user) {
		if (!user.dmChannel) {
			await user.createDM();
		}
		let success = await user.dmChannel.send(message);
		return !!success;
	} else {
		return false;
	}
}

/**
 * Updates the cache of users
 */
async function refreshMembers() {
	await client.guilds.fetch();
	await Promise.all((client.guilds.cache).map(async g =>
		(await (await g.fetch()).members.fetch())
	));
}

process.on('unhandledRejection', function(err, promise) {
    console.error('THIS IS FINE (promise: ', promise, ', reason: ', err, ').');
});

client.login(process.env.TOKEN);
app.listen(process.env.BOT_PORT)