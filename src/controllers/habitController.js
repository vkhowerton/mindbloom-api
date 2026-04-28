import {
  getHabits,
  createHabitService,
  getHabitByIdService,
  updateHabitService,
  deleteHabitService,
} from "../services/habitService.js";

export async function getHabitsHandler(req, res) {
  try {
    const userId = req.user.userId;
    const habits = await getHabits(userId);
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createHabitHandler(req, res) {
  try {
    const userId = req.user.userId;
    const { name, frequency } = req.body;

    const newHabit = await createHabitService(userId, name, frequency);

    res.status(201).json({
      id: newHabit.id,
      name: newHabit.name,
      frequency: newHabit.frequency,
      user_id: newHabit.userId,
    });
  } catch {
    res.status(500).json({ error: "Failed to create habit" });
  }
}

export async function getHabitByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const habit = await getHabitByIdService(id);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.status(200).json({
      id: habit.id,
      name: habit.name,
      frequency: habit.frequency,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateHabitHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    const { name, frequency } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const habit = await getHabitByIdService(id);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await updateHabitService(id, name, frequency);

    res.status(200).json({
      id: updated.id,
      name: updated.name,
      frequency: updated.frequency,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteHabitHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const habit = await getHabitByIdService(id);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const deleted = await deleteHabitService(id);

    res.status(200).json({
      id: deleted.id,
      name: deleted.name,
      frequency: deleted.frequency,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}