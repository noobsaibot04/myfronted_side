function openPDF(filename) {
    const backendURL = "https://mybekkend-side-1.onrender.com";
    const pdfURL = `${backendURL}/pdfs/${filename}`;
    window.open(pdfURL, "_blank");
}

