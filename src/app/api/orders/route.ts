import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendTelegramNotification(order: any, orderCount: number) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === "YOUR_TELEGRAM_BOT_TOKEN" || chatId === "YOUR_TELEGRAM_CHAT_ID") {
    console.log("Telegram notification skipped: Token or Chat ID not configured.");
    return;
  }

  const isTest = parseFloat(order.planPrice) === 0 || order.planName.toLowerCase().includes("test");
  const priceDisplay = isTest ? "Offert (Test 1H)" : `${order.planPrice}€`;

  const escapeHtml = (unsafe: string) => {
    if (!unsafe) return "";
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const text = 
    `🔔 <b>Nouvelle commande sur Match Ce Soir FR !</b>\n\n` +
    `🔢 <b>Commande N°</b> : ${orderCount}\n` +
    `📦 <b>Forfait</b> : ${escapeHtml(order.planName)}\n` +
    `💰 <b>Prix</b> : ${escapeHtml(priceDisplay)}\n` +
    `👤 <b>Nom complet</b> : ${escapeHtml(order.fullname)}\n` +
    `📧 <b>Email</b> : ${escapeHtml(order.email)}\n` +
    `📱 <b>Téléphone</b> : ${escapeHtml(order.phone)}\n` +
    `📅 <b>Date</b> : ${new Date(order.createdAt).toLocaleString("fr-FR")}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Telegram sendMessage failed. Status: ${res.status}, Response: ${errorText}`);
    } else {
      console.log(`Telegram notification successfully sent for order #${orderCount}`);
    }
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
  }
}

export async function POST(request: Request) {
  try {
    const { fullname, email, phone, planName, planPrice } = await request.json();

    if (!fullname || !email || !phone || !planName || planPrice === undefined) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        fullname,
        email,
        phone,
        planName,
        planPrice: String(planPrice),
        status: "PENDING",
      },
    });

    // Get order number/count
    const orderCount = await prisma.order.count();

    // Trigger Telegram notification and await it to prevent Vercel serverless freeze
    await sendTelegramNotification(order, orderCount);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
