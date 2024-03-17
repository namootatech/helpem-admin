import clientPromise from "@/util/mongo";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("subscriptions");
        const data = req.body;
        const {user, partner, tier} = data;
        if (!user || !partner || !tier) {
            res.status(400).json({ 
                message: 
                `Invalid request: Missing information for ${!user ? "user" : !partner ? "partner" : "tier" }`,
                 data });
            return;
        }
        const subscription = {
            userid: new ObjectId(user._id),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            level: tier.level,
            status: 'active',
            createdDate: new Date(),
            partner: partner,
            subscriptionTier: tier.tier,
            amount: tier.amount,
            parentId: user.parent,
            userType: "existing-user"
          };
        const result = await collection.insertOne(subscription);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        );
        const dbSubscription = await collection.find({"_id": result.insertedId});
        res.status(200).json({message: "Subscription added successfully", data: dbSubscription});
        }
        else {
        res.status(405).json({ message: "Method not allowed" });
        }
       
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: true ,e: e.message });
    }
}