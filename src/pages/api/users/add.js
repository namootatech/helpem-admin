import clientPromise from "@/util/mongo";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("users");
        const data = req.body;
        const result = await collection.insertOne(data);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        );
        const user = await collection.find({}).toArray();
        res.status(200).json({message: "Subscription added successfully", data: user});
        }
        else {
        res.status(405).json({ message: "Method not allowed" });
        }
       
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: true ,e: e.message });
    }
}