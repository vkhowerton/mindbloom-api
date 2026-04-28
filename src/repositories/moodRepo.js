import prisma from "../config/db.js";

export async function findMoodsByUserId(userId) {
  return prisma.moodEntry.findMany({
    where: { userId },
  });
}

export async function createMood(data) {
  return prisma.moodEntry.create({
    data,
  });
}

export async function getMoodById(id) {
  return prisma.moodEntry.findUnique({
    where: { id },
  });
}

export async function updateMood(id, data) {
  return prisma.moodEntry.update({
    where: { id },
    data,
  });
}

export async function deleteMood(id) {
  return prisma.moodEntry.delete({
    where: { id },
  });
}