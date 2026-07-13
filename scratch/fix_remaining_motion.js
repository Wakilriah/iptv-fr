const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Replace the channel explorer CTA block (line 158-183)
const oldExplorerBlock = `          <div className="text-center mt-12">
            <a href="/chaines">
              <m.div
                className="inline-block"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Button className="bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full px-8 py-5 text-base md:text-lg font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.5)] transition-all gap-2.5 group">
                  <span>Explorer toutes nos chaînes</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </m.div>
            </a>
          </div>`;

const newExplorerBlock = `          <div className="text-center mt-12">
            <a
              href="/chaines"
              className="inline-flex items-center justify-center bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full px-8 py-5 text-base md:text-lg font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.5)] transition-all duration-300 gap-2.5 group cursor-pointer"
              aria-label="Explorer toutes nos chaînes"
            >
              <span>Explorer toutes nos chaînes</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>`;

const normalizedOldExplorer = oldExplorerBlock.replace(/\r\n/g, '\n');
const normalizedNewExplorer = newExplorerBlock.replace(/\r\n/g, '\n');

if (content.indexOf(normalizedOldExplorer) === -1) {
  console.error("Still could not find old explorer block!");
} else {
  content = content.replace(normalizedOldExplorer, normalizedNewExplorer);
}

// Save back with system CRLF
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully replaced explorer motion block in page.tsx!");
