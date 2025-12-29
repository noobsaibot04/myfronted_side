function openPDF(filename) {
    const backendURL = "https://mybekkend-side-1.onrender.com";
    const url = `${backendURL}/pdfs/${filename}`;
    window.open(url, "_blank");
}
