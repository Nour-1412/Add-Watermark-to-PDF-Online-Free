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
