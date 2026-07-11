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

let uploadedFile = null;


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
   FILE SELECT
========================================== */

pdfInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if(
            !file
        ){
            return;
        }

        if(
            file.type !==
            "application/pdf"
        ){

            alert(
                "Please choose a PDF file."
            );

            return;
        }

        uploadedFile =
            file;

        console.log(
            "PDF Loaded:",
            file.name
        );

        alert(
            `Loaded: ${file.name}`
        );

    }
);


/* ==========================================
   DRAG AND DROP
========================================== */

dropZone.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

    }
);

dropZone.addEventListener(
    "drop",
    (event) => {

        event.preventDefault();

        const file =
            event.dataTransfer
            .files[0];

        if(
            !file
        ){
            return;
        }

        if(
            file.type !==
            "application/pdf"
        ){

            alert(
                "Please choose a PDF file."
            );

            return;
        }

        uploadedFile =
            file;

        alert(
            `Loaded: ${file.name}`
        );

    }
);
