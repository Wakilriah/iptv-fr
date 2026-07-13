const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find start of try block
const tryIndex = content.indexOf('try {');
if (tryIndex === -1) {
  console.error('Could not find try block!');
  process.exit(1);
}

// Find index of `const message = encodeURIComponent(`
const messageIndex = content.indexOf('const message = encodeURIComponent(');
if (messageIndex === -1) {
  console.error('Could not find message block!');
  process.exit(1);
}

// We want to replace from `try {` up to `const message =`
const beforeBlock = content.substring(0, tryIndex);
const middleBlock = content.substring(messageIndex);

const newFetchBlock = `// Start database save in background (non-blocking)
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

    // Set submitted state immediately to show success confirmation modal
    setLoading(false)
    setSubmitted(true)

    `;

let step2Content = beforeBlock + newFetchBlock + middleBlock;

// Now let's find the setTimeout block at the end of the submit handler
const timeoutIndex = step2Content.indexOf('setTimeout(() => {');
if (timeoutIndex === -1) {
  console.error('Could not find setTimeout block!');
  process.exit(1);
}

// Find the end of the handleSubmit function (which ends with `}, 2000)\n  }`)
const closingTimeoutIndex = step2Content.indexOf('}, 2000)', timeoutIndex);
if (closingTimeoutIndex === -1) {
  console.error('Could not find closing timeout index!');
  process.exit(1);
}

const beforeTimeout = step2Content.substring(0, timeoutIndex);
const afterTimeout = step2Content.substring(closingTimeoutIndex + '}, 2000)'.length);

const newTimeoutBlock = `setTimeout(() => {
      window.location.href = \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${message}\`
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 600)`;

const finalContent = beforeTimeout + newTimeoutBlock + afterTimeout;

fs.writeFileSync(file, finalContent);
console.log('Successfully optimized WhatsApp redirect flow via index split');
