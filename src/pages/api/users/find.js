import clientPromise from "@/util/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("users");
        console.log("Serching for user with frstname or lastname or email", req.query);
        // find users where the firstname or lastname or email contains query string
        const users = await collection.find({
            $or: [
                { firstname: { $regex: req.query.query, $options: "i" } },
                { lastname: { $regex: req.query.query, $options: "i" } },
                { email: { $regex: req.query.query, $options: "i" } },
            ],
        }).toArray();
        res.status(200).json({users});
        }
        else {
        res.status(405).json({ message: "Method not allowed" });
        }
       
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: e });
    }
}