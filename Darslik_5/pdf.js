
// Backend manzili (Render)
const BACKEND_URL = "https://mybekkend-side-1.onrender.com";

// PDF ochish funksiyasi
function openPDF(filename) {
    const pdfUrl = `${BACKEND_URL}/pdfs/${filename}`;
    window.open(pdfUrl, "_blank");
}

