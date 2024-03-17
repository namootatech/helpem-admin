import clientPromise from "@/util/mongo";
import moment from 'moment';

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            console.log("req.method", req.method, "req.query", req.query);
            const client = await clientPromise;
            const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
            const collection = db.collection("transactions");
            
            const startDate = moment(req.query.start).startOf('day').toDate();
            const endDate = moment(req.query.end).endOf('day').toDate();
            
            console.log("Searching for transactions between", startDate, "and", endDate);
            
            // find transactions where the createdDate is between start and end
            const transactions = await collection.find({
                createdDate: { $gte: startDate, $lte: endDate }
            }).toArray();
            
            res.status(200).json({ transactions });
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: e });
    }
}
