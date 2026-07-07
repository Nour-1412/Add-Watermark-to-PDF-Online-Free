const pdfInput = document.getElementById("pdfInput");
const uploadBtn = document.getElementById("uploadBtn");

const dropZone = document.getElementById("dropZone");

const fileName = document.getElementById("fileName");

const watermarkType = document.getElementById("watermarkType");

const textOptions = document.getElementById("textOptions");

const imageOptions = document.getElementById("imageOptions");
const watermarkImage = document.getElementById("watermarkImage");

const imageSize = document.getElementById("imageSize");

const imagePosition = document.getElementById("imagePosition");
const watermarkBtn = document.getElementById("watermarkBtn");

const progressBox = document.getElementById("progressBox");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const result = document.getElementById("result");
const watermarkStyle = document.getElementById("watermarkStyle");
const watermarkSize = document.getElementById("watermarkSize");
const watermarkColor = document.getElementById("watermarkColor");
const opacity = document.getElementById("opacity");
const opacityValue = document.getElementById("opacityValue");
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
      let imageBytes = null;

if (
    watermarkType.value === "image" &&
    watermarkImage.files.length
) {

    imageBytes =
    await watermarkImage.files[0].arrayBuffer();

}
      let fontSize = 40;

switch (watermarkSize.value) {

    case "small":
        fontSize = 28;
        break;

    case "medium":
        fontSize = 40;
        break;

    case "large":
        fontSize = 60;
        break;

}
const hex = watermarkColor.value;

const r = parseInt(hex.substring(1, 3), 16) / 255;
const g = parseInt(hex.substring(3, 5), 16) / 255;
const b = parseInt(hex.substring(5, 7), 16) / 255;
    for (const page of pages) {

     const { width, height } = page.getSize();
     

let posX = width * 0.15;
let posY = height * 0.45;
let angle = 45;

switch (watermarkStyle.value) {

    case "center":
        posX = width / 2 - 120;
        posY = height / 2;
        angle = 0;
        break;

    case "diagonal":
        posX = width * 0.15;
        posY = height * 0.45;
        angle = 45;
        break;

    case "full":
        posX = width * 0.05;
        posY = height / 2;
        angle = 0;
        fontSize = Math.min(width, height) / 6;
        break;

    case "repeat":
        break;

}     
 // ==========================
// Image Watermark
// ==========================

if (
    watermarkType.value === "image" &&
    imageBytes
) {

    let image;

    try {

        image =
        await pdfDoc.embedPng(imageBytes);

    } catch {

        image =
        await pdfDoc.embedJpg(imageBytes);

    }

    let imgWidth = 120;
    let imgHeight = 120;

    switch (imageSize.value) {

        case "small":
            imgWidth = 80;
            imgHeight = 80;
            break;

        case "medium":
            imgWidth = 120;
            imgHeight = 120;
            break;

        case "large":
            imgWidth = 180;
            imgHeight = 180;
            break;

    }

    let imgX = width / 2 - imgWidth / 2;
    let imgY = height / 2 - imgHeight / 2;

    switch (imagePosition.value) {

        case "top-left":
            imgX = 30;
            imgY = height - imgHeight - 30;
            break;

        case "top-right":
            imgX = width - imgWidth - 30;
            imgY = height - imgHeight - 30;
            break;

        case "bottom-left":
            imgX = 30;
            imgY = 30;
            break;

        case "bottom-right":
            imgX = width - imgWidth - 30;
            imgY = 30;
            break;

        case "center":
            imgX = width / 2 - imgWidth / 2;
            imgY = height / 2 - imgHeight / 2;
            break;

    }

    page.drawImage(image, {

        x: imgX,

        y: imgY,

        width: imgWidth,

        height: imgHeight,

        opacity: Number(opacity.value) / 100

    });

      }   
if (watermarkType.value === "text") {

    page.drawText(text, {

        // نفس الكود الموجود عندك

    });

}

    x: posX,

    y: posY,

    size: fontSize,

    rotate: PDFLib.degrees(angle),

    opacity: Number(opacity.value) / 100,

    color: PDFLib.rgb(r, g, b)

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


opacity.addEventListener("change", () => {

    opacityValue.innerHTML = opacity.value + "%";

});
