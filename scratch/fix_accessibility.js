const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace the header WhatsApp nested link
const oldHeaderLink = `            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-10 h-10 sm:w-auto p-0 sm:px-5 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-shadow duration-300 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </motion.div>
            </a>`;

const newHeaderLink = `            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-10 h-10 sm:w-auto p-0 sm:px-5 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-shadow duration-300 shrink-0 cursor-pointer text-sm"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.a>`;

// Normalizing content line endings to make string replacement easy
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldHeader = oldHeaderLink.replace(/\r\n/g, '\n');
const normalizedNewHeader = newHeaderLink.replace(/\r\n/g, '\n');

if (normalizedContent.indexOf(normalizedOldHeader) === -1) {
  console.error("Could not find old header link block!");
} else {
  content = normalizedContent.replace(normalizedOldHeader, normalizedNewHeader);
}

// 2. Replace the mobile overlay WhatsApp nested link
const oldMobileLink = `              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] py-3 text-base">
                  <MessageCircle className="w-5 h-5" />
                  Contactez-nous sur WhatsApp
                </Button>
              </a>`;

const newMobileLink = `              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] py-3 text-base cursor-pointer text-center"
                aria-label="Contacter sur WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous sur WhatsApp
              </a>`;

const normalizedOldMobile = oldMobileLink.replace(/\r\n/g, '\n');
const normalizedNewMobile = newMobileLink.replace(/\r\n/g, '\n');

if (content.indexOf(normalizedOldMobile) === -1) {
  console.error("Could not find old mobile link block!");
} else {
  content = content.replace(normalizedOldMobile, normalizedNewMobile);
}

// Write back with local platform line endings
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully fixed all nested interactive elements for screen reader / accessibility compliance!");
