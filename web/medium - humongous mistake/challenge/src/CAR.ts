// Otherwise known as Create Admin Record (.ts)
import * as mongoose from "mongoose";
import { DATABASE_URL } from "./Config";

const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    password: String,
    discord: String
}));

(async () => {
    await mongoose.connect("mongodb://localhost:27017");
    let admin = await User.findOne({username: "admin"}).exec();
    if (admin) {
        if (admin?.username === "admin" &&
                admin?.password === "unguessable" &&
                admin?.discord === "none") {
            return;
        }
    }
    await (new User({
        username: "admin",
        password: "unguessable",
        discord: "none"
    })).save();
})();