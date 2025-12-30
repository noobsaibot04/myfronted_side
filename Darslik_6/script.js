/***********************
 * ASOSIY SOZLAMALAR
 ***********************/
const pdfUrl = 'https://mybekkend-side-1.onrender.com/pdfs/6-sinf.pdf';
const MUNDARIJA_BETLARI = 0;

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const pdfWrapper = document.getElementById('pdfWrapper');
const topicsList = document.getElementById('topicsList');
const menuToggle = document.getElementById('menuToggle');
const topicsSidebar = document.getElementById('topicsSidebar');
const overlay = document.getElementById('overlay');


/***********************
 * MENU BOSHQARUVI
 ***********************/
function openMenu() {
  topicsSidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeMenu() {
  topicsSidebar.classList.remove('open');
  overlay.classList.remove('show');
}

menuToggle.onclick = () => {
  topicsSidebar.classList.contains('open') ? closeMenu() : openMenu();
};

overlay.onclick = closeMenu;


/***********************
 * PDF YUKLASH
 ***********************/
async function loadPDF() {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    await renderPage(pdf, i);
  }
}

async function renderPage(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });

  const scale =
    window.innerWidth < 768
      ? (window.innerWidth - 30) / baseViewport.width
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
}

loadPDF();


/***********************
 * MUNDARIJA (BOBLAR)
 ***********************/
const mavzular = [
  { nomi: "TABIATNI O'RGANISH", bet: 6, tugashBet: 14 },
  { nomi: "MODDA VA UNING XOSSALARI", bet: 15, tugashBet: 36 },
  { nomi: "TIRIK ORGANIZMLARNING XILMAXILLIGI", bet: 37, tugashBet: 46 },
  { nomi: "TIRIK ORGANIZMLARNING TUZILISHI", bet: 47, tugashBet: 66 },
  { nomi: "EKOLOGIYA VA BARQAROR RIVOJLANISH", bet: 67, tugashBet: 79 },
  { nomi: "QUYOSH SISTEMASI VA KOINOT", bet: 80, tugashBet: 90 },
  { nomi: "GEOGRAFIK XARITALAR", bet: 91, tugashBet: 103 },
  { nomi: "YER QOBIQLARI", bet: 104, tugashBet: 120 },
  { nomi: "MENING VATANIM", bet: 121, tugashBet: 131 },
  { nomi: "HARAKAT VA KUCH", bet: 132, tugashBet: 156 },
  { nomi: "ENERGIYA", bet: 157, tugashBet: 175 },
  { nomi: "ELEKTR VA MAGNIT HODISALAR", bet: 176, tugashBet: 190 }
];

mavzular.forEach((mavzu, index) => {
  const div = document.createElement('div');
  div.className = 'topic';
  div.textContent = `${index + 1}. ${mavzu.nomi}`;

  div.onclick = () => {
    document.querySelectorAll('.pdf-page').forEach(page => {
      const p = parseInt(page.dataset.page);
      if (
        p >= mavzu.bet + MUNDARIJA_BETLARI &&
        p <= mavzu.tugashBet + MUNDARIJA_BETLARI
      ) {
        page.style.display = 'block';
      } else {
        page.style.display = 'none';
      }
    });

    const firstPage = document.querySelector(
      `.pdf-page[data-page='${mavzu.bet + MUNDARIJA_BETLARI}']`
    );
    if (firstPage) {
      firstPage.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.innerWidth < 768) closeMenu();
  };

  topicsList.appendChild(div);
});
