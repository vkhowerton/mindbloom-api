import {
  findJournalsByUserId,
  createJournal,
  getJournalById,
  updateJournal,
  deleteJournal,
} from "../repositories/journalRepo.js";

export async function getJournals(userId) {
  return findJournalsByUserId(userId);
}

export async function createJournalService(userId, title, content) {
  return createJournal({
    title,
    content,
    userId,
  });
}

export async function getJournalByIdService(id) {
  return getJournalById(id);
}

export async function updateJournalService(id, title, content) {
  return updateJournal(id, { title, content });
}

export async function deleteJournalService(id) {
  return deleteJournal(id);
}