const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetBlock = `    try {
      // Save to database via API
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          planName: planName,
          planPrice: planPrice,
        }),
      })
    } catch (err) {
      console.error("Failed to save order to database:", err)
    }

    setLoading(false)
    setSubmitted(true)

    // Build WhatsApp message
    const message = encodeURIComponent(
      \`Bonjour,\\n\\n\` +
      \`Je souhaite commander un abonnement IPTV.\\n\\n\` +
      \`📦 Abonnement choisi : \${planName}\\n\\n\` +
      \`💶 Prix : \${planPrice}\\n\\n\` +
      \`⏳ Durée : \${planDuration}\\n\\n\` +
      \`Merci.\`
    )

    // tracking
    if (planPrice.includes("Gratuit") || planName.toLowerCase().includes("essai")) {
      tiktokPixel.startTrial()
    } else {
      const numericPrice = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0
      tiktokPixel.completePayment(planName, numericPrice.toString())
    }

    setTimeout(() => {
      window.location.href = \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${message}\`
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 2000)`;

const replacementBlock = `    // Start database save in background (non-blocking)
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        planName: planName,
        planPrice: planPrice,
      }),
    }).catch((err) => console.error("Failed to save order to database:", err))

    // Set submitted state immediately to show the success confirmation modal
    setLoading(false)
    setSubmitted(true)

    // Build WhatsApp message
    const message = encodeURIComponent(
      \`Bonjour,\\n\\n\` +
      \`Je souhaite commander un abonnement IPTV.\\n\\n\` +
      \`📦 Abonnement choisi : \${planName}\\n\\n\` +
      \`💶 Prix : \${planPrice}\\n\\n\` +
      \`⏳ Durée : \${planDuration}\\n\\n\` +
      \`Merci.\`
    )

    // tracking
    if (planPrice.includes("Gratuit") || planName.toLowerCase().includes("essai")) {
      tiktokPixel.startTrial()
    } else {
      const numericPrice = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0
      tiktokPixel.completePayment(planName, numericPrice.toString())
    }

    // Trigger WhatsApp redirect immediately after success confirmation shows up (600ms delay)
    setTimeout(() => {
      window.location.href = \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${message}\`
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 600)`;

content = content.replace(targetBlock, replacementBlock);
fs.writeFileSync(file, content);
console.log('Successfully optimized WhatsApp redirect flow for instant non-blocking execution');
