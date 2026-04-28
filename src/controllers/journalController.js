import {
  getJournals,
  createJournalService,
  getJournalByIdService,
  updateJournalService,
  deleteJournalService,
} from "../services/journalService.js";

export async function getJournalsHandler(req, res) {
  try {
    const userId = req.user.userId;
    const journals = await getJournals(userId);
    res.status(200).json(journals);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createJournalHandler(req, res) {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;

    const newJournal = await createJournalService(userId, title, content);

    res.status(201).json({
      id: newJournal.id,
      title: newJournal.title,
      content: newJournal.content,
      user_id: newJournal.userId,
    });
  } catch {
    res.status(500).json({ error: "Failed to create journal" });
  }
}

export async function getJournalByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const journal = await getJournalByIdService(id);

    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    if (journal.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.status(200).json({
      id: journal.id,
      title: journal.title,
      content: journal.content,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateJournalHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;
    const { title, content } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const existing = await getJournalByIdService(id);

    if (!existing) {
      return res.status(404).json({ error: "Journal not found" });
    }

    if (existing.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await updateJournalService(id, title, content);

    res.status(200).json({
      id: updated.id,
      title: updated.title,
      content: updated.content,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteJournalHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ errors: ["ID must be a positive integer"] });
    }

    const journal = await getJournalByIdService(id);

    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    if (journal.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const deleted = await deleteJournalService(id);

    res.status(200).json({
      id: deleted.id,
      title: deleted.title,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}