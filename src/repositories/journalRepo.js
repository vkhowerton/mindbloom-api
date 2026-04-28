import prisma from "../config/db.js";

// Get all journals for a user
export async function findJournalsByUserId(userId) {
  return prisma.journal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }, // newest first (nice touch)
  });
}

// Create journal
export async function createJournal(data) {
  return prisma.journal.create({
    data,
  });
}

// Get one journal
export async function getJournalById(id) {
  return prisma.journal.findUnique({
    where: { id },
  });
}

// Update journal
export async function updateJournal(id, data) {
  return prisma.journal.update({
    where: { id },
    data,
  });
}

// Delete journal
export async function deleteJournal(id) {
  return prisma.journal.delete({
    where: { id },
  });
}