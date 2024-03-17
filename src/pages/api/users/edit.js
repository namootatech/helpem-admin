import clientPromise from '@/util/mongo';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { omit } from 'ramda';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      console.log('req.method', req.method, 'req.query', req.query);
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('users');
      const data = req.body;
      const userId = data._id;
      const update = { $set: omit(['_id'], data) };
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        update
      );
      const users = await collection.find({}).toArray();
      res
        .status(200)
        .json({ message: 'User updated successfully', data: users });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res
      .status(405)
      .json({ message: 'Something went wrong', error: true, e: e.message });
  }
}
