/* ==========================================
   WEBBAG PDF WATERMARK STATE
========================================== */

const appState = {

    /* -------------------------
       PDF
    ------------------------- */

    pdfFile: null,

    pdfName: "",

    pdfSize: 0,

    totalPages: 0,


    /* -------------------------
       Watermark Type
    ------------------------- */

    watermarkType: "text",


    /* -------------------------
       Text Watermark
    ------------------------- */

    text: "",

    fontFamily: "Arial",

    fontSize: 36,

    fontColor: "#999999",

    opacity: 35,

    rotation: -45,

    fontWeight: "normal",

    italic: false,

    underline: false,

    letterSpacing: 0,

    lineHeight: 1.2,

    alignment: "center",


    /* -------------------------
       Image Watermark
    ------------------------- */

    imageFile: null,

    imageScale: 100,

    imageOpacity: 35,

    imageRotation: -45,

    flipHorizontal: false,

    flipVertical: false,


    /* -------------------------
       Position
    ------------------------- */

    position: "center",

    customX: 50,

    customY: 50,

    horizontalMargin: 20,

    verticalMargin: 20,

    repeatSpacingX: 120,

    repeatSpacingY: 120,


    /* -------------------------
       Pages
    ------------------------- */

    pageMode: "all",

    customPages: "",

    excludedPages: "",


    /* -------------------------
       Preview
    ------------------------- */

    currentPreviewPage: 1,

    zoomLevel: 100,


    /* -------------------------
       Export
    ------------------------- */

    outputFileName: "watermarked-document.pdf",

    outputQuality: "original",

    flattenWatermark: true,

    compressOutput: false,


    /* -------------------------
       UI
    ------------------------- */

    currentStep: 1,

    darkMode: false

};
/* ==========================================
   WIZARD NAVIGATION
========================================== */

const sections = document.querySelectorAll(".tool-section");
const steps = document.querySelectorAll(".step");


function goToStep(stepNumber) {

    appState.currentStep = stepNumber;

    updateSections();

    updateWizardSteps();

}


function updateSections() {

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    switch(appState.currentStep) {

        case 1:
            document
                .getElementById("upload-section")
                .classList
                .add("active-section");
            break;

        case 2:
            document
                .getElementById("watermark-section")
                .classList
                .add("active-section");
            break;

        case 3:
            document
                .getElementById("preview-section")
                .classList
                .add("active-section");
            break;

        case 4:
            document
                .getElementById("export-section")
                .classList
                .add("active-section");
            break;
    }

}


function updateWizardSteps() {

    steps.forEach((step, index) => {

        step.classList.remove("active");

        if(index + 1 <= appState.currentStep) {

            step.classList.add("active");

        }

    });

      }
/* ==========================================
   NAVIGATION BUTTONS
========================================== */

document
    .getElementById("go-to-watermark-btn")
    ?.addEventListener("click", () => {

        goToStep(2);

});


document
    .getElementById("continue-to-preview-btn")
    ?.addEventListener("click", () => {

        goToStep(3);

});


document
    .getElementById("continue-to-export-btn")
    ?.addEventListener("click", () => {

        goToStep(4);

});


document
    .getElementById("back-to-upload-btn")
    ?.addEventListener("click", () => {

        goToStep(1);

});


document
    .getElementById("back-to-settings-btn")
    ?.addEventListener("click", () => {

        goToStep(2);

});


document
    .getElementById("back-to-preview-btn")
    ?.addEventListener("click", () => {

        goToStep(3);

});
const pdfInput = document.getElementById("pdf-input");
const chooseFileBtn = document.getElementById("choose-file-btn");
const dropZone = document.getElementById("drop-zone");

const fileInfo = document.getElementById("file-info");

const fileNameElement = document.getElementById("file-name");
const fileSizeElement = document.getElementById("file-size");
const pageCountElement = document.getElementById("page-count");

const uploadError = document.getElementById("upload-error");
chooseFileBtn.addEventListener("click", () => {

    pdfInput.click();

});
pdfInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if(file){

        await loadPDF(file);

    }

});
dropZone.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropZone.classList.add("drag-active");

});


dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("drag-active");

});


dropZone.addEventListener("drop", async (event) => {

    event.preventDefault();

    dropZone.classList.remove("drag-active");

    const file = event.dataTransfer.files[0];

    if(file){

        await loadPDF(file);

    }

});
async function loadPDF(file){

    if(file.type !== "application/pdf"){

        showError(
            "Please upload a valid PDF file."
        );

        return;
    }

    hideError();

    appState.pdfFile = file;

    appState.pdfName = file.name;

    appState.pdfSize = file.size;

    await extractPDFInformation(file);

    updateFileCard();

              }
async function extractPDFInformation(file){

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument(
        arrayBuffer
    ).promise;

    appState.totalPages = pdf.numPages;

}
function updateFileCard(){

    fileNameElement.textContent =
        appState.pdfName;

    fileSizeElement.textContent =
        formatFileSize(
            appState.pdfSize
        );

    pageCountElement.textContent =
        `${appState.totalPages} Pages`;

    fileInfo.classList.remove("hidden");

    document
        .getElementById(
            "go-to-watermark-btn"
        )
        .disabled = false;

}
function formatFileSize(bytes){

    return (
        bytes / 1024 / 1024
    ).toFixed(2) + " MB";

}
function showError(message){

    uploadError.textContent = message;

    uploadError.classList.remove("hidden");

}


function hideError(){

    uploadError.classList.add("hidden");

}
