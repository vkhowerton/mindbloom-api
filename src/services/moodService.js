import {
  findMoodsByUserId,
  createMood,
  getMoodById,
  updateMood,
  deleteMood,
} from "../repositories/moodRepo.js";

export async function getMoods(userId) {
  return findMoodsByUserId(userId);
}

export async function createMoodService(data) {
  return createMood(data);
}

export async function getMoodByIdService(id) {
  return getMoodById(id);
}

export async function updateMoodService(id, data) {
  return updateMood(id, data);
}

export async function deleteMoodService(id) {
  return deleteMood(id);
}