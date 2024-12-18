const express = require("express");
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers";

const router = express.Router();

router.post("/create", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
router.get("/", getAllNotes);
router.get("/:id", getSingleNote);

export default router;
