import { NextApiHandler } from "next";
import { students } from "./db";

const handler: NextApiHandler = async (req, res) => {
  // Receive only GET requestes
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Return the complete list of students
  res.status(200).json(students);
};

export default handler;
