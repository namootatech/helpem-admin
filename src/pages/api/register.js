import clientPromise from "@/util/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("admins");
        let data = req.body;
        const hash = await bcrypt.hash(data.password, 10);
        data = {
            ...data,
            password: hash,
            joinDate: new Date(),
        };
        const result = await collection.insertOne(data);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        );
        res.status(200).json({message: "User registered successfully", data: result});
        } else {
        res.status(405).json({ message: "Method not allowed" });
        }
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: e });
    }
}