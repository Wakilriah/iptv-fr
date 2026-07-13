const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Remove "use client"
content = content.replace('"use client"\n\n', '');

// 2. Modify imports
content = content.replace(
  `import { useState, useRef, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"`,
  `import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { PricingCTA } from "@/components/PricingCTA"
import { HomeTracker } from "@/components/HomeTracker"`
);

// Remove duplicate Card import
content = content.replace('import { Card, CardContent } from "@/components/ui/card"\n', '');

// Remove OrderModal import
content = content.replace('import { OrderModal } from "@/components/OrderModal"\n', '');

// 3. Remove Home states and hooks
const stateAndHooksBlock = `export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "", duration: "" })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  
  useEffect(() => {
    tiktokPixel.viewHome();
  }, [])

  const openModal = (name: string, price: string, duration: string) => {
    if (name === "Essai Découverte 1H" || price === "0" || name.toLowerCase().includes("essai")) {
      tiktokPixel.clickTestButton();
    } else {
      tiktokPixel.initiateCheckout(name, price);
    }
    setSelectedPlan({ name, price, duration })
    setModalOpen(true)
  }`;

content = content.replace(stateAndHooksBlock, `export default function Home() {`);

// 4. Replace AnimatedHero props in Home return
content = content.replace(
  `<AnimatedHero onOrderClick={() => openModal("Essai Découverte 1H", "Gratuit", "1 heure")} />`,
  `<AnimatedHero />`
);

// 5. Replace header block with <Header />
// We need to replace the entire <header>...</header> and its mobile menu overlay
const headerRegex = /\{{0,2}\/\* Navbar \*\/\}{0,2}\n\s*<header[\s\S]*?<\/AnimatePresence>/;
content = content.replace(headerRegex, `<Header />`);

// 6. Replace Standard and Premium Pricing CTA button blocks
const standardCTABlock = `                  {/* CTA */}
                  <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
                    <Button
                      onClick={() => openModal("IPTV Standard " + plan.name, plan.price + " €", plan.duration)}
                      className={\`w-full font-bold text-base py-6 rounded-xl transition-shadow duration-300 \${
                        plan.highlighted
                          ? "bg-white text-[#7c3aed] hover:bg-gray-100 shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7]"
                          : "bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-[0_0_15px_-5px_#a855f7] hover:shadow-[0_0_25px_-5px_#a855f7]"
                      }\`}
                    >
                      Abonnez-vous
                    </Button>
                  </m.div>`;

const standardReplacement = `                  {/* CTA */}
                  <PricingCTA
                    planName={"IPTV Standard " + plan.name}
                    planPrice={plan.price}
                    planDuration={plan.duration}
                    highlighted={plan.highlighted}
                  />`;

content = content.replace(standardCTABlock, standardReplacement);

const premiumCTABlock = `                  {/* CTA */}
                  <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
                    <Button
                      onClick={() => openModal("IPTV Premium " + plan.name, plan.price + " €", plan.duration)}
                      className={\`w-full font-bold text-base py-6 rounded-xl transition-shadow duration-300 \${
                        plan.highlighted
                          ? "bg-white text-[#7c3aed] hover:bg-gray-100 shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7]"
                          : "bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-[0_0_15px_-5px_#a855f7] hover:shadow-[0_0_25px_-5px_#a855f7]"
                      }\`}
                    >
                      Abonnez-vous
                    </Button>
                  </m.div>`;

const premiumReplacement = `                  {/* CTA */}
                  <PricingCTA
                    planName={"IPTV Premium " + plan.name}
                    planPrice={plan.price}
                    planDuration={plan.duration}
                    highlighted={plan.highlighted}
                  />`;

content = content.replace(premiumCTABlock, premiumReplacement);

// 7. Replace VIP+ CTA button block
const vipCTABlock = `                {/* CTA */}
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button
                    onClick={() => openModal("IPTV VIP+ (12 mois)", "89.99 €", "12 mois")}
                    className="w-full font-black text-lg py-7 rounded-2xl bg-white text-[#b45309] hover:bg-gray-100 shadow-[0_0_40px_-10px_#f59e0b] hover:shadow-[0_0_60px_-10px_#f59e0b] transition-shadow duration-300"
                  >
                    Devenir VIP 🚀
                  </Button>
                </m.div>`;

const vipReplacement = `                {/* CTA */}
                <PricingCTA
                  planName="IPTV VIP+ (12 mois)"
                  planPrice="89.99"
                  planDuration="12 mois"
                  highlighted={true}
                  className="bg-white text-[#b45309] hover:bg-gray-100 shadow-[0_0_40px_-10px_#f59e0b] hover:shadow-[0_0_60px_-10px_#f59e0b]"
                >
                  Devenir VIP 🚀
                </PricingCTA>`;

content = content.replace(vipCTABlock, vipReplacement);

// 8. Replace motion.a in contact section with standard <a> with CSS transitions
const contactWhatsAppBlock = `              {/* WhatsApp */}
              <m.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full flex items-center justify-between bg-[#22c55e] text-white rounded-2xl p-4 cursor-pointer btn-glow-whatsapp"
              >`;

const contactWhatsAppReplacement = `              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between bg-[#22c55e] text-white rounded-2xl p-4 cursor-pointer btn-glow-whatsapp transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >`;

content = content.replace(contactWhatsAppBlock, contactWhatsAppReplacement);

const contactEmailBlock = `              {/* Email */}
              <m.a
                href="mailto:matchcesoir.fr@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full flex items-center justify-between bg-[#3b82f6] text-white rounded-2xl p-4 cursor-pointer btn-glow-email"
              >`;

const contactEmailReplacement = `              {/* Email */}
              <a
                href="mailto:matchcesoir.fr@gmail.com"
                className="group w-full flex items-center justify-between bg-[#3b82f6] text-white rounded-2xl p-4 cursor-pointer btn-glow-email transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >`;

content = content.replace(contactEmailBlock, contactEmailReplacement);

// 9. Remove closing </m.a> tags and replace with </a>
content = content.replace('</m.a>', '</a>');
content = content.replace('</m.a>', '</a>'); // Second instance

// 10. Remove OrderModal render at the bottom of the page
const orderModalRenderBlock = `      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
        planDuration={selectedPlan.duration}
      />`;

content = content.replace(orderModalRenderBlock, `<HomeTracker />`);

fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully refactored page.tsx to be a Next.js Server Component!");
