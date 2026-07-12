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

