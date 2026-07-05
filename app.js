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
/* ==========================
      Drag & Drop
========================== */

dropZone.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropZone.classList.add("dragover");

});

dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("dragover");

});

dropZone.addEventListener("drop", (e) => {

    e.preventDefault();

    dropZone.classList.remove("dragover");

    if (!e.dataTransfer.files.length) return;

    loadPDF(e.dataTransfer.files[0]);

});

/* ==========================
      Watermark Type
========================== */

watermarkType.addEventListener("change", () => {

    if (watermarkType.value === "text") {

        textOptions.style.display = "block";

        imageOptions.style.display = "none";

    } else {

        textOptions.style.display = "none";

        imageOptions.style.display = "block";

    }

});

/* ==========================
      Add Watermark Button
========================== */

watermarkBtn.addEventListener("click", () => {

    if (!selectedPDF) {

        result.innerHTML =
        "⚠ Please upload a PDF first.";

        return;

    }

    progressBox.style.display = "block";

    progressBar.style.width = "10%";

    progressText.innerHTML =
    "Preparing PDF...";

});
