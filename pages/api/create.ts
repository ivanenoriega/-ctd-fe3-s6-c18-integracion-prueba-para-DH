import { NextApiHandler } from "next";
import { students } from "./db";

const handler: NextApiHandler = async (req, res) => {
  // Receive only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Add a new student to the database (db.ts)
  const { nombre, calificaciones, curso } = req.body;

  // Check body content
  if (!nombre || !calificaciones || !curso) {
    return res.status(400).json({
      message: "Bad request. nombre, calificaciones y curso son requeridos.",
    });
  }

  const newStudent = {
    id: (students.length + 1).toString(),
    nombre: nombre,
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
