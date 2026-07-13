const fs = require('fs');
const path = require('path');

const project2Dir = "C:\\Users\\hp\\Desktop\\projects\\project2";

// 1. Delete .env.local if exists
const envLocalPath = path.join(project2Dir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  fs.unlinkSync(envLocalPath);
  console.log("Successfully deleted .env.local to unlink Vercel deployments.");
} else {
  console.log(".env.local already removed or not present.");
}

// 2. Modify .env to use local placeholders
const envPath = path.join(project2Dir, '.env');
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace live Neon database URL with local PostgreSQL placeholder
  envContent = envContent.replace(
    /DATABASE_URL=".*"/g,
    'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/midia4k_db?schema=public"'
  );
  
  // Clear or placeholder Telegram tokens if any
  envContent = envContent.replace(
    /TELEGRAM_BOT_TOKEN=".*"/g,
    'TELEGRAM_BOT_TOKEN="your_local_telegram_bot_token"'
  );
  envContent = envContent.replace(
    /TELEGRAM_CHAT_ID=".*"/g,
    'TELEGRAM_CHAT_ID="your_local_telegram_chat_id"'
  );

  fs.writeFileSync(envPath, envContent);
  console.log("Successfully updated .env with local database & telegram placeholders.");
} else {
  console.error(".env file not found!");
}
