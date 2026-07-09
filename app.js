/* ==========================================
   WEBBAG PDF WATERMARK STATE
========================================== */
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js";
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
   loadedPdf = pdf;

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
/* ==========================================
   TEXT WATERMARK ELEMENTS
========================================== */

const watermarkTextInput =
    document.getElementById("watermark-text");

const fontFamilySelect =
    document.getElementById("font-family");

const fontSizeSlider =
    document.getElementById("font-size");

const fontColorPicker =
    document.getElementById("font-color");

const opacitySlider =
    document.getElementById("opacity");

const rotationSlider =
    document.getElementById("rotation");

const letterSpacingSlider =
    document.getElementById("letter-spacing");

const lineHeightSlider =
    document.getElementById("line-height");
watermarkTextInput?.addEventListener(
    "input",
    (event) => {

        appState.text =
            event.target.value;

        refreshPreview();

    }
);
fontFamilySelect?.addEventListener(
    "change",
    (event) => {

        appState.fontFamily =
            event.target.value;

        refreshPreview();

    }
);
fontSizeSlider?.addEventListener(
    "input",
    (event) => {

        appState.fontSize =
            Number(event.target.value);

        document.getElementById(
            "font-size-value"
        ).textContent =
            `${appState.fontSize}px`;

        refreshPreview();

    }
);

fontColorPicker?.addEventListener(
    "input",
    (event) => {

        appState.fontColor =
            event.target.value;

        refreshPreview();

    }
);
opacitySlider?.addEventListener(
    "input",
    (event) => {

        appState.opacity =
            Number(event.target.value);

        document.getElementById(
            "opacity-value"
        ).textContent =
            `${appState.opacity}%`;

        refreshPreview();

    }
);
rotationSlider?.addEventListener(
    "input",
    (event) => {

        appState.rotation =
            Number(event.target.value);

        document.getElementById(
            "rotation-value"
        ).textContent =
            `${appState.rotation}°`;

        refreshPreview();

    }
);
letterSpacingSlider?.addEventListener(
    "input",
    (event) => {

        appState.letterSpacing =
            Number(event.target.value);

        document.getElementById(
            "letter-spacing-value"
        ).textContent =
            `${appState.letterSpacing}px`;

        refreshPreview();

    }
);
lineHeightSlider?.addEventListener(
    "input",
    (event) => {

        appState.lineHeight =
            Number(event.target.value);

        document.getElementById(
            "line-height-value"
        ).textContent =
            appState.lineHeight;

        refreshPreview();

    }
);
function refreshPreview(){

    console.log(
        "Preview Updated",
        appState
    );

}
const weightButtons =
    document.querySelectorAll(
        "[data-weight]"
    );

weightButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            weightButtons.forEach(
                btn => btn.classList.remove("active")
            );

            button.classList.add("active");

            appState.fontWeight =
                button.dataset.weight;

            refreshPreview();

        }
    );

});
const styleButtons =
    document.querySelectorAll(
        ".style-btn"
    );

styleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            button.classList.toggle("active");

            const style =
                button.dataset.style;

            if(style === "italic"){

                appState.italic =
                    button.classList.contains(
                        "active"
                    );

            }

            if(style === "underline"){

                appState.underline =
                    button.classList.contains(
                        "active"
                    );

            }

            refreshPreview();

        }
    );

});
const alignmentButtons =
    document.querySelectorAll(
        "[data-align]"
    );

alignmentButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            alignmentButtons.forEach(
                btn => btn.classList.remove("active")
            );

            button.classList.add("active");

            appState.alignment =
                button.dataset.align;

            refreshPreview();

        }
    );

});
/* ==========================================
   IMAGE WATERMARK ELEMENTS
========================================== */

const imageInput =
    document.getElementById("image-input");

const chooseImageBtn =
    document.getElementById(
        "choose-image-btn"
    );

const replaceImageBtn =
    document.getElementById(
        "replace-image-btn"
    );

