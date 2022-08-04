// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../mongodb/lib/conn';
import Email from '../../mongodb/models/Email';

type Data = {
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connect();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB" })
    return;
  }
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({
        message: 'Invalid email address'
      });
      return;
    }
    try {
      const userExist = await Email.findOne({ email: userEmail });

      if (userExist) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const email = await Email.create({ email: userEmail });
      console.log(email);
      res.status(201).json({
        message: 'SignedUp'
      })

    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" })
      return;
    }
  }
}
