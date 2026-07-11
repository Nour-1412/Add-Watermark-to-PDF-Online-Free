/* ==========================================
   PDF.js Worker
========================================== */

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


/* ==========================================
   APPLICATION STATE
========================================== */

const appState = {

    pdfFile: null,

    pdfName: "",

    pdfSize: 0,

    totalPages: 0,

    loadedPdf: null

};


/* ==========================================
   DOM ELEMENTS
========================================== */

const pdfInput =
    document.getElementById(
        "pdf-input"
    );

const dropZone =
    document.getElementById(
        "drop-zone"
    );

const fileInfo =
    document.getElementById(
        "file-info"
    );

const fileNameElement =
    document.getElementById(
        "file-name"
    );

const fileSizeElement =
    document.getElementById(
        "file-size"
    );

const pageCountElement =
    document.getElementById(
        "page-count"
    );

const uploadError =
    document.getElementById(
        "upload-error"
    );

const continueButton =
    document.getElementById(
        "go-to-watermark-btn"
    );

const chooseFileButton =
    document.getElementById(
        "choose-file-btn"
    );


/* ==========================================
   FILE BUTTON
========================================== */

chooseFileButton?.addEventListener(
    "click",
    () => {

        pdfInput.click();

    }
);


/* ==========================================
   INPUT CHANGE
========================================== */

pdfInput?.addEventListener(
    "change",
    async (event) => {

        const file =
            event.target.files[0];

        if(
            file
        ){

            await loadPDF(
                file
            );

        }

    }
);


/* ==========================================
   DRAG AND DROP
========================================== */

dropZone?.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

        dropZone.classList.add(
            "drag-active"
        );

    }
);

dropZone?.addEventListener(
    "dragleave",
    () => {

        dropZone.classList.remove(
            "drag-active"
        );

    }
);

dropZone?.addEventListener(
    "drop",
    async (event) => {

        event.preventDefault();

        dropZone.classList.remove(
            "drag-active"
        );

        const file =
            event.dataTransfer.files[0];

        if(
            file
        ){

            await loadPDF(
                file
            );

        }

    }
);


/* ==========================================
   LOAD PDF
========================================== */

async function loadPDF(
    file
){

    if(
        file.type !==
        "application/pdf"
    ){

        showError(
            "Please upload a valid PDF file."
        );

        return;

    }

    hideError();

    appState.pdfFile =
        file;

    appState.pdfName =
        file.name;

    appState.pdfSize =
        file.size;

    const pdfBytes =
        await file.arrayBuffer();

    const pdf =
        await pdfjsLib.getDocument(
            {
                data:
                    pdfBytes
            }
        ).promise;

    appState.loadedPdf =
        pdf;

    appState.totalPages =
        pdf.numPages;

    updateFileCard();

}


/* ==========================================
   UPDATE FILE CARD
========================================== */

function updateFileCard(){

    fileNameElement.textContent =
        appState.pdfName;

    fileSizeElement.textContent =
        formatFileSize(
            appState.pdfSize
        );

    pageCountElement.textContent =
        `${appState.totalPages} Pages`;

    fileInfo.classList.remove(
        "hidden"
    );

    continueButton.disabled =
        false;

}


/* ==========================================
   FORMAT FILE SIZE
========================================== */

function formatFileSize(
    bytes
){

    return (
        bytes /
        1024 /
        1024
    ).toFixed(
        2
    ) + " MB";

}


/* ==========================================
   ERROR HANDLING
========================================== */

function showError(
    message
){

    uploadError.textContent =
        message;

    uploadError.classList.remove(
        "hidden"
    );

}

function hideError(){

    uploadError.classList.add(
        "hidden"
    );

         }     
/* ==========================================
   STEP NAVIGATION STATE
========================================== */

appState.currentStep =
    1;

appState.watermarkType =
    "text";


/* ==========================================
   STEP ELEMENTS
========================================== */

const uploadSection =
    document.getElementById(
        "upload-section"
    );

const watermarkSection =
    document.getElementById(
        "watermark-section"
    );

const previewSection =
    document.getElementById(
        "preview-section"
    );

const exportSection =
    document.getElementById(
        "export-section"
    );

const stepUpload =
    document.getElementById(
        "step-upload"
    );

const stepWatermark =
    document.getElementById(
        "step-watermark"
    );

const stepPreview =
    document.getElementById(
        "step-preview"
    );

const stepExport =
    document.getElementById(
        "step-export"
    );


/* ==========================================
   NAVIGATION BUTTONS
========================================== */

const goToWatermarkButton =
    document.getElementById(
        "go-to-watermark-btn"
    );

const backToUploadButton =
    document.getElementById(
        "back-to-upload-btn"
    );

const continueToPreviewButton =
    document.getElementById(
        "continue-to-preview-btn"
    );

const backToSettingsButton =
    document.getElementById(
        "back-to-settings-btn"
    );

const continueToExportButton =
    document.getElementById(
        "continue-to-export-btn"
    );

const backToPreviewButton =
    document.getElementById(
        "back-to-preview-btn"
    );


/* ==========================================
   STEP FUNCTIONS
========================================== */

function showStep(
    stepNumber
){

    uploadSection.classList.remove(
        "active-section"
    );

    watermarkSection.classList.remove(
        "active-section"
    );

    previewSection.classList.remove(
        "active-section"
    );

    exportSection.classList.remove(
        "active-section"
    );

    stepUpload.classList.remove(
        "active"
    );

    stepWatermark.classList.remove(
        "active"
    );

    stepPreview.classList.remove(
        "active"
    );

    stepExport.classList.remove(
        "active"
    );

    if(
        stepNumber === 1
    ){

        uploadSection.classList.add(
            "active-section"
        );

        stepUpload.classList.add(
            "active"
        );

    }

    if(
        stepNumber === 2
    ){

        watermarkSection.classList.add(
            "active-section"
        );

        stepWatermark.classList.add(
            "active"
        );

    }

    if(
        stepNumber === 3
    ){

        previewSection.classList.add(
            "active-section"
        );

        stepPreview.classList.add(
            "active"
        );

    }

    if(
        stepNumber === 4
    ){

        exportSection.classList.add(
            "active-section"
        );

        stepExport.classList.add(
            "active"
        );

    }

    appState.currentStep =
        stepNumber;

}


/* ==========================================
   BUTTON NAVIGATION
========================================== */

goToWatermarkButton?.addEventListener(
    "click",
    () => {

        showStep(
            2
        );

    }
);

backToUploadButton?.addEventListener(
    "click",
    () => {

        showStep(
            1
        );

    }
);

continueToPreviewButton?.addEventListener(
    "click",
    () => {

        showStep(
            3
        );

    }
);

backToSettingsButton?.addEventListener(
    "click",
    () => {

        showStep(
            2
        );

    }
);

continueToExportButton?.addEventListener(
    "click",
    () => {

        showStep(
            4
        );

    }
);

backToPreviewButton?.addEventListener(
    "click",
    () => {

        showStep(
            3
        );

    }
);


/* ==========================================
   WATERMARK TYPE SELECTION
========================================== */

const watermarkCards =
    document.querySelectorAll(
        ".watermark-card"
    );

watermarkCards.forEach(
    (
        card
    ) => {

        card.addEventListener(
            "click",
            () => {

                watermarkCards.forEach(
                    (
                        item
                    ) => {

                        item.classList.remove(
                            "active-type"
                        );

                    }
                );

                card.classList.add(
                    "active-type"
                );

                appState.watermarkType =
                    card.dataset.type;

            }
        );

    }
);