const removeImageBtn =
    document.getElementById(
        "remove-image-btn"
    );

const previewImage =
    document.getElementById(
        "preview-image"
    );

const imagePreview =
    document.getElementById(
        "image-preview"
    );
chooseImageBtn?.addEventListener(
    "click",
    () => {

        imageInput.click();

    }
);


replaceImageBtn?.addEventListener(
    "click",
    () => {

        imageInput.click();

    }
);
imageInput?.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if(!file) return;

        loadWatermarkImage(file);

    }
);
function loadWatermarkImage(file){

    appState.imageFile = file;

    const reader =
        new FileReader();

    reader.onload = function(e){

        previewImage.src =
            e.target.result;

        imagePreview.classList.remove(
            "hidden"
        );

        refreshPreview();

    };

    reader.readAsDataURL(file);

}
removeImageBtn?.addEventListener(
    "click",
    () => {

        appState.imageFile = null;

        previewImage.src = "";

        imagePreview.classList.add(
            "hidden"
        );

        refreshPreview();

    }
);
/* ==========================================
   IMAGE CONTROLS
========================================== */

const imageScaleSlider =
    document.getElementById(
        "image-scale"
    );

const imageOpacitySlider =
    document.getElementById(
        "image-opacity"
    );

const imageRotationSlider =
    document.getElementById(
        "image-rotation"
    );

const flipHorizontalBtn =
    document.getElementById(
        "flip-horizontal-btn"
    );

const flipVerticalBtn =
    document.getElementById(
        "flip-vertical-btn"
    );
imageScaleSlider?.addEventListener(
    "input",
    (event) => {

        appState.imageScale =
            Number(event.target.value);

        refreshPreview();

    }
);
imageOpacitySlider?.addEventListener(
    "input",
    (event) => {

        appState.imageOpacity =
            Number(event.target.value);

        refreshPreview();

    }
);
imageRotationSlider?.addEventListener(
    "input",
    (event) => {

        appState.imageRotation =
            Number(event.target.value);

        refreshPreview();

    }
);
flipHorizontalBtn?.addEventListener(
    "click",
    () => {

        appState.flipHorizontal =
            !appState.flipHorizontal;

        refreshPreview();

    }
);
flipVerticalBtn?.addEventListener(
    "click",
    () => {

        appState.flipVertical =
            !appState.flipVertical;

        refreshPreview();

    }
);
/* ==========================================
   POSITION ENGINE
========================================== */

const positionButtons =
    document.querySelectorAll(
        ".position-btn"
    );

const customXGroup =
    document.getElementById(
        "custom-x-group"
    );

const customYGroup =
    document.getElementById(
        "custom-y-group"
    );

const repeatSpacingXGroup =
    document.getElementById(
        "repeat-spacing-x-group"
    );

const repeatSpacingYGroup =
    document.getElementById(
        "repeat-spacing-y-group"
    );
positionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            positionButtons.forEach(
                btn => btn.classList.remove(
                    "active"
                )
            );

            button.classList.add(
                "active"
            );

            appState.position =
                button.dataset.position;

            updatePositionUI();

            refreshPreview();

        }
    );

});
function updatePositionUI(){

    customXGroup?.classList.add(
        "hidden"
    );

    customYGroup?.classList.add(
        "hidden"
    );

    repeatSpacingXGroup?.classList.add(
        "hidden"
    );

    repeatSpacingYGroup?.classList.add(
        "hidden"
    );

    if(
        appState.position ===
        "custom"
    ){

        customXGroup?.classList.remove(
            "hidden"
        );

        customYGroup?.classList.remove(
            "hidden"
        );

    }

    if(
        appState.position ===
        "repeat"
    ){

        repeatSpacingXGroup?.classList.remove(
            "hidden"
        );

        repeatSpacingYGroup?.classList.remove(
            "hidden"
        );

    }

}
/* ==========================================
   POSITION SLIDERS ENGINE
========================================== */

const customXSlider =
    document.getElementById(
        "custom-x"
    );

