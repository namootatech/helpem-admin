import clientPromise from "@/util/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("admins");
        let { email, password } = req.body;
        const user = await collection
            .find({ email: email })
            .toArray();
        console.log("user", user);
        if (user.length === 0) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const match = await bcrypt.compare(password, user[0].hash);
        if (!match) {
            res.status(401).json({ message: "Password is incorrect" });
            return;
        }
        const data = {
            ...user[0],
            password: undefined,
            hash: undefined,
        };
        console.log("data", data)
        res.status(200).json(data);
        } else {
        res.status(405).json({ message: "Method not allowed" });
        }
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: true, e });
    }
}