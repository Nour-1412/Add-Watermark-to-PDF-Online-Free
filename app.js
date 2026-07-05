const pdfInput = document.getElementById("pdfInput");
const uploadBtn = document.getElementById("uploadBtn");

const dropZone = document.getElementById("dropZone");

const fileName = document.getElementById("fileName");

const watermarkType = document.getElementById("watermarkType");

const textOptions = document.getElementById("textOptions");

const imageOptions = document.getElementById("imageOptions");

const watermarkBtn = document.getElementById("watermarkBtn");

const progressBox = document.getElementById("progressBox");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const result = document.getElementById("result");

let selectedPDF = null;

/* ==========================
      Upload Button
========================== */

uploadBtn.addEventListener("click", () => {

    pdfInput.click();

});

/* ==========================
      File Upload
========================== */

pdfInput.addEventListener("change", (e) => {

    if (!e.target.files.length) return;

    loadPDF(e.target.files[0]);

});

/* ==========================
      Load PDF
========================== */

function loadPDF(file){

    if(file.type !== "application/pdf"){

        result.innerHTML =
        "⚠ Please select a valid PDF file.";

        return;

    }

    selectedPDF = file;

    fileName.innerHTML =
    "📄 " + file.name;

    result.innerHTML =
    "✅ PDF loaded successfully.";

}
