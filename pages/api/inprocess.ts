import { NextApiHandler } from "next";
import { students } from "./db";

const handler: NextApiHandler = async (req, res) => {
  // Receive only GET requestes
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Return the complete list of students wich are in process (califications lower than 6)
  const inProcess = students.filter((student) => {
    return (
      parseInt(student.calificaciones.PrimerCuatr) < 6 ||
      parseInt(student.calificaciones.SegundoCuatr) < 6
    );
  });
  res.status(200).json(inProcess);
};

export default handler;
