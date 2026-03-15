document.addEventListener("DOMContentLoaded", () => {
    const pdfListElement = document.getElementById("pdf-list-container");
    if (!pdfListElement) return;

    const subject = pdfListElement.getAttribute("data-subject");
    if (!subject || !pdfData[subject]) return;

    const pdfs = pdfData[subject];
    let htmlContent = "";

    // Map subject identifier to actual folder name in the pdfs directory
    const folderMap = {
        pharmacutics: "Pharmacutics",
        physiology: "Physiology",
        biochemistry: "biochemistery",
        organic_chemistry: "organic che"
    };

    const folderName = folderMap[subject] || subject;

    pdfs.forEach(pdf => {
        // Using straightforward relative base paths for PDFs
        const filePath = `../pdfs/${folderName}/${pdf.file}`;
        
        htmlContent += `
        <li class="pdf-item">
            <div class="pdf-info">
                <span class="pdf-icon">📄</span>
                <div class="pdf-details">
                    <h4>${pdf.title}</h4>
                    <p>${pdf.file} • ${pdf.size}</p>
                </div>
            </div>
            <div class="pdf-actions">
                <a href="viewer.html?file=${encodeURIComponent(filePath)}" class="btn-primary">Read</a>
                <a href="${filePath}" download class="btn-outline">Download PDF</a>
            </div>
        </li>
        `;
    });

    // Add the mock empty state item at the end
    htmlContent += `
    <li class="pdf-item" style="justify-content: center; background: var(--bg-main); border: 2px dashed #cbd5e1; box-shadow: none;">
        <p style="margin:0; text-align:center;">More lectures will be uploaded soon. <a href="upload.html" style="color:var(--primary); text-decoration: underline;">Contribute notes</a></p>
    </li>
    `;

    pdfListElement.innerHTML = htmlContent;
});
