import { Schema, model } from "mongoose";
import { NoteDocument } from "../types";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Note = model<NoteDocument>("Note", noteSchema);
export default Note;
