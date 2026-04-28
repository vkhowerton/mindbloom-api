import {
  findHabitsByUserId,
  createHabit,
  getHabitById,
  updateHabit,
  deleteHabit,
} from "../repositories/habitRepo.js";

// Get all habits for a user
export async function getHabits(userId) {
  return findHabitsByUserId(userId);
}

// Create a new habit
export async function createHabitService(userId, name, frequency) {
  return createHabit({
    name,
    frequency,
    userId,
  });
}

// Get a habit by ID
export async function getHabitByIdService(id) {
  return getHabitById(id);
}

// Update a habit
export async function updateHabitService(id, name, frequency) {
  return updateHabit(id, {
    name,
    frequency,
  });
}

// Delete a habit
export async function deleteHabitService(id) {
  return deleteHabit(id);
}