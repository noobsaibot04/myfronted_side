// Backend manzili
const BACKEND_URL = "https://mybekkend-side-1.onrender.com";

// PDF ochish funksiyasi
function openPDF(filename) {
    const fullUrl = BACKEND_URL + "/pdfs/" + filename;
    window.open(fullUrl, "_blank");
}

