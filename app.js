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

