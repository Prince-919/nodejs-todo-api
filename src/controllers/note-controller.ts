import { RequestHandler } from "express";
import { Note } from "../models";
import { IncomingBody, NoteDocument } from "../types";

export const createNote: RequestHandler = async (req, res) => {
  const newNote = new Note<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  await newNote.save();
  res.status(201).json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
};

export const updateNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  const { title, description } = req.body as IncomingBody;

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: "Note not found!" });

  await note.save();

  res.json({ note });
};

export const deleteNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const noteRemoved = await Note.findByIdAndDelete(noteId);
  if (!noteRemoved) return res.json({ error: "Could not remove note!" });
  res.json({ message: "Note removed successfully." });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found" });
  res.json({ note });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({
    notes: notes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        description: note.description,
      };
    }),
  });
};
