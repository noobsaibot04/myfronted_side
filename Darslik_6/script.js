/*************************************************
 * 6-sinf PDF sozlamalari
 *************************************************/
const pdfUrl = 'https://mybekkend-side-1.onrender.com/pdfs/6-sinf.pdf';

// Agar PDF boshida muqova / kirish sahifalari bo‘lsa
const MUNDARIJA_BETLARI = 0;

// pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/*************************************************
 * DOM elementlar
 *************************************************/
const pdfWrapper = document.getElementById('pdfWrapper');
const topicsList = document.getElementById('topicsList');
const menuToggle = document.getElementById('menuToggle');
const topicsSidebar = document.getElementById('topicsSidebar');
const overlay = document.getElementById('overlay');

/*************************************************
 * PDF yuklash
 *************************************************/
let pdfDoc = null;
let renderedPages = new Set();

async function loadPDF() {
  try {
    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;

    // Dastlab faqat 5 bet yuklaymiz (tez ochilishi uchun)
    const firstLoad = Math.min(5, pdfDoc.numPages);
    for (let i = 1; i <= firstLoad; i++) {
      await renderPage(i);
    }

  } catch (err) {
    console.error("PDF yuklashda xatolik:", err);
  }
}

async function renderPage(pageNumber) {
  if (renderedPages.has(pageNumber)) return;

  const page = await pdfDoc.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });

  const scale =
    window.innerWidth < 768
      ? (window.innerWidth - 32) / baseViewport.width
      : 1.4;

  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.className = 'pdf-page';
  canvas.dataset.page = pageNumber;
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  pdfWrapper.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;

  renderedPages.add(pageNumber);
}

/*************************************************
 * Mundarija (6-sinf)
 *************************************************/
const mavzular = [
  { nomi: "TABIATNI O'RGANISH", bet: 6 },
  { nomi: "MODDA VA UNING XOSSALARI", bet: 15 },
  { nomi: "TIRIK ORGANIZMLARNING XILMAXILLIGI", bet: 37 },
  { nomi: "TIRIK ORGANIZMLARNING TUZILISHI", bet: 47 },
  { nomi: "EKOLOGIYA VA BARQAROR RIVOJLANISH", bet: 67 },
  { nomi: "QUYOSH SISTEMASI VA KOINOT", bet: 80 },
  { nomi: "GEOGRAFIK XARITALAR", bet: 91 },
  { nomi: "YER QOBIQLARI", bet: 104 },
  { nomi: "MENING VATANIM", bet: 121 },
  { nomi: "HARAKAT VA KUCH", bet: 132 },
  { nomi: "ENERGIYA", bet: 157 },
  { nomi: "ELEKTR VA MAGNIT HODISALAR", bet: 176 },
];

mavzular.forEach((mavzu, index) => {
  const div = document.createElement('div');
  div.className = 'topic';
  div.textContent = `${index + 1}. ${mavzu.nomi}`;

  div.onclick = async () => {
    const pageNum = mavzu.bet + MUNDARIJA_BETLARI;

    // Agar sahifa hali yuklanmagan bo‘lsa — yuklaymiz
    await renderPage(pageNum);

    const target = document.querySelector(
      `.pdf-page[data-page='${pageNum}']`
    );

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.innerWidth < 768) closeMenu();
  };

  topicsList.appendChild(div);
});

/*************************************************
 * Mobil menyu
 *************************************************/
function openMenu() {
  topicsSidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeMenu() {
  topicsSidebar.classList.remove('open');
  overlay.classList.remove('show');
}

menuToggle?.addEventListener('click', openMenu);
overlay?.addEventListener('click', closeMenu);

/*************************************************
 * Ishga tushirish
 *************************************************/
loadPDF();
