import prisma from "../config/db.js";
import {
  getMoods,
  createMoodService,
  getMoodByIdService,
  updateMoodService,
  deleteMoodService,
} from "../services/moodService.js";

export async function getMoodsHandler(req, res) {
  try {
    const userId = req.user.userId;
    const moods = await getMoods(userId);
    res.status(200).json(moods);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createMoodHandler(req, res) {
  try {
    const { mood, note, habitId } = req.body;

    if (!mood) {
      return res.status(400).json({
        errors: ["Mood is required"],
      });
    }

    const newMood = await prisma.moodEntry.create({
      data: {
        mood,
        note,
        date: new Date(),
        habitId,
        userId: req.user.userId,
      },
    });

    return res.status(201).json({
      id: newMood.id,
      mood: newMood.mood,
      note: newMood.note,
      date: newMood.date,
      user_id: newMood.userId,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to create mood entry",
    });
  }
}

export async function getMoodByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const mood = await getMoodByIdService(id);

    if (!mood) {
      return res.status(404).json({ error: "Mood not found" });
    }

    if (mood.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.status(200).json({
      id: mood.id,
      mood: mood.mood,
      note: mood.note,
      date: mood.date,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMoodHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    const { mood, note, habitId } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        errors: ["ID must be a positive integer"],
      });
    }

    const existingMood = await prisma.moodEntry.findUnique({
      where: { id },
    });

    if (!existingMood) {
      return res.status(404).json({
        error: "Mood entry not found",
      });
    }

    if (existingMood.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    const updatedMood = await prisma.moodEntry.update({
      where: { id },
      data: {
        mood,
        note,
        habitId,
        date: new Date(),
      },
    });

    return res.status(200).json({
      id: updatedMood.id,
      mood: updatedMood.mood,
      note: updatedMood.note,
      date: updatedMood.date,
      user_id: updatedMood.userId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update mood entry",
    });
  }
}

export async function deleteMoodHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const mood = await getMoodByIdService(id);

    if (!mood) {
      return res.status(404).json({ error: "Mood not found" });
    }

    if (mood.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const deleted = await deleteMoodService(id);

    res.status(200).json({
      id: deleted.id,
      mood: deleted.mood,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}