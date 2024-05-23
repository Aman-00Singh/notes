import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect_db from "./db/connect_db.js";
import User from "./models/usermodel.js";
import Notes from "./models/notesmodel.js";
import generateTokenandSetCookie from "./utils/generatetoken.js";
import protectRoutes from "./middlewares/protectRoutes.js";
import bcrypt from "bcryptjs";
import { all } from "axios";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//APIS

//signup
app.post("/api/create-account", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname) {
      return res.status(400).json({ message: "Fullname is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      fullname: fullname,
      email: email,
      password: hashpassword,
    });

    if (newuser) {
      generateTokenandSetCookie(newuser._id, res);
      await newuser.save();
      res.status(201).json({
        _id: newuser._id,
        fullname: newuser.fullname,
        email: newuser.email,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in creating account", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isPresent = await User.findOne({ email: email });
    const isPassword = bcrypt.compare(password, isPresent?.password);

    if (!isPresent || !isPassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    //generate cookie
    generateTokenandSetCookie(isPresent._id, res);
    res.status(200).json({
      _id: isPresent._id,
      fullname: isPresent.fullname,
      email: isPresent.email,
    });
  } catch (error) {
    console.log("Error in logging in", error.message);
    return res.status(500).json({ message: "Error" });
  }
});

//add  notes
app.post("/api/notes/add-notes", protectRoutes, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title || !content) {
      return res.status(400).json({ message: "Plz input both the fields" });
    }
    const newNotes = new Notes({
      title: title,
      content: content,
      tags: tags || [],
      userId: user._id,
    });

    if (newNotes) {
      await newNotes.save();
      return res.status(201).json({
        newNotes,
        message: "Note added succesfully",
      });
    }
  } catch (error) {
    console.log("Error in adding notes", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Edit notes
app.put("/api/notes/edit-notes/:noteId", protectRoutes, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  const { title, content, tags, isPinned } = req.body;

  if (!title && !content && !tags) {
    return res.status(400).json({ message: "No changes provided" });
  }

  try {
    const update_notes = await Notes.findOne({
      _id: noteId,
      userId: user._id,
    });
    if (!update_notes) {
      return res.status(400).json({ message: "Note not found" });
    }
    if (title) update_notes.title = title;
    if (content) update_notes.content = content;
    if (tags) update_notes.tags = tags;
    if (isPinned) update_notes.isPinned = isPinned;

    await update_notes.save();
    return res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log("Error in edit notes", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET all notes
app.get("/api/notes/get-all-notes", protectRoutes, async (req, res) => {
  try {
    const { user } = req.user;
    const all_notes = await Notes.find({ userId: user._id });
    if (!all_notes) {
      return res.status(400).json({
        message: "Notes not found",
      });
    }
    return res.status(200).json({
      all_notes,
      message: "All notes retrieved",
    });
  } catch (error) {
    console.log("Error in retrieving all notes", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//DELETE notes
app.delete(
  "/api/notes/delete-notes/:noteId",
  protectRoutes,
  async (req, res) => {
    try {
      const noteId = req.params;
      const { user } = req.user;
      const delete_note = await Notes.findOne({
        _id: noteId,
        userId: user._id,
      });
      if (!delete_note) {
        return res.status(200).json({ message: "Note not found" });
      }

      await Notes.deleteOne({ _id: noteId, userId: user._id });

      return res.status(200).json({
        message: "Note deleted successfully",
      });
    } catch (error) {
      console.log("Error in deleting notes", error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

//ispinned
app.put("/api/note/note-isPinned/:noteId", protectRoutes, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { user } = req.user;
    const { isPinned } = req.body;
    const pinned = await Notes.findOne({ userId: user._id, _id: noteId });
    if (!pinned) {
      return res.status(400).json({ message: "Note not found" });
    }
    if (isPinned) pinned.isPinned = isPinned;
    await pinned.save();
    return res.status(200).json({
      message: "Note pinned",
    });
  } catch (error) {
    console.log("Error in isPinned", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Search Notes
app.get("/api/notes/search-notes", protectRoutes, async (req, res) => {
  try {
    const { user } = req.user;
    const { search } = req.body;
    const search_notes = await Notes.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { content: { $regex: new RegExp(search, "i") } },
      ],
    });
    if (!search_notes) {
      return res.status(400).json({ message: "No notes found" });
    }
    return res.status(200).json({
      search_notes,
      message: "Notes found",
    });
  } catch (error) {
    console.log("Error in searching notes", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/get-user", protectRoutes, async (req, res) => {
  try {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        _id: isUser._id,
        fullname: isUser.fullname,
        email: isUser.email,
      },
    });
  } catch (error) {
    console.log("Error in getting user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  connect_db();
  console.log(`Server is listening to ${PORT}`);
});
