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
      PDF Engine
========================== */

watermarkBtn.addEventListener("click", async () => {

    if (!selectedPDF) {

        result.innerHTML = "⚠ Please upload a PDF first.";

        return;

    }

    progressBox.style.display = "block";

    progressBar.style.width = "5%";

    progressText.innerHTML = "Preparing...";

    const bytes = await selectedPDF.arrayBuffer();

    progressBar.style.width = "20%";

    progressText.innerHTML = "Loading PDF...";

    const pdfDoc = await PDFLib.PDFDocument.load(bytes);

    const pages = pdfDoc.getPages();

    progressBar.style.width = "40%";

    progressText.innerHTML = "Adding watermark...";

    const text = document.getElementById("watermarkText").value || "CONFIDENTIAL";

    for (const page of pages) {

        page.drawText(text, {

            x: 150,

            y: 400,

            size: 40,

            opacity: Number(opacity.value) / 100

        });

    }

    progressBar.style.width = "70%";

    progressText.innerHTML = "Saving PDF...";

    const pdfBytes = await pdfDoc.save();

    progressBar.style.width = "90%";

    progressText.innerHTML = "Preparing download...";

    const blob = new Blob([pdfBytes], {

        type: "application/pdf"

    });

    const url = URL.createObjectURL(blob);

    progressBar.style.width = "100%";

    progressText.innerHTML = "Completed successfully.";

    result.innerHTML = `
<a href="${url}" download="watermarked.pdf"
style="
display:inline-block;
margin-top:15px;
padding:12px 20px;
background:#06b6d4;
color:#fff;
text-decoration:none;
border-radius:10px;
font-weight:bold;">
⬇ Download Watermarked PDF
</a>`;

});
const opacity = document.getElementById("opacity");
const opacityValue = document.getElementById("opacityValue");

opacity.addEventListener("change", () => {

    opacityValue.innerHTML = opacity.value + "%";

});