const customYSlider =
    document.getElementById(
        "custom-y"
    );

const horizontalMarginSlider =
    document.getElementById(
        "horizontal-margin"
    );

const verticalMarginSlider =
    document.getElementById(
        "vertical-margin"
    );

const repeatSpacingXSlider =
    document.getElementById(
        "repeat-spacing-x"
    );

const repeatSpacingYSlider =
    document.getElementById(
        "repeat-spacing-y"
    );
       customXSlider?.addEventListener(
    "input",
    (event) => {

        appState.customX =
            Number(event.target.value);

        refreshPreview();

    }
);
customYSlider?.addEventListener(
    "input",
    (event) => {

        appState.customY =
            Number(event.target.value);

        refreshPreview();

    }
);
horizontalMarginSlider?.addEventListener(
    "input",
    (event) => {

        appState.horizontalMargin =
            Number(event.target.value);

        refreshPreview();

    }
);
verticalMarginSlider?.addEventListener(
    "input",
    (event) => {

        appState.verticalMargin =
            Number(event.target.value);

        refreshPreview();

    }
);
repeatSpacingXSlider?.addEventListener(
    "input",
    (event) => {

        appState.repeatSpacingX =
            Number(event.target.value);

        refreshPreview();

    }
);
repeatSpacingYSlider?.addEventListener(
    "input",
    (event) => {

        appState.repeatSpacingY =
            Number(event.target.value);

        refreshPreview();

    }
);
/* ==========================================
   PAGE SETTINGS ENGINE
========================================== */

const pageButtons =
    document.querySelectorAll(
        ".page-btn"
    );

const customPagesGroup =
    document.getElementById(
        "custom-pages-group"
    );

const customPagesInput =
    document.getElementById(
        "custom-pages"
    );

const excludedPagesInput =
    document.getElementById(
        "excluded-pages"
    );

pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            pageButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );

            appState.pageMode =
                button.dataset.pages;

            updatePageUI();

            refreshPreview();

        }
    );

});

function updatePageUI(){

    customPagesGroup?.classList.add(
        "hidden"
    );

    if(
        appState.pageMode ===
        "custom"
    ){

        customPagesGroup?.classList.remove(
            "hidden"
        );

    }

}

customPagesInput?.addEventListener(
    "input",
    (event) => {

        appState.customPages =
            event.target.value;

        refreshPreview();

    }
);

excludedPagesInput?.addEventListener(
    "input",
    (event) => {

        appState.excludedPages =
            event.target.value;

        refreshPreview();

    }
);
           /* ==========================================
   WATERMARK TYPE ENGINE
========================================== */

const watermarkTypeButtons =
    document.querySelectorAll(
        ".watermark-card"
    );

const textSettingsPanel =
    document.getElementById(
        "text-settings-panel"
    );

const imageSettingsPanel =
    document.getElementById(
        "image-settings-panel"
    );
           watermarkTypeButtons.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            watermarkTypeButtons.forEach(
                item => item.classList.remove(
                    "active"
                )
            );

            card.classList.add(
                "active"
            );

            appState.watermarkType =
                card.dataset.type;

            updateWatermarkPanels();

            refreshPreview();

        }
    );

});
           function updateWatermarkPanels(){

    textSettingsPanel?.classList.add(
        "hidden"
    );

    imageSettingsPanel?.classList.add(
        "hidden"
    );

    if(
        appState.watermarkType ===
        "text"
    ){

        textSettingsPanel?.classList.remove(
            "hidden"
        );

    }

    if(
        appState.watermarkType ===
        "image"
    ){

        imageSettingsPanel?.classList.remove(
            "hidden"
        );

    }

    if(
        appState.watermarkType ===
        "mixed"
    ){

        textSettingsPanel?.classList.remove(
            "hidden"
        );

        imageSettingsPanel?.classList.remove(
            "hidden"
        );

    }

           }
           updateWatermarkPanels();
           /* ==========================================
   PREVIEW ENGINE
========================================== */

