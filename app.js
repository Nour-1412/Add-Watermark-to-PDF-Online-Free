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
        "
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
pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            pageButtons.forEach(
                btn => btn.classList.remove(
                    "active"
                )
            );

            button.classList.add(
                "active"
            );

            appState.pageMode =
                button.dataset.pages;

            updatePageUI();

            refreshPreview
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
