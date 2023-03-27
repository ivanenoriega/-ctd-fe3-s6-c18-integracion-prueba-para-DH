import { NextApiHandler } from "next";
import { students } from "./db";

const handler: NextApiHandler = async (req, res) => {
  // Receive only POST requestes
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Add a new student to the database (db.ts)
  const { name, calificaciones, curso } = req.body;
  const newStudent = {
    id: (students.length + 1).toString(),
    nombre: name,
    curso: curso,
    calificaciones: {
      PrimerCuatr: calificaciones.PrimerCuatr,
      SegundoCuatr: calificaciones.SegundoCuatr,
    },
  };
  students.push(newStudent);
  res.status(200).json(newStudent);
};

export default handler;
