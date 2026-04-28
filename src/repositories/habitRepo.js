import prisma from "../config/db.js";

// Get all habits for a user
export async function findHabitsByUserId(userId) {
  return prisma.habit.findMany({
    where: { userId },
  });
}

// Create a new habit
export async function createHabit(data) {
  return prisma.habit.create({
    data,
  });
}

// Get habit by ID
export async function getHabitById(id) {
  return prisma.habit.findUnique({
    where: { id },
  });
}

// Update habit
export async function updateHabit(id, data) {
  return prisma.habit.update({
    where: { id },
    data,
  });
}

// Delete habit
export async function deleteHabit(id) {
  return prisma.habit.delete({
    where: { id },
  });
}