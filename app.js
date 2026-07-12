/* ==========================================
   PDF UPLOAD SYSTEM
========================================== */

const pdfInput =
    document.getElementById(
        "pdf-input"
    );

const chooseFileBtn =
    document.getElementById(
        "choose-file-btn"
    );

const dropZone =
    document.getElementById(
        "drop-zone"
    );

const fileNameElement =
    document.getElementById(
        "file-name"
    );

/* ==========================================
   GLOBAL STATE
========================================== */

let uploadedFile = null;

let uploadedPdfArrayBuffer =
    null;

/* ==========================================
   BUTTON CLICK
========================================== */

chooseFileBtn.addEventListener(
    "click",
    () => {

        pdfInput.click();

    }
);

/* ==========================================
   FILE INPUT
========================================== */

pdfInput.addEventListener(
    "change",
    async (event)=>{

        const file =
            event.target.files[0];

        if(
            file
        ){

            await handlePdfFile(
                file
            );

        }

    }
);

/* ==========================================
   DRAG EVENTS
========================================== */

dropZone.addEventListener(
    "dragover",
    (event)=>{

        event.preventDefault();

        dropZone.classList.add(
            "drag-active"
        );

    }
);

dropZone.addEventListener(
    "dragleave",
    ()=>{

        dropZone.classList.remove(
            "drag-active"
        );

    }
);

dropZone.addEventListener(
    "drop",
    async (event)=>{

        event.preventDefault();

        dropZone.classList.remove(
            "drag-active"
        );

        const file =
            event
                .dataTransfer
                .files[0];

        if(
            file
        ){

            await handlePdfFile(
                file
            );

        }

    }
);

/* ==========================================
   PDF HANDLER
========================================== */

async function handlePdfFile(
    file
){

    if(
        file.type !==
        "application/pdf"
    ){

        alert(
            "Please select a PDF file only."
        );

        return;

    }

    uploadedFile =
        file;

    uploadedPdfArrayBuffer =
        await file.arrayBuffer();

    fileNameElement.textContent =
        `Loaded: ${file.name}`;

    fileNameElement.style.display =
        "block";

    console.log(
        "PDF Loaded Successfully"
    );

}
/* ==========================================
   WATERMARK SETTINGS SYSTEM
========================================== */

const watermarkSection =
    document.getElementById(
        "watermark-section"
    );

const watermarkTextInput =
    document.getElementById(
        "watermark-text"
    );

const fontSizeInput =
    document.getElementById(
        "font-size"
    );

const opacityInput =
    document.getElementById(
        "opacity"
    );

const rotationInput =
    document.getElementById(
        "rotation"
    );

const watermarkColorInput =
    document.getElementById(
        "watermark-color"
    );

/* ==========================================
   WATERMARK STATE
========================================== */

const watermarkSettings = {

    text: "",

    fontSize: 32,

    opacity: 50,

    rotation: -45,

    color: "#ffffff"

};

/* ==========================================
   SHOW WATERMARK SETTINGS
========================================== */

function showWatermarkSection(){

    const uploadSection =
        document.getElementById(
            "upload-section"
        );

    uploadSection.classList.add(
        "hidden"
    );

    watermarkSection.classList.remove(
        "hidden"
    );

}

/* ==========================================
   UPDATE SETTINGS
========================================== */

function updateWatermarkSettings(){

    watermarkSettings.text =
        watermarkTextInput.value;

    watermarkSettings.fontSize =
        Number(
            fontSizeInput.value
        );

    watermarkSettings.opacity =
        Number(
            opacityInput.value
        );

    watermarkSettings.rotation =
        Number(
            rotationInput.value
        );

    watermarkSettings.color =
        watermarkColorInput.value;

}

/* ==========================================
   INPUT EVENTS
========================================== */

watermarkTextInput.addEventListener(
    "input",
    updateWatermarkSettings
);

fontSizeInput.addEventListener(
    "input",
    updateWatermarkSettings
);

opacityInput.addEventListener(
    "input",
    updateWatermarkSettings
);

rotationInput.addEventListener(
    "input",
    updateWatermarkSettings
);

watermarkColorInput.addEventListener(
    "input",
    updateWatermarkSettings
);

/* ==========================================
   AFTER SUCCESSFUL PDF LOAD
========================================== */

const originalHandlePdfFile =
    handlePdfFile;

handlePdfFile =
async function(file){

    await originalHandlePdfFile(
        file
    );

    if(
        uploadedFile
    ){

        showWatermarkSection();

    }

};
/* ==========================================
   PREVIEW SYSTEM
========================================== */

const continuePreviewBtn =
    document.getElementById(
        "continue-preview-btn"
    );

const backToSettingsBtn =
    document.getElementById(
        "back-to-settings-btn"
    );

const watermarkPreview =
    document.getElementById(
        "watermark-preview"
    );

const previewSection =
    document.getElementById(
        "preview-section"
    );

const previewCanvas =
    document.getElementById(
        "pdf-preview-canvas"
    );

let loadedPdf = null;

/* ==========================================
   OPEN PREVIEW
========================================== */

continuePreviewBtn.addEventListener(
    "click",
    async ()=>{

        watermarkSection.classList.add(
            "hidden"
        );

        previewSection.classList.remove(
            "hidden"
        );

        await loadPdfPreview();

        updatePreview();

    }
);

/* ==========================================
   BACK BUTTON
========================================== */

backToSettingsBtn.addEventListener(
    "click",
    ()=>{

        previewSection.classList.add(
            "hidden"
        );

        watermarkSection.classList.remove(
            "hidden"
        );

    }
);

/* ==========================================
   LOAD PDF
========================================== */

async function loadPdfPreview(){

    loadedPdf =
        await pdfjsLib
            .getDocument(
                {
                    data:
                        uploadedPdfArrayBuffer
                }
            )
            .promise;

    const page =
        await loadedPdf.getPage(
            1
        );

    const viewport =
        page.getViewport(
            {
                scale:
                    1.5
            }
        );

    const context =
        previewCanvas.getContext(
            "2d"
        );

    previewCanvas.width =
        viewport.width;

    previewCanvas.height =
        viewport.height;

    await page.render(
        {
            canvasContext:
                context,

            viewport:
                viewport
        }
    ).promise;

}

/* ==========================================
   WATERMARK LIVE PREVIEW
========================================== */

function updatePreview(){

    watermarkPreview.textContent =
        watermarkSettings.text ||
        "WATERMARK";

    watermarkPreview.style.fontSize =
        `${watermarkSettings.fontSize}px`;

    watermarkPreview.style.opacity =
        watermarkSettings.opacity / 100;

    watermarkPreview.style.color =
        watermarkSettings.color;

    watermarkPreview.style.transform =
        `
        translate(-50%,-50%)
        rotate(
            ${watermarkSettings.rotation}deg
        )
        `;

}

/* ==========================================
   LIVE UPDATE EVENTS
========================================== */

watermarkTextInput.addEventListener(
    "input",
    updatePreview
);

fontSizeInput.addEventListener(
    "input",
    updatePreview
);

opacityInput.addEventListener(
    "input",
    updatePreview
);

rotationInput.addEventListener(
    "input",
    updatePreview
);

watermarkColorInput.addEventListener(
    "input",
    updatePreview
);