const previewType =
    document.getElementById(
        "summary-type"
    );

const previewPosition =
    document.getElementById(
        "summary-position"
    );

const previewPages =
    document.getElementById(
        "summary-pages"
    );

const previewOpacity =
    document.getElementById(
        "summary-opacity"
    );
           function refreshPreview(){

    updatePreviewSummary();

    console.log(
        "Preview refreshed",
        appState
    );

       }
          function updatePreviewSummary(){

    previewType.textContent =
        appState.watermarkType;

    previewPosition.textContent =
        appState.position;

    previewPages.textContent =
        appState.pageMode;

    previewOpacity.textContent =
        `${appState.opacity}%`;

       }
           updatePreviewSummary();
           /* ==========================================
   PDF CANVAS RENDERING
========================================== */

const previewCanvas =
    document.getElementById(
        "pdf-preview-canvas"
    );

const previewContext =
    previewCanvas.getContext("2d");

let loadedPdf = null;
  async function renderPreviewPage(pageNumber = 1)         
  {

    if(!loadedPdf) return;

    const page =
        await loadedPdf.getPage(
            pageNumber
        );

    const scale =
        appState.zoomLevel / 100;

    const viewport =
        page.getViewport({
            scale
        });

    previewCanvas.width =
        viewport.width;

    previewCanvas.height =
        viewport.height;

    await page.render({

        canvasContext:
            previewContext,

        viewport

    }).promise;

    drawWatermarkOverlay();

       }
         function getWatermarkPosition(){

    let x =
        previewCanvas.width / 2;

    let y =
        previewCanvas.height / 2;

    switch(appState.position){

        case "top-left":
            x = 120;
            y = 100;
            break;

        case "top-right":
            x =
                previewCanvas.width - 120;
            y = 100;
            break;

        case "bottom-left":
            x = 120;
            y =
                previewCanvas.height - 100;
            break;

        case "bottom-right":
            x =
                previewCanvas.width - 120;

            y =
                previewCanvas.height - 100;
            break;

        case "header":
            x =
                previewCanvas.width / 2;

            y = 80;
            break;

        case "footer":
            x =
                previewCanvas.width / 2;

            y =
                previewCanvas.height - 80;
            break;

        case "custom":
            x =
                (
                    appState.customX / 100
                ) *
                previewCanvas.width;

            y =
                (
                    appState.customY / 100
                ) *
                previewCanvas.height;

            break;

    }

    return {x,y};

         }  
      function drawWatermarkOverlay(){

    if(
    appState.watermarkType ===
    "text"
){

    drawTextWatermark();

}

if(
    appState.watermarkType ===
    "image"
){

    drawImageWatermark();

}

if(
    appState.watermarkType ===
    "mixed"
){

    drawTextWatermark();

    drawImageWatermark();

}

    if(
        !appState.text
    ) return;

    previewContext.save();

    previewContext.globalAlpha =
        appState.opacity / 100;

    previewContext.fillStyle =
        appState.fontColor;

    previewContext.font =
        `${appState.fontWeight}
        ${appState.fontSize}px
        ${appState.fontFamily}`;

    previewContext.textAlign =
        "center";

    const position =
    getWatermarkPosition();

previewContext.translate(
    position.x,
    position.y
);

    previewContext.rotate(
        appState.rotation *
        Math.PI / 180
    );

    previewContext.fillText(
        appState.text,
        0,
        0
    );

    previewContext.restore();

      }
           function drawImageWatermark(){

    if(
        !appState.imageFile
    ) return;

    const image =
        new Image();

    image.onload = () => {

        previewContext.save();

        previewContext.globalAlpha =
            appState.imageOpacity / 100;

        const position =
            getWatermarkPosition();

        previewContext.translate(
            position.x,
            position.y
        );

        previewContext.rotate(
            appState.imageRotation *
            Math.PI / 180
        );

        const scale =
            appState.imageScale / 100;

        const width =
            image.width * scale;

        const height =
            image.height * scale;

        previewContext.drawImage(

            image,

            -width / 2,
            -height / 2,

            width,
            height

        );

        previewContext.restore();

    };

    image.src =
        previewImage.src;

           }
           /* ==========================================
   EXPORT ENGINE
========================================== */
           async function exportPDF(){

    if(
        !appState.pdfFile
    ) return;

    const existingPdfBytes =
        await appState.pdfFile.arrayBuffer();

    const pdfDocument =
        await PDFLib.PDFDocument.load(
            existingPdfBytes
        );

    const pages =
        pdfDocument.getPages();

    const totalPages =
        pages.length;

    for(
        let i = 0;
        i < totalPages;
        i++
    ){

        const pageNumber =
            i + 1;

        if(
            !shouldProcessPage(
                pageNumber
            )
        ){
            continue;
        }

        const page =
            pages[i];

        const pageWidth =
            page.getWidth();

        const pageHeight =
            page.getHeight();

        if(
            appState.watermarkType ===
            "text"
        ){

            await exportTextWatermark(
                page,
                pageWidth,
                pageHeight
            );

        }

        if(
            appState.watermarkType ===
            "image"
        ){

            await exportImageWatermark(
                pdfDocument,
                page,
                pageWidth,
                pageHeight
            );

        }

        if(
            appState.watermarkType ===
            "mixed"
        ){

            await exportTextWatermark(
                page,
                pageWidth,
                pageHeight
            );

            await exportImageWatermark(
                pdfDocument,
                page,
                pageWidth,
                pageHeight
            );

        }

    }

    const pdfBytes =
        await pdfDocument.save();

    const blob =
        new Blob(
            [pdfBytes],
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

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(
        url
    );

}



function shouldProcessPage(
    pageNumber
){

    switch(
        appState.pageMode
    ){

        case "all":
            return true;

        case "first":
            return pageNumber === 1;

        case "last":
            return (
                pageNumber ===
                appState.totalPages
            );

        case "odd":
            return (
                pageNumber % 2 === 1
            );

        case "even":
            return (
                pageNumber % 2 === 0
            );

        default:
            return true;

    }

           }
           async function exportTextWatermark(
    page,
    pageWidth,
    pageHeight
){

    if(
        !appState.text
    ) return;

    const {
        rgb,
        degrees
    } = PDFLib;

    page.drawText(

        appState.text,

        {

            x:
                pageWidth / 2,

            y:
                pageHeight / 2,

            size:
                appState.fontSize,

            rotate:
                degrees(
                    appState.rotation
                ),

            opacity:
                appState.opacity / 100,

            color:
                rgb(
                    0.5,
                    0.5,
                    0.5
                )

        }

    );

}



async function exportImageWatermark(
    pdfDocument,
    page,
    pageWidth,
    pageHeight
){

    if(
        !appState.imageFile
    ) return;

    const imageBytes =
        await appState.imageFile.arrayBuffer();

    let embeddedImage;

    if(
        appState.imageFile.type ===
        "image/png"
    ){

        embeddedImage =
            await pdfDocument.embedPng(
                imageBytes
            );

    }else{

        embeddedImage =
            await pdfDocument.embedJpg(
                imageBytes
            );

    }

    const scale =
        (
            appState.imageScale || 100
        ) / 100;

    const imageWidth =
        embeddedImage.width *
        scale;

    const imageHeight =
        embeddedImage.height *
        scale;

    const x =
        (
            pageWidth -
            imageWidth
        ) / 2;

    const y =
        (
            pageHeight -
            imageHeight
        ) / 2;

    page.drawImage(

        embeddedImage,

        {

            x,

            y,

            width:
                imageWidth,

            height:
                imageHeight,

            opacity:
                (
                    appState.imageOpacity ||
                    100
                ) / 100,

            rotate:
                PDFLib.degrees(
                    appState.imageRotation ||
                    0
                )

        }

    );

   }
           
