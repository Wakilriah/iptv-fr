const { PrismaClient } = require("../src/generated/prisma");
const crypto = require("crypto");

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const email = "riahwakil@gmail.com";
  const passwordRaw = "wakilmeka.27";
  const hashedPassword = hashPassword(passwordRaw);

  console.log("Connecting to database...");
  
  // Upsert the admin user so we create or override the password to ensure it is reset
  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword
    },
    create: {
      email,
      password: hashedPassword
    }
  });

  console.log("Admin user upserted successfully in Neon PostgreSQL database!");
  console.log("Email:", admin.email);
}

main()
  .catch((e) => {
    console.error("Failed to reset admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
