import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      mood_entries,
      journals,
      habits,
      users
    RESTART IDENTITY CASCADE;
  `);

  console.log("Tables truncated and IDs reset.");

  const passwordHash = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "victoria@test.com",
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "ethan@test.com",
      password: passwordHash,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "anna@test.com",
      password: passwordHash,
    },
  });

  const habit1 = await prisma.habit.create({
    data: {
      name: "Drink water",
      frequency: "daily",
      userId: user1.id,
    },
  });

  const habit2 = await prisma.habit.create({
    data: {
      name: "Read",
      frequency: "daily",
      userId: user2.id,
    },
  });

  await prisma.moodEntry.create({
    data: {
      mood: "happy",
      note: "Great day",
      date: new Date(),
      userId: user1.id,
      habitId: habit1.id,
    },
  });

  await prisma.moodEntry.create({
    data: {
      mood: "neutral",
      note: "Okay day",
      date: new Date(),
      userId: user2.id,
      habitId: habit2.id,
    },
  });

  await prisma.journal.create({
    data: {
      title: "Good Day",
      content: "I felt productive",
      userId: user1.id,
    },
  });

  await prisma.journal.create({
    data: {
      title: "Chill Day",
      content: "Relaxed and rested",
      userId: user2.id,
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });