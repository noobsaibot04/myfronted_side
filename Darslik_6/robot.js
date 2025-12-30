/* =========================================
   6-SINF ROBOT — FAQAT KUZATUVCHI
   Mundarija, dizayn, bob ochilishiga TEGMAYDI
========================================= */

/* ---------- 1. BOBLAR RO‘YXATI ---------- */
const BOBLAR = [
  { id: 1, nomi: "1-bob", start: 6 },
  { id: 2, nomi: "2-bob", start: 15 },
  { id: 3, nomi: "3-bob", start: 37 },
  { id: 4, nomi: "4-bob", start: 47 },
  { id: 5, nomi: "5-bob", start: 67 },
  { id: 6, nomi: "6-bob", start: 80 },
  { id: 7, nomi: "7-bob", start: 92 },
  { id: 8, nomi: "8-bob", start: 104 },
  { id: 9, nomi: "9-bob", start: 121 },
  { id: 10, nomi: "10-bob", start: 132 },
  { id: 11, nomi: "11-bob", start: 157 },
  { id: 12, nomi: "12-bob", start: 176 }
];

/* ---------- 2. HOLAT O‘ZGARUVCHILAR ---------- */
let lastBobId = null;
let hideTimer = null;

/* ---------- 3. BETNI ANIQLASH ---------- */
function getCurrentPage() {
  const pages = document.querySelectorAll(".pdf-page");
  let current = null;

  pages.forEach(p => {
    const r = p.getBoundingClientRect();
    if (r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2) {
      current = Number(p.dataset.page);
    }
  });

  return current;
}

/* ---------- 4. ROBOT XABARI ---------- */
function showRobotMessage(text) {
  const robotMsg = document.getElementById("robotMsg");
  const mainText = document.getElementById("mainText");

  if (!robotMsg || !mainText) return;

  robotMsg.style.display = "block";
  mainText.innerHTML = text;

  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    robotMsg.style.display = "none";
  }, 6000);
}

/* ---------- 5. ASOSIY KUZATUV ---------- */
const pdfWrapper = document.getElementById("pdfWrapper");

if (pdfWrapper) {
  pdfWrapper.addEventListener("scroll", () => {
    const page = getCurrentPage();
    if (!page) return;

    const bob = BOBLAR.find(b => b.start === page);
    if (!bob) return;

    if (lastBobId !== bob.id) {
      lastBobId = bob.id;
      showRobotMessage(
        `🎉 <b>${bob.id}-bob boshlandi!</b><br>
         Omad tilayman, davom eting 🚀`
      );
    }
  });
}

/* ---------- 6. XAVFSIZLIK ---------- */
// Bu kod hech qachon:
// - click
// - toggle
// - classList
// - display (mundarija)
// ga tegmaydi
