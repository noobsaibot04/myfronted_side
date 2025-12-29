const BACKEND_URL = "https://mybekkend-side-1.onrender.com";

function openPDF(filename) {
    window.open(`${BACKEND_URL}/pdfs/${filename}`, "_blank");
}

