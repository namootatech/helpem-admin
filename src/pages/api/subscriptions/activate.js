import clientPromise from '@/util/mongo'
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      console.log('req.method', req.method, 'req.query', req.query);
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('subscriptions');
      const subscriptionId = req.query.id;
      const update = { $set: { status: 'active' } };
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(subscriptionId)},
        update
      );
      const allSubscriptions = await collection.find().toArray();
      res
        .status(200)
        .json({
          message: 'Subscription suspended successfully',
          data: { subscriptions: allSubscriptions, result: result.value },
        });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
