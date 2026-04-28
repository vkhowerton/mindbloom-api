import prisma from "../config/db.js";

export async function createUser(data) {
  return prisma.user.create({
    data,
    select: { id: true, email: true, createdAt: true },
  });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}