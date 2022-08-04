import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../mongodb/lib/conn";
import Comment from "../../../mongodb/models/Comment";
import type CommentType from "../../../types/comment";

type Data = {
  name?: string;
  message?: string;
  comment?: CommentType;
  comments?: CommentType[];
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const eventId = JSON.stringify(req.query.eventId);
  try {
    await connect();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB" })
    return;
  }
  if (req.method === "GET") {
    let fetchedComments;
    try {
      fetchedComments = await Comment.find().sort({ id: -1 });
    } catch (error) {
      res.status(500).json({ message: "Fetching data failed!" })
      return;
    }
    res.status(200).json({
      comments: fetchedComments
    })
  }
  if (req.method === "POST") {
    const { email, name, text }: { email: string, name: string, text: string } = req.body;

    if (!email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === '') {
      res.status(422).json({
        message: "Invalid input"
      })
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId: JSON.parse(eventId)
    }
    let createdComment;
    try {
      createdComment = await Comment.create(newComment);
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" })
      return;
    }
    res.status(201).json({
      message: "Added Comment.",
      comment: createdComment
    })
  }
}

export default handler;