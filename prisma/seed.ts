// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create default categories
  await prisma.feedbackStatus.createMany({
    data: [
      { name: "planned", order: 1, color: "#F49F85" },
      { name: "in-progress", order: 2, color: "#AD1FEA" },
      { name: "live", order: 3, color: "#62BCFA" },
    ],
  });

  // Create default categories
  await prisma.feedbackCategory.createMany({
    data: [
      { name: "ui", order: 1 },
      { name: "ux", order: 2 },
      { name: "enhancement", order: 3 },
      { name: "bug", order: 4 },
      { name: "feature", order: 5 },
      { name: "others", order: 6 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
