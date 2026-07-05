const { PrismaClient } = require("../src/generated/prisma");
const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

const prisma = new PrismaClient();

async function main() {
  const email = "riahwakil@gmail.com";
  const passwordRaw = "wakilmeka.27";
  const hashedPassword = hashPassword(passwordRaw);

  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin user already exists!");
    return;
  }

  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log("Admin user created successfully:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
