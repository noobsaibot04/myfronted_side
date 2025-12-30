/*************************************************
 * 6-SINF ROBOT YORDAMCHI (SODDA & ISHONCHLI)
 *************************************************/

let lastShownTopicId = null;

// Robot elementlari
const robotMsg = document.getElementById("robotMsg");
const mainText = document.getElementById("mainText");
const welcomeZone = document.getElementById("welcomeZone");

// -----------------------------
// PDF SCROLLNI KUZATISH
// -----------------------------
document.getElementById("pdfWrapper").addEventListener("scroll", () => {
  if (typeof mavzular === "undefined") return;

  const pages = document.querySelectorAll(".pdf-page");
  let currentPage = null;

  pages.forEach(page => {
    const rect = page.getBoundingClientRect();
    if (
      rect.top < window.innerHeight / 2 &&
      rect.bottom > window.innerHeight / 2
    ) {
      currentPage = parseInt(page.dataset.page);
    }
  });

  if (!currentPage) return;

  // 🔍 Mavzu boshlanishini tekshiramiz
  const topic = mavzular.find(m => m.bet === currentPage);

  if (topic && topic.id !== lastShownTopicId) {
    lastShownTopicId = topic.id;
    showNewTopic(topic.nomi);
  }
});

// -----------------------------
// ROBOT XABARI
// -----------------------------
function showNewTopic(topicName) {
  robotMsg.style.display = "block";
  welcomeZone.style.display = "none";
  mainText.style.display = "block";

  mainText.innerHTML = `
    <div style="color:#00f2ff;font-size:15px;">📘 Yangi mavzu boshlandi</div>
    <b style="font-size:16px;">${topicName}</b>
    <div style="font-size:14px;margin-top:4px;">Davom etamiz! 🚀</div>
  `;

  // 6 soniyadan keyin yopiladi
  setTimeout(() => {
    robotMsg.style.display = "none";
  }, 6000);
}
