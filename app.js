/* ==========================================
   PDF.JS WORKER
========================================== */
alert("APP.JS WORKING");
//pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js";

/* ==========================================
   ELEMENTS
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

const continuePreviewBtn =
document.getElementById(
    "continue-preview-btn"
);

const backToSettingsBtn =
document.getElementById(
    "back-to-settings-btn"
);

const previewCanvas =
document.getElementById(
    "pdf-preview-canvas"
);

const watermarkPreview =
document.getElementById(
    "watermark-preview"
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
   GLOBAL STATE
========================================== */

let uploadedFile = null;

let uploadedPdfArrayBuffer =
null;

let loadedPdf = null;

const watermarkSettings = {

    text : "",

    fontSize : 32,

    opacity : 50,

    rotation : -45,

    color : "#ffffff"

};

/* ==========================================
   FILE BUTTON
========================================== */
if (chooseFileBtn && pdfInput) {

    chooseFileBtn.addEventListener(
        "click",
        () => {
            pdfInput.click();
        }
    );

}


/* ==========================================
   FILE INPUT
========================================== */

pdfInput.addEventListener(
    "change",
    async(event)=>{

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
   DRAG & DROP
========================================== */

dropZone.addEventListener(
    "dragover",
    (event)=>{

        event.preventDefault();

    }
);

dropZone.addEventListener(
    "drop",
    async(event)=>{

        event.preventDefault();

        const file =
        event.dataTransfer.files[0];

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
   HANDLE PDF
========================================== */

async function handlePdfFile(
    file
){

    if(
        file.type !==
        "application/pdf"
    ){

        alert(
            "Please select a PDF file."
        );

        return;

    }

    uploadedFile =
    file;

    uploadedPdfArrayBuffer =
    await file.arrayBuffer();

    fileNameElement.textContent =
    `Loaded: ${file.name}`;

    uploadSection.classList.add(
        "hidden"
    );

    watermarkSection.classList.remove(
        "hidden"
    );

}

/* ==========================================
   SETTINGS UPDATE
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
   OPEN PREVIEW
========================================== */

 (continueExportBtn) {

    continueExportBtn.addEventListener(
        "click",
    async()=>{

        watermarkSection.classList.add(
            "hidden"
        );

        previewSection.classList.remove(
            "hidden"
        );

        await renderPdfPage();

        updatePreview();

        }
    );

}
}
/* ==========================================
   BACK BUTTON
========================================== */

 (backToSettingsBtn) {

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
}
/* ==========================================
   PDF RENDER
========================================== */

async function renderPdfPage(){

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
            scale : 1.5
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
            canvasContext :
            context,

            viewport :
            viewport
        }
    ).promise;

}

/* ==========================================
   WATERMARK PREVIEW
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

updatePreview();
/* ==========================================
   EXPORT PDF
========================================== */

const continueExportBtn =
document.getElementById(
    "continue-export-btn"
);

 continueExportBtn.addEventListener(
    "click",
    async()=>{

        const pdfDoc =
        await PDFLib.PDFDocument.load(
            uploadedPdfArrayBuffer
        );

        const pages =
        pdfDoc.getPages();

        pages.forEach(
            (page)=>{

                const {
                    width,
                    height
                } =
                page.getSize();

                page.drawText(
                    watermarkSettings.text ||
                    "WATERMARK",
                    {

                        x:
                        width / 2 - 120,

                        y:
                        height / 2,

                        size:
                        watermarkSettings.fontSize,

                        opacity:
                        watermarkSettings.opacity / 100,

                        rotate:
                        PDFLib.degrees(
                            watermarkSettings.rotation
                        ),

                        color:
                        PDFLib.rgb(
                            1,
                            1,
                            1
                        )

                    }
                );

            }
        );

        const pdfBytes =
        await pdfDoc.save();

        const blob =
        new Blob(
            [
                pdfBytes
            ],
            {
                type:
                "application/pdf"
            }
        );

        const url =
        URL.createObjectURL(
            blob
        );

        const link =
        document.createElement(
            "a"
        );

        link.href =
        url;

        link.download =
        "watermarked.pdf";

        link.click();

        URL.revokeObjectURL(
            url
        );

    }
);
